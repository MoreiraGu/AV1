// src/utils/criarAdmin.ts
import { Funcionario } from "../models/Funcionario";
import { NivelPermissao } from "../enums/enums";

export function criarAdminPadrao() {
  const funcionarios = Funcionario.carregarTodos();


  const existeAdmin = funcionarios.some(f => f.nivelPermissao === NivelPermissao.ADMINISTRADOR);

  if (!existeAdmin) {

    const usuarioExiste = funcionarios.some(f => f.usuario === "admin");

    let id = "admin";
    while (funcionarios.some(f => f.id === id)) {
      id += "_1"; 
    }

    if (!usuarioExiste) {
      const admin = new Funcionario(
        id,                 
        "Administrador",     
        "000000000",         
        "Endereco",          
        "admin",             
        "admin",             
        NivelPermissao.ADMINISTRADOR
      );
      admin.salvar();
      console.log("Admin padrão criado: usuário 'admin' e senha 'admin'");
    } else {
      console.log("Usuario 'admin' já existe, nenhum admin novo criado.");
    }
  }
}
