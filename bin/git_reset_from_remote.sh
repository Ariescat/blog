#!/bin/sh

cd ../
pwd

git fetch --all
git reset --hard origin/master
git pull
