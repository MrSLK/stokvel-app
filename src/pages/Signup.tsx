import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, Input, Button, Typography, message, Divider } from "antd";
import { UserOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { signupSchema } from "../validation/schemas";

const { Title, Text } = Typography;

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-[#FEF3E2] to-[#FDE68A] px-4 py-8">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0">
        <div className="text-center mb-8">
          <Title level={3} className="!text-[#78350F] !mb-2">
            Join StokvelApp
          </Title>
          <Text className="text-[#92400E]">
            Start building your financial community today
          </Text>
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            cellNumber: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await signup(
                values.firstName,
                values.lastName,
                values.email,
                values.cellNumber,
                values.password,
              );
              message.success("Account created successfully!");
              navigate("/stokvels");
            } catch (err: any) {
              message.error(err.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <Field
                    name="firstName"
                    as={Input}
                    prefix={<UserOutlined className="text-blue-600" />}
                    placeholder="First name"
                    size="large"
                    status={
                      errors.firstName && touched.firstName ? "error" : ""
                    }
                  />
                  <ErrorMessage name="firstName">
                    {(msg) => (
                      <div className="text-red-500 text-sm mt-1">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>

                {/* Last Name */}
                <div>
                  <Field
                    name="lastName"
                    as={Input}
                    prefix={<IdcardOutlined className="text-blue-600" />}
                    placeholder="Last name"
                    size="large"
                    status={errors.lastName && touched.lastName ? "error" : ""}
                  />
                  <ErrorMessage name="lastName">
                    {(msg) => (
                      <div className="text-red-500 text-sm mt-1">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <div>
                <Field
                  name="email"
                  as={Input}
                  prefix={<MailOutlined className="text-[#D97706]" />}
                  placeholder="Email address"
                  size="large"
                  status={errors.email && touched.email ? "error" : ""}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <Field
                  name="cellNumber"
                  as={Input}
                  prefix={<PhoneOutlined className="text-[#D97706]" />}
                  placeholder="Cell number"
                  size="large"
                  status={errors.cellNumber && touched.cellNumber ? "error" : ""}
                />
                <ErrorMessage name="cellNumber">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <Field
                  name="password"
                  as={Input.Password}
                  prefix={<LockOutlined className="text-[#D97706]" />}
                  placeholder="Create password"
                  size="large"
                  status={errors.password && touched.password ? "error" : ""}
                />
                <ErrorMessage name="password">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <Field
                  name="confirmPassword"
                  as={Input.Password}
                  prefix={<LockOutlined className="text-[#D97706]" />}
                  placeholder="Confirm password"
                  size="large"
                  status={
                    errors.confirmPassword && touched.confirmPassword
                      ? "error"
                      : ""
                  }
                />
                <ErrorMessage name="confirmPassword">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
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
                Create Account
              </Button>
            </Form>
          )}
        </Formik>

        <Divider className="!border-[#FDE68A]">
          <Text className="text-[#92400E] text-sm">
            Already have an account?
          </Text>
        </Divider>

        <Link to="/login">
          <Button
            block
            size="large"
            className="rounded-xl h-12 border-[#D97706] text-[#D97706] hover:bg-[#FFF7ED]"
          >
            Sign In Instead
          </Button>
        </Link>
      </Card>
    </div>
  );
}
