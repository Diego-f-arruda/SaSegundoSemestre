import Veiculo from '../../entity/Veiculo';
import './index.css';
import * as echarts from 'echarts'


//-----------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("botao-producao")?.addEventListener("click", async(event: MouseEvent) => {
  (window as any).navegacaoAPI.production();
})

document.getElementById("botao-registro")?.addEventListener("click", async(event: MouseEvent) => {
  (window as any).navegacaoAPI.stockRegistration();
})

document.getElementById("botao-home")?.addEventListener("click", async(event: MouseEvent) => {
  console.log("teste 1");
  (window as any).navegacaoAPI.paginaHome();
  console.log("teste 2");
})

document.getElementById("buscar-amount-by-category").addEventListener("click", async(event: MouseEvent)) => {
  const values = await (window as any).navegacaoAPI.findByCategory();
  console.log(values)

  const amount = []
  const categories = []

for(var i=0; i< values.length; i++){
  amount.push(values[i].amount)
  categories.push(values[i].category)
}

  const div = document.getElementById("grafico") as HTMLDivElement;
  const grafico = echarts.init(div)

  const option = {
    xAxis: {
      type: 'category',
      data: categories
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
}
