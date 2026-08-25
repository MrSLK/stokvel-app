import * as Yup from 'yup';

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
  paymentDeadlineDay: Yup.number()
    .min(1, 'Day must be between 1 and 31')
    .max(31, 'Day must be between 1 and 31')
    .required('Payment deadline day is required'),
});