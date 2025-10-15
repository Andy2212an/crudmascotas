import express from "express";
import { listarMascotas, crearMascota, editarMascota } from "../controllers/mascotasController.js";

const router = express.Router();

router.get("/", listarMascotas);
router.post("/crear", crearMascota);
router.post("/editar/:id", editarMascota);

export default router;
