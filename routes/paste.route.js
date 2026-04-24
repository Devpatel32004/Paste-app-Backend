import express from "express";
import { deletePaste, getAllpastes, getPasteById, handleCreatePaste, updatePaste } from "../controllers/paste.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, handleCreatePaste);

router.get("/all", isAuthenticated, getAllpastes);

router.get("/:id", getPasteById)

router.delete("/:id",isAuthenticated, deletePaste)

router.put("/:id", isAuthenticated, updatePaste)

export default router