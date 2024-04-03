document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const nextButton = document.querySelector('.next-slide');
    const prevButton = document.querySelector('.prev-slide');
    const dotsContainer = document.querySelector('.dots-container');
    let currentSlide = 0;

    // Initialize dots for navigation
    function initDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => changeSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Update which dot is active
    function updateDots() {
        const dots = document.querySelectorAll('.dots-container .dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Function to change slide
    function changeSlide(slideIndex) {
        slides.forEach((slide) => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        slides[slideIndex].classList.add('active');
        slides[slideIndex].style.display = 'block';

        currentSlide = slideIndex;
        updateDots();
    }

    // Event listeners for next and previous buttons
    nextButton.addEventListener('click', () => {
        let newIndex = currentSlide + 1 < slides.length ? currentSlide + 1 : 0;
        changeSlide(newIndex);
    });

    prevButton.addEventListener('click', () => {
        let newIndex = currentSlide - 1 >= 0 ? currentSlide - 1 : slides.length - 1;
        changeSlide(newIndex);
    });

    // Initialize the slider and dots on load
    initDots();
    changeSlide(currentSlide); // Start with the first slide
});
