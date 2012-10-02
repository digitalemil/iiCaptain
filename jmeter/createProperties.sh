#!/bin/bash
IP=$(cat /tmp/ip.txt)
echo server=$IP >jmeter.properties
