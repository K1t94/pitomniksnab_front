import * as React from 'react';
import { PropsWithChildren } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  required, useRefresh, useRedirect, NumberInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import '../image-preview.css';

export default (props: PropsWithChildren<{}>) => {
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    redirect('/categories');
    refresh();
  };

  return (
    <Edit onSuccess={onSuccess} title="Item edition" undoable={false} {...props}>
      <SimpleForm>
        <NumberInput source="order" label="Порядок" validate={[required('Заполните поле')]} />
        <TextInput source="name" label="Название" validate={[required('Заполните поле')]} />
        <BooleanInput source="active" label="Показывать на сайте" defaultValue={false} />
      </SimpleForm>
    </Edit>
  );
};

