(function () {
  "use strict";

  /**
   * Toggle the scrolled class on the body
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }


  document.addEventListener('DOMContentLoaded', function () {
    const portfolioContainer = document.querySelector('.isotope-container');
  
    if (portfolioContainer) {
      const isotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
      });
  
      // Filtres
      const filters = document.querySelectorAll('.portfolio-filters li');
      filters.forEach(filter => {
        filter.addEventListener('click', function () {
          // Retirer la classe active de tous les filtres
          filters.forEach(el => el.classList.remove('filter-active'));
          // Ajouter la classe active au filtre sélectionné
          this.classList.add('filter-active');
  
          // Filtrer les éléments
          const filterValue = this.getAttribute('data-filter');
          isotope.arrange({ filter: filterValue });
        });
      });
    }
  });
  

  /**
   * Handle the mobile navigation toggle
   */
  function setupMobileMenu() {
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector("#navmenu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        document.body.classList.toggle("mobile-nav-active");
        navToggle.classList.toggle("bi-list");
        navToggle.classList.toggle("bi-x");
      });

      // Close mobile menu on clicking a link
      document.querySelectorAll("#navmenu a").forEach((link) => {
        link.addEventListener("click", () => {
          if (document.body.classList.contains("mobile-nav-active")) {
            document.body.classList.remove("mobile-nav-active");
            navToggle.classList.add("bi-list");
            navToggle.classList.remove("bi-x");
          }
        });
      });
    }
  }

  /**
   * Highlight the active menu link based on the current page
   */
  function setupActiveClass() {
    const currentPage = location.pathname.split("/").pop();
    document.querySelectorAll("#navmenu a").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  /**
   * Initialize AOS library
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  /**
   * Scroll-to-top button functionality
   */
  function setupScrollTop() {
    const scrollTop = document.querySelector(".scroll-top");
    if (!scrollTop) return;

    function toggleScrollTop() {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }

    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.addEventListener("scroll", toggleScrollTop);
    window.addEventListener("load", toggleScrollTop);
  }

  /**
   * Load header and footer dynamically
   */
  function loadDynamicHeaderFooter() {
    // Load header
    fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
        const headerPlaceholder = document.getElementById("header-placeholder");
        if (headerPlaceholder) {
          headerPlaceholder.outerHTML = data;
          setupMobileMenu(); // Re-initialize mobile menu
          setupActiveClass(); // Re-apply active class
        }
      });

    // Load footer
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
        const footerPlaceholder = document.getElementById("footer-placeholder");
        if (footerPlaceholder) {
          footerPlaceholder.outerHTML = data;
        }
      });
  }

  /**
   * Preloader removal
   */
  function removePreloader() {
    const preloader = document.querySelector("#preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        preloader.remove();
      });
    }
  }

  /**
   * Initialize Typed.js
   */
  function initTypedJS() {
    const selectTyped = document.querySelector(".typed");
    if (selectTyped) {
      const typedStrings = selectTyped.getAttribute("data-typed-items").split(",");
      new Typed(".typed", {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
      });
    }
  }

  /**
   * Initialize all functions
   */
  function init() {
    window.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    setupScrollTop();
    removePreloader();
    aosInit();
    initTypedJS();
    loadDynamicHeaderFooter();
  }

  init();
})();