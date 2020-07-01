const router = require("express").Router();
let Note = require("../models/note.model.js");

router.route("/")
.get((req, res) => {
    Note.find()
    .then( users => { res.json(users) })
    .catch( err => res.json("Error "+err))
})

.post( (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        description: req.body.description
    });

    newNote.save()
    .then(() => res.json("Note successfully saved to db"))
    .catch(err => res.json("Error "+err))

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

module.exports = router