/*--------------- Navigation Menu ----------------- */
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    const showNavMenu = () => {
        navMenu.classList.toggle("open");
        fadeOutEffect();
    };

    const hideNavMenu = () => {
        navMenu.classList.remove("open");
        fadeOutEffect();
        toggleBodyScrolling();
    };

    const fadeOutEffect = () => {
        const fadeEffect = document.querySelector(".fade-out-effect");
        fadeEffect.classList.add("active");
        toggleBodyScrolling();
        setTimeout(() => {
            fadeEffect.classList.remove("active");
        }, 300);
    };

    /* Event Listeners */
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item") && event.target.hash !== "") {
            event.preventDefault();
            const hash = event.target.hash;

            // Handle section switching
            document.querySelector(".section.active").classList.add("hide");
            document.querySelector(".section.active").classList.remove("active");
            document.querySelector(hash).classList.add("active");
            document.querySelector(hash).classList.remove("hide");

            // Update active navigation link
            const activeNavItem = navMenu.querySelector(".active");
            activeNavItem.classList.add("outer-shadow", "hover-in-shadow");
            activeNavItem.classList.remove("active", "inner-shadow");

            if (navMenu.classList.contains("open")) {
                event.target.classList.add("active", "inner-shadow");
                event.target.classList.remove("outer-shadow", "hover-in-shadow");
                hideNavMenu();
            } else {
                navMenu.querySelectorAll(".link-item").forEach((item) => {
                    if (hash === item.hash) {
                        item.classList.add("active", "inner-shadow");
                        item.classList.remove("outer-shadow", "hover-in-shadow");
                    }
                });
                fadeOutEffect();
            }

            // Update URL hash
            window.location.hash = hash;
        }
    });
})();

/*--------------- About Section Tabs ----------------- */
(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");

            // Update active tab
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");

            // Update active content
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    });
})();

/*--------------- Portfolio Filter and Popup ----------------- */
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        preBtn = popup.querySelector(".pp-pre"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetails = popup.querySelector(".pp-project-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    const togglePopup = () => {
        popup.classList.toggle("open");
        toggleBodyScrolling();
    };

    const updateSlideshow = () => {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        const loader = popup.querySelector(".pp-loader");

        loader.classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            loader.classList.remove("active");
        };

        popup.querySelector(".pp-counter").textContent = `${slideIndex + 1} of ${screenshots.length}`;
    };

    const updatePopupDetails = () => {
        const itemDetails = portfolioItems[itemIndex].querySelector(".portfolio-item-details");
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").textContent;
        const category = portfolioItems[itemIndex].getAttribute("data-category").split("-").join(" ");

        if (!itemDetails) {
            projectDetailsBtn.style.display = "none";
            projectDetailsContainer.style.maxHeight = "0px";
            projectDetailsContainer.classList.remove("active");
            return;
        }

        projectDetails.innerHTML = itemDetails.innerHTML;
        popup.querySelector(".pp-title h2").textContent = title;
        popup.querySelector(".pp-project-category").textContent = category;
        projectDetailsBtn.style.display = "block";
    };

    const togglePopupDetails = () => {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.replace("fa-minus", "fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = "0px";
        } else {
            projectDetailsBtn.querySelector("i").classList.replace("fa-plus", "fa-minus");
            projectDetailsContainer.style.maxHeight = `${projectDetailsContainer.scrollHeight}px`;
            projectDetailsContainer.classList.add("active");
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    };

    /* Event Listeners */
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("outer-shadow", "active");

            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            });
        }
    });

    portfolioItemsContainer.addEventListener("click", (event) => {
        const portfolioItem = event.target.closest(".portfolio-item-inner")?.parentElement;
        if (portfolioItem) {
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-image img").getAttribute("data-screenshots").split(",");

            slideIndex = 0;
            togglePopup();
            updateSlideshow();
            updatePopupDetails();

            preBtn.style.display = screenshots.length > 1 ? "block" : "none";
            nextBtn.style.display = screenshots.length > 1 ? "block" : "none";
        }
    });

    closeBtn.addEventListener("click", () => {
        togglePopup();
        if (projectDetailsContainer.classList.contains("active")) {
            togglePopupDetails();
        }
    });

    preBtn.addEventListener("click", () => {
        slideIndex = slideIndex === 0 ? screenshots.length - 1 : slideIndex - 1;
        updateSlideshow();
    });

    nextBtn.addEventListener("click", () => {
        slideIndex = slideIndex === screenshots.length - 1 ? 0 : slideIndex + 1;
        updateSlideshow();
    });

    projectDetailsBtn.addEventListener("click", togglePopupDetails);
})();

/*--------------- Utility Functions ----------------- */
function toggleBodyScrolling() {
    document.body.classList.toggle("stop-scrolling");
}

