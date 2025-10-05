import readlineSync from "readline-sync";
import { Funcionario } from "../models/Funcionario";
import { NivelPermissao } from "../enums/enums";
import { menuAeronave } from "./aeronave";
import { menuFuncionario } from "./funcionario";
import { menuPeca } from "./peca";
import { menuEtapa } from "./etapa";
import { menuTeste } from "./teste";
import { menuRelatorio } from "./relatorio";

export function mainMenu(usuarioLogado: Funcionario) {
  let sair = false;

  while (!sair) {
    console.log("\n=== AEROCODE CLI ===");
    let opcoes: { [key: string]: () => void } = {};

    if (usuarioLogado.nivelPermissao === NivelPermissao.OPERADOR) {
      console.log("3. Pecas");
      console.log("4. Etapas");
      opcoes["3"] = menuPeca;
      opcoes["4"] = menuEtapa;
    }

    if (usuarioLogado.nivelPermissao === NivelPermissao.ENGENHEIRO) {
      console.log("1. Aeronaves");
      console.log("3. Pecas");
      console.log("4. Etapas");
      console.log("5. Testes");
      console.log("6. Relatorios");
      opcoes["1"] = menuAeronave;
      opcoes["3"] = menuPeca;
      opcoes["4"] = menuEtapa;
      opcoes["5"] = menuTeste;
      opcoes["6"] = menuRelatorio;
    }

    if (usuarioLogado.nivelPermissao === NivelPermissao.ADMINISTRADOR) {
      console.log("1. Aeronaves");
      console.log("2. Funcionarios");
      console.log("3. Pecas");
      console.log("4. Etapas");
      console.log("5. Testes");
      console.log("6. Relatorios");
      opcoes["1"] = menuAeronave;
      opcoes["2"] = menuFuncionario;
      opcoes["3"] = menuPeca;
      opcoes["4"] = menuEtapa;
      opcoes["5"] = menuTeste;
      opcoes["6"] = menuRelatorio;
    }

    console.log("0. Sair");

    const escolha = readlineSync.question("Escolha uma opcao: ");

    if (escolha === "0") {
      sair = true;
    } else if (opcoes[escolha]) {
      opcoes[escolha]();
    } else {
      console.log("Opcao invalida ou sem permissao!");
    }
  }
}
