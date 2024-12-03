import { v4 as uuid } from "uuid";

export default class Veiculo {
    private id: string;
    private modelo: string;
    private fabricante: string;
    private placa: string;
    private anoFabricacao: number;
    private acessorios: string[];

    constructor(modelo: string, fabricante: string, placa: string, anoFabricacao: number, id?: string) {
        this.id = id || uuid();
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.placa = placa;
        this.anoFabricacao = anoFabricacao;
        this.acessorios = []
    }

    public getId() {
        return this.id;
    }

    setId(id: string) {
        this.id = id;
    }

    public getModelo() {
        return this.modelo;
    }

    public getFabricante() {
        return this.fabricante;
    }

    public getPlaca() {
        return this.placa;
    }

    public getAnoFabricacao() {
        return this.anoFabricacao;
    }

    public getAcessorios() {
        return this.acessorios;
    }

    public setAcessorios(acessorioId: string) {
        if (!this.acessorios.includes(acessorioId)) {
            this.acessorios.push(acessorioId);
        }
    }

}
