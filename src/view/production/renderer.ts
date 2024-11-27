document.getElementById("botao-voltar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    console.log("teste1");
    (window as any).navegacaoAPI.paginaHome();
    console.log("teste2")
})