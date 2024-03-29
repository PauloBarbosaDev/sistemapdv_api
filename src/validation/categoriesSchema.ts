import * as yup from 'yup';

const categoriesSchema = yup.object({
  description: yup.string().required(),
});

export default categoriesSchema;
