# 💍 Convite de Casamento — Mariana & António

Site de convite de casamento digital, construído com **Next.js 15**, **Prisma v5** e **CockroachDB**, hospedado na **Vercel**.

---

## ✨ Funcionalidades

- 🖤 Design elegante preto & dourado (fiel ao protótipo HTML original)
- 📜 Secções: Hero, Versículo, Convite, Cerimónia, Lista de Presentes, RSVP
- ✅ Confirmação de presença guardada em base de dados
- 🎁 Seleção de presente pelo convidado (guardada junto com o RSVP)
- 📱 Totalmente responsivo (mobile, tablet, desktop)
- ⚡ Server Actions do Next.js para submissão de formulário
- 🗄️ CockroachDB (PostgreSQL-compatível) via Prisma ORM

---

## 🛠️ Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 15 (App Router) + TypeScript |
| Estilos | Vanilla CSS (extraído do design system original) |
| ORM | Prisma v5 |
| Base de Dados | CockroachDB (Serverless) |
| Deploy | Vercel |
| Fontes | Google Fonts: Cinzel Decorative, Cinzel, Cormorant Garamond, EB Garamond |

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/convite.git
cd convite
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://convite:PASSWORD@host:26257/defaultdb?sslmode=verify-full"
```

### 4. Sincronizar a base de dados

```bash
npx prisma db push
npx prisma generate
```

### 5. Iniciar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy na Vercel

### 1. Push para GitHub

```bash
git add .
git commit -m "feat: convite de casamento digital"
git push origin main
```

### 2. Importar na Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New Project**
2. Importe o repositório GitHub
3. Em **Environment Variables**, adicione:
   - `DATABASE_URL` = sua connection string do CockroachDB

4. Clique em **Deploy** — o `vercel.json` já configura o `prisma generate` antes do build.

---

## 🗄️ Modelo de Dados

```prisma
model Guest {
  id             String   @id @default(cuid())
  name           String           // Nome do convidado
  phone          String?          // Telefone / WhatsApp
  numberOfPeople Int    @default(1) // Nº de pessoas
  attendance     String           // confirmed | declined | pending
  message        String?          // Mensagem para os noivos
  chosenGift     String?          // Presente escolhido da lista
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

---

## 📁 Estrutura do Projeto

```
convite/
├── prisma/
│   └── schema.prisma          # Modelo da base de dados
├── src/
│   ├── app/
│   │   ├── actions.ts         # Server Action: submeter RSVP
│   │   ├── globals.css        # Design system completo (preto & dourado)
│   │   ├── layout.tsx         # Layout com fontes Google
│   │   └── page.tsx           # Página principal (todas as secções)
│   ├── lib/
│   │   └── prisma.ts          # Singleton do Prisma Client
│   └── generated/             # Gerado pelo prisma (ignorado no git)
├── .env.example               # Template de variáveis de ambiente
├── vercel.json                # Configuração de deploy na Vercel
└── next.config.ts             # Configuração do Next.js
```

---

## 🎨 Personalização

Para personalizar o convite, edite `src/app/page.tsx`:

- **Nomes**: `Mariana` e `António`
- **Data**: `14 de Setembro de 2025`
- **Local**: `Maputo, Moçambique`
- **Versículo**: Secção `#versiculo`
- **Cerimónia**: Horas e locais em `#cerimonia`
- **Presentes**: Array `PRESENTES` no topo do ficheiro
- **Chave M-Pesa**: Bloco `.pix-block`

---

*Feito com ❤️ para Mariana & António*
