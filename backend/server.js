const express = require("express");
const path = require("path");
const routes = require("./routes");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongodb connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Fitness-Tracker")
    .then(() => {
        //when db is available

        //listen for requests
        app.listen(PORT, () => {
            console.log(`Successfully connected to MongoDB && listening on port ${PORT}!!!`);
        });

    })
    .catch((error) => {
        console.log(error);
    });

// Serve up static assets
// if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
//   }
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//   });

app.use(routes);

