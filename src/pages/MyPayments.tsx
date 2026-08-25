/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Table,
  Tag,
  Typography,
  Button,
  Empty,
  Spin,
  Statistic,
  Row,
  Col,
  Tooltip,
  message,
} from "antd";
import {
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FilePdfOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import apiClient from "../lib/axios";
import moment from "moment-timezone";

const { Title, Text } = Typography;

interface Payment {
  id: string;
  month: string;
  status: "pending" | "paid" | "overdue";
  stokvelName: string;
  stokvelId?: string;
  deadlineDay: number;
  proofOfPaymentUrl?: string;
  submittedAt: string;
  reviewedAt?: string;
}

function formatMonthLabel(monthStr: string): string {
  const [year, month] = monthStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

function getDeadlineLabel(monthStr: string, day: number): string {
  const [year, month] = monthStr.split("-");
  return moment(`${year}-${month}-${day}`, "YYYY-MM-DD").format("D MMMM YYYY");
}

export default function MyPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await apiClient.get("/payments/my-payments");
        setPayments(res.data);
      } catch (err: any) {
        message.error(err.response?.data?.message || "Failed to load payments");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const stats = {
    total: payments.length,
    paid: payments.filter((p) => p.status === "paid").length,
    overdue: payments.filter((p) => p.status === "overdue").length,
    pending: payments.filter((p) => p.status === "pending").length,
  };

  const columns = [
    {
      title: "Stokvel",
      dataIndex: "stokvelName",
      render: (name: string, record: Payment) => (
        <Link
          to={`/stokvels/${record.stokvelId ?? ""}`}
          className="text-[#D97706] font-medium hover:underline"
        >
          {name}
        </Link>
      ),
    },
    {
      title: "Month",
      dataIndex: "month",
      render: (month: string) => (
        <span className="text-[#451A03] font-medium">
          {formatMonthLabel(month)}
        </span>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "deadlineDay",
      render: (_: number, record: Payment) => (
        <span className="text-[#78350F]">
          {getDeadlineLabel(record.month, record.deadlineDay)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const config: Record<string, { color: string; icon: React.ReactNode }> =
          {
            pending: {
              color: "gold",
              icon: <ClockCircleOutlined />,
            },
            paid: {
              color: "success",
              icon: <CheckCircleOutlined />,
            },
            overdue: {
              color: "error",
              icon: <ExclamationCircleOutlined />,
            },
          };
        const c = config[status];
        return (
          <Tag
            icon={c.icon}
            color={c.color}
            className="uppercase text-xs font-semibold px-3 py-0.5"
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Submitted",
      dataIndex: "submittedAt",
      render: (d: string) => (
        <Text className="text-[#92400E]">
          {moment(d).format("D MMM YYYY")}
        </Text>
      ),
    },
    {
      title: "Reviewed",
      dataIndex: "reviewedAt",
      render: (d: string | undefined) =>
        d ? (
          <Text className="text-[#92400E]">
            {moment(d).format("D MMM YYYY")}
          </Text>
        ) : (
          <Text className="text-gray-400 italic">Awaiting review</Text>
        ),
    },
    {
      title: "Proof",
      render: (_: any, record: Payment) =>
        record.proofOfPaymentUrl ? (
          <Tooltip title="View PDF">
            <Button
              type="text"
              icon={<FilePdfOutlined className="text-red-500" />}
              onClick={() => {
                const filename = record?.proofOfPaymentUrl?.split("/").pop() ?? "";
                window.open(
                  `${import.meta.env.VITE_API_URL}/payments/proof/${filename}`,
                  "_blank"
                );
              }}
            >
              <EyeOutlined className="text-[#78350F]" />
            </Button>
          </Tooltip>
        ) : (
          <Text className="text-gray-400">—</Text>
        ),
    },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <DollarOutlined className="text-2xl text-[#D97706]" />
        <Title level={3} className="!text-[#451A03] !mb-0">
          My Payments
        </Title>
      </div>

      <Text className="text-[#92400E] block mb-4">
        Track all your contribution proofs and their review status across every
        stokvel you belong to.
      </Text>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={12} md={6}>
          <Card className="border-[#FDE68A] rounded-xl text-center">
            <Statistic
              title={<span className="text-[#92400E]">Total</span>}
              value={stats.total}
              valueStyle={{ color: "#451A03", fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="border-green-200 rounded-xl text-center">
            <Statistic
              title={<span className="text-green-700">Paid</span>}
              value={stats.paid}
              valueStyle={{ color: "#059669", fontWeight: 700 }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="border-red-200 rounded-xl text-center">
            <Statistic
              title={<span className="text-red-700">Overdue</span>}
              value={stats.overdue}
              valueStyle={{ color: "#DC2626", fontWeight: 700 }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="border-yellow-200 rounded-xl text-center">
            <Statistic
              title={<span className="text-yellow-700">Pending</span>}
              value={stats.pending}
              valueStyle={{ color: "#D97706", fontWeight: 700 }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Payments Table */}
      <Card className="border-[#FDE68A] rounded-xl shadow-sm">
        {payments.length === 0 ? (
          <Empty
            description={
              <span className="text-[#78350F]">
                No payments submitted yet
              </span>
            }
          >
            <Link to="/stokvels">
              <Button
                type="primary"
                className="bg-[#D97706] hover:bg-[#B45309] rounded-lg mt-2"
              >
                Go to My Stokvels
              </Button>
            </Link>
          </Empty>
        ) : (
          <Table
            dataSource={payments}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="[&_.ant-table-thead_.ant-table-cell]:text-[#78350F] [&_.ant-table-thead_.ant-table-cell]:font-semibold"
          />
        )}
      </Card>
    </div>
  );
}