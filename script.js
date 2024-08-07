class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }
  tick() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = 'I <span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

// Typewriter effect
window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.innerHTML = ".typewrite .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

window.onscroll = function () {
  toggleClassesForResponsiveness();
};

// navbar responsiveness
var navbar = document.querySelector(".primary-nav");
var sticky = navbar.offsetTop;
var contactSection = document.querySelector("#contact");
var sideNavbar = document.querySelector(".sidenavbar-socials");

function toggleClassesForResponsiveness() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  if (window.scrollY >= contact.offsetTop - window.innerHeight) {
    sideNavbar.classList.add("displayNone");
    sideNavbar.style.opacity = 0;
  } else {
    sideNavbar.classList.remove("displayNone");
    sideNavbar.style.opacity = 1;
  }
}

// elements to animate on scroll
const targets = document.querySelectorAll(".fadeIn");

// IntersectionObserverAPI
const observer = new IntersectionObserver(showOnIntersect);

targets.forEach((target) => {
  observer.observe(target);
});

function showOnIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
document.getElementById("currentUTCTime").textContent =
  new Date().toUTCString();
document.getElementById("currentDay").textContent =
  days[new Date().getUTCDay()];
