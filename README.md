# pathminder-data

This repo contains the data for the Pathminder project. This is kept as CSON files for easy reading and editing. Each time a new commit is pushed to the Github repo on `master`, a Travis CI build is triggered that compiles this data down to JSON, then imports it into Firebase (overwriting previous data in Firebase).
