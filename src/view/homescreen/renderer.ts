import './index.css';
import * as echarts from 'echarts';
import '../geral.css';

async function renderPizza() {
  const veiculos = await (window as any).productAPI.findAllVeiculos();
  console.log(veiculos);

  const categorias: string[] = [];
  const quantidade: number[] = [];

  for (let i = 0; i < veiculos.length; i++) {
    categorias.push(veiculos[i].modelo);  
    quantidade.push(veiculos[i].quantidade);  
  }

  const div = document.getElementById("grafico-pizza") as HTMLDivElement;
  const grafico = echarts.init(div);
  const option = {
    series: [
      {
        name: 'Modelo de Veículos',
        type: 'pie',
        radius: '50%',
        data: categorias.map((cat, index) => ({
          value: quantidade[index],
          name: cat
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  grafico.setOption(option);
}

async function renderBarra() {
  const acessorios = await (window as any).productAPI.findAcessoriosPorPeriodo();

  const periodos: string[] = [];
  const quantidade: number[] = [];

  for (let i = 0; i < acessorios.length; i++) {
    periodos.push(acessorios[i].periodo);
    quantidade.push(acessorios[i].quantidade);
  }

  const div = document.getElementById("grafico-barra") as HTMLDivElement;
  const grafico = echarts.init(div);
  const option = {
    xAxis: {
      type: 'category',
      data: periodos
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: quantidade,
        type: 'bar'
      }
    ]
  };

  grafico.setOption(option);
}

window.onload = async () => {
  await renderPizza();
  await renderBarra();
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