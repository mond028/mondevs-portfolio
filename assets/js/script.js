 // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        
        // Check for saved theme preference or use system preference
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark-mode');
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark-mode');
            themeToggleDarkIcon.classList.remove('hidden');
        }
        
        // Toggle theme
        themeToggle.addEventListener('click', () => {
            // Toggle icons
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
            
            // Toggle dark mode class
            document.documentElement.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (document.documentElement.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page jump
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Intersection Observer for animations
        const animateOnScroll = () => {
            const projectCards = document.querySelectorAll('.project-card');
            const contactForm = document.querySelector('.contact-form');
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);
            
            projectCards.forEach(card => {
                observer.observe(card);
            });
            
            if (contactForm) {
                observer.observe(contactForm);
            }
        };
        // Project Carousel Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const track = document.getElementById('projects-track');
            const slides = document.querySelectorAll('.project-slide');
            const prevBtn = document.getElementById('prev-project');
            const nextBtn = document.getElementById('next-project');
            const dotsContainer = document.getElementById('carousel-dots');
            
            let currentIndex = 15;
            const slideCount = slides.length;
            
            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.dataset.index = index;
                dotsContainer.appendChild(dot);
            });
            
            const dots = document.querySelectorAll('.carousel-dot');
            
            function updateCarousel() {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Next slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }
            
            // Previous slide
            function prevSlide() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateCarousel();
            }
            
            // Auto-rotate
            let autoRotate = setInterval(nextSlide, 5000);
            
            // Pause on hover
            const carousel = document.querySelector('.projects-carousel');
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoRotate);
            });
            
            carousel.addEventListener('mouseleave', () => {
                autoRotate = setInterval(nextSlide, 5000);
            });
            
            // Button controls
            nextBtn.addEventListener('click', () => {
                clearInterval(autoRotate);
                nextSlide();
                autoRotate = setInterval(nextSlide, 5000);
            });
            
            prevBtn.addEventListener('click', () => {
                clearInterval(autoRotate);
                prevSlide();
                autoRotate = setInterval(nextSlide, 5000);
            });
            
            // Dot navigation
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    clearInterval(autoRotate);
                    currentIndex = parseInt(dot.dataset.index);
                    updateCarousel();
                    autoRotate = setInterval(nextSlide, 5000);
                });
            });
            
            // Set current year
            document.getElementById('year').textContent = new Date().getFullYear();
        });
        // Initialize animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            animateOnScroll();
            
            // Set active nav link based on scroll position
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            
            function setActiveLink() {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= (sectionTop - 300)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', setActiveLink);
            setActiveLink(); // Initialize on load
        });
document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.getElementById('project-carousel');
        const prevBtn = document.getElementById('prev-project');
        const nextBtn = document.getElementById('next-project');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        let currentIndex = 0;
        const totalProjects = document.querySelectorAll('#project-carousel > div').length;
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('w-6', 'bg-violet-600', 'dark:bg-violet-400');
                    indicator.classList.remove('w-3', 'bg-violet-300', 'dark:bg-violet-600');
                } else {
                    indicator.classList.add('w-3', 'bg-violet-300', 'dark:bg-violet-600');
                    indicator.classList.remove('w-6', 'bg-violet-600', 'dark:bg-violet-400');
                }
            });
        }
        
        function nextProject() {
            currentIndex = (currentIndex + 1) % totalProjects;
            updateCarousel();
        }
        
        function prevProject() {
            currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
            updateCarousel();
        }
        
     
        let autoRotate = setInterval(nextProject, 5000);
        

        carousel.parentElement.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        carousel.parentElement.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextProject, 5000);
        });
        
        nextBtn.addEventListener('click', () => {
            clearInterval(autoRotate);
            nextProject();
            autoRotate = setInterval(nextProject, 5000);
        });
        
        prevBtn.addEventListener('click', () => {
            clearInterval(autoRotate);
            prevProject();
            autoRotate = setInterval(nextProject, 5000);
        });
        
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                clearInterval(autoRotate);
                currentIndex = parseInt(indicator.getAttribute('data-index'));
                updateCarousel();
                autoRotate = setInterval(nextProject, 5000);
            });
        });
        
        updateCarousel();
    });
  
        document.addEventListener('DOMContentLoaded', function() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                document.querySelectorAll('input, textarea').forEach(element => {
                    element.addEventListener('focus', function() {
                        window.scrollTo(0, 0);
                        document.body.style.zoom = "1.0";
                    });
                });
            }
        });