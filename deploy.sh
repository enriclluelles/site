#!/usr/bin/env bash
bundle exec middleman build
mv build tmpbuild
git co static
rm -rf build && mv tmpbuild build
git add -A build
git commit -m "Pushit"
git push heroku static:master -f
git co master
