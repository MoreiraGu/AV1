import readlineSync from "readline-sync";
import { Peca } from "../models/Peca";
import { Aeronave } from "../models/Aeronave";
import { TipoPeca, StatusPeca } from "../enums/enums";

export function menuPeca() {
  let sair = false;

  while (!sair) {
    console.log("\n--- Menu Peca ---");
    console.log("1. Cadastrar Peca");
    console.log("2. Listar Pecas");
    console.log("3. Atualizar Status de Peca");
    console.log("0. Voltar");

    const escolha = readlineSync.question("Escolha: ");

    switch (escolha) {
      case "1":
        cadastrarPeca();
        break;
      case "2":
        listarPecas();
        break;
      case "3":
        atualizarStatusPeca();
        break;
      case "0":
        sair = true;
        break;
      default:
        console.log("Opcao invalida!");
    }
  }
}

function cadastrarPeca() {
  const nome = readlineSync.question("Nome da peca: ");

  console.log("Tipo de Peca:");
  console.log("1. NACIONAL");
  console.log("2. IMPORTADA");
  const tipoEscolha = parseInt(readlineSync.question("Escolha 1 ou 2: "));
  const tipo = tipoEscolha === 2 ? TipoPeca.IMPORTADA : TipoPeca.NACIONAL;

  const fornecedor = readlineSync.question("Fornecedor: ");
  const status = StatusPeca.EM_PRODUCAO;

  const aeronaves = Aeronave.carregarTodos();
  let aeronaveCodigo: string | undefined = undefined;

  if (aeronaves.length > 0) {
    console.log("\nSelecione a aeronave para anexar a peca:");
    aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
    const escolha = parseInt(readlineSync.question("Escolha pelo numero (ou 0 para nenhuma): "));
    if (escolha > 0 && escolha <= aeronaves.length) {
      aeronaveCodigo = aeronaves[escolha - 1].codigo;
    }
  } else {
    console.log("Nenhuma aeronave cadastrada. A peca sera criada sem vinculo.");
  }

  const peca = new Peca(nome, tipo, fornecedor, status, aeronaveCodigo);
  peca.salvar();

  console.log("Peca cadastrada com sucesso!");
  if (aeronaveCodigo) console.log(`Associada a aeronave: ${aeronaveCodigo}`);
}

function listarPecas() {
  const pecas = Peca.carregarTodos();
  if (pecas.length === 0) {
    console.log("Nenhuma peca cadastrada.");
    return;
  }

  const aeronaves = Aeronave.carregarTodos();

  pecas.forEach((p, i) => {
    let aeronaveInfo = "";
    if (p.aeronaveCodigo) {
      const aeronave = aeronaves.find(a => a.codigo === p.aeronaveCodigo);
      if (aeronave) aeronaveInfo = ` | Aeronave: ${aeronave.codigo} - ${aeronave.modelo}`;
      else aeronaveInfo = ` | Aeronave: ${p.aeronaveCodigo} (nao encontrada)`;
    }

    console.log(
      `${i + 1}. Nome: ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}${aeronaveInfo}`
    );
  });
}

function atualizarStatusPeca() {
  const pecas = Peca.carregarTodos();
  if (pecas.length === 0) {
    console.log("Nenhuma peca cadastrada.");
    return;
  }

  pecas.forEach((p, i) => {
    console.log(`${i + 1}. ${p.nome} | Status: ${p.status}` + (p.aeronaveCodigo ? ` | Aeronave: ${p.aeronaveCodigo}` : ""));
  });

  const escolha = parseInt(readlineSync.question("Escolha a peca pelo numero: ")) - 1;
  if (escolha < 0 || escolha >= pecas.length) {
    console.log("Escolha invalida!");
    return;
  }

  const peca = pecas[escolha];

  console.log("Status disponiveis:");
  console.log("1. EM_PRODUCAO");
  console.log("2. EM_TRANSPORTE");
  console.log("3. PRONTA");
  const statusEscolha = parseInt(readlineSync.question("Escolha 1, 2 ou 3: "));
  if (statusEscolha === 1) peca.atualizarStatus(StatusPeca.EM_PRODUCAO);
  else if (statusEscolha === 2) peca.atualizarStatus(StatusPeca.EM_TRANSPORTE);
  else if (statusEscolha === 3) peca.atualizarStatus(StatusPeca.PRONTA);
  else {
    console.log("Opcao invalida!");
    return;
  }

  peca.salvar();
  console.log(`Status da peca "${peca.nome}" atualizado para ${peca.status}`);
}
