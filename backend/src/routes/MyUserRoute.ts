import express from "express";
import MyUserController from "../controllers/MyUserController";
import { validateMyUserRequest } from "../middleware/validation";
import { validateRegisterRequest, validateLoginRequest } from "../middleware/validation";

const router = express.Router();

router.get("/data",  MyUserController.getAllUsers); 
router.get("/classic",MyUserController.getCurrentUserClassic);
router.put("/update", validateMyUserRequest, MyUserController.updateCurrentUserClassic);
router.post("/register", validateRegisterRequest, MyUserController.register);
router.post("/login", MyUserController.login);
router.delete("/delete", MyUserController.adminDelete);
export default router;