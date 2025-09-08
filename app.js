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
  const animateOnScroll = document.querySelectorAll('.benefit-card, .ip-category, .gcc-feature, .investment-stat, .metric-item, .team-option-card, .benefit-badge');
  
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

// CTA buttons functionality
function initCTAButtons() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const buttonText = button.textContent.trim();
      
      if (buttonText.includes('Schedule Consultation')) {
        e.preventDefault();
        // Add visual feedback
        const originalText = button.textContent;
        button.textContent = 'Scheduling...';
        button.style.opacity = '0.7';
        
        setTimeout(() => {
          alert('Thank you for your interest! A consultation representative will contact you within 24 hours.');
          button.textContent = originalText;
          button.style.opacity = '1';
        }, 1000);
        
      } else if (buttonText.includes('Download Full Proposal')) {
        e.preventDefault();
        // Add visual feedback
        const originalText = button.textContent;
        button.textContent = 'Downloading...';
        button.style.opacity = '0.7';
        
        setTimeout(() => {
          alert('Full proposal PDF download initiated. Please check your downloads folder.');
          button.textContent = originalText;
          button.style.opacity = '1';
        }, 1000);
      }
    });
  });
}

// Team options cards interaction
function initTeamOptionsInteraction() {
  const teamOptionCards = document.querySelectorAll('.team-option-card');
  
  teamOptionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add subtle glow effect on hover
      card.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      // Remove glow effect
      card.style.boxShadow = '';
    });
    
    // Add click interaction for better mobile experience
    card.addEventListener('click', () => {
      // Toggle active state for mobile users
      const isActive = card.classList.contains('active');
      
      // Remove active from all cards
      teamOptionCards.forEach(c => c.classList.remove('active'));
      
      // Add active to clicked card if it wasn't already active
      if (!isActive) {
        card.classList.add('active');
      }
    });
  });
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
  const cards = document.querySelectorAll('.benefit-card, .gcc-feature, .investment-stat');
  
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

// Keyboard navigation support (updated with team options)
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
      case 'o':
        smoothScrollTo('#team-options');
        break;
      case 'c':
        smoothScrollTo('#cta');
        break;
    }
  });
}

// Team options section specific animations
function initTeamOptionsAnimations() {
  const teamOptionsSection = document.querySelector('.team-options-section');
  let teamOptionsAnimated = false;
  
  if (!teamOptionsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !teamOptionsAnimated) {
        teamOptionsAnimated = true;
        
        // Animate team option cards with stagger effect
        const cards = teamOptionsSection.querySelectorAll('.team-option-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, index * 200);
        });
        
        // Animate benefit badges
        setTimeout(() => {
          const badges = teamOptionsSection.querySelectorAll('.benefit-badge');
          badges.forEach((badge, index) => {
            setTimeout(() => {
              badge.style.opacity = '1';
              badge.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
          });
        }, 600);
      }
    });
  }, {
    threshold: 0.2
  });
  
  // Set initial styles for animation
  const cards = teamOptionsSection.querySelectorAll('.team-option-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });
  
  const badges = teamOptionsSection.querySelectorAll('.benefit-badge');
  badges.forEach(badge => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(20px) scale(0.8)';
    badge.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  });
  
  observer.observe(teamOptionsSection);
}

// Contact info animation
function initContactInfoAnimation() {
  const contactInfo = document.querySelector('.contact-info');
  
  if (!contactInfo) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add subtle pulse animation to contact info
        contactInfo.style.animation = 'contactPulse 2s ease-in-out';
        
        // Animate contact items with stagger
        const contactItems = contactInfo.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, index * 150);
        });
      }
    });
  }, {
    threshold: 0.3
  });
  
  // Set initial styles
  const contactItems = contactInfo.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
  });
  
  observer.observe(contactInfo);
}

// Add CSS animation for contact pulse effect
function addContactPulseAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes contactPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  initNavigation();
  initCounters();
  initMilestoneToggles();
  initScrollAnimations();
  initHeroCTA();
  initCTAButtons();
  
  // Enhanced effects
  initParallaxEffect();
  initCardHoverEffects();
  initInvestmentCounters();
  initKeyboardNavigation();
  
  // New team options functionality
  initTeamOptionsInteraction();
  initTeamOptionsAnimations();
  initContactInfoAnimation();
  addContactPulseAnimation();
  
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
