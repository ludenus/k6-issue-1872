# k6 tool reports negative http_req_duration time
COde to reproduce [k6 issue #1872](https://github.com/loadimpact/k6/issues/1872) related to [this stackoverflow question](https://stackoverflow.com/questions/66368090/k6-https-k6-io-tool-reports-negative-http-req-duration-time).

# Test configuration
Hardware:

* MBP 2018 15"

* CPU 2,2 GHz 6-Core Intel Core i7

* RAM 16 GB 2400 MHz DDR4

Docker desktop limitations: 

* 8 CPU core

* 8 Gb RAM

Docker images:

* Simple HTTP echo service: [dockerhub](https://hub.docker.com/r/ludenus/pong), [github](https://github.com/ludenus/pong)

* Official k6 Docker image: [dockerhub](https://hub.docker.com/r/loadimpact/k6)


## Test Description

* HTTP GET with JSON response

* Check status 200 OK

* 100 seconds

* 2000 users

## Steps to reproduce
* run k6 test:
```
docker-compose down
docker-compose up
```
* check for min number in http_req_duration line: 
```
k6_1    |    ✓ http_req_duration..........: avg=14.05ms  min=-15.7758ms med=11.71ms max=163.09ms p(90)=27.25ms p(95)=33.93ms
```

## Expected result
http_req_duration is expected to be a positive number

## Actual result
Sometimes http_req_duration value is negative
e.g:
```
  checks.....................: 0.00%  ✓ 0     ✗ 133631
   data_received..............: 18 MB  1.8 MB/s
   data_sent..................: 10 MB  1.0 MB/s
   http_req_blocked...........: avg=47.03µs  min=13.6µs     med=20.8µs  max=46.11ms  p(90)=27.1µs  p(95)=33.5µs 
   http_req_connecting........: avg=3.96µs   min=0s         med=0s      max=34.35ms  p(90)=0s      p(95)=0s     
 ✓ http_req_duration..........: avg=14.05ms  min=-15.7758ms med=11.71ms max=163.09ms p(90)=27.25ms p(95)=33.93ms
   http_req_receiving.........: avg=108.11µs min=-34.2818ms med=48.4µs  max=87.86ms  p(90)=83.3µs  p(95)=112.6µs
   http_req_sending...........: avg=47.79µs  min=11.6µs     med=20.5µs  max=56.39ms  p(90)=32.8µs  p(95)=45.6µs 
   http_req_tls_handshaking...: avg=0s       min=0s         med=0s      max=0s       p(90)=0s      p(95)=0s     
   http_req_waiting...........: avg=13.89ms  min=0s         med=11.56ms max=163.01ms p(90)=27.02ms p(95)=33.66ms
   http_reqs..................: 133631 13350.537278/s
   iteration_duration.........: avg=14.9ms   min=287.4µs    med=12.32ms max=227.44ms p(90)=28.72ms p(95)=35.79ms
   iterations.................: 133631 13350.537278/s
   vus........................: 200    min=200 max=200 
   vus_max....................: 200    min=200 max=200 
   ```