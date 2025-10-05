// src/models/Funcionario.ts
import { NivelPermissao } from "../enums/enums";
import { salvar, carregar } from "../utils/persistencia";

const FUNCIONARIOS_FILE = "src/data/funcionarios.json";

export class Funcionario {
  constructor(
    public id: string,
    public nome: string,
    public telefone: string,
    public endereco: string,
    public usuario: string,
    public senha: string,
    public nivelPermissao: NivelPermissao
  ) {}

  autenticar(usuario: string, senha: string): boolean {
    return this.usuario === usuario && this.senha === senha;
  }

  salvar(): void {
    const funcionarios = carregar<Funcionario>(FUNCIONARIOS_FILE);
    const index = funcionarios.findIndex(f => f.id === this.id);
    if (index !== -1) funcionarios[index] = this;
    else funcionarios.push(this);
    salvar(funcionarios, FUNCIONARIOS_FILE);
  }

  static carregarTodos(): Funcionario[] {
    return carregar<Funcionario>(FUNCIONARIOS_FILE);
  }
}
