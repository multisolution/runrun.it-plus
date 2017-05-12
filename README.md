# Runrun.it++ [![Build Status](https://travis-ci.org/multisolution/runrun.it-plus.svg?branch=master)](https://travis-ci.org/multisolution/runrun.it-plus)

A desktop client for [Runrun.it](http://runrun.it/) with additional features:

* Upload/download task attachments from a local server - [How to](#documents)

It is based on [Electron](https://electron.atom.io/), the same platform that powers [this awesome apps](https://electron.atom.io/apps/) and open-sourced under BSD-3-Clause. Enjoy.

## Getting started

* **Clone it and change dir**
* Install dependencies with `yarn` or `npm install`
* Copy `settings.dist` to `settings.json` and define proper configuration

## Features

### Documents

We often transfer large files as Runrun.it tasks attachments and the download times is a problem, also it makes no sense to upload a file all over the Internet from a local network to other user download it to the origin again.<br>
With **Runrun.it++** you can specify an FTP server as a local storage for all of this files *(you also need a Redis server to keep track of this documents)*.
