import { action, computed, makeObservable, observable, ObservableMap, runInAction } from "mobx";

import {CartModelDTO, ICartDto} from "../models/Cart.model.dto";
import ApolloService from "./ApolloService";
import {inject} from "react-ioc";
import {gql} from "@apollo/client";


export type TFieldForm = 'phone' | 'comment' | 'city' | 'email' | 'name';


class BasketService {
    private readonly _apolloService: ApolloService;

    private _addedProducts: ObservableMap<string, CartModelDTO> = observable.map();
    private _formData: Record<TFieldForm, string>;

    public get addedProducts(): CartModelDTO[] {
        return [...this._addedProducts.values()];
    }

    public set formData({ name, value }: { name: TFieldForm; value: string }) {
        runInAction(() => {
            this._formData[name] = value;
        });
    }

    public get name(): string {
        return this._formData.name;
    }

    public get email(): string {
        return this._formData.email;
    }

    public get phone(): string {
        return this._formData.phone;
    }

    public get city(): string {
        return this._formData.city;
    }

    public get comment(): string {
        return this._formData.comment;
    }

    constructor() {
        makeObservable<BasketService, never>(
            this,
            {
                addedProducts: computed,
                name: computed,
                email: computed,
                phone: computed,
                city: computed,
                addProductToBasket: action,
                removeAnProductInCart: action,
                clearBasket: action,
                // @ts-ignore
                _formData: observable,
            },
        );

        this._formData = {
            phone: '',
            email: '',
            name: '',
            comment: '',
            city: '',
        }

        this._apolloService = inject<ApolloService>(this, ApolloService);
    }

    public sendOrderToTelegram(clbck: () => void, clbckError: (error: Error) => void): void {
        const SEND_ORDER = gql`
            mutation SendOrderToTelegram(
                $name: String!,
                $email: String!,
                $phone: String!,
                $city: String!,
                $comment: String!,
                $shippingProducts: String!
            ) {
                sendOrderToTelegram(
                    data: {
                        name: $name,
                        email: $email,
                        phone: $phone,
                        city: $city,
                        comment: $comment,
                        shippingProducts: $shippingProducts
                    })
            }
        `;

        const dataMutate = {
            mutation: SEND_ORDER,
            variables: this.getDataForSend(),
        };

        this._apolloService.graphqlClient
            .mutate(dataMutate)
            .then(clbck)
            .catch(clbckError);
    }

    public addProductToBasket(product: CartModelDTO): void {
        product.addAmount();

        this._addedProducts.set(product.id, product);
    }

    public isProductWasAdded(id: string): boolean {
        return this._addedProducts.has(id);
    }

    public removeAnProductInCart(id: string): void {
        const x = this._addedProducts.get(id);

        if (x) {
            x.quantity = '0';
            this._addedProducts.delete(id);
        }
    }

    public clearBasket(): void {
        this._addedProducts.forEach(
            (product) => {
                product.quantity = '0';
            },
        );

        this._addedProducts.clear();

        this._formData = {
            phone: '',
            email: '',
            name: '',
            comment: '',
            city: '',
        }
    }

    public getDataForSend(): Record<string, string> {
        return {
            ...this._formData,
            ...(!this._formData.comment.length && { comment: 'Null' }),
            shippingProducts: JSON.stringify(this.addedProducts.map((x) => x.toDto())),
        }
    }
}


export default BasketService;
