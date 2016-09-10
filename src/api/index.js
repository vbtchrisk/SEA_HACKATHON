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
    })

});

module.exports = router;