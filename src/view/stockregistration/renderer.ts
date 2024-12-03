import Estoque, { TipoUso } from '../../entity/Estoque';
import './index.css';
import '../geral.css';


const listaEstoque:Estoque[] = [];


//adiciona um ouvinte de evento(click do mouse)aos botoes o sinal de interrogação é pra evitar de ser nulo 
document.getElementById('botao-cadastrar')?.addEventListener('click', async (event: MouseEvent) => {
  event.preventDefault();

  const nome = (document.getElementById('nome') as HTMLInputElement).value;
  const fabricante = (document.getElementById('fabricante') as HTMLInputElement).value;
  const tipo = (document.getElementById('tipo') as HTMLSelectElement).value as keyof typeof TipoUso;
  const quantidade = Number((document.getElementById('quantidade') as HTMLInputElement).value);
  const data_entrada = (document.getElementById('data_entrada') as HTMLInputElement).value;
  const custo = parseFloat((document.getElementById('custo') as HTMLInputElement).value);

  if (!nome || !fabricante || !tipo || !quantidade || !data_entrada || !custo) {
    console.log("Preencha todos os campos corretamente!");
    return;
  }

  const tipoUso = TipoUso[tipo];

    const novoItem = new Estoque(nome, fabricante, tipoUso, quantidade, new Date(data_entrada), custo);

    listaEstoque.push(novoItem);
    (window as any).bancoAPI.createEstoque(novoItem); 


    render()
})

export async function carregarEstoque() {
  const produtos = await (window as any).bancoAPI.findAll();
  listaEstoque.length = 0; 
  
    produtos.forEach((p: any) => {
      const item = new Estoque(
        p.nome,
        p.fabricante,
        p.tipo,
        p.quantidade,
        new Date(p.data_entrada),
        p.custo,
        p.id
      );
      listaEstoque.push(item);
    });
  
}


window.onload = carregarEstoque;


export default function render(){
  const div = document.getElementById("lista-produto");
  div.innerHTML = "";

  listaEstoque.forEach((item) => {
    const span = document.createElement("span");
    span.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome  </th>
          <th>||Fabricante</th>
          <th>||Tipo</th>
          <th>||Quantidade</th>
          <th>||Data de Entrada</th>
          <th>||Custo</th>
        </tr>
      </thead>
      <tbody>
        ${listaEstoque.map(item => `
          <tr>
            <td>${item.getNome()}</td>
            <td>||${item.getFabricante()}</td>
            <td>||${item.getTipo()}</td>
            <td>||${item.getQuantidade()}</td>
            <td>||${item.getDataEntrada().toLocaleDateString()}</td>
            <td>||R$ ${item.getCusto()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
    div.appendChild(span);
  });
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

document.getElementById("findAll")?.addEventListener("click", carregarEstoque)