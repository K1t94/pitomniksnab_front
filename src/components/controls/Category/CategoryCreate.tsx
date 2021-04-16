import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Create, SimpleForm, TextInput, BooleanInput, NumberInput, required } from 'react-admin';
import { useRefresh, useRedirect } from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

export default (props: PropsWithChildren<{}>) => {
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    redirect('/categories');
    refresh();
  };

  return (
    <Create onSuccess={onSuccess} {...props}>
      <SimpleForm>
        <NumberInput source="order" label="Порядок" validate={[required('Заполните поле')]} />
        <TextInput source="name" label="Название" validate={[required('Заполните поле')]} />
        <BooleanInput source="active" label="Показывать на сайте" defaultValue={false} />
      </SimpleForm>
    </Create>
  );
};


