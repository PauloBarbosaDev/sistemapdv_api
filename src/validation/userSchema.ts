import * as yup from "yup";

const userSchema = yup.object({
  name: yup.string().max(75).required(),
  email: yup.string().email().max(75).required(),
  password: yup.string().min(8).max(16).required(),
});

export default userSchema;
