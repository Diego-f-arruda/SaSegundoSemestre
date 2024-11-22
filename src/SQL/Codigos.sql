CREATE DATABASE SA;

CREATE EXTENSION IF NOT EXISTS "pgcrypto"

CREATE TABLE estoque (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, 
    descricao VARCHAR(30) NOT NULL,
    quantidade INTEGER NOT NULL,
    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,
    custo DECIMAL NOT NULL,
    status BOOLEAN NOT NULL
);

CREATE TABLE veiculo_estoque (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    id_veiculo UUID NOT NULL,
    id_estoque UUID NOT NULL,
    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id) ON DELETE CASCADE,
    FOREIGN KEY (id_estoque) REFERENCES estoque(id) ON DELETE CASCADE
);

CREATE TABLE veiculo (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, 
	motor VARCHAR(30) NOT NULL,
    cambio VARCHAR(30) NOT NULL,
    qtd_portas VARCHAR(30) NOT NULL,
    bancos VARCHAR(30) NOT NULL,
    rodas VARCHAR(30) NOT NULL,
    cor VARCHAR(30) NOT NULL
);

