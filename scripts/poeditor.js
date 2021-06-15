// poeditor-api
// By Alex Cui

const https = require('https');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const FormData = require('form-data');

function postForm(url, args, files) {
    return new Promise((resolve, reject) => {
        let arg = querystring.stringify(args);
        let datas = '';
        let form = new FormData();
        for (const key in args) {
            form.append(key, args[key]);
        }
        for (const file in files) {
            form.append(file, files[file])
        }
        let opt = {
            method: 'POST',
            headers: form.getHeaders()
        };
        let time = 0;
        let req = https.request(new URL(url), opt, res => {
            res.on('data', data => {
                datas += data;
            });
            res.on('end', () => {
                resolve(JSON.parse(datas));
            });
        }).on('error', err => {
            time = time + 1;
            if (time <= 3) {
                console.log(`Error, reconnecting ${arg}: ${time} ...`);
                req.write(arg);
            }
            else {
                console.log(err);
                reject(err);
            }
        });
        form.pipe(req);
    });
}

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
        let time = 0;
        let req = https.request(new URL(url), opt, res => {
            res.on('data', data => {
                datas += data;
            });
            res.on('end', () => {
                resolve(JSON.parse(datas));
            });
        }).on('error', err => {
            time = time + 1;
            if (time <= 3) {
                console.log(`Error, reconnecting ${arg}: ${time} ...`);
                req.write(arg);
            }
            else {
                console.log(err);
                reject(err);
            }
        });
        req.write(arg);
    });
}

// API
class POEditorAPI {
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
        return postForm('https://api.poeditor.com/v2/projects/upload', {
            api_token: this.api_token,
            id: id,
            updating: updating,
            language: language,
            overwrite: overwrite,
            sync_terms: sync_terms,
            tags: tags,
            read_from_source: read_from_source,
            fuzzy_trigger: fuzzy_trigger
        }, {
            file: fs.createReadStream(file)
        });
    }
    syncTerms(id, data) {
        return post('https://api.poeditor.com/v2/projects/sync', {
            api_token: this.api_token,
            id: id,
            data: data
        });
    }
    export(id, language, type, tags) { //opt
        return post('https://api.poeditor.com/v2/projects/export', {
            api_token: this.api_token,
            id: id,
            language: language,
            type: type,
            tags: tags
        })
    }
    async exportToFile(id, language, type, tags, filePath) {
        const url = (await this.export(id, language, type, tags)).result.url;
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        const file = fs.createWriteStream(filePath);
        https.get(url, res => {
            res.on('end', () => {
                console.log(`Exported to ${filePath}`);
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

module.exports = { POEditorAPI };
