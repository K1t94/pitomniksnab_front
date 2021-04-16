import React, {FunctionComponent, useCallback, useMemo} from 'react';
import {useInstance} from "react-ioc";
import { observer } from 'mobx-react';

import BasketService from "../../services/BasketService";
import {CartModelDTO} from "../../models/Cart.model.dto";
import cn from "classnames";

interface IProductDescriptionProps {
  onSuccess: () => void;
  onCancel: () => void;
  onClose: () => void;
  data: CartModelDTO;
}

const ProductDescription: FunctionComponent<IProductDescriptionProps> = ({ onSuccess, data }): JSX.Element => {
  const basketService = useInstance(BasketService);

  const success = useCallback(() => {
    onSuccess();
  }, []);

  const isAdded = useMemo<boolean>(
      () => basketService.isProductWasAdded(data.id),
      [basketService.isProductWasAdded(data.id)],
  );

  return (
    <div className="ProductDescription">
      <div className="ProductDescription__wrapper">
        <div className="ProductDescription__content">
          <img
            width={400}
            height={280}
            src={data.imageURL}
            alt="ProductDescription"
          />
        </div>
        <div className="ProductDescription__content">
          <span className="productName">{data.name}</span>
          <span className="productPrice">{data.price}</span>
          <div className="productMain__desc" dangerouslySetInnerHTML={{ __html: data.description }}>
          </div>
          <div className="ProductDescription__button">
            <button
                className={cn(isAdded && 'added')}
                disabled={isAdded}
                onClick={() => basketService.addProductToBasket(data)}
            >
              {isAdded ? 'Товар добавлен' : 'В корзину'}
            </button>
            <span
                className="how_to_buy"
                onClick={success}
            >
              Как купить?
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};


export default observer(ProductDescription);
