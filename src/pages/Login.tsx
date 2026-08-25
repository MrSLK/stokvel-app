import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Input, Button, Typography, message, Divider } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { loginSchema } from '../validation/schemas';

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-[#FEF3E2] to-[#FDE68A] px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0">
        <div className="text-center mb-8">
          <Title level={3} className="!text-[#78350F] !mb-2">Welcome Back</Title>
          <Text className="text-[#92400E]">Sign in to manage your stokvels</Text>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await login(values.email, values.password);
              message.success('Welcome back!');
              navigate('/stokvels');
            } catch (err: any) {
              message.error(err.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-5">
              <div>
                <Field
                  name="email"
                  as={Input}
                  prefix={<MailOutlined className="text-[#D97706]" />}
                  placeholder="Email address"
                  size="large"
                  status={errors.email && touched.email ? 'error' : ''}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <div>
                <Field
                  name="password"
                  as={Input.Password}
                  prefix={<LockOutlined className="text-[#D97706]" />}
                  placeholder="Password"
                  size="large"
                  status={errors.password && touched.password ? 'error' : ''}
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isSubmitting}
                className="bg-[#D97706] hover:bg-[#B45309] h-12 text-base font-semibold rounded-xl"
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>

        <Divider className="!border-[#FDE68A]">
          <Text className="text-[#92400E] text-sm">New here?</Text>
        </Divider>

        <Link to="/signup">
          <Button block size="large" className="rounded-xl h-12 border-[#D97706] text-[#D97706] hover:bg-[#FFF7ED]">
            Create an Account
          </Button>
        </Link>
      </Card>
    </div>
  );
}