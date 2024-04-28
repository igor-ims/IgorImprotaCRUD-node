const express = require('express');
const router = express.Router();

const {getLibros, getLibroByIsbn, getLibroByNombre, crearLibro, updateLibro, deleteLibro} = require('../controllers/libro-controller')

router.route('/').get(getLibros).post(crearLibro);
router.route('/isbn/:isbn').get(getLibroByIsbn);
router.route('/nombre/:nombre').get(getLibroByNombre);
router.route('/:isbn').delete(deleteLibro).put(updateLibro);

module.exports = router;