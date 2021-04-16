import React, { FunctionComponent, useCallback } from 'react';

import {CartModelDTO} from "../../../models/Cart.model.dto";

interface ICartItemProps {
  item: CartModelDTO;
  onMore: (data: any) => void;
}

const CartItem: FunctionComponent<ICartItemProps> = ({ onMore, item }): JSX.Element => {
    const handleOpen = useCallback(() => {
        onMore(item);
    }, []);

    return (
        <div onClick={handleOpen} className="List__cart" title={item.name}>
            <div className="List__image-cart">
                <img
                    className="image"
                    alt="ProductImage"
                    src={item.imageURL}
                    width={250}
                    height={166}
                />
            </div>
            <div className="titles">
                <div className="List__name-cart">{item.name}</div>
                <div className="List__price-cart">{item.price}</div>
            </div>
            <div className="List__button-cart">
                <button>
                    Подробнее
                </button>
            </div>
        </div>
    );
};


export default CartItem;
