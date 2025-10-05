// src/utils/persistencia.ts
import fs from "fs";
import { join } from "path";

export function salvar<T>(obj: T | T[], arquivoPath: string): void {
  try {
    fs.writeFileSync(arquivoPath, JSON.stringify(obj, null, 2), "utf-8");
  } catch (err) {
    console.error("Erro ao salvar arquivo:", err);
  }
}

export function carregar<T>(arquivoPath: string): T[] {
  try {
    if (!fs.existsSync(arquivoPath)) {
      fs.writeFileSync(arquivoPath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(arquivoPath, "utf-8");
    return JSON.parse(data) as T[];
  } catch (err) {
    console.error("Erro ao carregar arquivo:", err);
    return [];
  }
}
