import type { Request, Response } from "express";
import { createPolicy, getPolicy } from "../service/policy.service.js";

export const createPolicyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const policy = await createPolicy(req.body);

    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create policy",
      error: (error as Error).message,
    });
  }
};


export const getPolicyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const policy = await getPolicy(req.body);
console.log(policy,"Retrieved policy");
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get  policy",
      error: (error as Error).message,
    });
  }
};