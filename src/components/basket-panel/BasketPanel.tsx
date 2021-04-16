import React, {FunctionComponent, useCallback, useState} from "react";
import cn from "classnames";
import {observer} from "mobx-react";
import {useInstance} from "react-ioc";
import CSSTransition, {CSSTransitionProps} from "react-transition-group/CSSTransition";
import {Modal, useDialog} from "react-modaly";

import IconCrossSvg from "../svg/IconCrossSvg";
import BasketService from "../../services/BasketService";
import AddedProducts from "./added-products/AddedProducts";
import SubmissionForm from "./submission-form/SubmissionForm";
import ModalContainer from "../modal-container/ModalContainer";


type TBasketPanel = {
    readonly isShow: boolean;
    onClose(): void;
}

const PAGE_TRANSITION_SETTINGS: CSSTransitionProps = {
    timeout: 350,
    unmountOnExit: true,
};

enum BasketPanelStateEnum {
    FORM,
    PRODUCTS,
}


const BasketPanel: FunctionComponent<TBasketPanel> = ({ isShow, onClose }) => {
    const { isOpen, open, close } = useDialog();
    const [statePanel, setStatePanel] = useState<BasketPanelStateEnum>(() => BasketPanelStateEnum.PRODUCTS);
    const [errorSend, setErrorSend] = useState<boolean>(false);
    const basketService = useInstance(BasketService);

    const { addedProducts } = basketService;

    const togglePanelState = useCallback(
        () => setStatePanel(
            statePanel === BasketPanelStateEnum.PRODUCTS
                ? BasketPanelStateEnum.FORM
                : BasketPanelStateEnum.PRODUCTS,
        ),
        [statePanel],
    );

    const sendForm = (): void => {
        basketService.sendOrderToTelegram(
            () => {
                open();

                basketService.clearBasket();
            },
            (error: Error) => {
                setErrorSend(true);

                setTimeout(
                    () => setErrorSend(false),
                    5000,
                );

                console.error(error);
            },
        );
    }

    return (
        <div
            className={cn(
                'basketPanel basketPanelWrapper',
                isShow && 'show-always',
            )}
        >
            <div className="basketPanel__header">
                <strong>Ваш заказ</strong>
                <IconCrossSvg
                    onClick={onClose}
                    width={20}
                    height={20}
                />
            </div>
            {!addedProducts.length && (
                <div className="basketPanel__body unselectable noneAddedProducts">
                    <strong>Нет добавленных товаров</strong>
                </div>
            )}
            {addedProducts.length > 0 && (
                <>
                    <div className="basketPanel__navigation">
                        <button
                            onClick={togglePanelState}
                        >
                            {statePanel === BasketPanelStateEnum.PRODUCTS && 'Оформить'}
                            {statePanel === BasketPanelStateEnum.FORM && 'Корзина'}
                        </button>
                    </div>
                    <div className="basketPanel__body">
                        <CSSTransition
                            in={statePanel === BasketPanelStateEnum.PRODUCTS}
                            {...PAGE_TRANSITION_SETTINGS}
                        >
                            <div className="basketPanel__page">
                                {addedProducts.map((cart) => (
                                    <AddedProducts
                                        key={cart.id}
                                        cart={cart}
                                    />
                                ))}
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={statePanel === BasketPanelStateEnum.FORM}
                            {...PAGE_TRANSITION_SETTINGS}
                        >
                            <div className="basketPanel__page">
                                <SubmissionForm
                                    sendOrderToTelegram={sendForm}
                                    errorState={errorSend}
                                />
                            </div>
                        </CSSTransition>
                    </div>
                </>
            )}
            <Modal
                isOpen={isOpen}
                as="section"
            >
                <ModalContainer
                    isOpen={isOpen}
                    onClose={close}
                    headerText="Успешно"
                >
                    <strong
                        style={{ color: '#3BAD00' }}
                    >
                        Заказ отправлен
                    </strong>
                </ModalContainer>
            </Modal>
        </div>
    );
}


export default observer(BasketPanel);
