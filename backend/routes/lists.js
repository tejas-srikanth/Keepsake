const router = require("express").Router();
let List = require("../models/list.model.js");
let Note = require("../models/note.model.js")

//add a new list or get all lists
router.route("/")
.get( (req, res) => {
    List.find()
    .then( lists => res.json(lists) )
})
.post( (req, res) => {
    newList = new List({title: req.body.title})
    newList.save()
    .then( () => res.json("New list saved") )
})

//get a certain list, update the name of a certain list, or 
//delete the list and the notes that come with it
router.route("/:id")
.get( (req, res) => {
    List.findById(req.params.id)
    .then( listName => res.json(listName))
})
.patch( (req, res) => {
    List.findByIdAndUpdate(req.params.id, {$set: req.body})
    .then( () => res.json("Item successfully updated") )
})
.delete( (req, res) => {
    List.findByIdAndDelete(req.params.id)
    .then( () => console.log("successfully deleted list"))

    Note.deleteMany({listID: req.params.id})
    .then( () => res.json("successfully delete notes"))

})

module.exports = router