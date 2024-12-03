import { contextBridge, ipcRenderer } from "electron";
import Veiculo from "./entity/Estoque";

contextBridge.exposeInMainWorld('bancoAPI', {
    createEstoque: async (veiculo: Veiculo) => await ipcRenderer.invoke('create', veiculo),
    createVeiculo: async (veiculo: Veiculo) => await ipcRenderer.invoke('createVeiculo', veiculo),
    findAll: async () => await ipcRenderer.invoke('findAll'),
    findAllEstoque: async () => await ipcRenderer.invoke('findAllEstoque'),
    findById: async (id: string) => await ipcRenderer.invoke('findById', id),
    deletarVeiculo: async (id: string) => await ipcRenderer.invoke('deletarVeiculo', id),
    createUsuario: async (usuario: any) => await ipcRenderer.invoke('createUsuario', usuario),
    findByEmail: async (email: string) => await ipcRenderer.invoke('findByEmail', email)
})

contextBridge.exposeInMainWorld('navegacaoAPI', {
    //navegarPara: (id: string) => ipcRenderer.send("navegarPara", id),
    //navegarPara: (page: string) => ipcRenderer.send('navegar', page),
    paginaHome: () => ipcRenderer.send("homescreen"),
    stockRegistration: () => ipcRenderer.send("stockregistration"),
    production: () => ipcRenderer.send("production")
})

contextBridge.exposeInMainWorld('authAPI', {
    hash: async (credentials: any) => await ipcRenderer.invoke("hash_password", credentials),
})

contextBridge.exposeInMainWorld('productAPI', {
    findAmountByCategory: async () => {
        return ipcRenderer.invoke('findAmountByCategory');
    },
    findAllVeiculos: () => ipcRenderer.invoke('findAllVeiculos'),
    findAcessoriosPorSemanaOuMes: () => ipcRenderer.invoke('findAcessoriosPorSemanaOuMes'),

});

ipcRenderer.send('findAllVeiculos');
ipcRenderer.on('findAllVeiculosResponse', (event, result) => {
    console.log(result);
});


ipcRenderer.send('findAcessoriosPorPeriodo');

ipcRenderer.on('findAcessoriosPorPeriodoResponse', (event, result) => {
    console.log(result);
});