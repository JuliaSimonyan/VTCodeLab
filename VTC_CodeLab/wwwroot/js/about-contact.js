// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .value-card, .team-member")
  animatedElements.forEach((el) => {
    el.style.animationPlayState = "paused"
    observer.observe(el)
  })

  // Counter animation for stats
  const counterBoxes = document.querySelectorAll(".counter-box")
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.dataset.target)
        const numberElement = entry.target.querySelector(".stat-number")
        animateCounter(numberElement, 0, target, 2000)
        counterObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  counterBoxes.forEach((box) => counterObserver.observe(box))

  // FAQ accordion
  const faqQuestions = document.querySelectorAll(".faq-question")
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement
      const isActive = faqItem.classList.contains("active")

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active")
      }
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }
})

// Counter animation function
function animateCounter(element, start, end, duration) {
  const range = end - start
  const increment = range / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= end) {
      element.textContent = end
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 16)
}

// Form submission handler
function handleFormSubmit(e) {
  e.preventDefault()

  const submitBtn = e.target.querySelector(".submit-btn")
  const formMessage = document.getElementById("formMessage")

  // Add loading state
  submitBtn.classList.add("loading")
  submitBtn.disabled = true
  formMessage.style.display = "none"

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    submitBtn.classList.remove("loading")
    submitBtn.disabled = false

    // Show success message
    formMessage.className = "form-message success"
    formMessage.textContent = "Thank you! Your message has been sent successfully."
    formMessage.style.display = "block"

    // Reset form
    e.target.reset()

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)
  }, 2000)
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
