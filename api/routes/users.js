import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("You are logged in..,")
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("You are logged in and you can delete the account")
})

router.put("/:id", verifyUser, updateUser)

router.delete("/:id", verifyUser, deleteUser);

router.get("/", verifyAdmin, getAllUsers)

router.get("/:id", verifyUser, getUser)

export default router;