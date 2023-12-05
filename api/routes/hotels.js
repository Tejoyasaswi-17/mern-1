import express from "express";
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.js";

const router = express.Router();

router.post("/", createHotel)

router.put("/:id", updateHotel)

router.delete("/:id", deleteHotel);

router.get("/", getAllHotels)

router.get("/:id", getHotel)

export default router;