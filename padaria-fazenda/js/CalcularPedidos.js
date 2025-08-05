// 👋 Boas-vindas
function boasVindas() {
    alert("Bem-vindo ao sistema de delivery da Padaria Doce Sabor! 🥐");
}

// 🛒 Subtotal (função tradicional)
function calcularSubtotal(preco, quantidade) {
    return preco * quantidade;
}

// 🎁 Desconto (arrow function)
const calcularDesconto = (valor, percentual) => valor * (percentual / 100);

// 🚚 Taxa de entrega por km (arrow function)
const calcularTaxaEntrega = (distancia) => {
    if (distancia <= 3) return 5;
    else return 5 + (distancia - 3) * 1.5;
};

// 💰 Imposto de 8% (função tradicional com retorno)
function calcularImposto(subtotal) {
    return subtotal * 0.08;
}

// 🆓 Frete grátis acima de R$50 (arrow function)
const temFreteGratis = (valorTotal) => valorTotal >= 50;

// 🧾 Total final (função tradicional com retorno)
function calcularTotalFinal(subtotal, desconto, taxa, imposto) {
    return subtotal - desconto + taxa + imposto;
}

// 💻 Aplicação prática: cálculo completo
function calcularPedido() {
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const percentualDesconto = parseFloat(document.getElementById('desconto').value);
    const distancia = parseFloat(document.getElementById('distancia').value);

    if (isNaN(preco) || isNaN(quantidade) || isNaN(percentualDesconto) || isNaN(distancia)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const subtotal = calcularSubtotal(preco, quantidade);
    const desconto = calcularDesconto(subtotal, percentualDesconto);
    const taxaEntrega = temFreteGratis(subtotal) ? 0 : calcularTaxaEntrega(distancia);
    const imposto = calcularImposto(subtotal);
    const totalFinal = calcularTotalFinal(subtotal, desconto, taxaEntrega, imposto);

    document.getElementById('resultados').innerHTML = `
      <strong>Resumo do Pedido:</strong><br>
      Subtotal: R$${subtotal.toFixed(2)}<br>
      Desconto: -R$${desconto.toFixed(2)}<br>
      Taxa de Entrega: R$${taxaEntrega.toFixed(2)}<br>
      Imposto (8%): R$${imposto.toFixed(2)}<br>
      <strong>Total Final: R$${totalFinal.toFixed(2)}</strong><br>
      ${temFreteGratis(subtotal) ? "🚚 Você ganhou FRETE GRÁTIS!" : "📦 Frete aplicado normalmente."}
    `;
}