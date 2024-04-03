document.addEventListener('DOMContentLoaded', (event) => {
    // Get all slides and control buttons
    const slides = document.querySelectorAll('.slide-bg-1, .slide-bg-2, .slide-bg-3');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    // Current slide tracker
    let currentSlide = 0;

    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.classList.toggle('hidden', index !== slideIndex);
        });
        currentSlide = slideIndex;
    }

    // Show the first slide initially
    goToSlide(0);

    // Event listeners for previous and next buttons
    prevButton.addEventListener('click', () => {
        stopAutoScroll(); // Stop auto-scroll when user clicks button
        goToSlide(currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1);
        startAutoScroll(); // Restart auto-scroll after action
    });

    nextButton.addEventListener('click', () => {
        stopAutoScroll(); // Stop auto-scroll when user clicks button
        goToSlide((currentSlide + 1) % slides.length);
        startAutoScroll(); // Restart auto-scroll after action
    });

    // Auto-scroll functionality
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            goToSlide(nextSlide);
        }, 5000); // Change slides every 5000ms (5 seconds)
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Start the auto-scrolling
    startAutoScroll();
});
