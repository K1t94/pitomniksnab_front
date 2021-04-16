import React from 'react';
import {
  Datagrid, EditButton, List, TextField, ImageField, BooleanField, RichTextField, NumberField,
} from 'react-admin';

export default ({ ...props }) => (
  <List
    {...props}
    sort={{ field: 'order', order: 'ASC' }}
    pagination={false}
    component="div"
  >
    <Datagrid>
      <TextField source="id" label="ID" />
      <NumberField source="order" label="Порядок" />
      <TextField source="name" label="Название" sortable={false} />
      <NumberField source="itemsCount" label="Товаров в категории" sortable={false} />
      <BooleanField source="active" label="Показывать на сайте" />
      <EditButton label="Редактировать" />
    </Datagrid>
  </List>
);
