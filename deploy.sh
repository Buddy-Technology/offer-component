#!/bin/bash 

Red=$'\e[0;31m'
Green=$'\e[0;32m'
Blue=$'\e[0;34m'
Yellow=$'\e[0;33m'
Remove=$'\e[0m'

echo "$Green Version $npm_package_version created."

echo "$Yellow What's new in this release? (Enter multiple lines. Type CTRL + D when done.)$Remove"
release_notes=()
while read release_notes
do
  release_notes+=("\\n- $release_notes  ")
done

date_stamp=$(date +"%Y-%m-%d")
changelog_text="\n\n### v$npm_package_version  \n$date_stamp  \n${release_notes[*]}  \n---  \n"
perl -pi -e "s{# CHANGELOG}{# CHANGELOG $changelog_text }" CHANGELOG.md

git add README.md
git add CHANGELOG.md
git commit -m "updated docs and changelog"
git push origin main

gh_release_notes=$(sed -n "/### v${npm_package_version}-BETA/,/---/p" CHANGELOG.md)
gh release create "release-v${npm_package_version}-BETA" -n "${gh_release_notes}" -t "v${npm_package_version}-BETA" -p # remove -p once this is out of BETA.

echo "$Blue Thanks cool breeeeeze 🌬💨$Remove"
