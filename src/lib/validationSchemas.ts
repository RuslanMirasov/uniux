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
    error: 'Password needs at least one uppercase letter, one lowercase letter, and a number to be strong enough',
    errorMin: 'Password must be at least 8 characters',
  },
  image: {
    code: 3 * 1024 * 1024,
    error: 'File is too large (max. 3 MB)',
    formats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    errorFormat: 'Wrong file format (JPEG, PNG, WebP)',
  },
  protoUrl: {
    code: /^(https?:\/\/)?(www\.)?figma\.com\/proto/,
    error: 'URL must be a valid Figma prototype link',
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
    then: schema =>
      schema.test('current', '"Current password" must be filled in!', value => !value || value.trim() === ''),
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
  image: Yup.mixed<File>()
    .test('file', 'You need to provide a file', value => value instanceof File)
    .test(
      'fileFormat',
      regEx.image.errorFormat,
      value => value instanceof File && regEx.image.formats.includes(value.type)
    )
    .test('fileSize', regEx.image.error, value => value instanceof File && value.size <= regEx.image.code),
  protoUrl: Yup.string()
    .required('Required field')
    .url('Invalid URL format')
    .matches(regEx.protoUrl.code, regEx.protoUrl.error),
  owner: Yup.string().required('Owner ID is empty!'),
};

const { name, email, image, subscribe, password, currentpassword, newpassword, confirmpassword, protoUrl, owner } =
  yupFields;

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

//Create new project form
export const CreateNewProjectValidationSchema = Yup.object({
  owner,
  protoUrl,
});

//profile update form
export const profileValidationSchema = Yup.object({
  name,
  email,
  subscribe,
  currentpassword,
  newpassword,
  confirmpassword,
});

//Upload avatar-photo form
export const avatarValidationSchema = Yup.object({
  image,
});
