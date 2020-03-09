(function() {
  init();

  function init() {
    handleEvents();
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
})();
