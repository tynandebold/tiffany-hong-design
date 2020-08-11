(function () {
  init();

  function init() {
    initCarousels();
    handleEvents();

    var isHeroInView = isElemInViewport(document.querySelector(".hero"));
    setTimeout(
      function () {
        initCarousels();
      },
      isHeroInView ? 1750 : 1000
    );
  }

  function handleEvents() {
    initObserver();
  }

  var $projectTitles;
  function initObserver() {
    window.addEventListener("load", function () {
      $projectTitles = document.querySelectorAll(".project__title");
      createObserver();
    });
  }

  var observer;
  function createObserver() {
    observer = new IntersectionObserver(handleIntersect, { threshold: 0.75 });

    $projectTitles.forEach(function (target) {
      observer.observe(target);
    });
  }

  var handleIntersect = function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  };

  function initCarousels() {
    var $carouselWrappers = document.querySelectorAll(".carousel-wrapper");

    for (var i = 0; i < $carouselWrappers.length; i++) {
      var $wrapper = $carouselWrappers[i];
      initCarouselWrapper($wrapper);
    }
  }

  function initCarouselWrapper(wrapper) {
    var $slideNums = wrapper.querySelector(".carousel-info");
    var $carousel = wrapper.querySelector(".carousel");
    var videos = wrapper.querySelectorAll("video");

    var flktyCarousel = new Flickity($carousel, {
      imagesLoaded: true,
      lazyLoad: 1,
      pageDots: false,
      setGallerySize: false,
      wrapAround: true,
    });

    function updateCarouselSlideNumber() {
      var slideNum = flktyCarousel.selectedIndex + 1;
      $slideNums.textContent = slideNum + " of " + flktyCarousel.slides.length;
    }

    if (!!videos.length) {
      videos.forEach(function (video) {
        video.play();
        video.addEventListener("loadeddata", onLoadedVideoData);
      });
    }

    function onLoadedVideoData(event) {
      var cell = flktyCarousel.getParentCell(event.target);
      flktyCarousel.cellSizeChange(cell && cell.element);
    }

    $carousel.classList.remove("is-hidden");
    $carousel.offsetHeight;

    flktyCarousel.on("select", updateCarouselSlideNumber);
  }

  function isElemInViewport(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return !(
      Math.floor(
        100 - ((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100
      ) < 1 ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < 1
    );
  }

  var canvas = document.querySelector(".canvas");
  var canvasContext = canvas.getContext("2d");
  var colorConstant = 161;

  function col(x, y, r, g, b) {
    canvasContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    canvasContext.fillRect(x, y, 1, 1);
  }

  function R(x, y, t) {
    return Math.floor(colorConstant + 64 * Math.cos((x * x - y * y) / 300 + t));
  }

  function G(x, y, t) {
    return Math.floor(
      colorConstant +
        64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
    );
  }

  function B(x, y, t) {
    return Math.floor(
      colorConstant +
        64 *
          Math.sin(
            5 * Math.sin(t / 9) +
              ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
          )
    );
  }

  var t = 0;

  function run() {
    for (x = 0; x <= 35; x++) {
      for (y = 0; y <= 35; y++) {
        col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
      }
    }
    t = t + 0.015;

    window.requestAnimationFrame(run);
  }

  run();
})();
