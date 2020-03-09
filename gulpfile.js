// The defaults.
var { gulp, src, dest, watch, series, parallel } = require("gulp");
var rename = require("gulp-rename");
var del = require("delete");

// For styles.
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var postcss = require("gulp-postcss");
var sass = require("gulp-sass");

// For the server.
var browserSync = require("browser-sync");

// The tasks.
function cleanPublic(cb) {
  del(["public/"], cb);
}

function css() {
  var plugins = [autoprefixer(), cssnano()];

  return src("src/*.scss")
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(rename("styles.min.css"))
    .pipe(dest("public/"));
}

function copyFiles() {
  return src(["src/index.html", "src/index.js", "src/fonts/*"], {
    base: "src/"
  }).pipe(dest("public/"));
}

function watchSrc(cb) {
  watch("src/", exports.default);
  cb();
}

function startServer(cb) {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "public/"
    }
  });

  cb();
}

exports.default = series(cleanPublic, parallel(css, copyFiles));
exports.watch = series(exports.default, startServer, watchSrc);
