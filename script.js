// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Slideshow functionality
    const slides = [
        {
            img: '/api/placeholder/700/400',
            caption: 'Our hiking trip to the mountains'
        },
        {
            img: '/api/placeholder/700/400',
            caption: 'Your birthday celebration last year'
        },
        {
            img: '/api/placeholder/700/400',
            caption: 'Our family vacation to the beach'
        },
        {
            img: '/api/placeholder/700/400',
            caption: 'Christmas morning traditions'
        },
        {
            img: '/api/placeholder/700/400',
            caption: 'That time we went to the concert together'
        }
    ];
    
    let currentSlide = 0;
    const slideshow = document.querySelector('.slideshow');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Initialize slideshow
    updateSlide();
    
    // Previous slide button
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    });
    
    // Next slide button
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    });
    
    // Update slide content
    function updateSlide() {
        const slide = slides[currentSlide];
        const slideHTML = `
            <div class="slide">
                <img src="${slide.img}" alt="Mom and Me" class="slide-img">
                <div class="slide-caption">${slide.caption}</div>
            </div>
        `;
        slideshow.innerHTML = slideHTML;
    }
    
    // Automatic slideshow
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }, 5000);
    
    // Play all button animation
    document.querySelector('.play-all-btn').addEventListener('click', () => {
        const audios = document.querySelectorAll('audio');
        let current = 0;
    
        const playNext = () => {
            if (current < audios.length) {
                audios[current].play();
                audios[current].addEventListener('ended', () => {
                    current++;
                    playNext();
                }, { once: true });
            }
        };
    
        playNext();
    });
    
    
    // Theme selector
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // You can add logic here to apply the selected theme
            const selectedTheme = this.getAttribute('data-theme');
            console.log(`Theme selected: ${selectedTheme}`);
        });
    });
    
    // Message form submission
    const messageForm = document.getElementById('mom-message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const occasion = document.getElementById('occasion').value;
            const message = document.getElementById('message').value;
            const includeFlowers = document.getElementById('include-flowers').checked;
            
            // Get selected theme
            let selectedTheme = 'floral';
            themeOptions.forEach(option => {
                if (option.classList.contains('active')) {
                    selectedTheme = option.getAttribute('data-theme');
                }
            });
            
            // Create a virtual message card
            createMessageCard(occasion, message, includeFlowers, selectedTheme);
        });
    }
    
    // Create a message card
    function createMessageCard(occasion, message, includeFlowers, theme) {
        // Create the message card container
        const cardContainer = document.createElement('div');
        cardContainer.className = `message-card ${theme}-theme`;
        
        // Add flowers if selected
        let flowersHTML = '';
        if (includeFlowers) {
            flowersHTML = `
                <div class="virtual-flowers">
                    <div class="flower flower-1"></div>
                    <div class="flower flower-2"></div>
                    <div class="flower flower-3"></div>
                </div>
            `;
        }
        
        // Get occasion title
        let occasionTitle = 'Happy Mother\'s Day';
        switch(occasion) {
            case 'birthday':
                occasionTitle = 'Happy Birthday';
                break;
            case 'thank-you':
                occasionTitle = 'Thank You';
                break;
            case 'just-because':
                occasionTitle = 'Just Because I Love You';
                break;
        }
        
        // Card content
        const cardContent = `
            <div class="card-header">
                <h3>${occasionTitle}</h3>
                ${flowersHTML}
            </div>
            <div class="card-body">
                <p>${message}</p>
            </div>
            <div class="card-footer">
                <p>With all my love</p>
                <button class="close-card-btn">Close</button>
            </div>
        `;
        
        // Set the card content
        cardContainer.innerHTML = cardContent;
        
        // Add card to the page
        document.body.appendChild(cardContainer);
        
        // Style the card
        Object.assign(cardContainer.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            padding: '20px',
            textAlign: 'center'
        });
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: '999'
        });
        document.body.appendChild(overlay);
        
        // Close button functionality
        const closeBtn = cardContainer.querySelector('.close-card-btn');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(cardContainer);
            document.body.removeChild(overlay);
        });
        
        // Reset form
        document.getElementById('message').value = '';
    }
    
    // Add floating animation to elements
    const animateElements = document.querySelectorAll('.gallery-item, .playlist-item');
    
    if (animateElements.length > 0) {
        window.addEventListener('scroll', function() {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Initial check
        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 300);
    }
    
    // Add sparkle effect to hero section
    const sparkles = document.querySelector('.sparkles');
    if (sparkles) {
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            // Random animation delay
            const delay = Math.random() * 5;
            
            Object.assign(sparkle.style, {
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
                width: '3px',
                height: '3px',
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: Math.random() * 0.5 + 0.3,
                animation: `sparkle 4s infinite ${delay}s`
            });
            
            sparkles.appendChild(sparkle);
        }
    }
    
    // Add keyframe animation for sparkles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        @keyframes sparkle {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 0.3; }
        }
    `;
    document.head.appendChild(styleElement);
});