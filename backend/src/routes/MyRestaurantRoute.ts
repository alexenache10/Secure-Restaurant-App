import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { verifyJWT } from "../middleware/verifyJWT";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get(
  "/order", verifyJWT,
  MyRestaurantController.getMyRestaurantOrders
);



router.get("/", verifyJWT, MyRestaurantController.getMyRestaurant);

router.post(
  "/", verifyJWT,
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  MyRestaurantController.createMyRestaurant
);

router.put(
  "/", verifyJWT,
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  MyRestaurantController.updateMyRestaurant
);




export default router;