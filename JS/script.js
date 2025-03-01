let currentIndex = 0;
let intervalId;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const newTransform = `translateX(-${currentIndex * 100}%)`;
    document.querySelector('.carousel-images').style.transform = newTransform;
}

function moveSlide(direction) {
    clearInterval(intervalId);
    showSlide(currentIndex + direction);
    startAutoSlide();
}

function startAutoSlide() {
    intervalId = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 10000);
}

setInterval(() => {
    showSlide(currentIndex + 1);
}, 10000);

showSlide(currentIndex);

// 

window.onscroll = function () {
    stickyHeader();
};

var header2 = document.getElementById("header2");

function stickyHeader() {
    if (window.innerWidth > 768) {
        if (window.pageYOffset > 100) {
            header2.style.position = "fixed";
            header2.style.top = "0";
        } else {
            header2.style.position = "absolute";
            header2.style.top = "auto";
        }
    } else {
        header2.style.position = "absolute";
        header2.style.top = "auto";
    }
}