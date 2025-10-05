// src/types/relatorio.ts

export interface ClienteJSON {
  nome: string;
  email: string;
  telefone: string;
}

export interface AeronaveJSON {
  codigo: string;
  modelo: string;
  tipo: string;
  capacidade: number;
  alcance: number;
  dataEntrega: string;
  cliente: ClienteJSON;
}

export interface PecaJSON {
  nome: string;
  tipo: string;
  fornecedor: string;
  status: string;
}

export interface EtapaJSON {
  nome: string;
  prazo: string;
  status: string;
  funcionarios: string[];
}

export interface TesteJSON {
  tipo: string;
  resultado: string;
}

export interface RelatorioJSON {
  aeronave: AeronaveJSON;
  pecas: PecaJSON[];
  etapas: EtapaJSON[];
  testes?: TesteJSON[];
}
