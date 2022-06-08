#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b gh-pages
git add -A
git commit -m 'deploy'

# Add your GitHub repo details here
git push -f https://github.com/0ngezwa-felele/viteJs.git gh-pages

cd -