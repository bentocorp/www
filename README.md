#*work in progress*

# [Bento](https://bentonow.com)

A fork of [Bootstrap](http://getbootstrap.com).

## Table of Contents
- [Getting Started](#getting-started)
- [Building](#building)
  - [Production Distribution](#production-distribution)
- [Development](#development)
  - [Styles](#styles)
  - [JavaScript](#javascript)
- [Upgrading Bootstrap](#upgrading-bootstrap)


## Getting Started
*This guide assumes a [RHEL like](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux_derivatives) environment such as [CentOS](http://centos.org) or [Amazon Linux](http://aws.amazon.com/amazon-linux-ami/). Since the tools used are platform agnostic, it should be straightforward to use a [Debian Like](https://wiki.debian.org/Derivatives) environment or Mac OS X instead.*

Install `git` and `npm`:
```sh
$ sudo yum -y install git npm
```

**TODO**
Set git defaults - enable color, set name and email address, set default editor

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
*See [Bootstrap Grunt documentation](http://getbootstrap.com/getting-started/#grunt-installing)*.

To build for production, checkout master then build css and javascript with grunt. This command compiles less into minified css and concats and minifies javascript files.

```sh
$ git checkout master
$ grunt dist
```

### Production Distribution
**TODO**
- jquery cdn
- fontawesome cdn
- only favicon, index.html, boostrap.min.css, and bootstrap.min.js are required for production distribution
```
www/
│   favicon.ico
│   index.html
├── dist/
│   ├── css/
│   │    └── bootstrap.min.css
│   └── js/
│       └── bootstrap.min.js
└── img/
    └── *
```

**TODO** use grunt copy and jade - build everything into a single dist directory

## Development
**TODO**
- checkout dev branch
- switch out minified css and js
- grunt dist, watch, less, ... other commands ...

### Jade
**TODO**
- HTML templating
- grunt jade

### Styles
**TODO**
- bento-home.less, variables.less, font awesome variables, awesome checkbox
- using source maps and the inspector in chrome
- font awesome
  - git submodule!
  - or maybe just merge the less variable into the static awesome checkbox file
- awesome checkbox
  - static checkout

### JavaScript
**TODO**
- configuring grunt re: including js
- jshint ignore, jquery mode, dev mode, debug mode
- configuring tests & using qunit

## Upgrading Bootstrap
**TODO**
- before you begin - why are you upgrading?
  - check the change log
  - do you need a new feature?
  - are you impacted by a bug?
- adding upstream
- fetch upstream
- copy entire directory for when you make mistakes
- checkout tag as branch (naming convention twb/tag-version)
- merge with dev
- i've removed docs/, various config files
- some files will conflict due to changes
- checkout --ours (readme)
- checkout --theirs
- undersanding diff >>> ==== <<< notation

git rm -r .travis.yml bower.json CHANGELOG.md CNAME composer.json _config.yml CONTRIBUTING.md docs/ fonts/ LICENSE package.js test-infra/

retain: dist/ grunt/ Gruntfile.js js/ less/ package.json