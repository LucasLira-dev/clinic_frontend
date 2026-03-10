
# Clinic Frontend

Frontend de uma aplicação de clínica, com autenticação e múltiplos perfis de usuário (**paciente**, **médico** e **admin**), agendamento de consultas, área administrativa e módulo de blog.

## Stack

- **Next.js** (App Router)  
- **React 19** + **TypeScript**
- **TailwindCSS v4** + **shadcn/ui**
- **@tanstack/react-query** (cache e sincronização de dados)
- **better-auth** (client auth) + plugin **adminClient**
- **zod** (validação de formulários)

## Funcionalidades (visão geral)

- **Autenticação**
  - Login/registro com validação via **Zod**
  - Suporte a papéis de usuário: `patient`, `doctor`, `admin`
- **Paciente**
  - Listagem de médicos
  - Agendamento de consulta (data + horário)
  - Minhas consultas (filtros: próximas, concluídas, canceladas etc.)
  - Cancelamento de consulta
- **Médico**
  - Visualização das consultas (modo médico)
  - Concluir consulta
  - Atualizar foto e biografia do perfil
- **Admin**
  - Criar médico
  - Listar médicos e pacientes
  - Remover usuário
- **Blog**
  - Criar post
  - Listar posts
  - Detalhes do post
  - Excluir post

## Requisitos

- Node.js (recomendado **20+**)
- Um backend configurado e acessível para as rotas consumidas pelo frontend (ex.: `/appointments/*`, `/admin/*`, `/doctor/*`, `/blog/*`)

## Configuração (.env)

Crie um arquivo `.env.local` na raiz do projeto com:

```bash
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3001" 
```

> Ajuste a URL para o endereço do seu backend/servidor do **better-auth**.

## Como rodar

Instalar dependências:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

## Estrutura (alto nível)

- `app/` — rotas/páginas (Next.js App Router)
- `components/` — componentes reutilizáveis (UI)
- `hooks/` — hooks (ex.: detecção de mobile)
- `lib/` — utilitários, schemas, auth client
- `services/` — camada de integração com API (fetch)

## Observações sobre autenticação e papéis

O client de autenticação é criado em `lib/auth-client.ts` e define campos extras de usuário, incluindo `role` (com default `patient`) e `imageCldPubId`.

Papéis disponíveis:

- `patient`
- `doctor`
- `admin`

## Próximos passos (ideias)

- Adicionar testes (unit/e2e)
- Documentar endpoints esperados do backend
- Adicionar screenshots e/ou GIFs do fluxo (login, agendamento, admin)
- Publicar demo (Vercel) e configurar variáveis de ambiente

## Autor

**Lucas Lira**  
GitHub: https://github.com/LucasLira-dev
