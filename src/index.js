const rp = require('request-promise');
const API_KEY = 'j4q82r8buyf3y2cxhthz9a94';

const options = {
    uri: 'http://api.sportradar.us/ncaafb-t1/2016/REG/2/SMU/BAY/summary.json',
    qs: {
        api_key: API_KEY
    },
    json: true
}

rp(options)
.then((response) => {
    console.log(response);
})
.catch((err) => {
    console.log(err);
})


