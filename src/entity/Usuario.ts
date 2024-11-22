import { v4 as uuid } from 'uuid';

export default class Usuario {
    private id: string;
    private name: string;
    private email: string;
    private password: string;
    private data_nascimento: Date;
    
    constructor(name: string, email: string, password: string, data_nascimento: Date) {
        this.id = uuid()
        this.name = name;
        this.email = email;
        this.data_nascimento = data_nascimento;
        this.password = password;
    }

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name;
    }

    public getEmail() {
        return this.email;
    }

    public getPassword(){
        return this.password;
    }

    public getDataNascimento(){
        return this.data_nascimento;
    }
}