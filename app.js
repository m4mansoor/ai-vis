// DOM elements
const progressFill = document.querySelector('.progress-fill');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');
const heroCtaButton = document.querySelector('.hero-cta');

// Smooth scrolling navigation
function initNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const offsetTop = targetSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth'
        });
        
        // Update active state immediately
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

// Progress bar and active navigation updates
function updateProgressAndNav() {
  const scrollTop = window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = Math.min(100, (scrollTop / documentHeight) * 100);
  
  // Update progress bar
  if (progressFill) {
    progressFill.style.width = scrollPercent + '%';
  }
  
  // Update active navigation link
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    
    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Remove active class from all nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current section nav link
  if (currentSection) {
    const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

// Animated counter function
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Initialize counters when hero section is visible
function initCounters() {
  const heroSection = document.querySelector('.hero-section');
  let countersAnimated = false;
  
  if (!heroSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.target);
          if (!isNaN(target)) {
            animateCounter(stat, target);
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });
  
  observer.observe(heroSection);
}

// Global toggle function for milestones (called from HTML onclick)
function toggleMilestones(phaseId) {
  const toggle = document.querySelector(`[onclick*="${phaseId}"]`);
  const content = document.getElementById(`${phaseId}-milestones`);
  
  if (toggle && content) {
    const isActive = content.classList.contains('active');
    
    // Toggle classes
    toggle.classList.toggle('active');
    content.classList.toggle('active');
    
    // Update icon rotation
    const icon = toggle.querySelector('.toggle-icon');
    if (icon) {
      icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  }
}

// Initialize milestone toggles with proper event handling
function initMilestoneToggles() {
  const toggles = document.querySelectorAll('.milestones-toggle');
  
  toggles.forEach(toggle => {
    // Remove existing onclick to avoid conflicts
    toggle.removeAttribute('onclick');
    
    toggle.addEventListener('click', () => {
      // Extract phase ID from the toggle's data or nearest phase card
      const phaseCard = toggle.closest('.phase-card');
      let phaseId = '';
      
      if (phaseCard) {
        const phaseTitle = phaseCard.querySelector('h3').textContent;
        if (phaseTitle.includes('Phase 1')) {
          phaseId = 'phase1';
        } else if (phaseTitle.includes('Phase 2')) {
          phaseId = 'phase2';
        }
      }
      
      if (phaseId) {
        toggleMilestones(phaseId);
      }
    });
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const animateOnScroll = document.querySelectorAll('.benefit-card, .ip-category, .gcc-feature, .investment-stat, .metric-item, .contact-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateOnScroll.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Hero CTA button functionality
function initHeroCTA() {
  if (heroCtaButton) {
    heroCtaButton.addEventListener('click', (e) => {
      e.preventDefault();
      const benefitsSection = document.querySelector('#benefits');
      if (benefitsSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const offsetTop = benefitsSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth'
        });
      }
    });
  }
}

// Parallax effect for hero background
function initParallaxEffect() {
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroBackground) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.3;
      heroBackground.style.transform = `translateY(${parallax}px)`;
    });
  }
}

// Enhanced card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.benefit-card, .gcc-feature, .investment-stat, .contact-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.style.transform.includes('translateY')) {
        card.style.transform = 'translateY(-8px)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// Scroll-triggered number animations for investment section
function initInvestmentCounters() {
  const investmentNumbers = document.querySelectorAll('.investment-number');
  let investmentAnimated = false;
  
  const investmentSection = document.querySelector('.investment-section');
  
  if (!investmentSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !investmentAnimated) {
        investmentAnimated = true;
        
        investmentNumbers.forEach(number => {
          const text = number.textContent.trim();
          let target = 0;
          
          // Extract numeric value from text
          const numMatch = text.match(/[\d,]+/);
          if (numMatch) {
            target = parseInt(numMatch[0].replace(/,/g, ''));
          }
          
          if (target > 0) {
            // Store original content for restoration
            const originalContent = text;
            
            // Animate from 0 to target
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
                number.textContent = originalContent; // Restore original formatting
              } else {
                number.textContent = Math.floor(current);
              }
            }, 20);
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });
  
  observer.observe(investmentSection);
}

