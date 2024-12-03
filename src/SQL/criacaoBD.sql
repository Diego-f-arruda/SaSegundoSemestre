CREATE DATABASE SA;

USING SA;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE estoque (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('interna', 'externa')) NOT NULL,
    quantidade INTEGER CHECK (quantidade >= 0) NOT NULL,
    data_entrada DATE NOT NULL,
    data_utilizacao DATE,
    custo DECIMAL(10, 2) CHECK (custo >= 0) NOT NULL
);


CREATE TABLE veiculo (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    placa VARCHAR(20) UNIQUE NOT NULL,
    ano_fabricacao INTEGER CHECK (ano_fabricacao > 1900) NOT NULL,
    acessorios VARCHAR[]
);

CREATE TABLE veiculo_estoque (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    veiculo_id UUID NOT NULL,
    estoque_id UUID NOT NULL,
    quantidade_usada INTEGER CHECK (quantidade_usada > 0) NOT NULL,
    data_utilizacao DATE NOT NULL,
    custo_total DECIMAL(10, 2) CHECK (custo_total >= 0) NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo (id) ON DELETE CASCADE,
    FOREIGN KEY (estoque_id) REFERENCES estoque (id) ON DELETE CASCADE
);

CREATE TABLE usuario (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	data_nascimento DATE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password_hash(50) VARCHAR NOT NULL
);
