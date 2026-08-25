import { useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Typography,
  message,
  List,
  Avatar,
  Empty,
} from "antd";
import {
  CopyOutlined,
  TeamOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import type { Member, Stokvel } from "../types";
import { stokvelService } from "../services/stokvelService";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import UploadPayment from "../components/UploadPayment";
import PaymentReviewPanel from "../components/PaymentReviewPanel";
import moment from "moment-timezone";

const { Title, Text } = Typography;

export default function StokvelDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [stokvel, setStokvel] = useState<Stokvel | null>(null);

  useEffect(() => {
    const fetchStokvel = async () => {
      if (id) {
        const found = await stokvelService.getById(id);
        if (found) setStokvel(found);
      }
    };
    fetchStokvel();
  }, [id]);

  const copyInviteCode = () => {
    if (stokvel) {
      navigator.clipboard.writeText(stokvel.inviteCode ?? "");
      message.success("Invite code copied!");
    }
  };

  const copyInviteLink = () => {
    if (stokvel) {
      const link = `${window.location.origin}/join/${stokvel.inviteCode ?? ""}`;
      navigator.clipboard.writeText(link);
      message.success("Invite link copied!");
    }
  };

  if (!stokvel) {
    return (
      <div className="p-6 text-center">
        <Empty description="Stokvel not found" />
        <Link to="/stokvels">
          <Button className="mt-4 text-[#D97706]">Back to My Stokvels</Button>
        </Link>
      </div>
    );
  }

  const isAdmin = user?._id === stokvel.adminId;

  const allMembers = [...(stokvel.members ?? [])];

  return (
    <div className="p-6 space-y-6">
      <Link to="/stokvels">
        <Button icon={<ArrowLeftOutlined />} className="text-[#92400E] mb-2">
          Back
        </Button>
      </Link>

      <Card className="border-[#FDE68A] rounded-xl">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <Title level={3} className="!text-[#451A03] !mb-2">
              {stokvel.name}
            </Title>
            <Text className="text-[#78350F]">{stokvel.description}</Text>
          </div>
          <Tag color="orange" className="text-base px-4 py-1 rounded-full">
            R{stokvel.monthlyContribution}/month
          </Tag>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title={<span className="text-[#451A03]">Details</span>}
          className="border-[#FDE68A] rounded-xl"
        >
          <Descriptions
            column={1}
            className="[&_.ant-descriptions-item-label]:text-[#92400E]"
          >
            <Descriptions.Item label="Created">
              {moment(stokvel.createdAt ?? "").format("YYYY MMM DD")}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Deadline">
              {stokvel.paymentDeadlineDay}
              {stokvel.paymentDeadlineDay === 1
                ? "st"
                : stokvel.paymentDeadlineDay === 2
                  ? "nd"
                  : stokvel.paymentDeadlineDay === 3
                    ? "rd"
                    : "th"}{" "}
              of each month
            </Descriptions.Item>
            <Descriptions.Item label="Total Members">
              {allMembers.length}
            </Descriptions.Item>
            <Descriptions.Item label="Your Role">
              {isAdmin ? (
                <Tag color="gold">Administrator</Tag>
              ) : (
                <Tag color="blue">Member</Tag>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {isAdmin && (
          <Card
            title={<span className="text-[#451A03]">Invite Members</span>}
            className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-[#F59E0B] rounded-xl"
          >
            <div className="space-y-4">
              <div>
                <Text strong className="text-[#78350F]">
                  Invite Code:
                </Text>
                <div className="flex gap-2 mt-1">
                  <Tag className="text-lg px-4 py-1 bg-white border-[#D97706] text-[#D97706] font-mono tracking-widest">
                    {stokvel.inviteCode}
                  </Tag>
                  <Button
                    icon={<CopyOutlined />}
                    onClick={copyInviteCode}
                    className="border-[#D97706] text-[#D97706]"
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <Button
                type="primary"
                block
                icon={<CopyOutlined />}
                onClick={copyInviteLink}
                className="bg-[#D97706] hover:bg-[#B45309] rounded-lg"
              >
                Copy Full Invite Link
              </Button>
            </div>
          </Card>
        )}
      </div>

      <UploadPayment
        stokvelId={stokvel._id ?? ""}
        deadlineDay={stokvel.paymentDeadlineDay}
      />

      {isAdmin && <PaymentReviewPanel stokvelId={stokvel._id ?? ""} />}

      <Card
        title={
          <span className="text-[#451A03]">
            <TeamOutlined className="mr-2" />
            Members
          </span>
        }
        className="border-[#FDE68A] rounded-xl"
      >
        <List
          itemLayout="horizontal"
          dataSource={allMembers}
          renderItem={(member: Member) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<UserOutlined />}
                    className={member.isAdmin ? "bg-[#D97706]" : "bg-[#92400E]"}
                  />
                }
                title={
                  <span className="text-[#451A03]">
                    {member.firstName} {member.lastName}
                    {member.isAdmin && (
                      <Tag color="gold" className="ml-2">
                        Admin
                      </Tag>
                    )}
                  </span>
                }
                description={
                  <span className="text-[#92400E]">
                    Joined{" "}
                    {moment(member.joinedAt ?? "").format("YYYY MMM DD HH:mm")}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Card
        title={<span className="text-[#451A03]">Constitution</span>}
        className="border-[#FDE68A] rounded-xl"
      >
        <div className="whitespace-pre-wrap bg-[#FFF8F0] p-6 rounded-xl text-[#78350F] leading-relaxed">
          {stokvel.constitution}
        </div>
      </Card>
    </div>
  );
}
