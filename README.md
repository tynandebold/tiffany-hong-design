# Tiffany Hong Design

A portfolio website built using good old HTML, CSS, and vanilla JS.

## Installation and development

Install the dependencies and start the application. Gulp is used as a build system.

```sh
$ npm install
$ npm start
```

A browser window will open on a localhost URL. Gulp watches for changes in the `/src` directory, and when one is detected will run some tasks and move everything into the `/public` directory.

All fonts and images are self-hosted.

[Flickity](https://flickity.metafizzy.co/) is used for the carousels.

## Deployment

The website is hosted with Netlify, served from the `/public` directory, and deployed each time a commit is made to the master branch.
