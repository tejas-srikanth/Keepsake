const router = require("express").Router();
let List = require("../models/list.model.js");

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

router.route("/:id")
.get( (req, res) => {
    List.findById(req.params.id)
    .then( listName => res.json(listName))
})
.patch( (req, res) => {
    List.findByIdAndUpdate(req.params.id, {$set: req.query})
    .then( () => res.json("Item successfully updated") )
})
.delete( (req, res) => {
    List.findByIdAndDelete(req.params.id)
    .then( () => res.json("successfully deleted item"))
})

module.exports = router