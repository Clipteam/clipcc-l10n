#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { POEditorAPI } = require('./poeditor');

const args = process.argv.slice(2);

const usage = `
Push English source strings to Transifex. Usage:
  node poe-push.js poe-tag english-json-file
      poe-tag: the tag in POEditor
      english-json-file: path to the en.json source
      NOTE: POE_TOKEN environment variable needs to be set with a POEditor API token. See
      the Localization page on the GUI wiki for information about setting up POEditor.
`;

// Exit if missing arguments or POE_TOKEN
if (args.length < 2 || !process.env.POE_TOKEN) {
    process.stdout.write(usage);
    process.exit(1);
}

const api = new POEditorAPI(process.env.POE_TOKEN);

// Globals
const PROJECT_ID = '322153';
const TAG = args[0];

let en = fs.readFileSync(path.resolve(args[1]));
en = JSON.parse(en);

api.upload(
    PROJECT_ID, 'terms_translations', args[1],
    'en', 1, 0, JSON.stringify({
        all: TAG
    }), 0, 0
).then(res => {
    console.log(res);
});
