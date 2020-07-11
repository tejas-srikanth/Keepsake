const router = require("express").Router();
let Note = require("../models/note.model.js");

router.route("/")
.get( (req, res) => {
    Note.find()
    .then( (notes) => {res.json(notes)})
})
.post( (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        description: req.body.description,
        listName: req.body.listName,
        listID: "Home"
    })
    newNote.save();
})

router.route("/:id")
.delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
    .then(() => res.json("Successfully deleted item"))
    .catch(err => res.json("Error "+err))
})
.patch((req, res) => {
    Note.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then( () => res.json("Successfully updated item."))
    .catch(err => res.json("Error "+err))
})

router.route("/:listID")
.get( (req, res) => {
    
    Note.find({listID: req.params.listID})
    .then( (notes) => { res.json(notes) })
    .catch( err => res.json( "Error "+err))
})
.post ( (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        description: req.body.description,
        listID: req.params.listID,
        listName: req.body.listName
    })

    newNote.save()
    .then( () => res.json("Successfully saved new note"))
})

module.exports = router