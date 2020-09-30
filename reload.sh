#!/usr/bin/env bash
#

echo "Realoading executed OTP"
curl -v --insecure -X PUT --user ROUTERS:ultra_secret -H "accept: application/json" "https://localhost:8081/otp/routers"

