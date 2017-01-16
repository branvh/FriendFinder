//dependencies
let path = require('path');

//to let the server route to/from the survey and home page
module.exports = (app) => {

    //survey page
    app.get('/survey', (req, res) => {
        console.log('sending survey page');
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });

    //default to home page routing, using 'use' per the instructions
    app.use((req, res) => {
        console.log('sending home page');
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });

}
