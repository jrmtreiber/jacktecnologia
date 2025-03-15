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

document.addEventListener("DOMContentLoaded", function() {
    let indice = 0;
    const imagens = document.querySelectorAll(".carrossel img");
    const botaoAnterior = document.querySelector(".botao.anterior");
    const botaoProximo = document.querySelector(".botao.proximo");
    const carrossel = document.querySelector(".carrossel");
    const miniaturas = document.querySelectorAll(".miniatura");

    function mudarImagem(direcao) {
        indice += direcao;

        if (indice < 0) {
            indice = imagens.length - 1;
        } else if (indice >= imagens.length) {
            indice = 0;
        }

        carrossel.style.transform = `translateX(-${indice * 100}%)`;
    }

    function mudarParaMiniatura(event) {
        const index = parseInt(event.target.getAttribute("data-index"));
        indice = index;
        carrossel.style.transform = `translateX(-${indice * 100}%)`;
    }

    botaoAnterior.addEventListener("click", function() {
        mudarImagem(-1); 
    });

    botaoProximo.addEventListener("click", function() {
        mudarImagem(1); 
    });

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener("click", mudarParaMiniatura);
    });
});


// 