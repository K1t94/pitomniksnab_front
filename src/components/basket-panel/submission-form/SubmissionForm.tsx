import React, {FunctionComponent, FormEvent, ChangeEvent} from "react";
import {useInstances} from "react-ioc";
import {observer} from "mobx-react";
import cn from "classnames";

import BasketService, {TFieldForm} from "../../../services/BasketService";
import ValidateService from "../../../services/ValidateService";


type TSubmissionForm = {
    sendOrderToTelegram(): void;
    errorState: boolean;
}


const SubmissionForm: FunctionComponent<TSubmissionForm> = ({ sendOrderToTelegram, errorState }) => {
    const [basketService, validateService] = useInstances(BasketService, ValidateService);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendOrderToTelegram();
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.persist();

        const { name, value } = e.target as { value: string; name: TFieldForm };

        basketService.formData = { value, name };
    }

    return (
        <div className="SubmissionForm">
            <form onSubmit={onSubmit}>
                <label htmlFor="FIO">ФИО</label>
                <input
                    className={cn(
                        basketService.name.length && 'successBorder'
                    )}
                    id="FIO"
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    value={basketService.name}
                />
                <label htmlFor="PHONE">Телефон</label>
                <input
                    className={cn(
                        basketService.phone.length
                        && (!validateService.isPhoneValid(basketService.phone) ? 'errorBorder' : 'successBorder')
                    )}
                    id="PHONE"
                    type="text"
                    name="phone"
                    onChange={changeHandler}
                    value={basketService.phone}
                />
                <label htmlFor="EMAIL">E-mail</label>
                <input
                    className={cn(
                        basketService.email.length
                        && (!validateService.isEmailValid(basketService.email) ? 'errorBorder' : 'successBorder')
                    )}
                    id="EMAIL"
                    type="text"
                    name="email"
                    onChange={changeHandler}
                    value={basketService.email}
                />
                <label htmlFor="CITY">Город</label>
                <input
                    className={cn(
                        basketService.city.length && 'successBorder'
                    )}
                    id="CITY"
                    type="text"
                    name="city"
                    onChange={changeHandler}
                    value={basketService.city}
                />
                <label htmlFor="COMMENT">Комментарий (необязательно)</label>
                <textarea
                    name="comment"
                    id="COMMENT"
                    cols={20}
                    rows={10}
                    onChange={changeHandler}
                    value={basketService.comment}
                />
                <button
                    type="submit"
                    disabled={
                        !validateService.isEmailValid(basketService.email)
                        || !basketService.name.length
                        || !basketService.city.length
                        || !validateService.isPhoneValid(basketService.phone)
                    }
                >
                    Отправить
                </button>
                {errorState && (
                    <span
                        className="errorMessage"
                    >
                        Произошла ошибка при отправке заказа
                    </span>
                )}
            </form>
        </div>
    );
}


export default observer(SubmissionForm);
