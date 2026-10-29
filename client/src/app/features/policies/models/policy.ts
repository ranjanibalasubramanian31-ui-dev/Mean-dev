export type PolicyStatus = "Active" | "Inactive";

export interface CreatePolicyRequest {
  policyNumber: string;
  customerName: string;
  policyType: string;
  premium: number;
  status: PolicyStatus;
}

export interface Policy extends CreatePolicyRequest {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}