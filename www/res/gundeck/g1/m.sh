#!/bin/sh
for i in 0 1 2 3 4 5
do
for j in 0 1 2 3 4 5 6 7 8 9
do
mv g1$i$j.png gl$i$j.png
done
done
for j in 0 1 2 3 4 5 6 7 8 9
do
mv g1$j.png gl$j.png
done
