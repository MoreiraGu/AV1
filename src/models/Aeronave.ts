import { TipoAeronave } from "../enums/enums";
import { Cliente } from "./Cliente";
import { salvar, carregar } from "../utils/persistencia";

const AERONAVES_FILE = "src/data/aeronaves.json";

export class Aeronave {
  constructor(
    public codigo: string,
    public modelo: string,
    public tipo: TipoAeronave,
    public capacidade: number,
    public alcance: number,
    public dataEntrega: string,
    public cliente: Cliente
  ) {}

  detalhes(): void {
    console.log(`Código: ${this.codigo}`);
    console.log(`Modelo: ${this.modelo}`);
    console.log(`Tipo: ${this.tipo}`);
    console.log(`Capacidade: ${this.capacidade}`);
    console.log(`Alcance: ${this.alcance}`);
    console.log(`Data de Entrega: ${this.dataEntrega}`);
    console.log(`Cliente: ${this.cliente.nome} | ${this.cliente.email}`);
  }

  salvar(): void {
    const aeronaves = carregar<Aeronave>(AERONAVES_FILE);
    const index = aeronaves.findIndex(a => a.codigo === this.codigo);
    if (index !== -1) aeronaves[index] = this;
    else aeronaves.push(this);
    salvar(aeronaves, AERONAVES_FILE);
  }

  static carregarTodos(): Aeronave[] {
    return carregar<Aeronave>(AERONAVES_FILE);
  }
}
