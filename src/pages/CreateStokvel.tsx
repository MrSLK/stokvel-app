import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, Input, InputNumber, Button, Typography, message } from "antd";
import { stokvelSchema } from "../validation/stokvelSchema";
import { stokvelService } from "../services/stokvelService";

const { Title } = Typography;
const { TextArea } = Input;

interface FormValues {
  name: string;
  description: string;
  constitution: string;
  monthlyContribution: number | null;
  paymentDeadlineDay: number | null;
}

const initialValues: FormValues = {
  name: "",
  description: "",
  constitution: "",
  monthlyContribution: null,
  paymentDeadlineDay: null,
};

export default function CreateStokvel() {
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      const stokvel = await stokvelService.create({
        name: values.name,
        description: values.description,
        constitution: values.constitution,
        monthlyContribution: values.monthlyContribution!,
        paymentDeadlineDay: values.paymentDeadlineDay!,
      });

      message.success(`Stokvel "${stokvel.name}" created!`);
      navigate(`/stokvels/${stokvel._id}`);
    } catch (error: any) {
      message.error(error.message || "Failed to create stokvel");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Title level={2} className="!text-[#451A03]">
        Create a New Stokvel
      </Title>
      <p className="text-[#92400E] mb-6">
        You'll automatically become the administrator.
      </p>

      <Card className="border-[#FDE68A] rounded-xl shadow-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={stokvelSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#78350F] mb-1">
                  Stokvel Name
                </label>
                <Field
                  name="name"
                  as={Input}
                  placeholder="e.g., Ubuntu Savings Club"
                  size="large"
                  className="rounded-lg"
                  status={errors.name && touched.name ? "error" : ""}
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#78350F] mb-1">
                  Description
                </label>
                <Field
                  name="description"
                  as={TextArea}
                  rows={3}
                  placeholder="What is this stokvel about?"
                  className="rounded-lg"
                  status={
                    errors.description && touched.description ? "error" : ""
                  }
                />
                <ErrorMessage name="description">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#78350F] mb-1">
                  Constitution
                </label>
                <Field
                  name="constitution"
                  as={TextArea}
                  rows={6}
                  placeholder="Outline the rules, goals, and governance of your stokvel..."
                  className="rounded-lg"
                  status={
                    errors.constitution && touched.constitution ? "error" : ""
                  }
                />
                <div className="flex justify-between mt-1">
                  <ErrorMessage name="constitution">
                    {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
                  </ErrorMessage>
                  <span className="text-[#92400E] text-xs">
                    {values.constitution.length} chars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#78350F] mb-1">
                  Monthly Contribution (R)
                </label>
                <InputNumber
                  className="w-full rounded-lg"
                  size="large"
                  min={10}
                  prefix="R"
                  placeholder="500"
                  value={values.monthlyContribution}
                  onChange={(val) => setFieldValue("monthlyContribution", val)}
                  status={
                    errors.monthlyContribution && touched.monthlyContribution
                      ? "error"
                      : ""
                  }
                />
                <ErrorMessage name="monthlyContribution">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#78350F] mb-1">
                  Monthly Payment Deadline (Day of Month)
                </label>
                <InputNumber
                  className="w-full rounded-lg"
                  size="large"
                  min={1}
                  max={31}
                  placeholder="e.g., 31"
                  value={values.paymentDeadlineDay}
                  onChange={(val) => setFieldValue("paymentDeadlineDay", val)}
                  status={
                    errors.paymentDeadlineDay && touched.paymentDeadlineDay
                      ? "error"
                      : ""
                  }
                />
                <ErrorMessage name="paymentDeadlineDay">
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
                className="bg-[#D97706] hover:bg-[#B45309] h-12 rounded-xl text-base font-semibold"
              >
                Create Stokvel
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
