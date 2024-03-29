import * as yup from 'yup';

const orderSchema = yup.object({
  customer_id: yup.number().required(),
  observation: yup.string(),
  order_products: yup.array().required(),
});

export default orderSchema;
