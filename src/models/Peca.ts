// src/models/Peca.ts
import { TipoPeca, StatusPeca } from "../enums/enums";
import { salvar, carregar } from "../utils/persistencia";


const PECAS_FILE = "src/data/pecas.json";

export class Peca {
  constructor(
    public nome: string,
    public tipo: TipoPeca,
    public fornecedor: string,
    public status: StatusPeca,
    public aeronaveCodigo?: string
  ) {}

  atualizarStatus(novoStatus: StatusPeca): void {
    this.status = novoStatus;
  }

  salvar(): void {
    const pecas = carregar<Peca>(PECAS_FILE);
    const index = pecas.findIndex(p => p.nome === this.nome && p.aeronaveCodigo === this.aeronaveCodigo);
    if (index !== -1) pecas[index] = this;
    else pecas.push(this);
    salvar(pecas, PECAS_FILE);
  }

  static carregarTodos(): Peca[] {
    const pecasBrutas = carregar<Peca>(PECAS_FILE);
    return pecasBrutas.map(
      p => new Peca(p.nome, p.tipo, p.fornecedor, p.status, p.aeronaveCodigo)
    );
  }

  static carregarPorAeronave(codigoAeronave: string): Peca[] {
    return Peca.carregarTodos().filter(p => p.aeronaveCodigo === codigoAeronave);
  }
}
