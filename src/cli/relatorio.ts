import readlineSync from "readline-sync";
import { Aeronave } from "../models/Aeronave";
import { Relatorio } from "../models/Relatorio";
import { RelatorioJSON } from "../types/relatorio";

export function menuRelatorio() {
  let sair = false;

  while (!sair) {
    console.log("\n--- Menu Relatorio ---");
    console.log("1. Gerar Relatorio de Aeronave");
    console.log("2. Listar Relatorios");
    console.log("0. Voltar");

    const escolha = readlineSync.question("Escolha: ");

    switch (escolha) {
      case "1":
        gerarRelatorio();
        break;
      case "2":
        listarRelatorios();
        break;
      case "0":
        sair = true;
        break;
      default:
        console.log("Opcao invalida!");
    }
  }
}

function gerarRelatorio() {
  const aeronaves = Aeronave.carregarTodos();
  if (aeronaves.length === 0) {
    console.log("Nenhuma aeronave cadastrada.");
    return;
  }

  aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
  const escolha = readlineSync.question("Escolha a aeronave pelo numero: ");
  const index = parseInt(escolha) - 1;

  if (index >= 0 && index < aeronaves.length) {
    const aeronave = aeronaves[index];
    const relatorio = new Relatorio();
    relatorio.gerarRelatorio(aeronave);
    relatorio.salvarEmArquivo();
    console.log("Relatorio gerado e salvo com sucesso!");
  } else {
    console.log("Numero invalido!");
  }
}

function listarRelatorios() {
  const fs = require("fs");
  const path = "src/data/relatorios.json";

  if (!fs.existsSync(path)) {
    console.log("Nenhum relatorio gerado ainda.");
    return;
  }

  const relatorios: RelatorioJSON[] = JSON.parse(fs.readFileSync(path, "utf-8") || "[]");

  if (relatorios.length === 0) {
    console.log("Nenhum relatorio gerado ainda.");
    return;
  }

  relatorios.forEach((r: RelatorioJSON, i: number) => {
    console.log(`\n===== Relatorio ${i + 1} =====`);
    const a = r.aeronave;
    console.log(`Aeronave: ${a.codigo} - ${a.modelo}`);
    console.log(`Tipo: ${a.tipo} | Capacidade: ${a.capacidade} | Alcance: ${a.alcance}`);
    console.log(`Data de Entrega: ${a.dataEntrega}`);
    console.log(`Cliente: ${a.cliente.nome} | Email: ${a.cliente.email} | Telefone: ${a.cliente.telefone}`);

    console.log("\nPecas:");
    if (r.pecas.length === 0) console.log("  Nenhuma peca cadastrada.");
    else
      r.pecas.forEach((p, idx) => {
        console.log(`  ${idx + 1}. ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}`);
      });

    console.log("\nEtapas:");
    if (r.etapas.length === 0) console.log("  Nenhuma etapa cadastrada.");
    else
      r.etapas.forEach((e, idx) => {
        console.log(`  ${idx + 1}. ${e.nome} | Prazo: ${e.prazo} | Status: ${e.status}`);
        console.log(`     Funcionarios: ${e.funcionarios.length > 0 ? e.funcionarios.join(", ") : "Nenhum"}`);
      });

    console.log("\nTestes:");
    if (!r.testes || r.testes.length === 0) console.log("  Nenhum teste registrado.");
    else
      r.testes.forEach((t, idx) => {
        console.log(`  ${idx + 1}. Tipo: ${t.tipo} | Resultado: ${t.resultado}`);
      });

    console.log("=============================\n");
  });
}
