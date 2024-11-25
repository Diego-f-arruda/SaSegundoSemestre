import { Client } from "pg";
import Veiculo from "src/entity/Veiculo";

export default class VeiculoRepository {
    private connection: Client

    constructor(){
        if(!this.connection){
            this.connection = new Client({
                host: 'localhost',
                port: 5432,
                database: 'SA',
                user: 'postgres',
                password: 'senai'
            })
        }
    }

    async save(veiculo: Veiculo){

        try {
            await this.connection.connect()
            const sql = "INSERT INTO veiculo (id, motor, cor, cambio, qtd_portas, bancos, rodas) VALUES ($1, $2, $3, $4, $5, $6, $7)";
            const values = [veiculo.getId(), veiculo.getMotor(), veiculo.getCor(), veiculo.getCambio(), veiculo.getQtd_portas(), veiculo.getBancos(), veiculo.getRodas()];
            await this.connection.query(sql, values);            
        } catch (error) {
            console.log(error)
        }finally{
            this.connection.end();
            this.connection = null;
        }
    }

    async findAll(){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM veiculo WHERE esta_ativo = $1"
            const result = await this.connection.query(sql, [true]);
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

    async findById(id: string){
        try {
            await this.connection.connect();
            const sql = "SELECT * FROM veiculo WHERE id = $1"
            // const values = [id];
            const result = await this.connection.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            console.log(error)
        }finally{
            await this.connection.end;
            this.connection = null;
        }
    }

    async delete(id: string){
        try {
            await this.connection.connect();
            const sql = "UPDATE veiculo SET esta_ativo = $1 WHERE id = $2"
            await this.connection.query(sql, [false, id]);
            
        } catch (error) {
            console.log(error)
        }finally{
            await this.connection.end;
            this.connection = null;
        }
    }

}