# [bentonow.com](https://bentonow.com)

A fork of [Bootstrap](https://github.com/twbs/bootstrap).

## Table of Contents
- [Getting Started](#getting-started)
- [Building](#building)
  - [Production Distribution](#production-distribution)
- [Development](#development)
  - [Jade] (#jade)
  - [Styles](#styles)
  - [JavaScript](#javascript)
  - [Images](#images)
- [Upgrading Bootstrap](#upgrading-bootstrap)


## Getting Started
*This guide assumes a [RHEL like](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux_derivatives) environment such as [CentOS](http://centos.org) or [Amazon Linux](http://aws.amazon.com/amazon-linux-ami/). Since the tools used are platform agnostic, it should be straightforward to use a [Debian like](https://wiki.debian.org/Derivatives) environment or Mac OS X instead.*

Install `git` and `npm`:
```sh
$ sudo yum -y install git npm
```

[First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

```sh
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
$ git config --global core.editor nano
$ git config --global color.ui true
```

Install [Grunt](http://gruntjs.com)
```sh
$ sudo npm -g install grunt-cli
```

[Generate SSH Keys for GitHub](https://help.github.com/articles/generating-ssh-keys/)

Clone the repository:
```sh
$ git clone git@github.com:bentocorp/www.git
```

Install project dependencies:
```sh
$ cd www
$ npm install
```

## Building
Grunt is used to to build HTML, CSS, and JS. The Gruntfile in this project is a modified version of the official Bootstrap Gruntfile. *See [Bootstrap Grunt documentation](http://getbootstrap.com/getting-started/#grunt-installing)*.

To build for production, checkout master, then build with grunt.

```sh
$ git checkout master
$ grunt dist
```

Minified CSS and JS files are generated but not automatically used. Manually update `header.jade` and `scripts.jade`, changing `bootstrap.css` to `bootstrap.min.css` and `bootstrap.js` to `bootstrap.min.js`. Alternately, remove standard versions and rename minified versions to `bootstrap.css` and `bootstrap.js`, respectively.

### Production Distribution

All files needed for production distribution are contained in the `dist` directory. If desired, a zip file of `dist` can be generated.

```sh
$ grunt compress
```

Directory structure:

```
dist/
│   favicon.ico
│   index.html
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.min.css
│   └── bootstrap.css.map
├── js/
│   ├── bootstrap.js
│   ├── bootstrap.min.js
│   └── npm.js
└── img/
    └── *
```

`bootstrap.css`, `bootstrap.css.map`, `bootstrap.js`, and `npm.js` are not needed and can be removed if using minified CSS and JS in production.

## Development

To build for development, checkout the dev branch and switch out minified CSS and JS for their expanded versions. Non-minified CSS is required for the source map `bootstrap.css.map` to work. [Source maps](https://developer.chrome.com/devtools/docs/css-preprocessors) allow your browser to determine which LESS file a given style can be found in.

```sh
$ git checkout dev
$ grunt dist
```

When editing Jade, LESS, and JavaScript, `grunt watch` will automatically recompile when a file changes.

```sh
$ grunt watch
```

Be aware that `grunt watch` is not the same as `grunt dist` as it only recompiles files which have changed. Always run `grunt dist` prior to committing code.

To run the watcher in the background, start it normally with `grunt watch`. Pause the process with `control + z`, and background it with `bg`. You now have an interactive terminal with the watcher running in the background. The watcher will continue to print to your terminal. Bring it to the foreground with `fg`, and kill it with `control + c`. To check for a running process, `ps -e | grep "grunt"`. To kill the process without bringing it to the foreground, `pkill "grunt"`.

If you're having difficulty locating which file something is found in, search for it with `grep -RF "some search terms" *`.

### Jade
Jade is used to build HTML. *See [jade-lang.com](http://jade-lang.com) for Jade documentation.*

`dist/index.html` is generated from `jade/index.jade`, which depends on templates located in the `jade` directory. To rebuild only jade, use `grunt jade`. Jade is also rebuilt with `grunt watch` and `grunt dist`.

### Styles
LESS is used to build CSS. *See [lesscss.org](http://lesscss.org/) for LESS documentation.*

`less/bento.less`, which depends on `bento-*.less` files located in the `less` directory, defines custom styles for this project.

Some core Bootstrap files have been modified, however most modifications are to variables located in `variables.less`.

The main css file for this project is `bootstrap.less`. Order matters! You must define variables and mixins before using them (higher up in the file).

`grunt less` can be used to compile LESS into CSS. `grunt dist-css` will compile, autoprefix, comb and minify your CSS. `grunt watch` and `grunt dist` call `dist-css`.

### JavaScript
`js/main.js` contains custom JavaScript.

When using `grunt watch`, all files in the `js` directory are run though jshint. Do not place minified JavaScript in the `js` directory to avoid jshint errors.

To select which scripts are concatenated into `bootstrap.js`, edit `Gruntfile.js`. Add or remove files from the entry for `concat: bootstrap: src`. Order matters! Scripts that are higher up will be placed higer up in the output file. Dependancies must be defined before they are used.

JSHint will help you write better JavaScript, but it can cause headaches when trying to include a library which is not compliant. You can ignore entire sections of code like this:

```
/* jshint ignore: start */
... code here ...
/* jshint ignore: end */
```

JSHint will also complain if you're debugging code with `console` or `debugger`. To enable the console, place `/* jshint devel: true */` before the `console` statement. To enable the debugger, place `/* jshint debug: true */` before the `debugger` keyword. Many more options can be found in the [JSHint documentation](http://jshint.com/docs/).

`grunt watch` will concat the JS files defined in `Gruntfile.js` into `bootstrap.js`. `grunt dist` will also produce minified JS.

### Images
Images are copied from `img` into `dist/img`. Do not put images directly in `dist` as they will be deleted the next time `grunt dist` is run. Images may also be copied with `grunt copy:img`. Note that `grunt watch` does not copy images.

The favicon is an exception. It is located directly in the project root and is copied into `dist` by `grunt dist` and `grunt copy:favicon`. The watcher will not automatically copy the favicon.

## Upgrading Bootstrap
Before you upgrade Bootstrap, ask yourself "why am I doing this?" If you answer is "because a new version is available", **do not** continue. If, however, you have encountered a bug or need a new feature, then you might consider upgrading Bootstrap. 

Always review the [change log](https://github.com/twbs/bootstrap/releases) before upgrading.

If you have not upgraded Bootstrap previously, you will need to add the `upstream` repository.

```sh
$ git remote add upstream git@github.com:twbs/bootstrap.git
```

Fetch upstream changes:

```sh
$ git fetch upstream
$ git fetch --tags upstream
```

Before going further, I strongly recommend copying your entire working directory. Although it's possible to revert changes using git, it can get complicated. It's much easier to have an unchanged copy to go back to if (and when) you run into merge issues.

```sh
$ cd ..
$ cp -R www www.bak
$ cd www
```

Checkout the new version of Bootstrap into a branch. I've chosen to follow the naming convention `twb/{version}` for these branches.

```sh
$ git checkout -b twb/v3.3.5 v3.3.5
```

Merge this branch with `dev`.

```sh
$ git checkout dev
$ git merge twb/v3.3.5
```

**EXPECT CONFLICTS**

Files and folders have been removed, including:

```
.travis.yml
bower.json 
CHANGELOG.md 
CNAME 
composer.json 
_config.yml 
CONTRIBUTING.md 
docs/ 
fonts/ 
LICENSE 
package.js 
test-infra/
```

Files have been changed, including:

```
Gruntfile.js
less/variables.less
```

Files have been added, including;
```
jade/
less/bento-*.less
js/main.js
```

After performing the merge, while still in a conflicted state, use `git rm -r <file>` to remove unwanted files and folders.

To prefer the local version of an entire file, use `git checkout --ours <file>`. This is useful for files like `README.md` which exist in upstream, but are completely changed in this project.

To prefer the remote version of an entire file, use `git checkout --theirs <file>`. This may be useful if a bugfix was applied to a file prior to that fix being in an official release.

To keep some local and some remote changes, you will need to manually edit conclicting files. In a conflicting file, you will see something like this:

```
<<<<<<< HEAD:file.txt
Hello world
=======
Goodbye
>>>>>>> [git hash]:file.txt
```

Where `Hello world`, the content above the `=======`, are local changes from `dev` (or the branch you merged Bootstrap into). The content below the `=======`, in this case `Goodbye`, is from the other commit - in this case upstream Bootstrap. Remove the marker lines added by git as well as the code which you do not which to keep. Add the file with `git add <file>`.

Once all conflicts have been resolved, commit and push.
```sh
$ git commit -m "upgraded Bootstrap"
$ git push origin dev
```
