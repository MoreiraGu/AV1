import readlineSync from "readline-sync";
import { Etapa } from "../models/Etapa";
import { Funcionario } from "../models/Funcionario";
import { Aeronave } from "../models/Aeronave";
import { StatusEtapa, NivelPermissao } from "../enums/enums";

export function menuEtapa() {
  let sair = false;

  while (!sair) {
    console.log("\n--- Menu Etapa ---");
    console.log("1. Cadastrar Etapa");
    console.log("2. Listar Etapas");
    console.log("3. Iniciar Etapa");
    console.log("4. Finalizar Etapa");
    console.log("0. Voltar");

    const escolha = readlineSync.question("Escolha: ");

    switch (escolha) {
      case "1":
        cadastrarEtapa();
        break;
      case "2":
        listarEtapas();
        break;
      case "3":
        atualizarStatusEtapa(StatusEtapa.EM_ANDAMENTO);
        break;
      case "4":
        atualizarStatusEtapa(StatusEtapa.CONCLUIDA);
        break;
      case "0":
        sair = true;
        break;
      default:
        console.log("Opcao invalida!");
    }
  }
}

function cadastrarEtapa() {
  const nome = readlineSync.question("Nome da Etapa: ");
  const prazo = readlineSync.question("Prazo: ");

  const aeronaves = Aeronave.carregarTodos();
  if (aeronaves.length === 0) {
    console.log("Nenhuma aeronave cadastrada. Cadastre uma antes de criar etapas.");
    return;
  }

  console.log("\nAeronaves disponiveis:");
  aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
  const escolhaAeronave = readlineSync.question("Escolha a aeronave pelo numero: ");
  const indexAeronave = parseInt(escolhaAeronave) - 1;

  if (indexAeronave < 0 || indexAeronave >= aeronaves.length) {
    console.log("Escolha invalida.");
    return;
  }

  const aeronaveSelecionada = aeronaves[indexAeronave];
  const etapa = new Etapa(nome, prazo, aeronaveSelecionada.codigo);

  let mais = true;
  while (mais) {
    const funcionariosDisponiveis = Funcionario.carregarTodos()
      .filter(f => f.nivelPermissao !== NivelPermissao.ADMINISTRADOR)
      .filter(f => !etapa.funcionarios.some(ef => ef.id === f.id));

    if (funcionariosDisponiveis.length === 0) {
      console.log("Nenhum funcionario disponivel para associar.");
      break;
    }

    console.log("\nFuncionarios disponiveis:");
    funcionariosDisponiveis.forEach((f, i) => console.log(`${i + 1}. ${f.nome}`));
    console.log("0. Finalizar associacao de funcionarios");

    const escolha = readlineSync.question("Escolha funcionario pelo numero: ");
    const index = parseInt(escolha) - 1;

    if (escolha === "0") {
      mais = false;
      continue;
    }

    if (index >= 0 && index < funcionariosDisponiveis.length) {
      const func = funcionariosDisponiveis[index];
      etapa.associarFuncionario(func);
      console.log(`Funcionario "${func.nome}" associado com sucesso!`);
    } else {
      console.log("Escolha invalida.");
    }
  }

  etapa.salvar();
  console.log("Etapa cadastrada com sucesso!");
}

function listarEtapas() {
  const etapas = Etapa.carregarTodos();
  if (etapas.length === 0) {
    console.log("Nenhuma etapa cadastrada.");
    return;
  }

  etapas.forEach(e => {
    console.log(`\nNome: ${e.nome} | Prazo: ${e.prazo} | Status: ${e.status}`);
    const aeronave = Aeronave.carregarTodos().find(a => a.codigo === e.aeronaveCodigo);
    console.log(`Aeronave: ${aeronave?.codigo} - ${aeronave?.modelo}`);
    console.log(`Funcionarios: ${e.funcionarios.map(f => f.nome).join(", ")}`);
  });
}

function atualizarStatusEtapa(novoStatus: StatusEtapa) {
  const etapas = Etapa.carregarTodos();
  if (etapas.length === 0) {
    console.log("Nenhuma etapa cadastrada.");
    return;
  }

  etapas.forEach((e, i) => console.log(`${i + 1}. ${e.nome} | Status: ${e.status}`));
  const escolha = readlineSync.question("Escolha a etapa pelo numero: ");
  const index = parseInt(escolha) - 1;

  if (index >= 0 && index < etapas.length) {
    const etapa = etapas[index];
    if (novoStatus === StatusEtapa.EM_ANDAMENTO) etapa.iniciar();
    else if (novoStatus === StatusEtapa.CONCLUIDA) etapa.finalizar();
    etapa.salvar();
    console.log(`Etapa "${etapa.nome}" atualizada para ${etapa.status}`);
  }
}
