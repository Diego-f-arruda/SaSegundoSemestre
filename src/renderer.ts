import Veiculo from './entity/Veiculo';
import './index.css';


let listaVeiculos:Veiculo[] = [];


//adiciona um ouvinte de evento(click do mouse)aos botoes o sinal de interrogação é pra evitar de ser nulo 
document.getElementById("botao-cadastrar")?.addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();

    let modelo = document.getElementById('modelo') as HTMLInputElement;
    let cor = document.getElementById('cor') as HTMLInputElement;
    let ano = document.getElementById('ano') as HTMLInputElement;
    let preco = document.getElementById('preco') as HTMLInputElement;
    let placa = document.getElementById('placa') as HTMLInputElement;
    let imagem = document.getElementById('imagem') as HTMLInputElement;


    const novoCarro = new Veiculo(modelo.value, cor.value, Number(ano.value), Number(preco.value), placa.value, imagem.value);

    listaVeiculos.push(novoCarro);
    (window as any).bancoAPI.createVeiculo(novoCarro); 


    modelo.value = "";
    cor.value = "";
    ano.value = "";
    preco.value = "";
    placa.value = "";
    imagem.value = "";

    //render abaixo
    render()
})



document.getElementById("botao-deletar")?.addEventListener("click", async (event:MouseEvent) => {
event.preventDefault();//previne eventos padroes
console.log("deletou")

  render()
})

window.onload = async () => {
  const veiculos = await (window as any).bancoAPI.findAll();
  for(var i = 0; i < veiculos.length; i++){
      const veiculo = new Veiculo(
          veiculos[i].modelo, 
          veiculos[i].cor,
          veiculos[i].ano,
          veiculos[i].valor,
          veiculos[i].placa,
          veiculos[i].imagem,
          veiculos[i].id
      );

      listaVeiculos.push(veiculo);
  }
  render()

}


export default function render(){
  let aside = document.getElementById("lista-veiculo");
  aside.innerHTML = "";

  for (var i = 0; i < listaVeiculos.length; i++) {
      aside.innerHTML += `
      <div class="card">
      <img src="${listaVeiculos[i].getImagem()}" alt="">
      <div class="dados">
        <strong>${listaVeiculos[i].getModelo()}</strong>
        <span>cor: ${listaVeiculos[i].getCor()}</span>
        <span>Ano: ${listaVeiculos[i].getAno()}</span>
        <span>Preço: R$${listaVeiculos[i].getPreco()}</span>
        <span>Placa: ${listaVeiculos[i].getPlaca()}</span>
      </div>
      <div class="botao-card">
        <button id="botao-ver" onclick="paginaDetalhes('${listaVeiculos[i].getId()}')">Ver</button>
        <button id="botao-deletar" onclick="deletarVeiculo('${listaVeiculos[i].getId()}')">Deletar</button>
      </div>
    </div>
      `;
  }
}



function deletarVeiculo(id: string){
  // let index = listaVeiculos.findIndex(veiculos => veiculos.getId() === id);
  // listaVeiculos.splice(index, 1);

  //chama a função deletar do preload no contesto de 'bancoAPI'
  (window as any).bancoAPI.deletarVeiculo(id);

  //filtra todos os itens com o id diferente do id que veio por parametro
  listaVeiculos = listaVeiculos.filter(veiculos => veiculos.getId() !== id)
  render();
}

function paginaDetalhes(id: string){
  (window as any).navegacaoAPI.paginaDetalhes(id);

}

(window as any).paginaDetalhes = paginaDetalhes;
(window as any).deletarVeiculo = deletarVeiculo;