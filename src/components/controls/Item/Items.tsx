import React from 'react';
import {
  Datagrid, EditButton, List, TextField, ImageField, BooleanField, RichTextField, NumberField,
} from 'react-admin';

export default ({ ...props }) => (
  <List
    {...props}
    sort={{ field: 'order', order: 'DESC' }}
    pagination={false}
    component="div"
  >
    <Datagrid>
      <TextField source="id" label="ID" />
      <NumberField source="order" label="Порядок" />
      <TextField source="price" label="Цена" sortable={false} />
      <TextField source="name" label="Название" sortable={false} />
      <RichTextField source="description" label="Описание" sortable={false} />
      <ImageField source="imageURL" label="Картинка" sortable={false} />
      <BooleanField source="active" label="Показывать на сайте" />
      <TextField source="category.name" sortable={false} label="Категория" />
      <EditButton label="Редактировать" />
    </Datagrid>
  </List>
);
