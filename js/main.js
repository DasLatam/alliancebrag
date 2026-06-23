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

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var phone = form.querySelector("#phone").value.trim();
      var affair = form.querySelector("#affair").value.trim();
      var message = form.querySelector("#message").value.trim();

      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n\n" +
        message;

      var mailto =
        "mailto:support@alliancebrag.com" +
        "?subject=" + encodeURIComponent("[AllianceBrag] " + affair) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      var status = document.getElementById("form-status");
      if (status) {
        status.classList.add("is-visible");
      }
    });
  }
});
