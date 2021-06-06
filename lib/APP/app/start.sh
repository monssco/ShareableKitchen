#!/usr/bin/env bash
# Filename: varlog.sh
cd ../api/
npm run dev &
cd ../app/
npm run codegen &
npm run dev