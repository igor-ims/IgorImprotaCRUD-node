const mongoose = require('mongoose');

const libroSchema = mongoose.Schema({
    nombre : {
        type : String,
        required : [true, 'Campo Nombre obligatorio']
    },
    autor : {
        type : String,
        required : [true, 'Campo Autor obligatorio']
    },
    isbn : {
        type : String,
        required : [true, 'Campo ISBN obligatorio']
    }
})

module.exports = mongoose.model('Libro', libroSchema);