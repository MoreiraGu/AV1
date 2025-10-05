import readlineSync from "readline-sync";
import { Funcionario } from "../models/Funcionario";
import { NivelPermissao } from "../enums/enums";

export function menuFuncionario() {
  let sair = false;

  while (!sair) {
    console.log("\n--- Menu Funcionario ---");
    console.log("1. Cadastrar Funcionario");
    console.log("2. Listar Funcionarios");
    console.log("0. Voltar");

    const escolha = readlineSync.question("Escolha: ");

    switch (escolha) {
      case "1":
        cadastrarFuncionario();
        break;
      case "2":
        listarFuncionarios();
        break;
      case "0":
        sair = true;
        break;
      default:
        console.log("Opcao invalida!");
    }
  }
}

function cadastrarFuncionario() {
  const id = readlineSync.question("ID: ");

  const todos = Funcionario.carregarTodos();
  if (todos.some(f => f.id === id)) {
    console.log("ID ja existe. Tente outro.");
    return;
  }

  const nome = readlineSync.question("Nome: ");
  const telefone = readlineSync.question("Telefone: ");
  const endereco = readlineSync.question("Endereco: ");
  const usuario = readlineSync.question("Usuario: ");
  if (todos.some(f => f.usuario === usuario)) {
    console.log("Usuario ja existe. Tente outro.");
    return;
  }
  const senha = readlineSync.question("Senha: ");

  console.log("Nivel de Permissao:");
  console.log("1. ADMINISTRADOR");
  console.log("2. ENGENHEIRO");
  console.log("3. OPERADOR");
  const nivelEscolha = parseInt(readlineSync.question("Escolha 1, 2 ou 3: "));

  let nivel: NivelPermissao;
  switch (nivelEscolha) {
    case 2:
      nivel = NivelPermissao.ENGENHEIRO;
      break;
    case 3:
      nivel = NivelPermissao.OPERADOR;
      break;
    default:
      nivel = NivelPermissao.ADMINISTRADOR;
  }

  const funcionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel);
  funcionario.salvar();
  console.log("Funcionario cadastrado com sucesso!");
}

function listarFuncionarios() {
  const funcionarios = Funcionario.carregarTodos();
  if (funcionarios.length === 0) {
    console.log("Nenhum funcionario cadastrado.");
    return;
  }

  funcionarios.forEach(f => {
    console.log(`\nID: ${f.id} | Nome: ${f.nome} | Nivel: ${f.nivelPermissao}`);
  });
}
