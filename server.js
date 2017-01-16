//Packages
const app = require("express")();
const bodyParser = require("body-parser");
const path = require("path");

//Setup Express server app
const PORT = 3000;

//Interpret body of messages
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// routing for the api files and html files
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

//start the server / listen
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});