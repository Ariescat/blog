::@echo off
::echo 当前路径: %CD%
cd ../
bundle exec jekyll serve --drafts
pause