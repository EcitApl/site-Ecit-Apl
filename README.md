# Website da Escola

Este é um website moderno para escola, desenvolvido com React.js e Material-UI. O site inclui informações sobre eventos, palestras, horários de aula, corpo docente e contato.

## Funcionalidades

- 🏠 Página inicial com visão geral da escola
- 📅 Calendário de eventos
- 🎓 Informações sobre palestras
- ⏰ Horários de aula por turma
- 👨‍🏫 Perfil dos professores
- 📍 Informações de contato e localização

## Tecnologias Utilizadas

- React.js
- Material-UI
- React Router DOM
- Emotion (para estilização)

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)

## Como Executar o Projeto

1. Clone o repositório (se estiver usando git):
```bash
git clone [URL_DO_REPOSITÓRIO]
cd escola-website
```

2. Se você baixou o projeto diretamente, navegue até a pasta do projeto:
```bash
cd escola-website
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

5. O site estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
escola-website/
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── Events.js
│   │   ├── Lectures.js
│   │   ├── Schedule.js
│   │   ├── Faculty.js
│   │   ├── Contact.js
│   │   └── Navbar.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md<!--  -->
```

## Personalização

- As informações dos eventos podem ser editadas no arquivo `Events.js`
- As informações das palestras podem ser editadas no arquivo `Lectures.js`
- Os horários das aulas podem ser editados no arquivo `Schedule.js`
- As informações dos professores podem ser editadas no arquivo `Faculty.js`
- As informações de contato podem ser editadas no arquivo `Contact.js`

## Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
