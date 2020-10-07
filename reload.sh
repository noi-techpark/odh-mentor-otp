#!/usr/bin/env bash
#

echo "Realoading executed OTP"
curl -v --insecure -X PUT --user ROUTERS:ultra_secret -H "accept: application/json" "http://localhost:8080/otp/routers"
