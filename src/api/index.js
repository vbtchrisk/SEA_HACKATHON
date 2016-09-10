var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var _ = require('lodash');
const API_KEY = 'j4q82r8buyf3y2cxhthz9a94';


router.get('/', (req, res) => {
    const weekNumber = req.query.week || 2;
    var options = {
        uri: `http://api.sportradar.us/ncaafb-t1/2016/REG/${weekNumber}/schedule.json`,
        qs: {
            api_key: API_KEY
        }
    }

    rp(options)
    .then((result) => {
        var schedule = {
            data: JSON.parse(result)
        }

        res.json(schedule);

    })
    .catch((err) => {
        res.json(err);
    });

});

router.get('/details', (req, res) => {
    const homeTeam = req.query.hometeam;
    const awayTeam = req.query.awayteam;
    const week = req.query.week || 2;
    const year = req.query.year || 2016;

    var options = {
        uri: `http://api.sportradar.us/ncaafb-t1/${year}/REG/${week}/${awayTeam}/${homeTeam}/statistics.json`,
        qs: {
            api_key: API_KEY
        }
    };
    console.log(options.uri);

     rp(options)
    .then((result) => {
        console.log(result);
        var gameDetails = {
            data: JSON.parse(result)
        }

        res.json(gameDetails);

    })
    .catch((err) => {
        res.json(err);
    });
});

router.get('/roster', (req, res) => {
    const weekNumber = req.query.week || 2;
    const year = req.query.year || 2016;
    const homeTeam = req.query.hometeam;
    const awayTeam = req.query.awayteam;
    var options = {
        // http://api.sportradar.us/ncaafb-t1/2016/REG/2/SMU/BAY/roster.json?api_key=j4q82r8buyf3y2cxhthz9a94
        uri: `http://api.sportradar.us/ncaafb-t1/${year}/REG/${weekNumber}/${awayTeam}/${homeTeam}/roster.json`,
        qs: {
            api_key: API_KEY
        }
    }

    rp(options)
    .then((result) => {
        var roster = {
            data: JSON.parse(result)
        }

        res.json(roster);

    })
    .catch((err) => {
        res.json(err);
    });

});

module.exports = router;