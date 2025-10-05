import { salvar, carregar } from "../utils/persistencia";

const CLIENTES_FILE = "src/data/clientes.json";

export class Cliente {
  constructor(
    public nome: string,
    public email: string,
    public telefone: string
  ) {}

  salvar(): void {
    const clientes = carregar<Cliente>(CLIENTES_FILE);
    const index = clientes.findIndex(c => c.email === this.email);
    if (index !== -1) clientes[index] = this;
    else clientes.push(this);
    salvar(clientes, CLIENTES_FILE);
  }

  static carregarTodos(): Cliente[] {
    return carregar<Cliente>(CLIENTES_FILE);
  }
}
