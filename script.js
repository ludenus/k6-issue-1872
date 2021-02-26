var http = require('k6/http');
var check = require('k6').check;

exports.options = {
    thresholds: {
        http_req_duration: ['avg < 200', 'p(99)<1000', 'p(99.999)<1000'],
    },
};

exports.default = function () {
    var resp = http.get('http://pong/ping/k6');
    var ok = check(resp, {
        'is status 200': function (r) { return r.status === 200; },
        'is http_req_receiving >= 0': function (r) { return r.timings.receiving >= 0; },
    });
    if (!ok) {
        console.log(JSON.stringify(resp, null, 4));
    }
}
