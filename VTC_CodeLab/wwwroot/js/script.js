document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle functionality
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
          // Close mobile menu after clicking
          navMenu.classList.remove("active")
          hamburger.classList.remove("active")
        }
      }
    })
  })

  // Rotating text animation for hero section
  const rotateItems = document.querySelectorAll(".rotate-item")
  let currentIndex = 0

  function rotateText() {
    rotateItems.forEach((item) => item.classList.remove("active"))
    rotateItems[currentIndex].classList.add("active")
    currentIndex = (currentIndex + 1) % rotateItems.length
  }

  // Start rotation
  if (rotateItems.length > 0) {
    setInterval(rotateText, 3000)
  }

  // Parallax effect for hero section (debounced for performance)
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    const heroContent = document.querySelector(".hero-content")

    if (hero && heroContent) {
      const rate = scrolled * -0.3
      heroContent.style.transform = `translateY(${rate}px)`
    }
    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".course-card, .project-card, .blog-card, .about-text, .about-image",
  )
  animateElements.forEach((element) => {
    observer.observe(element)
  })

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value

      // Simple validation
      if (email && email.includes("@")) {
        // Simulate form submission
        const button = this.querySelector("button")
        const originalText = button.textContent
        button.textContent = "Subscribed!"
        button.style.background = "#10b981"

        setTimeout(() => {
          button.textContent = originalText
          button.style.background = "#4f46e5"
          this.reset()
        }, 2000)
      }
    })
  }

  // Course card hover effects
  const courseCards = document.querySelectorAll(".course-card")
  courseCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Project card click handlers
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent
      alert(`Opening project: ${title}\n\nThis would typically open a detailed project view or external link.`)
    })
  })

  // Navbar background on scroll
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)"
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)"
    }
  })

  // Loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Animate hero elements
    const heroTitle = document.querySelector(".hero-title")
    const heroDescription = document.querySelector(".hero-description")
    const heroButtons = document.querySelector(".hero-buttons")

    setTimeout(() => {
      if (heroTitle) {
        heroTitle.style.opacity = "1"
        heroTitle.style.transform = "translateY(0)"
      }
    }, 300)

    setTimeout(() => {
      if (heroDescription) {
        heroDescription.style.opacity = "1"
        heroDescription.style.transform = "translateY(0)"
      }
    }, 600)

    setTimeout(() => {
      if (heroButtons) {
        heroButtons.style.opacity = "1"
        heroButtons.style.transform = "translateY(0)"
      }
    }, 900)
  })

  // Add loading styles
  const loadingStyles = `
        .hero-title,
        .hero-description,
        .hero-buttons {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .course-card,
        .project-card,
        .blog-card {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .course-card.animate-in,
        .project-card.animate-in,
        .blog-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu.active {
                left: 0;
            }
        }
    `

  const styleSheet = document.createElement("style")
  styleSheet.textContent = loadingStyles
  document.head.appendChild(styleSheet)
})

// Utility function for smooth animations
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start).toLocaleString()
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target.toLocaleString()
    }
  }

  updateCounter()
}

// Animate statistics when they come into view
const statNumbers = document.querySelectorAll(".stat-number")
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target
      const value = Number.parseInt(target.textContent.replace(/[^\d]/g, ""))
      animateCounter(target, value)
      statsObserver.unobserve(target)
    }
  })
})

statNumbers.forEach((stat) => {
  statsObserver.observe(stat)
})
