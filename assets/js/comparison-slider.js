class BeforeAfterSlider {
    constructor() {
        this.slider = document.querySelector('.comparison-slider');
        this.handle = this.slider.querySelector('.slider-handle');
        this.beforeAfterSlider = this.slider.querySelector('.before-after-slider');
        this.afterImage = this.slider.querySelector('.after-image');
        
        this.isDragging = false;
        this.autoPlayInterval = null;
        this.currentPosition = 50;
        this.isPlaying = true;

        this.initializeSlider();
        this.setupEventListeners();
        this.startAutoPlay();
    }

    initializeSlider() {
        this.updateSliderPosition(50);
    }

    setupEventListeners() {
        // Mouse events
        this.handle.addEventListener('mousedown', this.startDragging.bind(this));
        document.addEventListener('mousemove', this.handleDrag.bind(this));
        document.addEventListener('mouseup', this.stopDragging.bind(this));

        // Touch events
        this.handle.addEventListener('touchstart', this.startDragging.bind(this));
        document.addEventListener('touchmove', this.handleDrag.bind(this));
        document.addEventListener('touchend', this.stopDragging.bind(this));

        // Keyboard accessibility
        this.handle.addEventListener('keydown', (e) => {
            const step = 2;
            if (e.key === 'ArrowLeft') {
                this.updateSliderPosition(this.currentPosition - step);
            } else if (e.key === 'ArrowRight') {
                this.updateSliderPosition(this.currentPosition + step);
            }
        });
    }

    startDragging(e) {
        this.isDragging = true;
        this.stopAutoPlay();
        this.handle.classList.add('dragging');
    }

    stopDragging() {
        this.isDragging = false;
        this.handle.classList.remove('dragging');
        if (this.isPlaying) {
            this.startAutoPlay();
        }
    }

    handleDrag(e) {
        if (!this.isDragging) return;

        e.preventDefault();
        const rect = this.slider.getBoundingClientRect();
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const position = ((x - rect.left) / rect.width) * 100;
        
        this.updateSliderPosition(position);
    }

    updateSliderPosition(position) {
        this.currentPosition = Math.min(Math.max(position, 0), 100);
        this.afterImage.style.clipPath = `polygon(${this.currentPosition}% 0, 100% 0, 100% 100%, ${this.currentPosition}% 100%)`;
        this.handle.style.left = `${this.currentPosition}%`;
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            const newPosition = this.currentPosition + 1;
            if (newPosition > 100) {
                this.updateSliderPosition(0);
            } else {
                this.updateSliderPosition(newPosition);
            }
        }, 50);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BeforeAfterSlider();
});