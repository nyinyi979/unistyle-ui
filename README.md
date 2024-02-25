# Unistyles UI Kit Cli
- npm install uni-ui-kit
- Now you can start using the cli.

## Configuring the path
- Since I didn't want to create .json file to consume the path to install, the original path would be path.resolve('./lib');
- Can change it by going directly into node-modules/unistyles-ui/index.js -> Change the path variable at line no 6!

## Guides
- npm install uni-ui-kit
- npx uni-ui-kit init
  Will initialize the configuration and add the types, default values, unistyle registry to your project.
- npm uni-ui-kit install all
  Will install all the components inside the ./lib/ui directory.
- npm uninstall uni-ui-kit
  You don't need this anymore.

## Available commands
- npx uni-ui-kit init 
- npx uni-ui-kit install [component_name]
- npx uni-ui-kit install all
- npx uni-ui-kit --help
- npx uni-ui-kit --path

## Want to install the latest version of the components?
1. Right now there is no command for that. You will have update the cli tool. delete ./lib folder.
2. npx uni-ui-kit init
3. npx uni-ui-kit install all
4. npx uni-ui-kit uninstall
   
UNISTYLE UI LIBRARY - https://github.com/nyinyi979/unistyles_components
