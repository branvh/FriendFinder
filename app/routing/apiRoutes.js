//dependencies
let path = require('path');
let candidates = require('../data/friends.js');

module.exports = (app) => {

    //send all candidate objects back to front end
    app.get('/api/friends', function(req, res) {
        res.json(candidates);
    });

    //handle the user's form post - add user record to DB and figure out who the best match is
    app.post('/api/friends', function(req, res) {

        //capture data posted by current user
        let newFriend = req.body;
        let name = newFriend.name;
        let photo = newFriend.photo;
        let scores = newFriend.scores;
        //to calculate the score diff across candidates, to find best match
        let scoreDifference = 0;

        //store top candidate
        var topCandidate = {
            lowestDifference: 10 * 9, //can't be more than 9 diff across 10 questions
            name: "",
            image: ""
        };

        //figure out the best match
        candidates.forEach((candidate, candidateIndex) => {

            let difference = 0;
            console.log(candidate);

            //loop through scores of the ith candidate and comparet to those of the user
            candidate.scores.forEach((questionScore, questionIndex) => {

                difference += Math.abs(parseInt(questionScore) - parseInt(scores[questionIndex]));
                console.log(difference);

            });

            //if the difference is lower than the current lowest difference, update the 'best match' object
            if (topCandidate.lowestDifference >= difference) {
                topCandidate.lowestDifference = difference
                topCandidate.name = candidates[candidateIndex].name;
                topCandidate.photo = candidates[candidateIndex].photo;
            };
            console.log(topCandidate);

        });

        //create a new friend object and push to the array
        let friendObject = {
            name: newFriend.name,
            photo: newFriend.photo,
            scores: newFriend.scores
        };

        candidates.push(friendObject);

        //send best candidate back to front-end
        res.json(topCandidate);

    });
};
