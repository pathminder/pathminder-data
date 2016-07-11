# pathminder-data

This repo contains the data for the Pathminder project. This is kept as CSON files for easy reading and editing. Each time a new commit is pushed to the Github repo on `master`, a Travis CI build is triggered that compiles this data down to JSON, then imports it into Firebase (overwriting previous data in Firebase).

## Using the data

The data can be accessed via REST interface at `https://pathminder-e5045.firebaseio.com/(path).json`.

For example:

* https://pathminder-e5045.firebaseio.com/feats.json
* https://pathminder-e5045.firebaseio.com/feats/power-attack.json

## Disclaimer

Data formats subject to change as I fine-tune data structures for use with [the new Pathminder website](https://github.com/pathminder/pathminder-web/).
