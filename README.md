# PaperTrail — Mobile Application

> **FIAP Global Solution 2026/2**
>
> Aplicativo mobile desenvolvido em **React Native + Expo**, integrado a APIs Java Spring Boot e ASP.NET Core, com o objetivo de auxiliar cidadãos na preparação para atendimentos em serviços públicos, centralizando requisitos, orientações oficiais e listas de verificação em uma experiência simples e acessível.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar](#como-rodar)
- [Integrantes da Equipe](#integrantes-da-equipe)

---

## Sobre o Projeto

O **PaperTrail** é uma aplicação mobile desenvolvida para facilitar a preparação dos cidadãos antes de procurarem atendimento em serviços públicos.

A proposta é centralizar informações sobre serviços, requisitos, documentos necessários e orientações oficiais, permitindo que o cidadão compreenda o que precisa preparar antes de se deslocar até um órgão público.

A aplicação busca reduzir dúvidas, deslocamentos desnecessários e situações em que o cidadão chega ao atendimento sem os documentos ou informações necessários.

O ecossistema é composto por duas APIs independentes:

1. **API Java (Spring Boot):** Responsável pela autenticação dos usuários, gerenciamento de identidade, catálogo de serviços públicos, requisitos e orientações oficiais. Também é responsável pela integração com inteligência artificial para fornecer explicações contextualizadas com base nas fontes disponíveis.

2. **API .NET (ASP.NET Core):** Responsável pelo gerenciamento dos preparativos dos cidadãos, incluindo criação, consulta, atualização e exclusão de preparativos, além do controle dos respectivos itens de checklist.

O aplicativo também utiliza inteligência artificial para explicar informações e requisitos de maneira mais acessível, sempre considerando as fontes oficiais disponíveis. A IA não substitui orientações governamentais, não garante elegibilidade ou aprovação e não realiza alterações automáticas nos preparativos dos cidadãos.

**O PaperTrail não realiza agendamentos oficiais, não substitui órgãos públicos e não garante a conclusão de procedimentos administrativos.**

---

## Tecnologias Utilizadas

### Mobile Application

- **Framework Core:** [React Native](https://reactnative.dev/) e [Expo](https://expo.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Roteamento e Navegação:** [React Navigation](https://reactnavigation.org/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Gerenciamento de Estado e Cache:** [TanStack Query](https://tanstack.com/query)
- **Persistência Local:** [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Ícones Vetoriais:** [Lucide](https://lucide.dev/)
- **Plataformas:** Android e iOS.

### Backend e Infraestrutura

- **API Java:** Java, Spring Boot, Spring Data JPA e Spring Security.
- **Inteligência Artificial:** Spring AI para integração com modelos de linguagem e recuperação contextual de informações.
- **API .NET:** C#, ASP.NET Core e Entity Framework Core.
- **Banco de Dados Relacional:** Oracle Database.
- **Banco de Dados Documental:** MongoDB.
- **Mensageria:** RabbitMQ para comunicação assíncrona entre os serviços.
- **Autenticação:** JWT (JSON Web Token).

---

## Como Rodar

### 1. Pré-requisitos

Antes de iniciar, certifique-se de possuir as seguintes ferramentas instaladas:

- Node.js
- npm
- Git
- Expo Go ou Android Studio para execução mobile.

Para executar os backends localmente, também serão necessários:

- Java JDK.
- Maven.
- .NET SDK.
- Acesso às instâncias de banco de dados configuradas para o projeto.
- RabbitMQ, caso a integração por mensageria esteja habilitada no ambiente.

### 2. Clonar o Repositório

```bash
git clone https://github.com/Paper-Trail-GS-2026/Paper-Trial
cd PaperTrail
```

### 3. Instalar Dependências

```bash
npm install
```


### 4. Iniciar o Aplicativo

```bash
npx expo start -c
```

- Abra o Expo Go no dispositivo Android ou iOS e leia o QR Code exibido no terminal.
- Ou pressione `a` para abrir no emulador Android.
- Ou pressione `i` para abrir no simulador iOS, quando disponível.



## Integrantes da Equipe

| Foto | Nome do Aluno | RM | Perfil |
| :---: | :--- | :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/157508293?s=130&v=4" width="60" /> | **André Emygdio Ferreira** | RM565592 | [@AndreEmygdio](https://github.com/AndreEmygdio) |
| <img src="https://avatars.githubusercontent.com/u/202126486?v=4" width="60" /> | **Gabriel Lourenço Martins** | RM562194 | [@glmartins2004](https://github.com/glmartins2004) |
| <img src="https://avatars.githubusercontent.com/u/200883157?v=4&size=64" width="60" /> | **Giovane Amato dos Santos** | RM561336 | [@ruralgiovane](https://github.com/ruralgiovane) |
| <img src="https://avatars.githubusercontent.com/u/202198493?s=130&v=4" width="60" /> | **Matheus Roque Arantes** | RM561959 | [@matheusroquearantes](https://github.com/matheusroquearantes) |
| <img src="https://avatars.githubusercontent.com/u/200932226?s=130&v=4" width="60" /> | **Orlando Gonçalves de Arruda** | RM561584 | [@Orlando-Arruda](https://github.com/Orlando-Arruda) |