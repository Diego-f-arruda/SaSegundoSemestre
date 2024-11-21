import { v4 as uuid } from "uuid";

export default class Veiculo {
    private id: string;
    private motor: string;
    private cor: string;
    private cambio: string;
    private chassi: string;
    private bancos: string;
    private rodas: string

    constructor(motor: string, cor: string, cambio: string, chassi: string, bancos: string, rodas: string, id?:string){
        this.id = id === undefined ? uuid() : id;  // dessa forma ja valida se ja foi feito um id 
        this.motor = motor;
        this.cor = cor;
        this.cambio = cambio;
        this.chassi = chassi;
        this.bancos = bancos;
        this.rodas = rodas;
    }
    public getId(){
        return this.id;
    }

    public getMotor(){
        return this.motor;
    }

    public getCor(){
        return this.cor;
    }

    public getCambio(){
        return this.cambio;
    }

    public getChassi(){
        return this.chassi;
    }

    public getBancos(){
        return this.bancos;
    }

    public getRodas(){
        return this.rodas;
    }

}