import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/errors.js";

const router = express.Router();

router.post("/", async(req, res) => {
    const hotel = new Hotel(req.body)
    try{
        const savedHotel = hotel.save();
        res.status(200).json(savedHotel)
    } catch(err) {
        res.status(500).json(err);
    }
})


router.put("/:id", async(req, res) => {
    try{
        const toUpdateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(toUpdateHotel)
    } catch(err) {
        res.status(500).json(err);
    }
})

router.delete("/:id", async(req, res) => {
    try{
        const toDeleteHotel = await Hotel.findByIdAndDelete(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json("Hotel has been successfully")
    } catch(err) {
        res.status(500).json(err);
    }
})

router.get("/", async(req, res, next) => {
    
    try{
        const fetchHotels = await Hotel.find();
        res.status(200).json(fetchHotels);
    } catch(err) {
        next(err);
    }
})

export default router;