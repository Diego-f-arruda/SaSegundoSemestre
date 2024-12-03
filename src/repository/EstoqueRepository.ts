import { Client } from "pg";
import Estoque from "../entity/Estoque";

export default class EstoqueRepository {
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

    async save(estoque: Estoque){

        try {
            await this.connection.connect()
            const sql = "INSERT INTO estoque (id, nome, fabricante, tipo, quantidade, data_entrada, custo) VALUES ($1, $2, $3, $4, $5, $6, $7)";
            const values = [estoque.getId(), estoque.getNome(), estoque.getFabricante(), estoque.getTipo(), estoque.getQuantidade(), estoque.getDataEntrada(), estoque.getCusto()];
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
            const sql = "SELECT * FROM estoque"
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

    async findAllEstoque() {
        try {
            this.connection.connect();
            const sql = "SELECT * FROM estoque";
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

    async findById(id: string){
        try {
            await this.connection.connect();
            const sql = "SELECT * FROM estoque WHERE id = $1"
            const result = await this.connection.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            console.log(error)
        }finally{
            await this.connection.end();
            this.connection = null;
        }
    }
}