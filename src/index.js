(function () {
  init();

  function init() {
    handleEvents();

    var isHeroInView = isElemInViewport(document.querySelector('.hero'));
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
    window.addEventListener('load', function () {
      $projectTitles = document.querySelectorAll('.project__title');
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
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  };

  function initCarousels() {
    var $carouselWrappers = document.querySelectorAll('.carousel-wrapper');

    for (var i = 0; i < $carouselWrappers.length; i++) {
      var $wrapper = $carouselWrappers[i];
      initCarouselWrapper($wrapper);
    }
  }

  function initCarouselWrapper(wrapper) {
    var $slideNums = wrapper.querySelector('.carousel-info');
    var $carousel = wrapper.querySelector('.carousel');
    var videos = wrapper.querySelectorAll('video');

    var flktyCarousel = new Flickity($carousel, {
      imagesLoaded: true,
      lazyLoad: 1,
      pageDots: false,
      setGallerySize: false,
      wrapAround: true,
    });

    function updateCarouselSlideNumber() {
      var slideNum = flktyCarousel.selectedIndex + 1;
      $slideNums.textContent = slideNum + ' of ' + flktyCarousel.slides.length;
    }

    if (!!videos.length) {
      videos.forEach(function (video) {
        video.play();
        video.addEventListener('loadeddata', onLoadedVideoData);
      });
    }

    function onLoadedVideoData(event) {
      var cell = flktyCarousel.getParentCell(event.target);
      flktyCarousel.cellSizeChange(cell && cell.element);
    }

    $carousel.classList.remove('is-hidden');
    $carousel.offsetHeight;

    flktyCarousel.on('select', updateCarouselSlideNumber);
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
})();
