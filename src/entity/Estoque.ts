import { v4 as uuid } from "uuid";

export enum TipoUso {
    interna ="interna",
    externa = "externa"
}

export default class Estoque {
    private id: string;
    private nome: string;
    private fabricante: string;
    private tipo: TipoUso;
    private quantidade: number;
    private dataEntrada: Date;
    private custo: number

    constructor(nome: string, fabricante: string, tipo: TipoUso, quantidade: number, dataEntrada: Date, custo: number, id?:string){
        this.id = id === undefined ? uuid() : id;
        this.nome = nome;
        this.fabricante = fabricante;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.dataEntrada = dataEntrada;
        this.custo = custo;
    }
    public getId(){
        return this.id;
    }

    public getNome(){
        return this.nome;
    }

    public getFabricante(){
        return this.fabricante;
    }

    public getTipo(){
        return this.tipo;
    }

    public getQuantidade(){
        return this.quantidade;
    }

    public getDataEntrada(){
        return this.dataEntrada;
    }

    public getCusto(){
        return this.custo;
    }

}