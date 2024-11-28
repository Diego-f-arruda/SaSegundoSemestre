import Veiculo from '../../entity/Veiculo';
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
  let aside = document.getElementById("lista-produto");
  aside.innerHTML = "";

}

//-------------------------------------------------------------------------------------------------------------------------------
document.getElementById("botao-producao")?.addEventListener("click", async(event: MouseEvent) => {
  (window as any).navegacaoAPI.production();
})

document.getElementById("botao-registro")?.addEventListener("click", async(event: MouseEvent) => {
  (window as any).navegacaoAPI.stockRegistration();
})

document.getElementById("botao-home")?.addEventListener("click", async(event: MouseEvent) => {
  (window as any).navegacaoAPI.paginaHome();
})

document.getElementById("findAll")?.addEventListener("click", async(event: MouseEvent) => {
  const produtos = await (window as any).bancoAPI.findAll();
  console.log(produtos)
  const div = document.getElementById("lista-produto");
  div.innerHTML = "";

  for(let i = 0; i < produtos.length; i++){
    
    `
    <span>
    


    
    `

  }
})