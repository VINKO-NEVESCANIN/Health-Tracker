import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateInfo,
  updateAccess,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateInfo);
router.put("/:id", updateAccess);
router.delete("/:id", deleteUser);

export default router;
