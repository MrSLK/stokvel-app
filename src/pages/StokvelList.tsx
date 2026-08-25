import { Link } from "react-router-dom";
import { Card, List, Button, Tag, Empty } from "antd";
import {
  TeamOutlined,
  ArrowRightOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import type { Stokvel } from "../types";
import { stokvelService } from "../services/stokvelService";
import { useAuth } from "../context/AuthContext";

export default function StokvelList() {
  const { user } = useAuth();
  const [stokvels, setStokvels] = useState<Stokvel[]>([]);

  useEffect(() => {
    const fetchStokvels = async () => {
      if (user) {
        const stokvels = await stokvelService.getAll();
        setStokvels(stokvels);
      }
    };
    fetchStokvels();
  }, [user]);

  if (!stokvels.length) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <Empty
          description={
            <span className="text-[#78350F] text-lg">
              You haven't joined any stokvels yet
            </span>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <div className="flex gap-4 justify-center mt-6">
            <Link to="/create">
              <Button
                type="primary"
                className="bg-[#D97706] hover:bg-[#B45309] h-10 px-6 rounded-lg"
              >
                Create a Stokvel
              </Button>
            </Link>
            <Link to="/join">
              <Button className="h-10 px-6 rounded-lg border-[#D97706] text-[#D97706]">
                Join with Code
              </Button>
            </Link>
          </div>
        </Empty>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#451A03]">My Stokvels</h1>
        <Link to="/create">
          <Button
            type="primary"
            icon={<CrownOutlined />}
            className="bg-[#D97706] hover:bg-[#B45309] rounded-lg"
          >
            Create New
          </Button>
        </Link>
      </div>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, lg: 3 }}
        dataSource={stokvels}
        renderItem={(stokvel) => (
          <List.Item>
            <Card
              className="border-[#FDE68A] hover:shadow-lg transition-shadow rounded-xl"
              title={
                <span className="text-[#451A03] font-semibold">
                  {stokvel.name}
                </span>
              }
              extra={
                <Tag
                  color={stokvel.adminId === user?._id ? "gold" : "blue"}
                  className="rounded-full"
                >
                  {stokvel.adminId === user?._id ? "Admin" : "Member"}
                </Tag>
              }
              actions={[
                <Link to={`/stokvels/${stokvel._id}`}>
                  <Button
                    type="link"
                    icon={<ArrowRightOutlined />}
                    className="text-[#D97706]"
                  >
                    View Details
                  </Button>
                </Link>,
              ]}
            >
              <p className="text-[#78350F] line-clamp-2 mb-4">
                {stokvel.description}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#92400E]">
                  <TeamOutlined /> {stokvel.membersCount ?? 0} members
                </span>
                <span className="font-bold text-[#D97706]">
                  R{stokvel.monthlyContribution}/mo
                </span>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
