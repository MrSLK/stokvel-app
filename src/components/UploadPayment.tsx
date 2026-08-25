import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Button, Typography, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import apiClient from "../lib/axios";

const { Title } = Typography;

const uploadSchema = Yup.object({
  month: Yup.string().required("Select a month"),
});

function getMonthOptions(deadlineDay: number) {
  const options = [];
  const currentYear = new Date().getFullYear();

  for (let month = 0; month < 12; month++) {
    const d = new Date(currentYear, month, 1);
    const monthName = d.toLocaleString("default", { month: "long" });
    const label = `${monthName} ${currentYear} (${deadlineDay} ${monthName})`;
    const value = `${currentYear}-${String(month + 1).padStart(2, "0")}`;
    options.push({ label, value });
  }

  return options;
}

export default function UploadPayment({
  deadlineDay,
  stokvelId 
}: {
  deadlineDay: number;
  stokvelId: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  const monthOptions = getMonthOptions(deadlineDay);

  const handleSubmit = async (
    values: { month: string },
    { setSubmitting }: any,
  ) => {
    if (!file) {
      message.error("Please upload a PDF proof of payment");
      return;
    }

    const formData = new FormData();
    formData.append("proof", file);
    formData.append("stokvelId", stokvelId!);
    formData.append("month", values.month);

    try {
      await apiClient.post("/payments/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Proof of payment submitted! Awaiting admin review.");
      setFile(null);
    } catch (err: any) {
      message.error(err.response?.data?.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-[#FDE68A] rounded-xl mt-6">
      <Title level={5} className="!text-[#451A03]">
        Submit Payment Proof
      </Title>
      <p className="text-[#92400E] text-sm mb-4">
        Upload your proof of payment (PDF only). Admin will review and mark it.
      </p>

      <Formik
        initialValues={{ month: "" }}
        validationSchema={uploadSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#78350F] mb-1">
                Payment For
              </label>
              <Select
                className="w-full"
                size="large"
                placeholder="Select month..."
                options={monthOptions}
                value={values.month || undefined}
                onChange={(val) => setFieldValue("month", val)}
              />
              <ErrorMessage name="month">
                {(msg) => (
                  <div className="text-red-500 text-sm mt-1">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#78350F] mb-1">
                Proof of Payment (PDF)
              </label>
              <Upload
                beforeUpload={(f) => {
                  if (f.type !== "application/pdf") {
                    message.error("Only PDF files allowed");
                    return Upload.LIST_IGNORE;
                  }
                  setFile(f);
                  return false;
                }}
                maxCount={1}
                accept=".pdf"
              >
                <Button
                  icon={<UploadOutlined />}
                  className="border-[#D97706] text-[#D97706]"
                >
                  {file ? file.name : "Select PDF"}
                </Button>
              </Upload>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="bg-[#D97706] hover:bg-[#B45309] rounded-xl"
            >
              Submit for Review
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