// Enhanced smooth scrolling function
function smoothScrollTo(target, duration = 800) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  
  const navHeight = document.querySelector('.navbar').offsetHeight;
  const targetPosition = targetElement.offsetTop - navHeight - 20;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  requestAnimationFrame(animation);
}

// Keyboard navigation support
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Only trigger if no input is focused
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }
    
    switch(e.key.toLowerCase()) {
      case 'h':
        smoothScrollTo('#hero');
        break;
      case 'b':
        smoothScrollTo('#benefits');
        break;
      case 'i':
        smoothScrollTo('#ip-ownership');
        break;
      case 't':
        smoothScrollTo('#technical');
        break;
      case 'g':
        smoothScrollTo('#gcc');
        break;
      case 'v':
        smoothScrollTo('#investment');
        break;
      case 'c':
        smoothScrollTo('#cta');
        break;
    }
  });
}

// Contact item interaction effects
function initContactInteractions() {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('h5').textContent;
      
      // Add visual feedback
      const originalBorder = item.style.borderColor;
      item.style.borderColor = 'var(--automotive-cyan-accent)';
      item.style.transform = 'scale(0.98)';
      
      setTimeout(() => {
        item.style.borderColor = originalBorder;
        item.style.transform = 'translateY(-5px)';
        
        // Show contextual message
        showContactMessage(title);
      }, 150);
    });
  });
}

// Show contact message based on clicked item
function showContactMessage(contactType) {
  let message = '';
  
  switch(contactType) {
    case 'Technical Consultation':
      message = 'Our AI and automation specialists are ready to discuss the technical aspects of implementing this solution for your business.';
      break;
    case 'Investment Planning':
      message = 'Let our team provide you with detailed ROI projections and implementation timelines tailored to your specific requirements.';
      break;
    case 'Market Positioning':
      message = 'Discover how this technology can position your business as the market leader in AI-powered vehicle services.';
      break;
    default:
      message = 'Thank you for your interest. Our team will be in touch to discuss your specific needs.';
  }
  
  // Create and show temporary message overlay
  const messageOverlay = document.createElement('div');
  messageOverlay.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(26, 26, 46, 0.95);
    color: white;
    padding: 30px;
    border-radius: 12px;
    border: 2px solid var(--automotive-cyan-accent);
    max-width: 500px;
    text-align: center;
    z-index: 10000;
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
    backdrop-filter: blur(10px);
  `;
  
  messageOverlay.innerHTML = `
    <h4 style="color: var(--automotive-cyan-accent); margin-bottom: 15px;">${contactType}</h4>
    <p style="margin-bottom: 20px; line-height: 1.6;">${message}</p>
    <button onclick="this.parentElement.remove()" style="
      background: linear-gradient(135deg, var(--automotive-cyan-accent), var(--automotive-orange-accent));
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    ">Close</button>
  `;
  
  document.body.appendChild(messageOverlay);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageOverlay.parentElement) {
      messageOverlay.remove();
    }
  }, 5000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  initNavigation();
  initCounters();
  initMilestoneToggles();
  initScrollAnimations();
  initHeroCTA();
  
  // Enhanced effects
  initParallaxEffect();
  initCardHoverEffects();
  initInvestmentCounters();
  initKeyboardNavigation();
  initContactInteractions();
  
  // Scroll event listener for progress bar and navigation
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    // Throttle scroll events for better performance
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
      updateProgressAndNav();
    }, 10);
  });
  
  // Initial call to set correct active state
  updateProgressAndNav();
});

// Resize handler for responsive adjustments
window.addEventListener('resize', () => {
  // Recalculate any size-dependent animations or positions
  updateProgressAndNav();
});

// Export functions for global access
window.toggleMilestones = toggleMilestones;
window.smoothScrollTo = smoothScrollTo;