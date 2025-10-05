import readlineSync from "readline-sync";
import { Teste } from "../models/Teste";
import { TipoTeste, ResultadoTeste } from "../enums/enums";
import { Aeronave } from "../models/Aeronave";

export function menuTeste() {
  let sair = false;

  while (!sair) {
    console.log("\n--- Menu Teste ---");
    console.log("1. Registrar Teste");
    console.log("2. Listar Testes");
    console.log("0. Voltar");

    const escolha = readlineSync.question("Escolha: ");

    switch (escolha) {
      case "1":
        registrarTeste();
        break;
      case "2":
        listarTestes();
        break;
      case "0":
        sair = true;
        break;
      default:
        console.log("Opcao invalida!");
    }
  }
}

function registrarTeste() {
  const aeronaves = Aeronave.carregarTodos();
  if (aeronaves.length === 0) {
    console.log("Nenhuma aeronave cadastrada.");
    return;
  }

  console.log("\nAeronaves disponiveis:");
  aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
  const indexAeronave = parseInt(readlineSync.question("Escolha a aeronave pelo numero: ")) - 1;
  if (indexAeronave < 0 || indexAeronave >= aeronaves.length) return;
  const aeronaveSelecionada = aeronaves[indexAeronave];

  const tipos = Object.values(TipoTeste);
  tipos.forEach((t, i) => console.log(`${i + 1}. ${t}`));
  const indexTipo = parseInt(readlineSync.question("Escolha o tipo pelo numero: ")) - 1;
  if (indexTipo < 0 || indexTipo >= tipos.length) return;
  const tipo = tipos[indexTipo] as TipoTeste;

  const resultados = Object.values(ResultadoTeste);
  resultados.forEach((r, i) => console.log(`${i + 1}. ${r}`));
  const indexResultado = parseInt(readlineSync.question("Escolha o resultado pelo numero: ")) - 1;
  if (indexResultado < 0 || indexResultado >= resultados.length) return;
  const resultado = resultados[indexResultado] as ResultadoTeste;

  const teste = new Teste(tipo, resultado, aeronaveSelecionada.codigo);
  teste.salvar();
  console.log("Teste registrado com sucesso!");
}

function listarTestes() {
  const testes = Teste.carregarTodos();
  if (testes.length === 0) {
    console.log("Nenhum teste registrado.");
    return;
  }

  testes.forEach(t => {
    console.log(`\nAeronave: ${t.aeronaveCodigo} | Tipo: ${t.tipo} | Resultado: ${t.resultado}`);
  });
}
