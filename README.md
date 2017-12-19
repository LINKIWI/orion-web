![Orion](https://static.kevinlin.info/orion-banner.png)

# orion-web

`orion-web` is a web visualization frontend designed to accompany [`orion-server`](https://github.com/LINKIWI/orion-server).

![orion-web-screenshot-1](https://static.kevinlin.info/orion-web-screenshot-1.png)

![orion-web-screenshot-2](https://static.kevinlin.info/orion-web-screenshot-2.png)

![orion-web-screenshot-3](https://static.kevinlin.info/orion-web-screenshot-3.png)

## Overview

The Orion platform consists of `orion-server` and `orion-web`. The former is a server-side application for recording location events reported by OwnTracks mobile clients. The latter is a web application for visualizing data collected by `orion-server`.

The web interface builds on the functionality provided by the official [OwnTracks Recorder](https://github.com/owntracks/recorder), providing more control over how data points are visualized on a map.

## Features

* View data recorded for any user/device combination
* Filter points based on a time interval
* Filter points below an interactively specified accuracy
* Display points as dots (raw reported locations), a path (time-weighted travel path between location reports), or a heatmap (spatially-weighted density of location reports)

## Installation

You'll need any recent version of Node, `npm`, and a working deployment of [`orion-server`](https://github.com/LINKIWI/orion-server).

First and foremost, create a [MapBox API token](https://www.mapbox.com/help/how-access-tokens-work/) for your deployment. This is used to render the interactive map.

Get the source code and bootstrap the application:

```bash
$ git clone https://github.com/LINKIWI/orion-web.git
$ cd orion-web
$ npm install
```

Build the frontend. If `orion-web` will run at the same URL as `orion-server`, you should omit `ORION_SERVER_URL`. Otherwise, set `ORION_SERVER_URL` to the base URL where `orion-server` is running (e.g. `http://orion.example.com`).

```bash
$ NODE_ENV=production MAPBOX_API_TOKEN=<your Mapbox API token> ORION_SERVER_URL=<base URL where the server is hosted> npm run build
```

That's it! This produces a completely self-contained static frontend file at `dist/index.html`. You can deploy this however you see fit. For example, if you followed the deployment instructions in the README for `orion-server`, you can use an `Alias` directive to map all non-API routes for the Orion virtual host to this static file.

## FAQ

#### How to interpret the path colors?

The colors are time-weighted on a gradient between 100% red and 100% blue based on all location data points selected given the current filter options (namely, the time interval and accuracy filter). The earliest points (by timestamp) are red. The latest points (by timestamp) are blue. Intermediary points are a combination of red and blue based on the ratio of the distance to the earliest timestamp to the total number of seconds contained within the time interval of eligible data points.

#### It looks kind of like Uber

Yes, it does.
