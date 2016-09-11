var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var _ = require('lodash');
const API_KEY = '3wrs7zd7ft7mzrg5uhhjd5pv';


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

router.get('/current', (req, res) => {
    const weekNumber = req.query.week || 2;
    var options = {
        uri: `http://api.sportradar.us/ncaafb-t1/2016/REG/${weekNumber}/schedule.json`,
        qs: {
            api_key: API_KEY
        }
    }

    rp(options)
        .then((result) => {
            const jsonResult = JSON.parse(result);
             var games = _.filter(jsonResult.games, function (g) {
                if(g.status === 'inprogress') {
                    return g;
                }
            });
            var schedule = {
                data: games
            }

            res.json(schedule);

        })
        .catch((err) => {
            res.json(err);
        });

});

router.get('/:id', (req, res) => {
    const weekNumber = req.query.week || 2;
    var options = {
        uri: `http://api.sportradar.us/ncaafb-t1/2016/REG/${weekNumber}/schedule.json`,
        qs: {
            api_key: API_KEY
        }
    }

    rp(options)
        .then((result) => {
            var jsonResult = JSON.parse(result);

            var game = _.filter(jsonResult.games, function (g) {
                if (g.id === req.params.id) {
                    return g;
                }
            });

            if (_.isEmpty(game)) {
                res.sendStatus(404);
            } else {
                const gameDetail = game[0];
                const year = req.query.year || 2016;
                const week = req.query.week || 2;
                const awayTeam = gameDetail.away;
                const homeTeam = gameDetail.home;
                var options2 = {
                    uri: `http://api.sportradar.us/ncaafb-t1/${year}/REG/${week}/${awayTeam}/${homeTeam}/statistics.json`,
                    qs: {
                        api_key: API_KEY
                    }
                };

                rp(options2)
                    .then((result) => {
                        var gameDetails = {
                            data: JSON.parse(result)
                        }

                        res.json(gameDetails);

                    })
                    .catch((err) => {
                        res.json(err);
                    });
            }

        })
        .catch((err) => {
            res.json(err);
        });

});

router.get('/:id/clock', (req, res) => {


    const weekNumber = req.query.week || 2;
    var options = {
        uri: `http://api.sportradar.us/ncaafb-t1/2016/REG/${weekNumber}/schedule.json`,
        qs: {
            api_key: API_KEY
        }
    }

    rp(options)
        .then((result) => {
            var jsonResult = JSON.parse(result);

            var game = _.filter(jsonResult.games, function (g) {
                if (g.id === req.params.id) {
                    return g;
                }
            });

            if (_.isEmpty(game)) {
                res.sendStatus(404);
            } else {
                const gameDetail = game[0];
                const year = req.query.year || 2016;
                const week = req.query.week || 2;
                const awayTeam = gameDetail.away;
                const homeTeam = gameDetail.home;
                var options2 = {
                    uri: `http://api.sportradar.us/ncaafb-t1/${year}/REG/${week}/${awayTeam}/${homeTeam}/pbp.json`,
                    qs: {
                        api_key: API_KEY
                    }
                };

                rp(options2)
                    .then((result1) => {
                        var jsonResult = JSON.parse(result1);
                        const quarterIdx = jsonResult.quarters.length - 1;
                        const pbpIdx = jsonResult.quarters[quarterIdx].pbp.length - 1;
                        const actionIdx = jsonResult.quarters[quarterIdx].pbp[pbpIdx].actions.length - 1;

                        var timeLeft = jsonResult.quarters[quarterIdx].pbp[pbpIdx].actions[actionIdx].clock;

                        if(timeLeft === ':00') {
                            console.log('final time');
                            timeLeft = 'final';
                        }
                        var returnResponse = {
                            data: {
                                clockValue: timeLeft,
                                quarterValue: jsonResult.quarters[quarterIdx].number
                            }
                        }

                        res.json(returnResponse);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            }

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