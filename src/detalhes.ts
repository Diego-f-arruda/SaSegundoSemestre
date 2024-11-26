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

}
