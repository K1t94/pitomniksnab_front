import { withApollo } from '@apollo/react-hoc';
import React, {FunctionComponent, useMemo, useState} from 'react';
import {provider, useInstance} from "react-ioc";
import { gql, useQuery } from '@apollo/client';

import Header from '../header/Header';
import List from '../list/List';
import Footer from '../footer/Footer';
import BasketService from "../../services/BasketService";
import { CartModelDTO, ICart } from "../../models/Cart.model.dto";
import ShoppingCartIconSvg from "../svg/ShoppingCartIconSvg";
import BasketPanel from "../basket-panel/BasketPanel";
import ValidateService from "../../services/ValidateService";


const GET_DATA = gql`
    query getData {
        content {
            companyInfo
            email
            phone
            howToBuy
            mainHeader
            mainText
        }
        categories(input: {sort: {direction: DESC, field: order}, activeFilter: {value: true}}) {
            id
            name
            order
            items(input: {activeFilter: {value: true}, sort: { direction: DESC, field: order}}) {
                id
                name
                description
                imageURL
                price
            }
        }
    }
`;


const Landing: FunctionComponent = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_DATA);

    const validateService = useInstance(ValidateService);

    const [showBasketPanel, setShowBasketPanel] = useState<boolean>(false);

    const categories = useMemo<any[]>(
        () => {
            let _categories = data?.categories || [];

            if (_categories.length) {
                _categories = _categories.map(
                    (x: any) => ({
                        ...x,
                        items: x.items.map(
                            (item: ICart) => CartModelDTO.fromDto(item, validateService),
                        ),
                    }),
                );
            }

            return _categories;
        },
        [data?.categories],
    );

    if (loading) {
        return <div className="app-loading">Загрузка</div>;
    }

    if (error) {
        return <div className="app-error">Сайт на техническом обслуживании</div>;
    }

    const { content } = data;

    const toggleBasketPanel = () => setShowBasketPanel((prev) => !prev);

    return (
        <>
            <ShoppingCartIconSvg
                width={30}
                height={30}
                onClick={toggleBasketPanel}
            />
            <BasketPanel
                isShow={showBasketPanel}
                onClose={toggleBasketPanel}
            />
            <main>
                <Header
                    email={content.email}
                    phone={content.phone}
                    mainText={content.mainText}
                    howToBuy={content.howToBuy}
                />
                <List
                    mainHeader={content.mainHeader}
                    howToBuy={content.howToBuy}
                    categories={categories}
                />
            </main>
            <Footer
                email={content.email}
                phone={content.phone}
                companyInfo={content.companyInfo}
            />
        </>
    );
};


export default withApollo(
    provider(
        BasketService,
        ValidateService,
    )
    (Landing),
);
