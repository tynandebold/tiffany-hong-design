(function() {
  init();

  function init() {
    handleEvents();
    initCarousels();
  }

  function handleEvents() {
    scrollToTop();
  }

  function scrollToTop() {
    document
      .querySelector(".back-to-top")
      .addEventListener("click", function() {
        document.documentElement.scrollTop = 0;
      });
  }

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
    var flkty = new Flickity($carousel, { pageDots: false, wrapAround: true });
    var carouselStatus = wrapper.querySelector(".carousel-info");

    function updateStatus() {
      var slideNumber = flkty.selectedIndex + 1;
      carouselStatus.textContent = slideNumber + " of " + flkty.slides.length;
    }

    updateStatus();

    flkty.on("select", updateStatus);
  }
})();
