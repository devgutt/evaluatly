#!/bin/bash

ROOT=$PWD

cd $ROOT/render
npm run prod

cd $ROOT/docs/_boom
./build

cd $ROOT
git add .
git commit -m 'publish'
git push
