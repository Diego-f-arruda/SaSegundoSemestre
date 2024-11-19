import './index.css';

document.getElementById("botao_voltar").addEventListener("click", () => {
    (window as any).navegacaoAPI.paginaHome();
});

window.onload = async () => {
    const id = new URLSearchParams(window.location.search).get("id");
    const veiculo = await (window as any).bancoAPI.findById(id);
    console.log(veiculo)

    let aside = document.getElementById("veiculo");
    aside.innerHTML = "";

    aside.innerHTML +=`
    <div class="card">
    <img src="${veiculo.imagem}" alt="">
        <div class="dados">
        <strong>${veiculo.modelo}</strong>
        <span>cor: ${veiculo.cor}</span>
        <span>Ano: ${veiculo.ano}</span>
        <span>Preço: R$${veiculo.preco}</span>
        <span>Placa: ${veiculo.placa}</span>
        </div>
    </div>
    `

}
