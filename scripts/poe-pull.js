#!/usr/bin/env babel-node

const args = process.argv.slice(2);

const usage = `
 Pull translations from POEditor. Usage:
   node poe-pull.js path
     path: where to put the downloaded json files
   NOTE: POE_TOKEN environment variable needs to be set with a POEditor API token. See
   the Localization page on the GUI wiki for information about setting up POEditor.
 `;
// Fail immediately if the POE_TOKEN is not defined
if (!process.env.POE_TOKEN || args.length < 1) {
    process.stdout.write(args.length.toString());
    process.stdout.write(process.env.POE_TOKEN.toString());
    process.stdout.write(usage);
    process.exit(1);
}

import fs from 'fs';
import path from 'path';
import async from 'async';
//import {POEditorV2} from 'poeditor-api';
import {POEditorV2} from './poeditor';
import locales, {localeMap} from '../src/supported-locales';

const api = new POEditorV2(process.env.POE_TOKEN);

const PROJECT_ID = '322153';
const OUTPUT_DIR = path.resolve(args[0]);
const CONCURRENCY_LIMIT = 1;
let tags = ['gui', 'block', 'extensions'];

tags.forEach((tag) => {
    async.mapLimit(Object.keys(locales), CONCURRENCY_LIMIT, (locale, callback) => {
        let poeLocale = localeMap[locale] || locale;
        api.exportToFile(PROJECT_ID, poeLocale, 'key_value_json', tag, `${OUTPUT_DIR}/${tag}/${locale}.json`).then(res => {
            callback(null, {
                locale: locale
            });
        }).catch(err => {
            callback(err);
        });
    }, (err, values) => {
        if (err) {
            console.error(err); // eslint-disable-line no-console
            process.exit(1);
        }
        console.log(`[${tag}]${values.locale} finished.`);
    });
});
