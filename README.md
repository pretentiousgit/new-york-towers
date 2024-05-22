# P5Js Webpack Boilerplate

This emerged out of a procedural generation project about towers and fire escapes, built for ITPCamp 2019.

It was developed to provide a React-like build environment for P5.js canvas drawing projects, allowing for a little better debug and tweaking. It assumes use of `import` statements and code separation and an interest in functional programming. 

When you boot the code, you will get a new tenement apartment with slightly different fire escapes every 1000ms or so. 

## Getting Started

### Boot Up
* `npm install`
* `npm audit fix --force`
* `npm run build` - this should generate a `/dist` folder
* Place the index.html file in `/dist` 
* `npm start`


This will start a webpack development server on port 8080, and run whatever sample code you have in the server in a new browser window. 

The development server has hot reloading, but it is slow.

### Production Build
* npm run build

This will output a ./dist folder containing your webpack bundle and whatever edits you've made to the index.html file you target in your scripts.

### Common Problems

1. Webpack won't turn on dev server
    * Have you checked that `static` is not currently `contentBase` in webpack.config.js

2. OpenSSL problems with boot offline
    * npm start now has a script to handle this, it's bad!


## TODO
* node-ify project?
* break out the P5 portions from the webpack portions and document them then publish
* work out how and if P5 is actually better than learning to use CSS properly


### Reasoning About Code Structure

* Canvas is a side-effect of generating a state machine per turn
* Each draw* call is a fired side-effect, but the state machine should update independently

* If we can separate out the state machine of something "being" a fire escape from a draw call
* We can then reproduce this code in Lua or elsewhere as an ongoing code demonstration