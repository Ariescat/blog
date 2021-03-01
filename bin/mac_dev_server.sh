#!/bin/sh
echo "start..."
cd ../
pwd
echo ""

echo "-arch x86_64 bundle exec jekyll serve"
arch -arch x86_64 bundle exec jekyll serve