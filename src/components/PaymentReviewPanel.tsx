/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Card, Button, Tag, Typography, message, Table } from "antd";
import { CheckCircleOutlined, FilePdfOutlined } from "@ant-design/icons";
import apiClient from "../lib/axios";

const { Title } = Typography;

interface Payment {
  id: string;
  month: string;
  status: "pending" | "paid" | "overdue";
  proofOfPaymentUrl: string;
  submittedAt: string;
  member: { firstName: string; lastName: string; email: string };
}

export default function PaymentReviewPanel({
  stokvelId,
}: {
  stokvelId: string;
}) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    const res = await apiClient.get(`/payments/stokvel/${stokvelId}`);
    setPayments(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, [stokvelId]);

  const handleReview = async (paymentId: string) => {
    try {
      await apiClient.post(`/payments/${paymentId}/review`);
      message.success("Payment reviewed and status updated");
      fetchPayments();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Review failed");
    }
  };

  const columns = [
    {
      title: "Member",
      dataIndex: "member",
      render: (m: any) => `${m.firstName} ${m.lastName}`,
    },
    {
      title: "Month",
      dataIndex: "month",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s: string) => (
        <Tag color={s === "pending" ? "gold" : s === "paid" ? "green" : "red"}>
          {s.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Submitted",
      dataIndex: "submittedAt",
      render: (d: string) => new Date(d).toLocaleDateString(),
    },
    {
      title: "Proof",
      render: (_: any, record: Payment) => (
        <a
          href={`${import.meta.env.VITE_API_URL}/payments/proof/${record.proofOfPaymentUrl.split("/").pop()}`}
          target="_blank"
          rel="noreferrer"
        >
          <FilePdfOutlined /> View PDF
        </a>
      ),
    },
    {
      title: "Action",
      render: (_: any, record: Payment) =>
        record.status === "pending" ? (
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleReview(record.id)}
            className="bg-[#D97706] hover:bg-[#B45309] rounded-lg"
          >
            Acknowledge
          </Button>
        ) : (
          <span className="text-[#92400E] text-sm">Reviewed</span>
        ),
    },
  ];

  return (
    <Card className="border-[#FDE68A] rounded-xl mt-6">
      <Title level={5} className="!text-[#451A03]">
        Payment Review
      </Title>
      <Table
        dataSource={payments}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
        size="small"
      />
    </Card>
  );
}
