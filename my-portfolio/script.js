// Dummy data for projects
const projects = [
  {
    title: "Wellness App UI Redesign",
    description:
      "Redesigned a mobile wellness app for women, focusing on accessibility and delightful micro-interactions. Improved user engagement by 40%.",
    link: "#",
    tags: ["UI/UX", "Mobile", "Accessibility"],
    icon: "fas fa-mobile-alt"
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "Developed a responsive dashboard for a women-led e-commerce startup, improving usability and analytics visualization for better insights.",
    link: "#",
    tags: ["Product Engineering", "Web", "Analytics"],
    icon: "fas fa-chart-line"
  },
  {
    title: "STEM Girls Community Portal",
    description:
      "Built an online portal to connect and empower girls in STEM, with forums, mentorship features, and resource sharing capabilities.",
    link: "#",
    tags: ["Community", "STEM", "Web"],
    icon: "fas fa-users"
  }
];

function renderProjects() {
  const projectList = document.getElementById("project-list");
  if (!projectList) return;
  
  projectList.innerHTML = "";
  projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.animationDelay = `${index * 0.2}s`;
    card.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #d72660, #a259c6); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
          <i class="${project.icon}"></i>
        </div>
        <h3 style="margin: 0; flex: 1;">${project.title}</h3>
      </div>
      <p>${project.description}</p>
      <div style="margin: 1rem 0;">
        ${project.tags
          .map(
            (tag) =>
              `<span style="background: linear-gradient(135deg, #f8cdda, #f6e7fa); color: #6b4c8a; padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.85rem; font-weight: 500; margin-right: 0.5rem; display: inline-block; margin-bottom: 0.5rem;">${tag}</span>`
          )
          .join("")}
      </div>
      <a href="${project.link}" class="cta-btn primary" style="font-size: 0.95rem; padding: 0.7rem 1.5rem; margin-top: 1rem;">
        <i class="fas fa-external-link-alt"></i> View Project
      </a>
    `;
    projectList.appendChild(card);
  });
}

// Contact form validation and feedback
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Simple validation
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    
    // Clear previous feedback
    formFeedback.style.color = "#d72660";
    
    if (!name || !email || !message) {
      formFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all fields.';
      return;
    }
    
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      formFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address.';
      return;
    }
    
    // Success feedback
    formFeedback.style.color = "#28a745";
    formFeedback.innerHTML = `<i class="fas fa-check-circle"></i> Thank you for reaching out, ${name}! I'll get back to you soon.`;
    contactForm.reset();
    
    // Clear feedback after 5 seconds
    setTimeout(() => {
      formFeedback.innerHTML = "";
      formFeedback.style.color = "";
    }, 5000);
  });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  // Mobile menu functionality
  if (mobileMenuToggle && navLinksContainer) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      if (navLinksContainer.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
});

// Initial render
renderProjects();

// Enhanced responsive functionality
function handleResize() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
  
  // Adjust floating animations for mobile
  const floatingElements = document.querySelectorAll('.float-item');
  if (isMobile) {
    floatingElements.forEach(item => {
      item.style.animationDuration = '4s';
    });
  } else {
    floatingElements.forEach(item => {
      item.style.animationDuration = '3s';
    });
  }
  
  // Adjust project card layout based on screen size
  const projectCards = document.querySelectorAll('.project-card');
  if (isMobile) {
    projectCards.forEach(card => {
      card.style.animationDelay = '0s';
    });
  }
}

// Touch-friendly interactions for mobile
function addTouchSupport() {
  const cards = document.querySelectorAll('.service-card, .project-card');
  
  cards.forEach(card => {
    // Add touch feedback
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // Improve form UX on mobile
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    });
  });
}

// Initialize responsive features
window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', function() {
  handleResize();
  addTouchSupport();
  
  // Add viewport meta tag if missing (fallback)
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(viewportMeta);
  }
});
