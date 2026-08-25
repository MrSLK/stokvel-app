import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, Input, Button, Typography, message } from 'antd';
import { stokvelsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function JoinStokvel() {
  const { inviteCode: urlCode } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [code, setCode] = useState(urlCode || '');
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!user) {
      message.error('Please login first');
      navigate('/login');
      return;
    }
    if (!code.trim()) {
      message.error('Please enter an invite code');
      return;
    }

    setLoading(true);
    try {
      const stokvel = await stokvelsApi.join(code.toUpperCase());
      
      if (stokvel) {
        message.success(`Welcome to ${stokvel.name}!`);
        navigate(`/stokvels/${stokvel._id}`);
      } else {
        message.error('Invalid invite code');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to join');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] to-[#FEF3E2] px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-[#FDE68A] text-center">
        <Title level={3} className="!text-[#78350F]">Join a Stokvel</Title>
        <p className="text-[#92400E] mb-6">
          Enter the invite code shared by the stokvel administrator
        </p>
        
        <Input
          size="large"
          placeholder="ENTER CODE"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="mb-4 text-center tracking-widest font-mono text-lg rounded-xl border-[#F59E0B] focus:border-[#D97706] focus:shadow-[0_0_0_2px_rgba(217,119,6,0.2)]"
          maxLength={6}
        />
        
        <Button
          type="primary"
          size="large"
          block
          loading={loading}
          onClick={handleJoin}
          className="bg-[#D97706] hover:bg-[#B45309] h-12 rounded-xl text-base font-semibold"
        >
          {user ? 'Join Stokvel' : 'Login to Join'}
        </Button>

        {!user && (
          <div className="mt-4 text-sm text-[#92400E]">
            Don't have an account? <Link to="/signup" className="text-[#D97706] font-semibold">Sign up</Link>
          </div>
        )}
      </Card>
    </div>
  );
}