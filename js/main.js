document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      toggle.classList.toggle("is-active");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-active");
      });
    });
  }

  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    }
  });

  var year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var subscribeForm = document.getElementById("subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("subscribe-email").value.trim();
      if (!email) return;
      var subject = encodeURIComponent("Newsletter Subscription");
      var body = encodeURIComponent(
        "Hi AllianceBrag,\n\nPlease add this email to your newsletter list: " + email + "\n\nThanks!"
      );
      window.location.href = "mailto:support@alliancebrag.com?subject=" + subject + "&body=" + body;
    });
  }
});
