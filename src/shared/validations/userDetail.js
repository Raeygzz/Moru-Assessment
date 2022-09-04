import * as yup from "yup";

import { RegExp } from "../../utils";

export const NameSchema = yup.object().shape({
  name: yup.string().required(),
});

const emailPattern = (value) => RegExp.EmailPattern.test(value);
export const EmailSchema = yup.object().shape({
  email: yup.string().test("Email Pattern", emailPattern),
});

const digitsOnly = (value) => RegExp.DigitsOnly.test(value);
export const PhoneSchema = yup.object().shape({
  phone: yup.string().test("Digits only", digitsOnly),
});

export const WebsiteSchema = yup.object().shape({
  website: yup.string().url().required(),
});
