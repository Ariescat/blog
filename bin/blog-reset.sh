#!/bin/sh
echo "start..."
cd ../
pwd
echo ""

echo "git fetch --all"
git fetch --all

echo ""
echo "git reset --hard origin/master"
git reset --hard origin/master

echo ""
echo "git pull"
git pull

echo ""
echo "finish~"
