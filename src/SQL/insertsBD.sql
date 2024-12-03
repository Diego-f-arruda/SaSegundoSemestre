INSERT INTO estoque (nome, fabricante, tipo, quantidade, data_entrada, custo)
VALUES
('Pneu', 'Michelin', 'externa', 100, '2024-12-01', 1200.50),
('Óleo Lubrificante', 'Castrol', 'interna', 200, '2024-11-15', 500.00),
('Filtro de Ar', 'Mann Filter', 'interna', 150, '2024-10-10', 250.75),
('Bateria Automotiva', 'Bosch', 'interna', 80, '2024-12-02', 400.90),
('Farol de LED', 'Philips', 'externa', 50, '2024-12-03', 750.00);


INSERT INTO veiculo (modelo, fabricante, placa, ano_fabricacao, acessorios)
VALUES
('Ford Fusion', 'Ford', 'ABC-1234', 2010, ARRAY['Pneu', 'Óleo Lubrificante']),
('Toyota Corolla', 'Toyota', 'XYZ-5678', 2020, ARRAY['Filtro de Ar', 'Farol de LED']),
('Chevrolet Onix', 'Chevrolet', 'QWE-9012', 2022, ARRAY['Bateria Automotiva']),
('Honda Civic', 'Honda', 'JKL-3456', 2018, ARRAY['Filtro de Ar', 'Óleo Lubrificante']),
('Volkswagen Golf', 'Volkswagen', 'MNO-7890', 2015, ARRAY['Farol de LED', 'Pneu']);

INSERT INTO usuario (nome, data_nascimento, email, password_hash)
VALUES
('Diego', '1989-07-04', 'sa', '$2b$12$PyWfGINhK2EbTe/pKkd7g.4ewF2N1wFI2x0a9.ciPalRBcOhKWjdy')