window.addEventListener("load", () => {  
    const preloader = document.querySelector(".preloader");
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add("fade-out");
            setTimeout(() => { preloader.style.display = "none"; }, 600);
        }
    }, 2000); // 2 seconds minimum to see the dots move
});
window.addEventListener('scroll', () => {
    const card = document.querySelector('.scroll-card-3d');
    if (!card) return;
    
    // Calculate where the card is on the screen
    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Create a progress number between 0 and 1 as you scroll past it
    let scrollProgress = 1 - (rect.top / windowHeight);
    
    // Keep the progress locked between 0 and 1
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);
    
    // Calculate the 3D math (Rotates from 20 to 0, Scales from 0.9 to 1.0)
    let rotateX = 20 - (scrollProgress * 20);
    let scale = 0.9 + (scrollProgress * 0.1);
    
    // Apply the magic!
    card.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;
  });
  // ========== Final Fix: Synchronized Line & Number Animation ========== //
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    const timers = {}; 
  
    function animateSkills() {
      progressBars.forEach((bar, index) => {
        const rect = bar.getBoundingClientRect();
        const span = bar.querySelector('span');
        const targetNumber = parseInt(bar.getAttribute('data-target'));
        const targetWidth = targetNumber + "%";
  
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          // Only trigger if it's currently at 0 and not already active
          if (!bar.classList.contains('active')) {
            bar.classList.add('active');
  
            // THE FIX: Reset to 0 first, then use a tiny timeout to trigger the CSS transition
            bar.style.width = "0";
            
            setTimeout(() => {
              bar.style.width = targetWidth; // This triggers the CSS 'transition' we added
            }, 50);
  
            // Number counting logic
            clearInterval(timers[index]);
            let currentCount = 0;
            timers[index] = setInterval(() => {
              currentCount++;
              span.innerText = currentCount + "%";
              if (currentCount >= targetNumber) {
                clearInterval(timers[index]);
                span.innerText = targetNumber + "%";
              }
            }, 15);
          }
        } else {
          // RESET: Set back to 0 when scrolled away so it can re-animate
          clearInterval(timers[index]);
          bar.style.width = '0';
          span.innerText = "0%";
          bar.classList.remove('active');
        }
      });
    }
  
    window.addEventListener('scroll', animateSkills);
    setTimeout(animateSkills, 100); 
  });
  // ========== Logic to open Skills Tab from Main Menu ========== //
// ========== Final Fix: Force Open Skills Tab ========== //
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('link-to-skills')) {
      
      // 1. First, wait for the page to scroll to About
      setTimeout(() => {
        // 2. Find the Skills content and the Skills button
        const skillsContent = document.querySelector(".skills.tab-content");
        const skillsTabButton = document.querySelector(".tab-item[data-target='.skills']");
        const allTabs = document.querySelectorAll(".tab-item");
        const allContent = document.querySelectorAll(".tab-content");
  
        if (skillsContent && skillsTabButton) {
          // 3. Close all other tabs (like experience/education)
          allTabs.forEach(tab => tab.classList.remove("active", "outer-shadow"));
          allContent.forEach(content => content.classList.remove("active"));
  
          // 4. Force the Skills tab to be the ACTIVE one
          skillsTabButton.classList.add("active", "outer-shadow");
          skillsContent.classList.add("active");
          
          // 5. Trigger your animation function manually
          if (typeof animateSkills === "function") {
              animateSkills(); 
          }
        }
      }, 500);
    }
  });
// ========== THE FINAL FIX: TRIGGER SKILLS FROM MENU ========== //
document.addEventListener("click", (e) => {
    // Look for our special class
    if (e.target.classList.contains("link-to-skills")) {
        
        setTimeout(() => {
            const skillsTab = document.querySelector(".tab-item[data-target='.skills']");
            const skillsContent = document.querySelector(".skills.tab-content");
            
            if (skillsTab && skillsContent) {
                // Force the tab and bars to show
                document.querySelectorAll(".tab-item").forEach(t => t.classList.remove("active", "outer-shadow"));
                document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
                
                skillsTab.classList.add("active", "outer-shadow");
                skillsContent.classList.add("active");
                
                // Start the animation
                if (typeof animateSkills === "function") {
                    animateSkills(); 
                }
            }
        }, 600); // Time for the scroll to finish
    }
});
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    // Creating 80 particles for a clean look
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8,
            size: 1.5
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get your theme color dynamically
    const skinColor = getComputedStyle(document.documentElement).getPropertyValue('--skin-color').trim() || '#ff9d00';
    ctx.fillStyle = skinColor;
    ctx.strokeStyle = skinColor;

    particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off walls
        if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
        if (p.y > canvas.height || p.y < 0) p.speedY *= -1;

        // Draw the dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines to nearby dots (The "Neural" effect)
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
                ctx.globalAlpha = 1 - (dist / 120); // Fade lines by distance
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1;
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);
initParticles();
animateParticles();
function copyEmail() {
    const email = "bharathtommandru1@gmail.com";
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard, bro!");
}