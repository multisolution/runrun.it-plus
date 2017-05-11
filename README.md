# Runrun.it++ [![CircleCI](https://circleci.com/gh/multisolution/runrun.it-plus.svg?style=svg)](https://circleci.com/gh/multisolution/runrun.it-plus)

A desktop client for [Runrun.it](http://runrun.it/) with additional features:

* Upload/download task attachments from a local server - [How to](#documents)

## Features

### Documents

We often transfer large file through Runrun.it tasks as attachments and the download times was a problem, also it makes no sense to upload a file all over the Internet from a local network to other user download it to the orign network again.<br>With **Runrun.it++** you can specify a FTP server as a local bridge for all of this files (you also need a Redis server to keep track of this documents).
