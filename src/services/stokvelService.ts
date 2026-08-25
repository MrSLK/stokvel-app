import { stokvelsApi } from './api';
import type { Stokvel } from '../types';

export const stokvelService = {
  getAll(): Promise<Stokvel[]> {
    return stokvelsApi.getAll();
  },

  getById(id: string): Promise<Stokvel> {
    return stokvelsApi.getById(id);
  },

  getMyStokvels(): Promise<Stokvel[]> {
    return stokvelsApi.getAll(); // backend filters by JWT token
  },

  create(stokvelData: Omit<Stokvel, 'id' | 'adminId' | 'members' | 'inviteCode' | 'createdAt'>): Promise<Stokvel> {
    return stokvelsApi.create(stokvelData);
  },

  join(inviteCode: string): Promise<Stokvel> {
    // Backend gets user from JWT — no need to pass member object
    return stokvelsApi.join(inviteCode);
  },
};