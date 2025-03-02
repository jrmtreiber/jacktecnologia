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
    }, 20000);
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

// Produtos
const produtos = [
    { titulo: "Teclado", descricao: "Descrição", imagem: "./IMGS/banner4.png" },
    { titulo: "Mouse", descricao: "Descrição", imagem: "./IMGS/banner4.png" },
    { titulo: "Fone", descricao: "Descrição", imagem: "./IMGS/banner4.png" },
];

const produtosPorPagina = 3;  
let paginaAtual = 1; 
let produtosFiltrados = produtos;  

function mostrarProdutos() {
    const containerProdutos = document.getElementById("produtos");
    containerProdutos.innerHTML = '';  

    const inicio = (paginaAtual - 1) * produtosPorPagina;
    const fim = inicio + produtosPorPagina;
    const produtosPagina = produtosFiltrados.slice(inicio, fim);

    if (produtosPagina.length === 0) {
        document.getElementById("notFoundMessage").style.display = 'block';
    } else {
        document.getElementById("notFoundMessage").style.display = 'none';
    }

    produtosPagina.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto");

        produtoDiv.innerHTML = `
            <div class="imagemProduto">
                <img src="${produto.imagem}" alt="">
            </div>
            <div class="descricaoProdutos">
                <h1>${produto.titulo}</h1>
                <p>${produto.descricao}</p>
            </div>
            <div class="botao">
                <a href=""><button>COMPRAR</button></a>
            </div>
        `;

        containerProdutos.appendChild(produtoDiv);
    });

    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

    document.getElementById("paginaAtual").textContent = `Página ${paginaAtual}/${totalPaginas}`;
}

function alterarPagina(quantidade) {
    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

    paginaAtual += quantidade;

    if (paginaAtual < 1) {
        paginaAtual = 1;
    } else if (paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }

    mostrarProdutos();
}

mostrarProdutos();