#!/usr/bin/env bash
bundle exec middleman build
git add -f build
git co static
git commit -am "Pushit"
git push heroku static:master -f
git co master
