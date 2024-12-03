import { Client } from "pg";
import Veiculo from "../entity/Veiculo";

export default class VeiculoRepository {
    private connection: Client

    constructor(){
        if(!this.connection){
            this.connection = new Client({
                host: 'localhost',
                port: 5432,
                //port: 5433,
                database: 'SA',
                user: 'postgres',
                password: 'senai'
            })
        }
    }

    async save(veiculo: Veiculo){
        try {
            await this.connection.connect()
            const sql = "INSERT INTO veiculo (modelo, fabricante, placa, ano_fabricacao) VALUES ($1, $2, $3, $4) RETURNING id";
            const values = [veiculo.getModelo(), veiculo.getFabricante(), veiculo.getPlaca(), veiculo.getAnoFabricacao()];
            const result = await this.connection.query(sql, values); 
            const id = result.rows[0].id;

            veiculo.setId(id);

            return veiculo;
        } catch (error) {
            console.log(error)
        }finally{
            this.connection.end();
            this.connection = null;
        }
    }

    

    async estoqueDoVeiculo(veiculoId: string, estoqueId: string) {
        const sql = "INSERT INTO veiculo_estoque (veiculo_id, estoque_id) VALUES ($1, $2)";
        await this.connection.query(sql, [veiculoId, estoqueId]);
    }

    async findAllVeiculo(){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM veiculo"
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
        }
    }
}