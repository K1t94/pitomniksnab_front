import React, { FunctionComponent, useEffect, useState } from 'react';
import { withApollo } from 'react-apollo';
import { Admin as ReactAdmin, Resource } from 'react-admin';

import dataProviderFactory from '../../dataProvider';
import authProvider from '../../authProvider';
import content from '../../dataProvider/resources/content';
import Categories from '../controls/Category/Categories';
import CategoryCreate from '../controls/Category/CategoryCreate';
import CategoryEdit from '../controls/Category/CategoryEdit';
import ContentEdit from '../controls/Content/ContentEdit';
import Login from '../login/Login';
import Items from '../controls/Item/Items';
import ItemCreate from '../controls/Item/ItemCreate';
import ItemEdit from '../controls/Item/ItemEdit';
import { Route } from 'react-router-dom';
import MyLayout from './MyLayout';

const Admin: FunctionComponent<{client: any}> = ({ client }): JSX.Element => {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    let restoreFetch;

    const fetchDataProvider = async () => {
      const dataProviderInstance = await dataProviderFactory(client);

      setDataProvider(() => dataProviderInstance);
    };

    fetchDataProvider()
      .catch((error) => console.error(error));

    return restoreFetch;
  }, []);

  if (!dataProvider) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <ReactAdmin
      title="Админка"
      loginPage={Login}
      authProvider={authProvider}
      dataProvider={dataProvider}
      layout={MyLayout}
      customRoutes={[
        <Route
          key="content"
          path="/content"
          component={ContentEdit}
        />
      ]}
    >
      <Resource
        name="items"
        options={{ label: 'Товары' }}
        list={Items}
        create={ItemCreate}
        edit={ItemEdit}
      />

      <Resource
        name="categories"
        options={{ label: 'Категории' }}
        list={Categories}
        create={CategoryCreate}
        edit={CategoryEdit}
      />

      <Resource
        name="content"
        options={{ label: 'Контент' }}
      />
    </ReactAdmin>
  )
};

export default withApollo(Admin);
