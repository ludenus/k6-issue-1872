import http from 'k6/http';
import { check } from 'k6';

export let options = {
  thresholds: {
    http_req_duration: ['avg < 200', 'p(99)<1000', 'p(99.999)<1000'], 
  },
};

export default function () {
  var res = http.get('http://pong/ping/k6');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'is duration <= 1000ms': (r) => r.http_req_duration < 1000
  });
}