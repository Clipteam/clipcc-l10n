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
    process.stdout.write(usage);
    process.exit(1);
}

import path from 'path';
//import { POEditorAPI } from 'poeditor-api';
import { POEditorAPI } from './poeditor';
import locales, {localeMap} from '../src/supported-locales';

const api = new POEditorAPI(process.env.POE_TOKEN);

const PROJECT_ID = '322153';
const OUTPUT_DIR = path.resolve(args[0]);
let tags = ['gui', 'block', 'extension', 'paint'];

tags.forEach(tag => {
    Object.keys(locales).forEach(async locale => {
        let poeLocale = localeMap[locale] || locale;
        try {
            await api.exportToFile(PROJECT_ID, poeLocale, 'key_value_json', tag, `${OUTPUT_DIR}/${tag}/${locale}.json`);
        }
        catch (err) {
            console.error(tag, poeLocale, err);
        }
    });
});
