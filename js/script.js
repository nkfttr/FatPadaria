
let totalCompra = 0;
const total = document.getElementById('total');
const carrinho = document.querySelector(".carrinho");
let carrinhoItens = [];

document.addEventListener('DOMContentLoaded', () => {
    const botoesCompra = document.getElementsByClassName('compra');

    for (let i = 0; i < botoesCompra.length; i++) {
        botoesCompra[i].addEventListener('click', function () {
            const produtoDiv = this.closest('.prod');
            const nomeProduto = produtoDiv.querySelector('.produto-title').innerText;
            const precoTexto = produtoDiv.querySelector('.preco').innerText.match(/\d+(,\d{2})?/);
            const preco = parseFloat(precoTexto[0].replace(',', '.'));

            const existente = carrinhoItens.find(p => p.nome === nomeProduto);
            if (existente) {
                existente.qtd += 1;
            } else {
                carrinhoItens.push({ nome: nomeProduto, preco: preco, qtd: 1 });
                adicionarBotaoRemover(produtoDiv, nomeProduto);
            }

            totalCompra += preco;
            atualizarTotal();
            popEffect();
        });
    }
});

function atualizarTotal() {
    total.textContent = totalCompra.toFixed(2);
}

function popEffect() {
    carrinho.style.scale = 1.2;
}

setInterval(() => {
    if (carrinho.style.scale > 1) {
        carrinho.style.scale -= 0.01;
    }
}, 30);


function adicionarAoCarrinho(botao) {
    const produtoDiv = botao.closest('.prod');
    const nomeProduto = produtoDiv.querySelector('.produto-title').innerText;
    const precoTexto = produtoDiv.querySelector('.preco').innerText.match(/\\d+(,\\d{2})?/);
    const preco = parseFloat(precoTexto[0].replace(',', '.'));

    const existente = carrinhoItens.find(p => p.nome === nomeProduto);
    if (existente) {
        existente.qtd += 1;
    } else {
        carrinhoItens.push({ nome: nomeProduto, preco: preco, qtd: 1 });
        adicionarBotaoRemover(produtoDiv, nomeProduto); // cria o botão "Remover"
    }

    totalCompra += preco;
    atualizarTotal();
    popEffect();
}
function adicionarBotaoRemover(produtoDiv, nomeProduto) {
    const areaAdd = produtoDiv.querySelector(".add");

    const botao = document.createElement("button");
    botao.innerText = `Remover ${nomeProduto}`;
    botao.style.backgroundColor = "#d9534f";
    botao.style.color = "white";
    botao.style.marginTop = "10px";
    botao.style.border = "none";
    botao.style.padding = "8px";
    botao.style.cursor = "pointer";

    botao.addEventListener('click', () => removerDoCarrinho(produtoDiv, nomeProduto, botao));
    areaAdd.appendChild(botao);
}

function removerDoCarrinho(produtoDiv, nomeProduto, botao) {
    const item = carrinhoItens.find(p => p.nome === nomeProduto);
    if (item) {
        item.qtd -= 1;
        totalCompra -= item.preco;

        if (item.qtd <= 0) {
            carrinhoItens = carrinhoItens.filter(p => p.nome !== nomeProduto);
            restaurarBotao(produtoDiv, botao);
        }

        atualizarTotal();
        popEffect();
    }
}

function restaurarBotao(produtoDiv, botaoRemover) {
    const botaoAdicionar = produtoDiv.querySelector('button.compra');
    if (botaoAdicionar) botaoAdicionar.style.display = "inline-block";
    if (botaoRemover) botaoRemover.remove();
}

function fimCompra() {
    if (totalCompra > 0) {
        Swal.fire({
            icon: 'success',
            title: 'Compra finalizada!',
            text: `No valor de R$ ${totalCompra.toFixed(2)}`,
            confirmButtonText: 'Fechar',
            background: '#f3ede6',
            color: '#333',
            confirmButtonColor: '#3085d6',
            timer: 2500,
            timerProgressBar: true
        });

        totalCompra = 0;
        carrinhoItens = [];
        atualizarTotal();

        // Restaura todos os botões
        document.querySelectorAll('.prod').forEach(prod => {
            const botaoAdd = prod.querySelector('button.compra');
            const botaoRemover = prod.querySelector('.add button');
            if (botaoAdd) botaoAdd.style.display = "inline-block";
            if (botaoRemover) botaoRemover.remove();
        });
    }
}

function filtrarProdutos() {
    const termoBusca = document.getElementById('busca').value.toLowerCase();
    const produtos = document.querySelectorAll('.prod');

    produtos.forEach(prod => {
        const nome = prod.querySelector('.produto-title').innerText.toLowerCase();
        if (nome.includes(termoBusca)) {
            prod.style.display = 'block';
        } else {
            prod.style.display = 'none';
        }
    });
}
