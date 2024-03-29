import * as yup from 'yup';

const customerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  cpf: yup.string().required(),
  zipcode: yup.string(),
  street: yup.string(),
  number: yup.number(),
  district: yup.string(),
  city: yup.string(),
  state: yup.string(),
});

export default customerSchema;
