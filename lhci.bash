#!/bin/bash


pnpm install
pnpm nx build app --prod


for RAW_PATH in $(find ./dist/apps/app/.next/server/pages -type f -name "*.html")
do
    cleaned_path=${RAW_PATH#"./dist/apps/app/.next/server/pages"}
    cleaned_path=${cleaned_path%".html"}
    echo $cleaned_path

    pnpm lhci autorun --collect.url=$cleaned_path
done
