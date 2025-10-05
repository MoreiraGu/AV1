# ✈️ AEROCODE - CLI em TypeScript

Um sistema completo de gerenciamento de **aeronaves, peças, etapas, funcionários, testes e relatórios** via linha de comando (CLI), com persistência em JSON e controle de permissões.

---

## 🔹 CLASSES

### 🛩️ Aeronave
**Atributos:**
- `codigo: string`
- `modelo: string`
- `tipo: TipoAeronave`
- `capacidade: number`
- `alcance: number`
- `dataEntrega: string`
- `cliente: Cliente`

**Métodos:**
- `detalhes(): void` → Exibe também a data de entrega e o nome/email do cliente  
- `salvar(): void`  
- `carregar(): void`

---

### 👤 Cliente
**Atributos:**
- `nome: string`
- `email: string`
- `telefone: string`

---

### ⚙️ Peca
**Atributos:**
- `nome: string`
- `tipo: TipoPeca`
- `fornecedor: string`
- `status: StatusPeca`

**Métodos:**
- `atualizarStatus(novoStatus: StatusPeca): void`
- `salvar(): void`
- `carregar(): void`

---

### 🧩 Etapa
**Atributos:**
- `nome: string`
- `prazo: string`
- `status: StatusEtapa`
- `funcionarios: Funcionario[]`

**Métodos:**
- `iniciar(): void`
- `finalizar(): void`
- `associarFuncionario(f: Funcionario): void`
- `listarFuncionarios(): Funcionario[]`

🔒 **Regra adicional:**  
Etapas devem respeitar ordem lógica — não é possível finalizar uma etapa se a anterior não estiver concluída.  
A etapa não possui `salvar()` nem `carregar()`, pois é atualizada automaticamente conforme seu progresso.

---

### 🧑‍🔧 Funcionario
**Atributos:**
- `id: string`
- `nome: string`
- `telefone: string`
- `endereco: string`
- `usuario: string`
- `senha: string`
- `nivelPermissao: NivelPermissao`

**Métodos:**
- `autenticar(usuario: string, senha: string): boolean`
- `salvar(): void`
- `carregar(): void`

#### 🔒 Permissões
| Nível | Ações permitidas |
|-------|------------------|
| **ADMINISTRADOR** | Cadastrar aeronaves, peças, funcionários, etapas e gerar relatórios |
| **ENGENHEIRO** | Executar e registrar testes, atualizar etapas e peças |
| **OPERADOR** | Atualizar status de peças e executar etapas atribuídas |

---

### 🧪 Teste
**Atributos:**
- `tipo: TipoTeste`
- `resultado: ResultadoTeste`

**Métodos:**
- `salvar(): void`
- `carregar(): void`

---

### 📄 Relatorio
**Métodos:**
- `gerarRelatorio(aeronave: Aeronave): void`
- `salvarEmArquivo(): void`

📌 O relatório inclui:
- Dados da aeronave (com data de entrega e cliente)
- Etapas realizadas
- Peças utilizadas
- Testes executados  

🗂 O relatório é salvo automaticamente em:
src/Relatorios/relatorio_<nomeCliente>_<nomeAeronave>.txt

---

## 🔒 REGRAS E OBSERVAÇÕES GERAIS

- Cada **Aeronave** possui um **Cliente**.
- Cada **Etapa** pertence a uma Aeronave e pode ter vários Funcionários.
- Relações:
  - Aeronave → Peças: **1:N**
  - Aeronave → Etapas: **1:N**
  - Aeronave → Testes: **1:N**
  - Aeronave → Relatório: **1:1**
- Persistência é feita pelos métodos `salvar()` e `carregar()` de cada classe.
- O sistema respeita os níveis de permissão definidos.

---

## 🟩 ALTERAÇÕES IMPLEMENTADAS

- ✅ Adicionada a classe **Cliente** (com nome, email e telefone).  
- ✅ Associado o atributo **cliente** à classe **Aeronave**.  
- ✅ Incluída **data de entrega** na Aeronave.  
- ✅ Implementado controle de **níveis de permissão** (Administrador, Engenheiro e Operador).  
- ✅ Criada função que gera **relatório TXT automático** em `src/Relatorios/`.  
- ✅ Adicionada verificação para **impedir duplicidade de IDs** de funcionários/empresas.  
- ✅ Criado **usuário admin padrão** (`usuario: admin`, `senha: admin`).

---

## ⚙️ ORDEM DE USO RECOMENDADA

1. **Login:** o sistema inicia com usuário `admin / admin`.  
2. **Criar Aeronave:** deve ser o primeiro registro.  
3. **Criar Funcionários:** antes de criar etapas.  
4. **Criar Etapas:** vinculando os funcionários.  
5. **Criar Peças e Testes:** vinculados à aeronave.  
6. **Gerar Relatório:** somente após ter etapas, peças e testes registrados.

---

## 🗂 Estrutura de Pastas

- **AV1/**
  - **src/**
    - `index.ts` – ponto de entrada do CLI
    - **cli/** – comandos e menus
      - `menu.ts`
      - `aeronave.ts`
      - `funcionario.ts`
      - `peca.ts`
      - `etapa.ts`
      - `teste.ts`
      - `login.ts`
      - `relatorio.ts`
    - **models/** – classes principais
      - `Aeronave.ts`
      - `Cliente.ts`
      - `Funcionario.ts`
      - `Peca.ts`
      - `Etapa.ts`
      - `Teste.ts`
      - `Relatorio.ts`
    - **enums/** – enums do sistema
      - `enums.ts`
    - **utils/** – funções auxiliares
      - `persistencia.ts`
      - `validacao.ts`
      - `criarAdmin.ts`
    - **types/** – tipagens do relatório
      - `relatorio.ts`
    - **data/** – arquivos JSON de armazenamento
      - `aeronaves.json`
      - `funcionarios.json`
      - `relatorios.json`
      - `pecas.json`
      - `etapas.json`
      - `testes.json`
      - `clientes.json`
    - **Relatorios/** – relatórios TXT gerados automaticamente
  - `package.json`
  - `tsconfig.json`
  - `README.md`


---

## 💻 TECNOLOGIAS UTILIZADAS
- **Node.js** (CLI)
- **TypeScript**
- **readline-sync**
- **fs (File System)**
- **JSON** para persistência

---

## 🚀 EXECUÇÃO

### Instalar dependências
```bash
npm install
```
### Executar CLI
```bash
npm start
```
## 👨‍💼 Autor

Desenvolvido por Gustavo Moreira
📦 Projeto acadêmico: AEROCODE CLI – AV1
