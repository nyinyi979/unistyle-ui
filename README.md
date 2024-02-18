BETA VERSION YET!
# Unistyles UI Kit Cli tool
- npm install unistyles-ui
- Now you can start using the cli.

## Configuring the path
- Since I didn't want to create .json file to consume the path to install, the original path would be path.resolve('./lib');
- Can change it by going directly into node-modules/unistyles-ui/index.js -> Change the path variable at line no 6!

## Guides
- npm unistyle-ui init
  Will initialize the configuration and add the types, default values, unistyle registry to your project.
- npm unistyle-ui install all
  Will install all the components inside the ./lib/ui directory.

## Available commands
- npm unistyle-ui init 
- npm unistyle-ui install [component_name]
- npm unistyle-ui install all
- npm unistyles-ui --help
- npm unistyles-ui --path

UNISTYLE UI LIBRARY - https://github.com/nyinyi979/unistyles_components
