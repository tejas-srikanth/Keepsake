const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config()

app.use(cors());
app.use(express.json());

//make the connections
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Successfully connected to mongodb')
});

//connect application to notes.js router
const noteRouter = require("./routes/notes");
app.use("/notes", noteRouter);

//connect application to lists.js router
const listRouter = require("./routes/lists");
app.use("/lists", listRouter)

//listen on the port specified above
app.listen(port, () => {
    console.log("Successfully connected to port 5000");
})