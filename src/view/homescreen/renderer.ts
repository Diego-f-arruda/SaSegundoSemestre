import Veiculo from '../../entity/Veiculo';
import './index.css';

/*async findByCategory(){
  try {
      this.connection.connect();
      const sql = "SELECT * category, sum(amount) as qtd from product group by category order by desc"
      const result = await this.connection.query(sql);
      if(result.rows.length > 0){
          return result.rows;
      }else{
          console.log("Não foi encontrado nenhum valor!");
          return [];
      }        
  } catch (error) {
      console.log(error);
      return [];
  }finally{
      this.connection.end();
      this.connection = null;
  }*/



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
