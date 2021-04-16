import React, { FunctionComponent, useCallback } from 'react';
import { Modal, useDialog } from 'react-modaly';

import Logo from '../Logo/Logo';
import ModalContainer from '../modal-container/ModalContainer';
import Buy from '../../modals/buy/Buy';

interface IHeaderProps {
  phone: string;
  email: string;
  mainText: string;
  howToBuy: string;
}

const Header: FunctionComponent<IHeaderProps> = ({ phone, email, mainText, howToBuy }): JSX.Element => {
  const { isOpen, open, close } = useDialog();

  const handleClose = useCallback(() => {
    close();
  }, []);

  const handleOpen = useCallback(() => {
    open();
  }, []);

  return (
    <div className="Header">
      <div className="Header__mainInfo">
        <div className="Header__content">
          <Logo />
        </div>
        <div className="Header__content">
          <div className="Header__buy">
            <div className="Header__buy-block">
              <div className="Header__desc">
                <span className="question" onClick={handleOpen}>Как купить?</span>
              </div>
              <div className="Header__phone">
                <a href={`tel:${phone}`} className="phone">{phone}</a>
              </div>
            </div>
          </div>
          <div className="Header__email">
            <div className="Header__buy">
              <a href={`mailto:${email}`} className="email">{email}</a>
            </div>
          </div>
        </div>
      </div>
      <div className="Header__service">
        <span className="desc-service" dangerouslySetInnerHTML={{ __html: mainText }} />
      </div>
      <Modal isOpen={isOpen} as="section">
        <ModalContainer isOpen={isOpen} onClose={handleClose} headerText="Условия покупки">
          <Buy text={howToBuy} />
        </ModalContainer>
      </Modal>
    </div>
  )
};

export default Header;
