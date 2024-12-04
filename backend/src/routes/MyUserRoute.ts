import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
import { validateRegisterRequest, validateLoginRequest } from "../middleware/validation";

const router = express.Router();

router.get("/data",  MyUserController.getAllUsers); 
router.get("/classic",MyUserController.getCurrentUserClassic);
router.put("/", validateMyUserRequest, MyUserController.updateCurrentUser);
router.put("/update", validateMyUserRequest, MyUserController.updateCurrentUserClassic);
router.post("/register", validateRegisterRequest, MyUserController.register);
router.post("/login", MyUserController.login);
router.delete("/delete", MyUserController.adminDelete);
router.post("/admin-update", MyUserController.adminUpdate);

export default router;