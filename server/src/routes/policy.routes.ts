import { Router } from "express";
import { createPolicyController, getPolicyController } from "../controller/policy.controller.js";

const router = Router();

router.post("/", createPolicyController);
router.get("/", getPolicyController);

export default router;