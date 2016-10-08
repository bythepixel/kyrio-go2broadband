# Kyrio GO2Broadband - Landing Page

This project uses Node and Node's package manager (NPM) to coordinate and run all of its build tasks. Luckily, installing Node also installs NPM.

**The `app.css` and `app.js` files should not be edited directly. Any changes directly to those files will be wiped out as soon as the asset build process run.**

## Introduction

The `app.css` and `app.js` are built by compiling the partials located in the project root `assets` directory. In order to build those assets, you need all of the NPM modules installed.

The only requirement to building the assets for this project is having Node installed. To check if you have Node installed, from a command line run `node -v` and you should see:
```
$ node -v
v5.10.1
```
Or something similar showing your Node version. Otherwise head to [NodeJS download](https://nodejs.org/en/download/) and follow the download instructions.

## Compiling Assets

We need all the project's NPM packages in order to successfully compile the project's assets. A list of the NPM packages for this project is located under `dependencies` in [package.json](package.json).

To install the NPM packages, `cd` to the root directory of this project and run `npm install` from the command line. Retrieving all the packages can take some time so let the command line finish before continuing.

Once all NPM packages are retrieved, run `npm run build` and you should see:
```
$ npm run build

> @ build /.../projects/kyrio
> gulp build

[12:00:00] Requiring external module babel-register
[12:00:01] Using gulpfile ~/Projects/kyrio/gulpfile.babel.js
[12:00:01] Starting 'setProdEnv'...
[12:00:01] Finished 'setProdEnv' after 147 μs
[12:00:01] Starting 'build'...
[12:00:01] Finished 'build' after 31 ms
app.css: 22.763kB => 18.403kB 19.15% savings
```

**That's it!** You've successfuly re-built the assets for this project

## Editing Assets

The javascript assets in the `assets/js` directory are written in ES6 javascript without the use of jQuery.

The SCSS assets in the `assets/sass` directory (which compile as CSS) are written in the Sass CSS preprocessor language.

## Watching Assets

The build process uses [BrowserSync](https://www.browsersync.io/) to compile assets in realtime and inject them directly into the browser. This doesn't affect any sites that are located on a server anywhere - just local assets.

To start building assets in realtime, `cd` to the root directory of this project and run `npm run watch` from the command line and you'll see:

```
$ npm run watch

> @ watch /../projects/kyrio
> gulp watch

[12:00:00] Requiring external module babel-register
[12:00:01] Using gulpfile ~/Projects/kyrio/gulpfile.babel.js
[12:00:01] Starting 'setDevEnv'...
[12:00:01] Finished 'setDevEnv' after 105 μs
[12:00:01] Starting 'compileSass'...
[12:00:01] Finished 'compileSass' after 15 ms
[12:00:01] Starting 'compileJs'...
[12:00:01] Finished 'compileJs' after 13 ms
[12:00:01] Starting 'browserSync'...
[12:00:01] Finished 'browserSync' after 23 ms
[12:00:01] Starting 'watch'...
[12:00:01] Finished 'watch' after 20 ms
[12:00:01] File assets/sass/app.css found.
[12:00:01] Processed media queries:
[12:00:01]   @media screen and (min-width: 600px)
[12:00:01]   @media screen and (min-width: 800px)
[12:00:01]   @media screen and (min-width: 850px)
[12:00:01]   @media screen and (min-width: 1000px)
[12:00:01]   @media screen and (min-width: 1200px)
[12:00:01]   @media screen and (min-width: 1200px) and (min-width: 800px)
[12:00:01]   @media screen and (min-width: 1200px) and (min-width: 1000px)
[12:00:01]   @media screen and (min-width: 1400px)
[12:00:01] File assets/sass/app.css created.
app.css: 22.763kB => 18.403kB 19.15% savings
[BS] Access URLs:
 ------------------------------------
       Local: http://localhost:3000
    External: http://192.168.0.3:3000
 ------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.0.3:3001
 ------------------------------------
[BS] Serving files from: public
```

A browser window will open with the address `localhost:3000` and you'll see the site live. Now you can edit any SCSS files and see the changes automatically happen in the browser window. **Any javascript changes will require you to click reload on the browser window**
