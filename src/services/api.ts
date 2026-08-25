import apiClient from '../lib/axios';
import type { Stokvel, User, TrustScore } from '../types';

// ─── Helpers ─────────────────────────────────────────────

const mapUser = (backendUser: any): User => {
  // Backend returns MongoDB _id and possibly a single `name` field
  const rawName = backendUser.name || '';
  const nameParts = rawName.split(' ');
  return {
    _id: backendUser._id || backendUser.id,
    firstName: backendUser.firstName || nameParts[0] || '',
    lastName: backendUser.lastName || nameParts.slice(1).join(' ') || '',
    email: backendUser.email,
    createdAt: backendUser.createdAt,
  };
};

// ─── Auth ────────────────────────────────────────────────

export const authApi = {
  register: async (data: { firstName: string; lastName: string; email: string; cellNumber: string; password: string }) => {
    const res = await apiClient.post('/auth/register', data);
    return {
      user: mapUser(res.data.user),
      token: res.data.token,
    };
  },

  login: async (data: { email: string; password: string }) => {
    const res = await apiClient.post('/auth/login', data);
    return {
      user: mapUser(res.data.user),
      token: res.data.token,
    };
  },
};

// ─── Users ───────────────────────────────────────────────

export const usersApi = {
  getMe: async (): Promise<User> => {
    const res = await apiClient.get('/users/me');
    return mapUser(res.data);
  },
};

// ─── Stokvels ────────────────────────────────────────────

export const stokvelsApi = {
  getAll: async (): Promise<Stokvel[]> => {
    const res = await apiClient.get('/stokvels');
    return res.data;
  },

  getById: async (id: string): Promise<Stokvel> => {
    const res = await apiClient.get(`/stokvels/${id}`);
    return res.data;
  },

  create: async (data: Omit<Stokvel, 'id' | 'adminId' | 'members' | 'inviteCode' | 'createdAt'>): Promise<Stokvel> => {
    const res = await apiClient.post('/stokvels', data);
    return res.data;
  },

  join: async (inviteCode: string): Promise<Stokvel> => {
    const res = await apiClient.post('/stokvels/join', { inviteCode });
    return res.data;
  },
};

// ─── Members ─────────────────────────────────────────────

export const membersApi = {
  getByStokvel: async (stokvelId: string) => {
    const res = await apiClient.get(`/members/stokvel/${stokvelId}`);
    return res.data;
  },
};

// ─── Trust Scores ────────────────────────────────────────

export const trustScoresApi = {
  getMine: async (): Promise<TrustScore> => {
    const res = await apiClient.get('/trust-scores/me');
    return res.data;
  },
};

// ─── Payments ────────────────────────────────────────────

export const paymentsApi = {
  uploadProof: (formData: FormData) => apiClient.post('/payments/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getForStokvel: (stokvelId: string) => apiClient.get(`/payments/stokvel/${stokvelId}`),
  getMyPayments: () => apiClient.get('/payments/my-payments'),
  review: (paymentId: string) => apiClient.post(`/payments/${paymentId}/review`),
};