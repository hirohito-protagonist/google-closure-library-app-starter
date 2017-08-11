# google-closure-library-app-starter
This project is an application skeleton for build web apps with google closure library.

___

### Quick start
**Make sure you have Node version >= 6.0 and NPM >= 3**

```bash
# clone repo
# --depth 1 removes all but one .git commit history
git clone --depth https://github.com/hirohito-protagonist/google-closure-library-app-starter.git

# change directory to the repo
cd google-closure-library-app-starter

# install with npm
npm install

# start the server
npm start

# The local server connection should be open. 
# By default is http://localhost:8080 so the development link will be 
# http://localhost:8080/src/html/app.html
```

___

# Getting Started
## Dependencies
* Install latest [node](https://nodejs.org/en/) and make sure you have at least version `6.x.x` for Node and `3.x.x` for NPM.
```bash
> node -v
v6.11.1

> npm -v
3.10.10
```
* Install latest [java](http://www.oracle.com/technetwork/java/javase/downloads/index.html) jdk or jre. It's needed for closure compiler and soy templates.
```bash
> java -version
java version "1.8.0_144"
Java(TM) SE Runtime Environment (build 1.8.0_144-b01)
Java HotSpot(TM) 64-Bit Server VM (build 25.144-b01, mixed mode)
```
* Download latest [closure compiler binary](https://github.com/google/closure-compiler/wiki/Binary-Downloads) and then unzip it to `closure-compiler` folder in the project. The closure compiler is just need when you want to build production build.

## Installing
* `clone` this repo
* `npm install` to install all dependencies

### server
```bash
npm start
```

### build files
```bash
npm run build
```
___

# TODO
* add sass, sprite support
* add unit test support
* eslint
* dev server with livereload

___

# License
 [MIT](/LICENSE)
