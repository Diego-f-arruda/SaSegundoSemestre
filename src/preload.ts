import { contextBridge, ipcRenderer } from "electron";
import Veiculo from "./entity/Veiculo";

contextBridge.exposeInMainWorld('bancoAPI', {
    createVeiculo: async (veiculo: Veiculo) => await ipcRenderer.invoke('create', veiculo),
    findAll: async () => await ipcRenderer.invoke('findAll'),
    findById: async (id: string) => await ipcRenderer.invoke('findById', id),
    deletarVeiculo: async (id: string) => await ipcRenderer.invoke('deletarVeiculo', id),
    createUsuario: async (usuario: any) => await ipcRenderer.invoke('createUsuario', usuario),
    findByEmail: async (email: string) => await ipcRenderer.invoke('findByEmail', email)
} )

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

