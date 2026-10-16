#!/bin/bash
r=$1
out=$(curl -sL -m 20 -A "Mozilla/5.0" -o /tmp/gh_$(echo $r|tr / _).html -w "%{http_code} %{url_effective}" https://github.com/$r)
f=/tmp/gh_$(echo $r|tr / _).html
stars=$(grep -oE 'id="repo-stars-counter-star"[^>]*title="[0-9,]+"' $f | grep -oE 'title="[0-9,]+"' | head -1 | tr -dc 0-9)
[ -z "$stars" ] && stars=$(grep -oE 'title="[0-9,]+"[^>]*id="repo-stars-counter-star"' $f | grep -oE 'title="[0-9,]+"' | head -1 | tr -dc 0-9)
echo -e "$r\t$out\t$stars"
