// poeditor-api
// By Alex Cui

const https = require('https');
const fs = require('fs');
const querystring = require('querystring');

function post(url, args) {
    return new Promise((resolve, reject) => {
        let arg = querystring.stringify(args);
        let datas = '';
        let opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let req = https.request(new URL(url), opt, res => {
            res.on('data', data => {
                datas += data;
            });
            res.on('end', () => {
                resolve(JSON.parse(datas));
            });
        });
        req.write(arg);
    });
}

// API v2
class POEditorV2 {
    constructor(api_token) {
        this.api_token = api_token;
    }
    // Projects
    listProjects() {
        return post('https://api.poeditor.com/v2/projects/list', {
            api_token: this.api_token
        });
    }
    viewProjectDetails(id) {
        return post('https://api.poeditor.com/v2/projects/view', {
            api_token: this.api_token,
            id: id
        });
    }
    addProject(name, description) {
        return post('https://api.poeditor.com/v2/projects/add', {
            api_token: this.api_token,
            name: name,
            description: description
        });
    }
    updateProjectSettings(id, name, description, reference_language) {
        return post('https://api.poeditor.com/v2/projects/update', {
            api_token: this.api_token,
            id: id,
            name: name,
            description: description,
            reference_language: reference_language
        });
    }
    deleteProject(id) {
        return post('https://api.poeditor.com/v2/projects/delete', {
            api_token: this.api_token,
            id: id
        });
    }
    upload(id, updating, file, language, overwrite, sync_terms, tags, read_from_source, fuzzy_trigger) {
        return post('https://api.poeditor.com/v2/projects/upload', {
            api_token: this.api_token,
            id: id,
            updating: updating,
            file: file,
            language: language,
            overwrite: overwrite,
            sync_terms: sync_terms,
            tags: tags,
            read_from_source: read_from_source,
            fuzzy_trigger: fuzzy_trigger
        });
    }
    syncTerms(id, data) {
        return post('https://api.poeditor.com/v2/projects/sync', {
            api_token: this.api_token,
            id: id,
            data: data
        });
    }
    export(id, language, type) { //opt
        return post('https://api.poeditor.com/v2/projects/export', {
            api_token: this.api_token,
            id: id,
            language: language,
            type: type
        })
    }
    async exportToFile(id, language, type, path) {
        const url = (await this.export(id, language, type)).result.url;
        const file = fs.createWriteStream(path);
        https.get(url, res => {
            res.on('end', () => {
                console.log('finish download');
            });
            file.on('finish', () => {
                file.close();
            }).on('error', (err) => {
                fs.unlink(dest);
            });
            res.pipe(file);
        });
    }
}

module.exports = { POEditorV2 };
