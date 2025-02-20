import * as Yup from 'yup';

const regEx = {
  name: {
    code: /^[\u0041-\u005A\u0061-\u007A\u00C0-\u024F\u0400-\u04FF\u3000-\u303F\u4E00-\u9FFF\uAC00-\uD7A3- ]+$/i,
    error: 'Name can only contain letters',
    errorMin: 'Name must be at least 2 characters',
  },
  email: {
    code: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    error: 'Wrong e-mail format',
  },
  password: {
    code: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    error: 'Oops! Your password needs at least one uppercase letter, one lowercase letter, and a number to be strong enough',
    errorMin: 'Password must be at least 8 characters',
  },
};

const yupFields = {
  name: Yup.string()
    .notRequired()
    .nullable()
    .test('min', regEx.name.errorMin, value => (value ? value.length >= 2 : true))
    .test('letters', regEx.name.error, value => (value ? regEx.name.code.test(value) : true)),
  email: Yup.string().required('Required field').matches(regEx.email.code, regEx.email.error),
  subscribe: Yup.boolean().optional(),
  password: Yup.string()
    .required('Required field')
    .min(8, regEx.password.errorMin)
    .test('password-strength', regEx.password.error, value => (value ? regEx.password.code.test(value) : true)),
  currentpassword: Yup.string()
    .notRequired()
    .nullable()
    .test('is-empty-or-valid', regEx.password.errorMin, value => (value ? value.length >= 8 : true))
    .test('password-strength', regEx.password.error, value => (value ? regEx.password.code.test(value) : true)),
  newpassword: Yup.string().when(['currentpassword'], {
    is: (currentpassword: string) => currentpassword.trim() === '',
    then: schema => schema.test('current', '"Current password" must be filled in!', value => !value || value.trim() === ''),
    otherwise: schema =>
      schema
        .required('Required field')
        .test('is-empty-or-valid', regEx.password.errorMin, value => (value ? value.length >= 8 : true))
        .test('password-strength', regEx.password.error, value => (value ? regEx.password.code.test(value) : true)),
  }),
  confirmpassword: Yup.string().when(['currentpassword', 'newpassword'], {
    is: (currentpassword: string, newpassword: string) => newpassword.trim() === '' || currentpassword.trim() === '',
    then: schema =>
      schema.test(
        'must-be-empty',
        '"Current password" and "New password" fields must be filled in!',
        value => !value || value.trim() === ''
      ),
    otherwise: schema => schema.oneOf([Yup.ref('newpassword')], 'Passwords must match'),
  }),
  device: Yup.string().required('Select one'),
  project: Yup.string().required('Required field').url('Invalid URL format'),
};

const { name, email, subscribe, password, currentpassword, newpassword, confirmpassword, device, project } = yupFields;

//registration form
export const registerValidationSchema = Yup.object({
  email,
  password,
  subscribe,
});

//login form
export const loginValidationSchema = Yup.object({
  email,
  password,
});

//Reset password form
export const ResetPasswordValidationSchema = Yup.object({
  email,
});

//Add new project form
export const ProjectValidationSchema = Yup.object({
  project,
});

//profile update form
export const profileValidationSchema = Yup.object({
  name,
  email,
  subscribe,
  currentpassword,
  newpassword,
  confirmpassword,
  device,
});
