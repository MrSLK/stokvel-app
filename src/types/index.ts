export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cellNumber: string;
  createdAt?: string;
}

export interface Stokvel {
  _id?: string;
  name: string;
  description: string;
  constitution: string;
  monthlyContribution: number;
  paymentDeadlineDay: number;
  adminId?: string;
  members?: Member[];
  membersCount?: number;
  inviteCode?: string;
  createdAt?: string;
}

export interface Member {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  joinedAt: string;
  isAdmin?: boolean;
}

export interface TrustScore {
  _id?: string;
  overallScore: number;
  paymentConsistency: number;
  stokvelParticipation: number;
  communityRating: number;
  totalContributionsMade: number;
  totalContributionsExpected: number;
}