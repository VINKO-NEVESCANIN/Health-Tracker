import { Router } from "express";
import { getUsers, getUserById, createUser, updateInfo, updateAccess, deleteUser } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";
import { requirePatientAccess } from "../middleware/access";

const router = Router();
router.use(authMiddleware());

router.get("/", authMiddleware(["Doctor", "Admin"]), getUsers);
router.post("/", authMiddleware(["Doctor", "Admin"]), createUser);
router.get("/:id", getUserById); // el controlador valida acceso (propio o personal médico)
router.put("/:id", requirePatientAccess("id"), updateInfo);
router.put("/:id/access", updateAccess); // el controlador valida (propio o admin)
router.delete("/:id", authMiddleware(["Admin"]), deleteUser);

export default router;
