document.getElementById("botao-producao")?.addEventListener("click", async(event: MouseEvent) => {
    (window as any).navegacaoAPI.production();
})

document.getElementById("botao-registro")?.addEventListener("click", async(event: MouseEvent) => {
    (window as any).navegacaoAPI.stockRegistration();
})