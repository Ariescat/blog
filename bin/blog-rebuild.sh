#!/bin/sh
echo "start..."
cd ../
pwd
echo ""
echo "exe git pull"
git pull
echo ""
echo "exe jekyll build..."
jekyll build
echo ""
echo "finish~"
