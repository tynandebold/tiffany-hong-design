// The defaults.
var { gulp, src, dest, watch, series, parallel } = require("gulp");
var rename = require("gulp-rename");
var del = require("delete");
var PUBLIC_DIR = "public/";

// For styles.
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var postcss = require("gulp-postcss");
var sass = require("gulp-sass")(require("sass"));

// For scripts:
var minify = require("gulp-minify");

// For the server.
var browserSync = require("browser-sync");

// The tasks.
function cleanPublic(cb) {
  del([PUBLIC_DIR], cb);
}

function css() {
  var plugins = [autoprefixer(), cssnano()];

  return src("src/*.scss")
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(rename("styles.min.css"))
    .pipe(dest(PUBLIC_DIR));
}

function minifyJs() {
  return src(["src/*.js"])
    .pipe(
      minify({
        ext: {
          min: ".min.js",
        },
        noSource: true,
      })
    )
    .pipe(dest(PUBLIC_DIR));
}

function copyFiles() {
  return src(
    ["src/index.html", "src/resume.pdf", "src/fonts/*", "src/assets/*"],
    {
      base: "src/",
    }
  ).pipe(dest(PUBLIC_DIR));
}

function watchSrc(cb) {
  watch("src/", exports.default);
  cb();
}

function startServer(cb) {
  browserSync.init({
    notify: false,
    server: {
      baseDir: PUBLIC_DIR,
    },
  });

  cb();
}

exports.default = series(cleanPublic, parallel(css, minifyJs, copyFiles));
exports.watch = series(exports.default, startServer, watchSrc);
