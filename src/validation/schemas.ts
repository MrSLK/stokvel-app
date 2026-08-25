import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must not exceed 12 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>_\-]/, "Password must contain at least one special character")
    .matches(/^\S*$/, "Password must not contain spaces")
    .required("Password is required"),
});

export const signupSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name too long')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  cellNumber: Yup.string().matches(/^((\+)?[1-9]{1,3})?([0-9]{10,12})$/, "Cell number is not valid").required("Phone number is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must not exceed 12 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>_\-]/, "Password must contain at least one special character")
    .matches(/^\S*$/, "Password must not contain spaces")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const stokvelSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name too long')
    .required('Stokvel name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description too long')
    .required('Description is required'),
  constitution: Yup.string()
    .min(50, 'Constitution must be at least 50 characters')
    .max(2000, 'Constitution too long')
    .required('Constitution is required'),
  monthlyContribution: Yup.number()
    .min(10, 'Minimum contribution is R10')
    .max(100000, 'Contribution too high')
    .required('Monthly contribution is required'),
});