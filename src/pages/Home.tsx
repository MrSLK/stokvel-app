import { Link } from 'react-router-dom';
import { Button, Typography, Row, Col, Card, Badge, Statistic } from 'antd';
import { 
  PlusOutlined, 
  UserAddOutlined, 
  SafetyOutlined, 
  StarOutlined,
  ArrowRightOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-[#FFF8F0]">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDE68A] rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FDBA74] rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge 
              count="Coming Soon" 
              style={{ backgroundColor: '#F59E0B', color: '#fff' }}
              className="mb-6"
            >
              <div className="px-4 py-1 bg-[#FEF3C7] text-[#92400E] rounded-full text-sm font-medium inline-flex items-center gap-2">
                <TrophyOutlined /> Trust Score System
              </div>
            </Badge>
            
            <Title level={1} className="!text-[#451A03] !text-5xl lg:!text-6xl !font-bold !leading-tight !mb-6">
              Build Trust. <br />
              <span className="text-[#D97706]">Grow Together.</span>
            </Title>
            
            <Paragraph className="text-lg text-[#78350F] max-w-2xl mx-auto leading-relaxed mb-8">
              The modern way to manage stokvels. Create savings groups, invite your community, 
              and build a <strong>Trust Score</strong> that proves your reliability across every 
              stokvel you join.
            </Paragraph>

            <div className="flex gap-4 justify-center">
              {user ? (
                <Link to="/create">
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<PlusOutlined />}
                    className="bg-[#D97706] hover:bg-[#B45309] h-14 px-8 text-lg rounded-xl shadow-lg shadow-orange-200"
                  >
                    Create a Stokvel
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button 
                      type="primary" 
                      size="large"
                      className="bg-[#D97706] hover:bg-[#B45309] h-14 px-8 text-lg rounded-xl shadow-lg shadow-orange-200"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button 
                      size="large"
                      className="h-14 px-8 text-lg rounded-xl border-[#D97706] text-[#D97706] hover:bg-[#FFF7ED]"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Score Teaser */}
      <section className="py-16 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A]">
        <div className="max-w-6xl mx-auto px-6">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D97706] to-[#F59E0B] rounded-2xl flex items-center justify-center">
                    <StarOutlined className="text-3xl text-white" />
                  </div>
                  <div>
                    <Title level={4} className="!mb-0 !text-[#451A03]">Your Trust Score</Title>
                    <Text className="text-[#92400E]">Building reputation, one contribution at a time</Text>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#FFF8F0] rounded-lg">
                    <span className="text-[#78350F] font-medium">Payment Consistency</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <StarOutlined key={i} className="text-[#F59E0B]" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#FFF8F0] rounded-lg">
                    <span className="text-[#78350F] font-medium">Stokvel Participation</span>
                    <div className="flex gap-1">
                      {[1,2,3,4].map(i => (
                        <StarOutlined key={i} className="text-[#F59E0B]" />
                      ))}
                      <StarOutlined className="text-gray-300" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#FFF8F0] rounded-lg">
                    <span className="text-[#78350F] font-medium">Community Rating</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <StarOutlined key={i} className="text-[#F59E0B]" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#FDE68A]">
                  <div className="flex justify-between items-end">
                    <div>
                      <Text className="text-[#92400E] block">Overall Score</Text>
                      <Title level={2} className="!text-[#D97706] !mb-0">94/100</Title>
                    </div>
                    <div className="text-right">
                      <Badge color="green" text="Excellent" />
                      <Text className="text-[#92400E] text-sm block mt-1">Top 5% of users</Text>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <Title level={2} className="!text-[#451A03] !mb-6">
                Why Your Trust Score Matters
              </Title>
              <Paragraph className="text-[#78350F] text-lg leading-relaxed mb-6">
                In the world of community savings, trust is everything. Our upcoming 
                <strong> Trust Score</strong> system tracks your contribution history 
                across all stokvels and gives you a reputation you can carry with you.
              </Paragraph>
              
              <div className="space-y-4">
                {[
                  { icon: <CheckCircleOutlined />, text: 'Prove reliability to new stokvel admins' },
                  { icon: <BarChartOutlined />, text: 'Track your financial discipline over time' },
                  { icon: <TrophyOutlined />, text: 'Unlock premium stokvel opportunities' },
                  { icon: <StarOutlined />, text: 'Build a reputation that follows you everywhere' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#78350F]">
                    <span className="text-[#D97706] text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Title level={2} className="!text-[#451A03]">How It Works</Title>
            <Paragraph className="text-[#78350F] text-lg">Three simple steps to financial community</Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {[
              { 
                icon: <PlusOutlined />, 
                title: 'Create', 
                desc: 'Set up your stokvel with a name, constitution, and monthly contribution amount.',
                color: 'from-[#D97706] to-[#F59E0B]'
              },
              { 
                icon: <UserAddOutlined />, 
                title: 'Invite', 
                desc: 'Share your unique invite code with friends and family to join your savings group.',
                color: 'from-[#059669] to-[#34D399]'
              },
              { 
                icon: <SafetyOutlined />, 
                title: 'Manage', 
                desc: 'Track members, contributions, and watch your Trust Score grow with every payment.',
                color: 'from-[#7C3AED] to-[#A78BFA]'
              },
            ].map((feature, i) => (
              <Col xs={24} md={8} key={i}>
                <Card className="h-full text-center hover:shadow-xl transition-shadow duration-300 border-[#FDE68A] bg-white/80 backdrop-blur">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {feature.icon}
                  </div>
                  <Title level={4} className="!text-[#451A03]">{feature.title}</Title>
                  <Paragraph className="text-[#78350F]">{feature.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#451A03]">
        <div className="max-w-6xl mx-auto px-6">
          <Row gutter={[48, 24]} className="text-center">
            <Col xs={12} md={6}>
              <Statistic 
                value={1200} 
                suffix="+" 
                className="[&_.ant-statistic-content-value]:text-[#FDE68A] [&_.ant-statistic-content-suffix]:text-[#FDE68A]"
              />
              <Text className="text-[#FDBA74]">Active Stokvels</Text>
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                value={8500} 
                suffix="+" 
                className="[&_.ant-statistic-content-value]:text-[#FDE68A] [&_.ant-statistic-content-suffix]:text-[#FDE68A]"
              />
              <Text className="text-[#FDBA74]">Members</Text>
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                value={2.4} 
                suffix="M" 
                prefix="R" 
                className="[&_.ant-statistic-content-value]:text-[#FDE68A] [&_.ant-statistic-content-prefix]:text-[#FDE68A] [&_.ant-statistic-content-suffix]:text-[#FDE68A]"
              />
              <Text className="text-[#FDBA74]">Contributions Tracked</Text>
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                value={99.2} 
                suffix="%" 
                className="[&_.ant-statistic-content-value]:text-[#FDE68A] [&_.ant-statistic-content-suffix]:text-[#FDE68A]"
              />
              <Text className="text-[#FDBA74]">Trust Score Accuracy</Text>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] border-0 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]" />
            <div className="relative py-8">
              <Title level={2} className="!text-white !mb-4">
                Ready to Start Your Financial Journey?
              </Title>
              <Paragraph className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of South Africans building wealth together through 
                trusted community savings.
              </Paragraph>
              <Link to={user ? "/create" : "/signup"}>
                <Button 
                  size="large"
                  className="bg-white text-[#D97706] hover:bg-[#FFF8F0] h-14 px-10 text-lg font-semibold rounded-xl border-0"
                >
                  {user ? 'Create Your Stokvel' : 'Get Started Free'} <ArrowRightOutlined />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#FDE68A]">
        <Text className="text-[#92400E]">© 2026 StokvelApp. Building financial trust, together.</Text>
      </footer>
    </div>
  );
}