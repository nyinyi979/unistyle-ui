# Unistyles UI Kit Cli tool
- npm install unistyles-ui
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

UNISTYLE UI LIBRARY - https://github.com/nyinyi979/unistyles_components
