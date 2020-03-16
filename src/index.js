(function() {
  init();

  function init() {
    handleEvents();
    initCarousels();
  }

  function handleEvents() {
    scrollToTop();
    initObserver();
  }

  function scrollToTop() {
    document
      .querySelector(".back-to-top")
      .addEventListener("click", function() {
        document.documentElement.scrollTop = 0;
      });
  }

  var $projectTitles;
  function initObserver() {
    window.addEventListener("load", function() {
      $projectTitles = document.querySelectorAll(".project__title");
      createObserver();
    });
  }

  var observer;
  function createObserver() {
    observer = new IntersectionObserver(handleIntersect, { threshold: 0.75 });

    $projectTitles.forEach(function(target) {
      observer.observe(target);
    });
  }

  var handleIntersect = function(entries) {
    entries.forEach(function(entry) {
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
    var $carousel = wrapper.querySelector(".carousel");
    $carousel.classList.remove("is-hidden");
    $carousel.offsetHeight;

    var flkty = new Flickity($carousel, {
      imagesLoaded: true,
      lazyLoad: true,
      pageDots: false,
      wrapAround: true
    });
    var carouselStatus = wrapper.querySelector(".carousel-info");

    function updateStatus() {
      var slideNumber = flkty.selectedIndex + 1;
      carouselStatus.textContent = slideNumber + " of " + flkty.slides.length;
    }

    updateStatus();

    flkty.on("select", updateStatus);
  }
})();
