const express = require('express')
const router = express.Router()

const notesCtrl = require('../controllers/notes.controller')

const {isAuthenticated} = require('../helpers/auth')


// Nueva nota
router.get('/notes/add', isAuthenticated, notesCtrl.indexNote)

router.post('/notes/add', isAuthenticated, notesCtrl.add)

// Obtener todas las notas

router.get('/notes', isAuthenticated, notesCtrl.notes)

// Editar notas

router.get('/notes/edit/:id', isAuthenticated, notesCtrl.editForm)

router.put('/notes/edit/:id', isAuthenticated, notesCtrl.edit)

// Eliminar notas

router.delete('/notes/delete/:id', isAuthenticated, notesCtrl.delete)


module.exports = router