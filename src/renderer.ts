import Veiculo from './entity/Veiculo';
import './index.css';


let listaVeiculos:Veiculo[] = [];


//adiciona um ouvinte de evento(click do mouse)aos botoes o sinal de interrogação é pra evitar de ser nulo 
document.getElementById("botao-cadastrar")?.addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();

    let motor = document.getElementById('motor') as HTMLInputElement;
    let cor = document.getElementById('cor') as HTMLInputElement;
    let cambio = document.getElementById('cambio') as HTMLInputElement;
    let qtd_portas = document.getElementById('qtd_portas') as HTMLInputElement;
    let bancos = document.getElementById('bancos') as HTMLInputElement;
    let rodas = document.getElementById('rodas') as HTMLInputElement;


    const novoCarro = new Veiculo(motor.value, cor.value, cambio.value, qtd_portas.value, bancos.value, rodas.value);

    listaVeiculos.push(novoCarro);
    (window as any).bancoAPI.createVeiculo(novoCarro); 


    motor.value = "";
    cor.value = "";
    cambio.value = "";
    qtd_portas.value = "";
    bancos.value = "";
    rodas.value = "";

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
          veiculos[i].motor, 
          veiculos[i].cor,
          veiculos[i].cambio,
          veiculos[i].qtd_portas,
          veiculos[i].bancos,
          veiculos[i].rodas,
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
      <img src="${listaVeiculos[i].getRodas()}" alt="">
      <div class="dados">
        <strong>${listaVeiculos[i].getMotor()}</strong>
        <span>cor: ${listaVeiculos[i].getCor()}</span>
        <span>cambio: ${listaVeiculos[i].getCambio()}</span>
        <span>qtd_portas: R$${listaVeiculos[i].getQtd_portas()}</span>
        <span>bancos: ${listaVeiculos[i].getBancos()}</span>
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