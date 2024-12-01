import Veiculo from '../../entity/Veiculo';
import './index.css';
import * as echarts from 'echarts';
import '../geral.css';

document.getElementById("grafico").addEventListener("click", async (event: MouseEvent) => {
  const values = await (window as any).productAPI.findAmountByCategory();
  console.log(values);

  const quantidade = [];
  const categoria = [];

  for(let i = 0; i < values.length; i++){
      quantidade.push(values[i].amount);
      categoria.push(values[i].category);
  }

  const div = document.getElementById("grafico") as HTMLDivElement;
  const grafico = echarts.init(div);
  const option = {
      xAxis: {
        type: 'category',
        data: categoria
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
})


//-----------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("botao-producao")?.addEventListener("click", async(event: MouseEvent) => {
  (window as any).navegacaoAPI.production();
})

document.getElementById("botao-registro")?.addEventListener("click", async(event: MouseEvent) => {
  (window as any).navegacaoAPI.stockRegistration();
})

document.getElementById("botao-home")?.addEventListener("click", async(event: MouseEvent) => {
  (window as any).navegacaoAPI.paginaHome();
})

document.getElementById("buscar-amount-by-category").addEventListener("click", async(event: MouseEvent) => {
  const values = await (window as any).navegacaoAPI.findByCategory();
  console.log(values)

  const amount = []
  const categoria = []

for(let i=0; i< values.length; i++){
  amount.push(values[i].amount)
  categoria.push(values[i].category)
}

  const div = document.getElementById("grafico") as HTMLDivElement;
  const grafico = echarts.init(div)

  const option = {
    xAxis: {
      type: 'category',
      data: categoria
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: amount,
        type: 'bar'
      }
    ]
  }
  grafico.setOption(option);
})
