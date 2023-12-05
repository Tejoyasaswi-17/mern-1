import Hotel from "../models/Hotel";

export const createHotel = async(req, res, next) => {
    const hotel = new Hotel(req.body)
    try {
        const savedHotel = hotel.save();
        res.status(200).json(savedHotel)
    } catch(err) {
        next(err);
    }
}

export const updateHotel = async(req, res, next) => {
    try {
        const toUpdateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(toUpdateHotel)
    } catch(err) {
        next(err);
    }
}

export const deleteHotel = async(req, res, next) => {
    try {
        const toDeleteHotel = await Hotel.findByIdAndDelete(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json("Hotel has been successfully")
    } catch(err) {
        next(err);
    }
}

export const getAllHotels = async(req, res, next) => {
    try {
        const fetchHotels = await Hotel.find();
        res.status(200).json(fetchHotels);
    } catch(err) {
        next(err);
    }
}

export const getHotel = async(req, res, next) => {
    try {
        const fetchHotel = await Hotel.find(req.params.id);
        res.status(200).json(fetchHotel);
    } catch (err) {
        next(err);
    }
}