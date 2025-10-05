import readlineSync from "readline-sync";
import { Aeronave } from "../models/Aeronave";
import { Cliente } from "../models/Cliente";
import { TipoAeronave } from "../enums/enums";

export function menuAeronave() {
  let sair = false;

  while (!sair) {
    console.log("\n--- Menu Aeronave ---");
    console.log("1. Cadastrar Aeronave");
    console.log("2. Listar Aeronaves");
    console.log("0. Voltar");

    const escolha = readlineSync.question("Escolha: ");

    switch (escolha) {
      case "1":
        cadastrarAeronave();
        break;
      case "2":
        listarAeronaves();
        break;
      case "0":
        sair = true;
        break;
      default:
        console.log("Opcao invalida!");
    }
  }
}

function cadastrarAeronave() {
  const codigo = readlineSync.question("Codigo: ");

  const todas = Aeronave.carregarTodos();
  if (todas.some(a => a.codigo === codigo)) {
    console.log("Codigo ja existe. Tente outro.");
    return;
  }

  const modelo = readlineSync.question("Modelo: ");

  console.log("Tipo de Aeronave:");
  console.log("1. COMERCIAL");
  console.log("2. MILITAR");
  const tipoEscolha = parseInt(readlineSync.question("Escolha 1 ou 2: "));
  const tipo = tipoEscolha === 2 ? TipoAeronave.MILITAR : TipoAeronave.COMERCIAL;

  const capacidade = parseInt(readlineSync.question("Capacidade: "));
  const alcance = parseInt(readlineSync.question("Alcance: "));
  const dataEntrega = readlineSync.question("Data de entrega: ");

  console.log("\n--- Dados do Cliente ---");
  const nomeCliente = readlineSync.question("Nome: ");
  const emailCliente = readlineSync.question("Email: ");
  const telefoneCliente = readlineSync.question("Telefone: ");
  const cliente = new Cliente(nomeCliente, emailCliente, telefoneCliente);

  // Criar aeronave apenas com os dados essenciais
  const aeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance, dataEntrega, cliente);
  aeronave.salvar();
  cliente.salvar();

  console.log("Aeronave cadastrada com sucesso!");
}

function listarAeronaves() {
  const aeronaves = Aeronave.carregarTodos();
  if (aeronaves.length === 0) {
    console.log("Nenhuma aeronave cadastrada.");
    return;
  }

  aeronaves.forEach(a => {
    console.log(`\nCodigo: ${a.codigo} | Modelo: ${a.modelo} | Tipo: ${a.tipo}`);
    console.log(`Cliente: ${a.cliente.nome} | Email: ${a.cliente.email} | Telefone: ${a.cliente.telefone}`);
    console.log(`Data de entrega: ${a.dataEntrega}`);
  });
}
