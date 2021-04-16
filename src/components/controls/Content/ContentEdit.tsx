import * as React from 'react';
import { PropsWithChildren } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  useRefresh, useRedirect,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export default (props: PropsWithChildren<{}>) => {
  const refresh = useRefresh();
  const redirect = useRedirect();

  console.log('props', props);

  const onSuccess = ({ data }) => {
    redirect('/content');
    refresh();
  };

  return (
    <Edit
      onSuccess={onSuccess}
      title="Content edition"
      undoable={false}
      resource="content"
      basePath="/content"
      redirect={false}
      {...props}
    >
      <SimpleForm>
        <TextInput source="phone" label="Телефон" />
        <TextInput source="email" label="E-mail" />
        <TextInput source="mainHeader" label="Главный заголовок" />
        <RichTextInput source="mainText" label="Главный текст" />
        <TextInput source="companyInfo" label="Информация о компании" />
        <RichTextInput source="howToBuy" label="Как купить" />
      </SimpleForm>
    </Edit>
  );
};

