#! /bin/bash

cp lib/main.js dist/scripts/
vulcanize lib/require.html | crisper -h dist/scripts/build.html -j dist/scripts/build.js