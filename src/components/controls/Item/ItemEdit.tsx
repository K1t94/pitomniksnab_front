import * as React from 'react';
import { PropsWithChildren } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  ImageInput,
  ImageField,
  FormDataConsumer,
  required, useRefresh, useRedirect,
  SelectInput,
  NumberInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import '../image-preview.css';

const PreviewImage = ({ record }) => (
  <img className="image-preview" src={record} alt="Image Preview" />
);

const ImagePlaceholder = () => {
  return (
    <FormDataConsumer>
      {({ formData }) => {
        return <PreviewImage record={formData.imageURL} />;
      }}
    </FormDataConsumer>
  );
};

export default (props: PropsWithChildren<{}>) => {
  const refresh = useRefresh();
  const redirect = useRedirect();

  console.log('props', props);

  const onSuccess = ({ data }) => {
    redirect('/items');
    refresh();
  };

  return (
    <Edit onSuccess={onSuccess} title="Item edition" undoable={false} {...props}>
      <SimpleForm>
        <NumberInput source="order" label="Порядок" validate={[required('Заполните поле')]} />
        <FormDataConsumer>
          {({ formData }) => (
            <SelectInput source="category.id" label="Категория" choices={formData.categories} />
          )}
        </FormDataConsumer>
        <TextInput source="name" label="Название" validate={[required('Заполните поле')]} />
        <TextInput source="price" label="Цена" validate={[required('Заполните поле')]} />
        <RichTextInput source="description" label="Описание" />
        <BooleanInput source="active" label="Показывать на сайте" />
        <ImageInput
          source="file"
          label="Картинка"
          accept=".jpg, .jpeg, .png"
          maxSize={20000000}
          placeholder={<ImagePlaceholder />}
        >
          <ImageField source="src" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

