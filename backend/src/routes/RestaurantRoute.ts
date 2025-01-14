import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = express.Router();


router.get('/all', verifyJWT, RestaurantController.getAllRestaurants);

router.get(
  "/:restaurantId", verifyJWT,
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId parameter must be a valid string"),
  RestaurantController.getRestaurant
);

router.get(
  "/search/:city", verifyJWT,
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  RestaurantController.searchRestaurant
);

router.put("/update", verifyJWT, RestaurantController.updateRestaurant);
router.post("/", verifyJWT, RestaurantController.processOrder);
router.delete("/delete",verifyJWT, RestaurantController.deleteRestaurantByUserEmail);
export default router;
