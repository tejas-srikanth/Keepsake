const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config()

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Successfully connected to mongodb')
});

const noteRouter = require("./routes/notes");
app.use("/notes", noteRouter);

const listRouter = require("./routes/lists");
app.use("/lists", listRouter)

app.listen(port, () => {
    console.log("Successfully connected to port 5000");
})