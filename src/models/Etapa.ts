import { StatusEtapa } from "../enums/enums";
import { Funcionario } from "./Funcionario";
import { salvar, carregar } from "../utils/persistencia";

const ETAPAS_FILE = "src/data/etapas.json";

export class Etapa {
  public funcionarios: Funcionario[] = [];
  public status: StatusEtapa = StatusEtapa.PENDENTE;

  constructor(
    public nome: string,
    public prazo: string,
    public aeronaveCodigo: string 
  ) {}

  iniciar(): void {
    if (this.status === StatusEtapa.PENDENTE) this.status = StatusEtapa.EM_ANDAMENTO;
    else console.log(`Etapa "${this.nome}" não pode ser iniciada.`);
  }

  finalizar(): void {
    if (this.status === StatusEtapa.EM_ANDAMENTO) this.status = StatusEtapa.CONCLUIDA;
    else console.log(`Etapa "${this.nome}" não pode ser finalizada.`);
  }

  associarFuncionario(f: Funcionario): void {
    if (!this.funcionarios.some(func => func.id === f.id)) this.funcionarios.push(f);
    else console.log(`Funcionário "${f.nome}" já está associado.`);
  }

  listarFuncionarios(): Funcionario[] {
    return this.funcionarios;
  }

  salvar(): void {
    const etapas = carregar<Etapa>(ETAPAS_FILE);
    const index = etapas.findIndex(e => e.nome === this.nome);
    if (index !== -1) etapas[index] = this;
    else etapas.push(this);
    salvar(etapas, ETAPAS_FILE);
  }

 static carregarTodos(): Etapa[] {
  const etapasBrutas = carregar<Etapa>(ETAPAS_FILE);
  return etapasBrutas.map(e => {
    const etapa = new Etapa(e.nome, e.prazo, e.aeronaveCodigo);
    etapa.funcionarios = e.funcionarios || [];
    etapa.status = e.status || StatusEtapa.PENDENTE;
    return etapa;
  });
}
}
