import React, {FunctionComponent, useCallback} from "react";
import {observer} from "mobx-react";
import {useInstance} from "react-ioc";

import MinusIconSvg from "../../svg/MinusIconSvg";
import PlusIconSvg from "../../svg/PlusIconSvg";
import {CartModelDTO} from "../../../models/Cart.model.dto";
import BasketService from "../../../services/BasketService";
import TrashIcon from "../../svg/TrashIcon";


type TAddedProductsProps = {
    readonly cart: CartModelDTO;
}


const AddedProducts: FunctionComponent<TAddedProductsProps> = ({ cart }) => {
    const basketService = useInstance(BasketService);

    const incrementQuantity = useCallback(
        () => cart.addAmount(),
        [cart.quantity],
    );

    const decrementQuantity = useCallback(
        () => {
            cart.reduceAmount();

            if (cart.isQuantityZero) {
                basketService.removeAnProductInCart(cart.id);
            }
        },
        [cart.quantity],
    );

    const changeHandler = useCallback(
        ({ target: { value } }) => cart.quantity = value,
        [cart.quantity],
    );

    const blurHandler = useCallback(
        () => {
            if (cart.isQuantityZero) {
                basketService.removeAnProductInCart(cart.id);
            }
        },
        [cart.quantity],
    );

    return (
        <div
            className="addedProduct__row"
        >
            <span className="addedProduct__name unselectable">
                {cart.name}
            </span>
            <div className="addedProduct__counterBlock">
                <button
                    onClick={decrementQuantity}
                >
                    <MinusIconSvg />
                </button>
                <input
                    className="addedProduct__quantity unselectable"
                    type="text"
                    value={cart.quantity}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                />
                <button
                    onClick={incrementQuantity}
                >
                    <PlusIconSvg />
                </button>
            </div>
            <TrashIcon
                onClick={() => basketService.removeAnProductInCart(cart.id)}
            />
        </div>
    );
}


export default observer(AddedProducts);
