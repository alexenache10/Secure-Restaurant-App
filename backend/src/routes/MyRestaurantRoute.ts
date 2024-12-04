import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get(
  "/order",
  MyRestaurantController.getMyRestaurantOrders
);



router.get("/", MyRestaurantController.getMyRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  MyRestaurantController.createMyRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  MyRestaurantController.updateMyRestaurant
);




export default router;