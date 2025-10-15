import { getConnection } from "../config/db.js";

export const listarMascotas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM dbo.Mascotas");
    const rows = result.recordset || [];
    const mascotas = rows.map((r) => ({
      ID: r.ID ?? r.id ?? r.Id,
      Nombre: r.Nombre ?? r.nombre ?? r.Name,
      Especie: r.Especie ?? r.especie ?? r.Tipo ?? r.tipo,
      Raza: r.Raza ?? r.raza ?? "",
      Edad: r.Edad ?? r.edad ?? r.Age,
      Sexo: r.Sexo ?? r.sexo ?? "",
      NombreDueno: r.NombreDueno ?? r.nombreDueno ?? r.dueno ?? r.owner ?? "",
      TelefonoDueno: r.TelefonoDueno ?? r.telefonoDueno ?? r.telefono ?? r.phone ?? "",
      FechaVacunacion: r.FechaVacunacion ?? r.fechaVacunacion ?? r.vacunacion ?? "",
    }));
    res.render("index", { mascotas });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al listar las mascotas: ${error.message || error}`);
  }
};

export const crearMascota = async (req, res) => {
  const { nombre, tipo, edad } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", nombre)
      .input("tipo", tipo)
      .input("edad", edad)
      .query("INSERT INTO dbo.Mascotas (Nombre, Especie, Edad) VALUES (@nombre, @tipo, @edad)");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la mascota");
  }
};

export const editarMascota = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, edad } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id", id)
      .input("nombre", nombre)
      .input("tipo", tipo)
      .input("edad", edad)
      .query("UPDATE dbo.Mascotas SET Nombre=@nombre, Especie=@tipo, Edad=@edad WHERE ID=@id");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la mascota");
  }
};

export const mostrarCrear = (req, res) => {
  res.render("form", {
    title: "Crear Nueva Mascota",
    action: "/guardar",
    mascota: {},
  });
};

export const guardarMascota = async (req, res) => {
  const {
    Nombre,
    Especie,
    Raza,
    Edad,
    Sexo,
    Color,
    Peso,
    NombreDueno,
    TelefonoDueno,
    DireccionDueno,
    FechaVacunacion,
  } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("Nombre", Nombre)
      .input("Especie", Especie)
      .input("Raza", Raza)
      .input("Edad", Edad)
      .input("Sexo", Sexo)
      .input("Color", Color)
      .input("Peso", Peso)
      .input("NombreDueno", NombreDueno)
      .input("TelefonoDueno", TelefonoDueno)
      .input("DireccionDueno", DireccionDueno)
      .input("FechaVacunacion", FechaVacunacion)
      .query(
        "INSERT INTO dbo.Mascotas (Nombre, Especie, Raza, Edad, Sexo, Color, Peso, NombreDueno, TelefonoDueno, DireccionDueno, FechaVacunacion) VALUES (@Nombre, @Especie, @Raza, @Edad, @Sexo, @Color, @Peso, @NombreDueno, @TelefonoDueno, @DireccionDueno, @FechaVacunacion)"
      );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al guardar: ${error.message || error}`);
  }
};

export const mostrarEditar = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT TOP 1 * FROM dbo.Mascotas WHERE ID=@id");
    const mascota = result.recordset?.[0];
    if (!mascota) return res.status(404).send("Mascota no encontrada");
    res.render("form", {
      title: `Editar Mascota #${id}`,
      action: `/editar/${id}`,
      mascota,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al cargar edición: ${error.message || error}`);
  }
};

export const actualizarMascota = async (req, res) => {
  const { id } = req.params;
  const {
    Nombre,
    Especie,
    Raza,
    Edad,
    Sexo,
    Color,
    Peso,
    NombreDueno,
    TelefonoDueno,
    DireccionDueno,
    FechaVacunacion,
  } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id", id)
      .input("Nombre", Nombre)
      .input("Especie", Especie)
      .input("Raza", Raza)
      .input("Edad", Edad)
      .input("Sexo", Sexo)
      .input("Color", Color)
      .input("Peso", Peso)
      .input("NombreDueno", NombreDueno)
      .input("TelefonoDueno", TelefonoDueno)
      .input("DireccionDueno", DireccionDueno)
      .input("FechaVacunacion", FechaVacunacion)
      .query(
        "UPDATE dbo.Mascotas SET Nombre=@Nombre, Especie=@Especie, Raza=@Raza, Edad=@Edad, Sexo=@Sexo, Color=@Color, Peso=@Peso, NombreDueno=@NombreDueno, TelefonoDueno=@TelefonoDueno, DireccionDueno=@DireccionDueno, FechaVacunacion=@FechaVacunacion WHERE ID=@id"
      );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al actualizar: ${error.message || error}`);
  }
};

export const borrarMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("id", id).query("DELETE FROM dbo.Mascotas WHERE ID=@id");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al borrar: ${error.message || error}`);
  }
};
