import express from "express";
import {
  listarMascotas,
  mostrarCrear,
  guardarMascota,
  mostrarEditar,
  editarMascota,
  actualizarMascota,
  borrarMascota,
} from "../controllers/mascotasController.js";

const router = express.Router();

router.get("/", listarMascotas);
router.get("/crear", mostrarCrear);
router.post("/guardar", guardarMascota);
router.get("/editar/:id", mostrarEditar);
router.post("/editar/:id", actualizarMascota);
router.get("/borrar/:id", borrarMascota);

export default router;
