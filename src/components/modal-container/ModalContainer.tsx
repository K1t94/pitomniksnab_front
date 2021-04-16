import React, { FunctionComponent } from "react";
import cn from 'classnames';
import CloseSvg from "../../assets/CloseSvg";


interface IModalContainerProps {
    isOpen: boolean;
    onClose: () => void;
    headerText?: string;
}


const ModalContainer: FunctionComponent<IModalContainerProps> = ({ children, isOpen, onClose, headerText = '' }): JSX.Element =>  (
    <div className={cn('Modal', isOpen ? 'modalShow' : 'modalHide')}>
        <div className="Modal__dialog">
            <div className="Modal__content">
                <div className="Modal__header">
                    <span className="Modal__title">{headerText}</span>
                    <CloseSvg width="38" height="38" onClick={onClose} />
                </div>
                <div className="Modal__body">
                    {children}
                </div>
            </div>
        </div>
    </div>
)


export default ModalContainer;
