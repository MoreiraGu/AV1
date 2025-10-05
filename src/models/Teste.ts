// Teste.ts
import { TipoTeste, ResultadoTeste } from "../enums/enums";
import { salvar, carregar } from "../utils/persistencia";

const TESTES_FILE = "src/data/testes.json";

export class Teste {
  constructor(
    public tipo: TipoTeste,
    public resultado: ResultadoTeste,
    public aeronaveCodigo: string
  ) {}

  salvar(): void {
    const testes = carregar<Teste>(TESTES_FILE);
    testes.push(this);
    salvar(testes, TESTES_FILE);
  }

  static carregarTodos(): Teste[] {
    return carregar<Teste>(TESTES_FILE);
  }
}
