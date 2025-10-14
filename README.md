# Fine

**Aplicação de Controle Financeiro Pessoal**

O **Fine** é uma aplicação web completa para o gerenciamento de finanças pessoais. Permite o registro e visualização de receitas e despesas, categorização de transações e autenticação via Firebase.

---

## 🧾 Sumário
- [Visão Geral](#visão-geral)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Futuras Melhorias](#futuras-melhorias)
- [Licença](#licença)
- [Autor](#autor)

---

## 💡 Visão Geral

O **Fine** é um projeto pessoal desenvolvido para auxiliar no controle financeiro, oferecendo uma visão clara de receitas e despesas mensais. O sistema é dividido entre **API (backend)** e **Interface (frontend)** — ambos desenvolvidos em **TypeScript**.

A API gerencia autenticação, categorias e transações financeiras. Já o frontend fornece uma interface moderna, responsiva e intuitiva para o usuário acompanhar suas finanças.

---

## ⚙️ Principais Funcionalidades

- Cadastro e autenticação de usuários (via Firebase)
- Criação, edição e exclusão de transações (receitas e despesas)
- Categorização de transações
- Dashboard com gráficos de despesas e receitas por categoria
- Integração com backend via API REST
- Interface moderna e responsiva com React + Tailwind CSS

---

## 🛠️ Tecnologias Utilizadas

### Backend (API)
- **Fastify** — servidor web leve e performático
- **Prisma ORM** — integração com banco de dados MongoDB
- **MongoDB** — banco de dados não relacional
- **Firebase Admin SDK** — autenticação de usuários
- **Zod** — validação de dados
- **Dayjs** — manipulação de datas
- **Dotenv** — variáveis de ambiente
- **TypeScript** — tipagem estática

### Frontend (Interface)
- **React 19** — biblioteca principal de UI
- **Vite** — bundler e dev server ultrarrápido
- **Tailwind CSS** — estilização moderna e responsiva
- **React Router v7** — gerenciamento de rotas
- **Axios** — requisições HTTP
- **Recharts** — gráficos e visualização de dados
- **React Toastify** — feedback visual de ações
- **Lucide React** — ícones minimalistas
- **Firebase JS SDK** — autenticação e comunicação com backend

---

## 📂 Estrutura do Projeto

```
/fine
├── api/               # Backend (Fastify + Prisma + MongoDB)
│   ├── src/
│   │   ├── server.ts  # ponto de entrada da API
│   │   ├── routes/    # rotas HTTP (transações, categorias, auth...)
│   │   ├── schemas/   # validações com Zod
│   │   └── utils/     # funções auxiliares
│   ├── prisma/        # schema e migrações
│   ├── .env           # variáveis de ambiente da API
│   └── package.json
│
├── interface/         # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── pages/     # páginas principais
│   │   ├── components/# componentes reutilizáveis
│   │   ├── hooks/     # hooks personalizados
│   │   ├── services/  # comunicação com API via Axios
│   │   └── styles/    # estilos globais
│   ├── .env           # variáveis de ambiente do frontend
│   └── package.json
│
└── README.md
```

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/arielvasconcelosgoncalves/fine.git
cd fine
```

### 2. Configurar o Backend (API)
```bash
cd api
npm install
```

Crie o arquivo `.env` na pasta `api` com o conteúdo:
```bash
DATABASE_URL="sua_string_de_conexão_mongodb"
PORT=3001
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
```

Executar em modo de desenvolvimento:
```bash
npm run dev
```

A API ficará disponível em `http://localhost:3001`.

### 3. Configurar o Frontend (Interface)
```bash
cd ../interface
npm install
```

Crie o arquivo `.env` na pasta `interface` com o conteúdo:
```bash
VITE_API_URL=http://localhost:3001
```

Executar o frontend:
```bash
npm run dev
```

O frontend ficará disponível em `http://localhost:5173` (ou outra porta exibida no terminal).

---

## 📜 Scripts Disponíveis

### API
| Script | Descrição |
|--------|------------|
| `npm run dev` | Inicia o servidor Fastify em modo watch (via TSX) |

### Interface
| Script | Descrição |
|--------|------------|
| `npm run dev` | Executa o projeto em modo desenvolvimento (Vite) |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Pré-visualiza a build localmente |
| `npm run lint` | Executa o linter (ESLint + Biome) |

---

## 🧭 Futuras Melhorias
- Filtro de transações por data e categoria
- Exportação de dados (CSV, PDF)
- Dark mode
- Dashboard com estatísticas mensais e comparativas
- Testes automatizados (unitários e integração)

---

## 📄 Licença

MIT License — livre para uso, modificação e distribuição.

---

## 👨‍💻 Autor

**Ariel Vasconcelos**  
Desenvolvedor e criador do projeto Fine.  
🔗 [GitHub](https://github.com/arielvasconcelosgoncalves)

