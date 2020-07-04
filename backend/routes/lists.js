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

module.exports = router