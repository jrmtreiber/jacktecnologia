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

function searchProducts() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    const productContainers = document.querySelectorAll('.produto');
    let foundAny = false;

    productContainers.forEach(function (container) {
        const headings = container.querySelectorAll('h1');
        let foundInThisContainer = false;

        headings.forEach(function (heading) {
            const headingText = heading.textContent.toLowerCase();
            if (headingText.includes(searchValue)) {
                foundInThisContainer = true;
            }
        });

        if (foundInThisContainer) {
            container.style.display = 'block';
            foundAny = true;
        } else {
            container.style.display = 'none';
        }
    });

    if (foundAny) {
        document.getElementById('notFoundMessage').style.display = 'none';
    } else {
        document.getElementById('notFoundMessage').style.display = 'block';
    }
}

//  
// 

// Produtos
const produtos = [
    { titulo: "PC Gamer", descricao: "Computador para <br> jogos/trabalho/estudos", imagem: "./IMGS/produtos/pcgamer1.jpg", valor: "R$1599", classImagem: "luz-solar", siteCompra: "././produtos/pcgamer.html" },
    { titulo: "Arandela Solar", descricao: "Arandela externa com carregamento atráves da energia solar", imagem: "./IMGS/produtos/luz-solar1.png", valor: "R$59,99", classImagem: "luz-solar", siteCompra: "././produtos/luz-solar.html" },
    { titulo: "Humidificador <br> Spark", descricao: "liberar vapor de água aos poucos no cômodo pra evitar que o ar fique seco demais", imagem: "./IMGS/produtos/humidificador1.jpg", valor: "R$69,90", classImagem: "humidifier", siteCompra: "././produtos/humidificador.html" },
    { titulo: "Fone De Ouvido Bluetooth", descricao: "Cancelamento de ruído <br> ativo para ligações", imagem: "./IMGS/produtos/fone1.jpg", valor: "R$67,50", classImagem: "fone_btf", siteCompra: "././produtos/fone.html" }
    
];

// 

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
                <img class="${produto.classImagem}" src="${produto.imagem}" alt="Produto">
                <div class="valor">${produto.valor}</div>
            </div>
            <div class="descricaoProdutos" style="text-align: center;">
                <h1>${produto.titulo}</h1>
                <p>${produto.descricao}</p>
            </div>
            <div class="botao">
                <a href="${produto.siteCompra}"><button>COMPRAR</button></a>
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

function pesquisarProdutos() {
    const termoPesquisa = document.getElementById("campoPesquisa").value.toLowerCase();

    produtosFiltrados = produtos.filter(produto =>
        produto.titulo.toLowerCase().includes(termoPesquisa) ||
        produto.descricao.toLowerCase().includes(termoPesquisa)
    );

    paginaAtual = 1;

    mostrarProdutos();
}

function limparPesquisa() {
    document.getElementById("campoPesquisa").value = '';
    produtosFiltrados = produtos;
    paginaAtual = 1;
    toggleClearButton();
    mostrarProdutos();
}

function toggleClearButton() {
    const campoPesquisa = document.getElementById("campoPesquisa");
    const limparPesquisaBtn = document.getElementById("limparPesquisa");

    if (campoPesquisa.value.trim() !== "") {
        limparPesquisaBtn.style.display = "block";
    } else {
        limparPesquisaBtn.style.display = "none";
    }
}

mostrarProdutos();