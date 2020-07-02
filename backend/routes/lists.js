const router = require("express").Router();
let List = require("../models/list.model.js");
let Note = require("../models/note.model.js")

router.route("/")
.get( (req, res) => {
    List.find()
    .then( lists => res.json(users) )
})
.post( (req, res) => {
    const newList = {title: req.body.title}

    const newList = new List(newList)
    newList.save()
    .then( () => res.json("New list saved") )
})