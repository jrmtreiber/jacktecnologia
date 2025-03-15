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

    updateIndicators();
}

function moveSlide(direction) {
    clearInterval(intervalId);
    showSlide(currentIndex + direction);
    startAutoSlide();
}

function moveSlideTo(index) {
    clearInterval(intervalId);
    showSlide(index);
    startAutoSlide();
}

function startAutoSlide() {
    intervalId = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 10000);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, idx) => {
        if (idx === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
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

// 

function mostrarMensagem() {
    if (document.getElementById("mensagem")) return;

    let mensagem = document.createElement("div");
    mensagem.id = "mensagem";
    mensagem.innerText = "⚠️ Indisponível no momento";

    mensagem.style.position = "fixed";
    mensagem.style.top = "50%";
    mensagem.style.left = "50%";
    mensagem.style.transform = "translate(-50%, -50%)";
    mensagem.style.backgroundColor = "black";
    mensagem.style.color = "white";
    mensagem.style.padding = "20px";
    mensagem.style.fontSize = "24px";
    mensagem.style.fontWeight = "bold";
    mensagem.style.borderRadius = "10px";
    mensagem.style.textAlign = "center";
    mensagem.style.animation = "piscar 1.5s infinite";
    mensagem.style.zIndex = "1000";

    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.remove();
    }, 5000);
}

// 