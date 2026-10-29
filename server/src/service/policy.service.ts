import { Policy } from "../model/policy.model.js";
import type { IPolicy } from "../model/policy.model.js";

export const createPolicy = async (
  policyData: Partial<IPolicy>
): Promise<IPolicy> => {
  const policy = await Policy.create(policyData);

  return policy;
};

export const getPolicy = async (
  policyData: Partial<IPolicy>
): Promise<IPolicy[]> => {
  const policy = await Policy.find(policyData);
console.log(policy, "Retrieved policy111");
  if (!policy || policy.length === 0) {
    throw new Error("Policy not found");
  }

  return policy;
};


