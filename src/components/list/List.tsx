import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import { Modal, useDialog } from 'react-modaly';

import Buy from '../../modals/buy/Buy';
import CartItem from './cartItem/CartItem';
import ProductDescription from '../dialogs/ProductDescription';
import ModalContainer from '../modal-container/ModalContainer';
import { CartModelDTO } from "../../models/Cart.model.dto";

const DESCRIPTION = 'description';
const BUY = 'buy';

interface IListProps {
  categories: any;
  mainHeader: string;
  howToBuy: string;
}

const List: FunctionComponent<IListProps> = ({ categories, mainHeader, howToBuy }): JSX.Element => {
  const { isOpen, open, close } = useDialog();

  const [selectedData, setSelectedData] = useState<CartModelDTO | null>(null);
  const [modalState, setModalState] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    close();
  }, []);

  const handleSuccess = useCallback(() => {
    setModalState(BUY);
    open();
  }, []);

  const handleOpen = useCallback(
      (data: CartModelDTO) => {
        setSelectedData(data);
        setModalState(DESCRIPTION);
        open();
      },
      [selectedData],
  );

  const headerText = useMemo<string>(
      () => modalState === BUY ? 'Условия покупки' : '',
      [modalState],
  );

  return (
    <div className="List">
      <div className="List__description">
        <span className="description">{mainHeader}</span>
      </div>
      {
        categories.map((category: any) => (
          <React.Fragment key={category.id}>
            <div className="List__category_title">{category.name}</div>
            <div className="List__content">
              {
                category.items.map((item: CartModelDTO) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onMore={handleOpen}
                  />
                ))
              }
            </div>
          </React.Fragment>
        ))
      }
      <Modal isOpen={isOpen} as="section">
        <ModalContainer
          isOpen={isOpen}
          onClose={handleClose}
          headerText={headerText}
        >
          {modalState === BUY && (
            <Buy text={howToBuy} />
          )}
          {modalState === DESCRIPTION && selectedData && (
            <ProductDescription
              onClose={close}
              onCancel={handleClose}
              onSuccess={handleSuccess}
              data={selectedData}
            />
          )}
        </ModalContainer>
      </Modal>
    </div>
  )
};

export default List;
