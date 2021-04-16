import * as React from 'react';
import { PropsWithChildren } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ImageField,
  ImageInput,
  required,
  NumberInput, SelectInput, FormDataConsumer,
} from 'react-admin';
import { useRefresh, useRedirect } from 'react-admin';

import RichTextInput from 'ra-input-rich-text';


import { gql, useQuery } from '@apollo/client';

const GET_CATEGORIES = gql`
    query GetItemsForLanding {
        categories {
            id
            name
        }
    }
`;

export default (props: PropsWithChildren<{}>) => {
  const refresh = useRefresh();
  const redirect = useRedirect();

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const onSuccess = ({ data }) => {
    redirect('/items');
    refresh();
  };

  if (loading) {
    return null;
  }

  console.log(loading, error, data);

  return (
    <Create onSuccess={onSuccess} {...props}>
      <SimpleForm>
        <TextInput source="name" label="Название" validate={[required('Заполните поле')]} />
        <SelectInput source="category.id" label="Категория" choices={data.categories} />
        <TextInput source="price" label="Цена" validate={[required('Заполните поле')]} />
        <NumberInput source="order" label="Порядок" validate={[required('Заполните поле')]} />
        <RichTextInput source="description" label="Описание"  defaultValue=""/>
        <BooleanInput source="active" label="Показывать на сайте" defaultValue={false} />
        <ImageInput
          source="file"
          label="Картинка"
          accept=".jpg, .jpeg, .png"
          maxSize={20000000}
          validate={[required('Картинка обязательна')]}
        >
          <ImageField source="src" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};


