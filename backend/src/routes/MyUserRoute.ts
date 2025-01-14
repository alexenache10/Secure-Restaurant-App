import express from "express";
import MyUserController from "../controllers/MyUserController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = express.Router();

router.get("/data", verifyJWT, MyUserController.getAllUsers);
router.get("/classic", verifyJWT, MyUserController.getCurrentUserClassic);
router.put("/update", verifyJWT, MyUserController.updateCurrentUserClassic);
router.delete("/delete", verifyJWT, MyUserController.adminDelete);

router.post("/register", MyUserController.register);
router.post("/login", MyUserController.login);

export default router;
