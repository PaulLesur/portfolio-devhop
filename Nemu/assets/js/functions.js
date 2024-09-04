/*================================================
*
* Template name : Nemu
* Version       : 1.0
* Author        : FlaTheme
* Author URL    : https://themeforest.net/user/flatheme
*
* Table of Contents :
* 1.  Preloader
* 2.  Cursor Gradient
* 3.  Header Nav
* 4.  Toggle Menu
* 5.  Lightbox
* 6.  Maps
* 7.  Portfolio Grid Filter
* 8.  Progress bar
* 9.  Sliders
* 10. Contact Form
*
================================================*/
"use strict";


/*===============================================
  1. Preloader
===============================================*/
var body = document.body;

window.addEventListener("load", function() {
  document.body.classList.add("loaded");
});

var preloaderType = body.getAttribute("data-preloader");

if (preloaderType === "true") {
  var preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = "<div class='loader'></div>";
  body.appendChild(preloader);
}


/*===============================================
  2. Cursor Gradient
===============================================*/
var cursor = document.querySelector('.cursor-gradient');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});


/*===============================================
  3. Header Nav
===============================================*/
var navList = document.querySelector(".nav-list");

if (navList) {
  var navToggle = document.querySelector(".nav-toggle");

  // Open //
  navToggle.addEventListener("click", function() {
    if (navList.classList.contains("show")) {
      navList.classList.remove("show");
      navToggle.classList.remove("active");
    } else {
      navList.classList.add("show");
      navToggle.classList.add("active");
    }
  });

  document.addEventListener("click", function(e) {
    if (!e.target.closest(".nav-list, .nav-toggle")) {
      if (navList.classList.contains("show")) {
        navList.classList.remove("show");
        navToggle.classList.remove("active");
      }
    }
  });
}


/*===============================================
  4. Toggle Menu
===============================================*/
var toggleMenu = document.querySelector(".toggle-menu");

if (toggleMenu) {
  var toggleMenuBtn = document.querySelector(".toggle-menu-btn");

  // Open //
  toggleMenuBtn.addEventListener("click", function() {
    if (toggleMenu.classList.contains("show")) {
      toggleMenu.classList.remove("show");
      toggleMenuBtn.classList.remove("active");
    } else {
      toggleMenu.classList.add("show");
      toggleMenuBtn.classList.add("active");
    }
  });

  document.addEventListener("click", function(e) {
    if (!e.target.closest(".toggle-menu, .toggle-menu-btn")) {
      if (toggleMenu.classList.contains("show")) {
        toggleMenu.classList.remove("show");
        toggleMenuBtn.classList.remove("active");
      }
    }
  });
}


/*===============================================
  5. Lightbox
===============================================*/
const lightbox = GLightbox();


/*===============================================
  6. Maps
===============================================*/
var mapCanvas = $(".gmap");

if (mapCanvas.length) {
  var m,divId,initLatitude, initLongitude, map;

  for (var i = 0; i < mapCanvas.length; i++) {
    m = mapCanvas[i];

    initLatitude = m.dataset["latitude"];
    initLongitude = m.dataset["longitude"];
    divId = "#"+ m["id"];

    map = new GMaps({
      el: divId,
      lat: initLatitude,
      lng: initLongitude,
      zoom: 16,
      scrollwheel: false,
      styles: [
          /* style your map at https://snazzymaps.com/editor and paste JSON here */
      ]
    });

    map.addMarker({
      lat : initLatitude,
      lng : initLongitude
    });
  }
}


/*===============================================
  7. Portfolio Grid Filter
===============================================*/
var pGrid = $(".portfolio-grid");

if (pGrid.length) {
  var mixer = mixitup('.portfolio-grid', {
    selectors: {
        target: '.portfolio-item'
    },
    animation: {
        duration: 250
    }
  });
}


/*===============================================
  8. Progress Bar
===============================================*/
$(".animated-progress div").each(function () {
  $(this).appear(function () {
    $(this).css("width", $(this).attr("data-progress") + "%");
    $(this).addClass("progress-show");
  },{accX: 0, accY: -10})
});


/*===============================================
  9. Sliders
===============================================*/
//
// Portfolio Slider //
//
var swiper = new Swiper(".portfolio-slider", {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: ".portfolio-next",
    prevEl: ".portfolio-prev",
  },
});


//
// Testimonial Slider //
//
var swiper = new Swiper(".testimonial-slider", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".testimonial-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
});


//
// Sliding Text //
//
var swiper = new Swiper(".sliding-text", {
  slidesPerView: "auto",
  spaceBetween: 70,
  speed: 20000,
  loop: true,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    clickable: false,
    pauseOnMouseEnter: false,
    disableOnInteraction: false,
  },
});


//
// Sliding Text - Reverse //
//
var swiper = new Swiper(".sliding-text-reverse", {
  slidesPerView: "auto",
  spaceBetween: 70,
  speed: 20000,
  loop: true,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    clickable: false,
    pauseOnMouseEnter: false,
    disableOnInteraction: false,
    reverseDirection: true,
  },
});


/*===============================================
  10. Contact Form
===============================================*/
$("#contactform").on("submit", function(e) {
  var name = $("#name").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var message = $("#message").val();

  if (name === "") {
    $("#name").addClass("error-color");
  }
  if (email === "") {
    $("#email").addClass("error-color");
  }
  if (subject === "") {
    $("#subject").addClass("error-color");
  }
  if (message === "") {
    $("#message").addClass("error-color");
  }

  else {
    $.ajax({
      url:"assets/php/contact-form.php",
      data:$(this).serialize(),
      type:"POST",
      success:function(data){
        $("#success").addClass("show-result"); //=== Show Success Message==
        $("#contactform").each(function(){
          this.reset();
        });
      },
      error:function(data){
        $("#error").addClass("show-result"); //===Show Error Message====
      }
    });
    var forms = $("#contactform input, #contactform textarea");
    forms.removeClass("error-color");
  }

  e.preventDefault();
});