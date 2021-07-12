const Note = require('../models/Note');


const notesCtrl = {
    indexNote: (req, res) => {
        //console.log(req.user);
        res.render('notes/add');
    },
    add: async (req, res) => {
        // console.log(req.body)
        const {title, description} = req.body;
        const newNote = new Note({title, description})
        // console.log(newNote)
        newNote.user = req.user.id;
        await newNote.save()
        req.flash('success_msg', 'Nota agregada con éxito')
        res.redirect('/notes');
    },
    notes: async (req, res) => {
        const notas = await Note.find({user: req.user.id}).sort({createdAt: 'desc'})
        res.render('notes/all-notes', { notas })
    },
    editForm: async (req, res) => {
        const nota = await Note.findById(req.params.id)
        // console.log(nota)
        if(nota.user != req.user.id){
            req.flash('error_msg', 'No estas autorizado');
            return res.redirect('/notes');
        }
        res.render('notes/edit-note', { nota });
    },
    edit: async (req, res) => {
        // console.log(req.body)
        const { title, description } = req.body
        await Note.findByIdAndUpdate(req.params.id, {title, description})
        req.flash('success_msg', 'Nota actualizada con éxito')
        res.redirect('/notes');
    },
    delete: async (req, res) => {
        // console.log(req.params.id)
        await Note.findByIdAndDelete(req.params.id)
        req.flash('success_msg', 'Nota eliminada con éxito')
        res.redirect('/notes');
    }
}


module.exports = notesCtrl;