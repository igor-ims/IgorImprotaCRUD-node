const asyncHandler = require('express-async-handler')

const Libro = require('../models/libro-model')

const getLibros = asyncHandler(async (req, res) => {
    const libros = await Libro.find();
    res.status(200).json(libros);
});

const getLibroByIsbn = asyncHandler(async (req, res) => {
    const libro = await Libro.findOne({ isbn: req.params.isbn });

    if (!libro) {
        res.status(404);
        throw new Error(`El libro con ISBN ${req.params.isbn} no existe.`);
    }

    res.status(200).json(libro);
});

const getLibroByNombre = asyncHandler(async (req, res) => {
    const libro = await Libro.findOne({ nombre: req.params.nombre });

    if (!libro) {
        res.status(404);
        throw new Error(`No se encontró ningún libro con el nombre ${req.params.nombre}.`);
    }

    res.status(200).json(libro);
});

const crearLibro = asyncHandler(async (req, res) => {
    if (!req.body.nombre || !req.body.autor || !req.body.isbn) {
        res.status(400);
        throw new Error('Por favor, ingresa nombre, autor y ISBN del libro.');
    }

    const { nombre, autor, isbn } = req.body;

    const existingLibro = await Libro.findOne({ isbn });
    if (existingLibro) {
        res.status(400);
        throw new Error(`El libro con ISBN ${isbn} ya existe.`);
    }

    const libro = await Libro.create({ nombre, autor, isbn });

    res.status(201).json(libro);
});

const updateLibro = asyncHandler(async (req, res) => {
    const { isbn: oldIsbn } = req.params;
    const { isbn: newIsbn, ...updateData } = req.body;

    const libro = await Libro.findOne({ isbn: oldIsbn });

    if (!libro) {
        res.status(404);
        throw new Error(`El libro con ISBN ${oldIsbn} no existe.`);
    }

    if (newIsbn && newIsbn !== oldIsbn) {
        const existingLibro = await Libro.findOne({ isbn: newIsbn });
        if (existingLibro) {
            res.status(400);
            throw new Error(`Ya existe un libro con el ISBN ${newIsbn}.`);
        }
    }

    const updatedLibro = await Libro.findOneAndUpdate({ isbn: oldIsbn }, updateData, { new: true });

    res.status(200).json(updatedLibro);
});


const deleteLibro = asyncHandler(async (req, res) => {
    const libro = await Libro.findOne({ isbn: req.params.isbn });

    if (!libro) {
        res.status(404);
        throw new Error(`El libro con ISBN ${req.params.isbn} no existe.`);
    }

    await Libro.deleteOne({ isbn: req.params.isbn });
    res.status(203).json({ libroEliminado: libro });
});

module.exports = {
    getLibros,
    getLibroByIsbn,
    getLibroByNombre,
    crearLibro,
    updateLibro,
    deleteLibro
};
