import * as yup from 'yup';

const productSchema = yup.object({
  description: yup.string().required(),
  quantity_stock: yup.number().required(),
  value: yup.number().required(),
  category_id: yup.number().required(),
});

export default productSchema;
