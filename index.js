#!/usr/bin/env node
const path = require('path');
// CHANGE THIS PATH 
// I don't want to create json file for entry point and components
// Since there aren't too much to configure
var path_ = path.resolve('./lib');
const fs = require('fs');
const clc = require('cli-color');
const simple_git = require('simple-git').simpleGit({
    baseDir: path.join(__dirname,'/_git'),
    maxConcurrentProcesses: 6,
    trimmed: true,
});

const argv = require('yargs/yargs')(process.argv.splice(2))

.epilogue(`Available comp_name(case insensitive)
Basic: ${clc.blue.bold('Button, TextInput, P, Link')}
UI Component: ${clc.blue.bold('accordion','badge','button','calendar','checkbox','dialog','drawer','input','link',
'select','skeleton','slider','switch','tabs','text','toast','toggle','all')}
If the installation of each component is not working, you have probably deleted './path/ui' directory from your path`)

.command({
    command: 'init [path_name]',
    aliases: ['init'],
    desc: 'Install unistyles and basic ui kit!',
    builder: (yargs) => yargs.default('path_name', path_),
    handler: (argv) => {

        path_ = path.resolve(argv.path_name);
        !fs.existsSync(path.join(__dirname,'/git'))&&fs.mkdirSync(path.join(__dirname,'/git'));
        !fs.existsSync(path_)&&fs.mkdirSync(path_,{recursive:true})&&fs.mkdirSync(`${path_}/ui`); 
        simple_git.clone('https://github.com/nyinyi979/unistyles_components.git',path.join(__dirname,'/git'),{},(e)=>{ 
            fs.cp(path.join(__dirname,'/git/lib/default_values'),path.join(path_,'default_values'),{recursive:true},(err)=>{
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Installed default values');
                fs.cp(path.join(__dirname,'/git/lib/utils'),path.join(path_,'utils'),{recursive:true},(err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log('Installed utils');
                    fs.copyFileSync(path.join(__dirname,'/git/lib/default.d.ts'),path.join(path_,'default.d.ts'));
                    fs.copyFileSync(path.join(__dirname,'/git/lib/index.d.ts'),path.join(path_,'index.d.ts'));
                    fs.copyFile(path.join(__dirname,'/git/lib/unistyles.ts'),path.join(path_,'unistyles.ts'),(err)=>{
                        if(err){
                            console.log(err);
                            return;
                        }
                        console.log(clc.green(`Initialized to ${clc.blue(path_)}`))
                    });
                })
            })
        });
    }
})

.command({
    command: 'install [comp_name]',
    aliases: ['i'],
    desc: 'Install a component',
    builder: (yargs) => yargs.default('comp_name', ''),
    handler: (argv) => {
        if(argv.comp_name === '') console.log(clc.red("Please provide a component name"));
        else {
            const ui_components = new Set(['accordion','badge','button','calendar','checkbox','dialog','drawer','input','link',
                'select','skeleton','slider','switch','tabs','text','toast','toggle']);
            if(argv.comp_name==='all') {
                fs.readdir(path.join(`./${path_}/ui`),(e,f)=>{
                    if(e) {
                        console.log(e);
                        return;
                    }
                    if(f.length === 0){
                        console.log("Found zero component installed, Installing all...");
                        fs.cp(path.join(__dirname,'/git/ui'),path.join(path_,'ui'),{recursive:true},(e)=>{
                            if(e){
                                console.log(e);
                                return;
                            }  
                        })
                        console.log(clc.blue("Installed all of the components!"));
                    }
                    else {
                        console.log(`Found ${f.map((v)=>`${clc.blue(v)},
`)}Installing rest of the components`)
                        ui_components.forEach((c)=>{
                            fs.copyFile(path.join(__dirname,`/git/lib/ui/${c}.tsx`),path.join(`./${path_}/ui/${c}.tsx`),fs.constants.COPYFILE_EXCL,(e)=>{
                                if(e){
                                    if(e.code==='EEXIST') return;
                                    console.log(e);
                                    return;
                                }
                                else console.log(clc.blue(`Installed ${c}`));
                            })
                        })
                    }
                })
                return;
            }

            if(ui_components.has(argv.comp_name.toLowerCase())){
                //node index install all
                fs.copyFile(path.join(__dirname,`/git/lib/ui/${argv.comp_name}.tsx`),path.join(`./${path_}/ui/${argv.comp_name}.tsx`),(err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(clc.green(`Installed ${clc.bold(argv.comp_name)} to ${clc.blue(path_)}`))
                });
            }
            else console.log(clc.red("Not a valid component!"));
        }
    }
})
.option('path',{
    alias: 'p',
    desc: 'Show the path name',
    type: 'boolean'
})
.help()
.wrap(90)
.parse()

if(argv.path) {
    console.log("Current path is ", clc.blue(path_));
    console.log("Change it from",path.join(__dirname,'/index.js'))
}
