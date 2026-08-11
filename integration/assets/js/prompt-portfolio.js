(function () {
  if (!document.body.classList.contains("page-prompt-library")) return;

  var selector = ".pp-code-panel, .pp-code-panel__pre, .prompt-portfolio-card__preview";

  function isPromptCode(target) {
    return target && target.closest && target.closest(selector);
  }

  document.addEventListener("copy", function (event) {
    if (isPromptCode(event.target)) event.preventDefault();
  });

  document.addEventListener("cut", function (event) {
    if (isPromptCode(event.target)) event.preventDefault();
  });

  document.addEventListener("selectstart", function (event) {
    if (isPromptCode(event.target)) event.preventDefault();
  });

  document.querySelectorAll(selector).forEach(function (el) {
    el.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  });
})();
