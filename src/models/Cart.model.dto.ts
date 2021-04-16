import { v4 } from 'uuid';
import { action, computed, makeObservable, observable } from "mobx";
import ValidateService from "../services/ValidateService";


export interface ICart {
    id: string;
    name: string;
    description: string;
    imageURL: string;
    price: string;
}

export interface ICartDto {
    productId: number;
    quantity: number;
}


export class CartModelDTO {
    public static fromDto(
        { id, price, imageURL, name, description }: ICart,
        validateService: ValidateService,
    ): CartModelDTO {
        const model = new CartModelDTO(validateService);

        model.productId = id;
        model.description = description;
        model.name = name;
        model.imageURL = imageURL;
        model.price = price;

        return model;
    }

    private readonly _validateService: ValidateService;
    readonly id: string;

    private _quantity: number = 0;

    productId: string = '';
    name: string = '';
    description: string = '';
    imageURL: string = '';
    price: string = '';

    public set quantity(val: string) {
        if (this._validateService.isFiguresValid(val)) {
            this._quantity = Number(val);

            return;
        }

        if (!val.length) {
            this._quantity = 0;
        }
    }

    public get quantity(): string {
        return this._quantity.toString();
    }

    public get isQuantityZero(): boolean {
        return !Number(this._quantity);
    }

    private get _numericalProductId(): number {
        return Number(this.productId);
    }

    constructor(validateService: ValidateService) {
        makeObservable<CartModelDTO, never>(
            this,
            {
                // @ts-ignore
                _quantity: observable,
                quantity: computed,
                isQuantityZero: computed,
                addAmount: action,
                reduceAmount: action,
            },
        );

        this.id = v4();
        this._validateService = validateService;
    }

    public toDto(): ICartDto {
        return {
            productId: this._numericalProductId,
            quantity: this._quantity,
        }
    }

    public addAmount(): void {
        this._quantity++;
    }

    public reduceAmount(): void {
        this._quantity--;
    }
}
