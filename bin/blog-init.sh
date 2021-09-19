#!/bin/sh

cd ../
pwd

echo check gem version: `gem -v`

echo check bundle version: `bundle -v`

bundle install

bundle exec jekyll build
