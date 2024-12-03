import Veiculo from '../../entity/Veiculo';
import './index.css';
import '../geral.css';

interface AcessorioVeiculo {
    veiculoId: string;
    acessorioId: string;
}

let listaAcessorios: any[] = [];
const listaVeiculos: Veiculo[] = [];
const listaAcessoriosSelecionados: AcessorioVeiculo[] = [];

async function carregarAcessorios() {
    const listaAcessoriosDiv = document.getElementById('lista-acessorios');

    try {
        const acessorios = await (window as any).bancoAPI.findAllEstoque();
        listaAcessorios = acessorios;
        const fragment = document.createDocumentFragment();

        acessorios.forEach((acessorio: any) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = acessorio.id;
            checkbox.value = acessorio.id;
            checkbox.addEventListener('change', (event) => {
                const target = event.target as HTMLInputElement;
                if (target.checked) {
                    listaAcessoriosSelecionados.push({ veiculoId: '', acessorioId: target.value });
                } else {
                    const index = listaAcessoriosSelecionados.findIndex(
                        (item) => item.acessorioId === target.value
                    );
                    if (index > -1) {
                        listaAcessoriosSelecionados.splice(index, 1);
                    }
                }
            });

            const label = document.createElement('label');
            label.htmlFor = acessorio.id;
            label.innerText = `${acessorio.nome} (${acessorio.fabricante})`;

            fragment.appendChild(checkbox);
            fragment.appendChild(label);
            fragment.appendChild(document.createElement('br'));
        });

        listaAcessoriosDiv.appendChild(fragment);
    } catch (error) {
        console.error('Erro ao carregar acessórios:', error);
    }
}

async function carregarVeiculosEAcessorios() {
    const veiculos = await (window as any).bancoAPI.findAllVeiculos();
    const acessorios = await (window as any).bancoAPI.findAllEstoque();

    listaVeiculos.length = 0;
    listaAcessorios.length = 0;

    veiculos.forEach((veiculo: any) => {
        listaVeiculos.push(new Veiculo(veiculo.modelo, veiculo.fabricante, veiculo.placa, veiculo.anoFabricacao, veiculo.id));
    });

    acessorios.forEach((acessorio: any) => {
        listaAcessorios.push(acessorio);
    });

    render();
}

window.onload = async () => {
    await carregarAcessorios();
    await carregarVeiculosEAcessorios();
};

document.getElementById('botao-cadastrar-veiculo')?.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    const modelo = (document.getElementById('modelo') as HTMLInputElement).value;
    const fabricante = (document.getElementById('fabricante') as HTMLInputElement).value;
    const placa = (document.getElementById('placa') as HTMLInputElement).value;
    const anoFabricacao = Number((document.getElementById('anoFabricacao') as HTMLInputElement).value);

    if (!modelo || !fabricante || !placa || !anoFabricacao) {
        console.log("Preencha todos os campos corretamente!");
        return;
    }

    const veiculo = new Veiculo(modelo, fabricante, placa, anoFabricacao);

    try {
        const novoVeiculo = await (window as any).bancoAPI.createVeiculo(veiculo);
        console.log(novoVeiculo.getId())
        if (!novoVeiculo || !novoVeiculo.id) {
            console.error("Erro ao cadastrar veículo: ID não retornado");
            return;
        }

        console.log("Veículo cadastrado com sucesso:", novoVeiculo);

        for (const acessorio of listaAcessoriosSelecionados) {
            if (acessorio.acessorioId) {
                await (window as any).bancoAPI.linkAcessorioToVeiculo(novoVeiculo.id, acessorio.acessorioId);
            }
        }

        console.log("Acessórios associados com sucesso:", listaAcessoriosSelecionados);
    } catch (error) {
        console.error("Erro ao cadastrar veículo:", error);
    }
});

function render() {
    const div = document.getElementById("lista-acessorios");
    div.innerHTML = "";

    listaAcessoriosSelecionados.forEach((associacao) => {
        const veiculo = listaVeiculos.find(v => v.getId() === associacao.veiculoId);
        const acessorio = listaAcessorios.find(a => a.id === associacao.acessorioId);

        if (veiculo && acessorio) {
            const span = document.createElement("span");
            span.innerHTML = `
                <strong>
                    Veículo: ${veiculo.getModelo()} || 
                    Acessório: ${acessorio.nome}
                </strong><br>
            `;
            div.appendChild(span);
        }
    });
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("botao-producao")?.addEventListener("click", async (event: MouseEvent) => {
    (window as any).navegacaoAPI.production();
})

document.getElementById("botao-registro")?.addEventListener("click", async (event: MouseEvent) => {
    (window as any).navegacaoAPI.stockRegistration();
})

document.getElementById("botao-home")?.addEventListener("click", async (event: MouseEvent) => {
    (window as any).navegacaoAPI.paginaHome();
})

window.onload = async () => {
    await carregarAcessorios();
};