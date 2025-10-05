import readlineSync from "readline-sync";
import { Funcionario } from "../models/Funcionario";

export function login() {
  const usuarios = Funcionario.carregarTodos();
  const usuarioInput = readlineSync.question("Usuario: ");
  const senhaInput = readlineSync.question("Senha: ");

  const usuario = usuarios.find(u => u.usuario === usuarioInput && u.senha === senhaInput);

  if (!usuario) {
    console.log("Usuario ou senha invalidos!");
    return null;
  }

  console.log(`Bem-vindo, ${usuario.nome}!`);
  return usuario;
}
