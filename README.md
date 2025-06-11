Organização do Projeto

src/
├── assets/            # Arquivos estáticos (imagens, fonts, etc.)
├── components/        # Componentes reutilizáveis
│   ├── common/        # Componentes genéricos (Button, Input, Card)
│   ├── features/      # Componentes específicos de funcionalidades
│   └── layouts/       # Componentes de layout (Header, Footer, Sidebar)
├── hooks/             # Custom hooks
├── pages/             # Telas/rotas da aplicação
│   ├── Home/          # Página Home
│   │   ├── index.jsx  # Componente principal da página
│   │   └── styles.module.css # Estilos específicos
│   ├── Products/      # Página de Produtos
│   ├── About/         # Página Sobre
│   └── Contact/       # Página de Contato
├── services/          # Lógica de API/services
├── contexts/          # Contextos do React (se usar Context API)
├── utils/             # Funções utilitárias/helpers
├── routes/            # Configuração de rotas (se não usar Next.js)
│   └── Router.jsx
├── App.jsx            # Componente raiz
└── index.jsx          # Ponto de entrada
