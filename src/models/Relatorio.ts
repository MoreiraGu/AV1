import { Aeronave } from "./Aeronave";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";
import { salvar } from "../utils/persistencia";
import * as fs from "fs";
import * as path from "path";

const RELATORIOS_FILE = "src/data/relatorios.json";
const RELATORIOS_TXT_DIR = "src/Relatorios";

export class Relatorio {
  public conteudo: any;

  gerarRelatorio(aeronave: Aeronave): void {
    const pecasDaAeronave = Peca.carregarPorAeronave(aeronave.codigo);
    const etapasDaAeronave = Etapa.carregarTodos().filter(
      e => e.aeronaveCodigo === aeronave.codigo
    );
    const testesDaAeronave = Teste.carregarTodos().filter(
      t => t.aeronaveCodigo === aeronave.codigo
    );

    this.conteudo = {
      aeronave: {
        codigo: aeronave.codigo,
        modelo: aeronave.modelo,
        tipo: aeronave.tipo,
        capacidade: aeronave.capacidade,
        alcance: aeronave.alcance,
        dataEntrega: aeronave.dataEntrega,
        cliente: aeronave.cliente
      },
      pecas: pecasDaAeronave.map(p => ({
        nome: p.nome,
        tipo: p.tipo,
        fornecedor: p.fornecedor,
        status: p.status
      })),
      etapas: etapasDaAeronave.map(e => ({
        nome: e.nome,
        prazo: e.prazo,
        status: e.status,
        funcionarios: e.funcionarios.map(f => f.nome)
      })),
      testes: testesDaAeronave.map(t => ({
        tipo: t.tipo,
        resultado: t.resultado
      }))
    };
  }

  salvarEmArquivo(): void {

    salvar([this.conteudo], RELATORIOS_FILE);
    console.log("Relatório salvo no JSON com sucesso! (relatório anterior substituído)");

    if (!fs.existsSync(RELATORIOS_TXT_DIR)) {
      fs.mkdirSync(RELATORIOS_TXT_DIR, { recursive: true });
    }

    const cliente = this.conteudo.aeronave.cliente.nome.replace(/\s+/g, "_");
    const aeronave = this.conteudo.aeronave.modelo.replace(/\s+/g, "_");
    const fileName = `relatorio_${cliente}_${aeronave}.txt`;
    const filePath = path.join(RELATORIOS_TXT_DIR, fileName);

    let texto = `===== RELATÓRIO =====\n`;
    const a = this.conteudo.aeronave;
    texto += `Aeronave: ${a.codigo} - ${a.modelo}\nTipo: ${a.tipo} | Capacidade: ${a.capacidade} | Alcance: ${a.alcance}\n`;
    texto += `Data de Entrega: ${a.dataEntrega}\nCliente: ${a.cliente.nome} | Email: ${a.cliente.email} | Telefone: ${a.cliente.telefone}\n\n`;

    texto += `--- Peças ---\n`;
    if (this.conteudo.pecas.length === 0) texto += "Nenhuma peça cadastrada.\n";
    else this.conteudo.pecas.forEach((p: any, idx: number) => {
      texto += `${idx + 1}. ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}\n`;
    });

    texto += `\n--- Etapas ---\n`;
    if (this.conteudo.etapas.length === 0) texto += "Nenhuma etapa cadastrada.\n";
    else this.conteudo.etapas.forEach((e: any, idx: number) => {
      texto += `${idx + 1}. ${e.nome} | Prazo: ${e.prazo} | Status: ${e.status}\n`;
      texto += `   Funcionários: ${e.funcionarios.length > 0 ? e.funcionarios.join(", ") : "Nenhum"}\n`;
    });

    texto += `\n--- Testes ---\n`;
    if (!this.conteudo.testes || this.conteudo.testes.length === 0) texto += "Nenhum teste registrado.\n";
    else this.conteudo.testes.forEach((t: any, idx: number) => {
      texto += `${idx + 1}. Tipo: ${t.tipo} | Resultado: ${t.resultado}\n`;
    });

    fs.writeFileSync(filePath, texto, "utf-8");
    console.log(`Relatório TXT criado em: ${filePath}`);
  }
}
