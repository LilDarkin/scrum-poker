# Planning Poker Online

Planning Poker Online is a web application designed for Agile teams to estimate their work effort in a collaborative and engaging way. Developed with Vue 3 and Vite, it leverages Firebase for real-time data synchronization and authentication, and Tailwind CSS for styling.

## Recommended IDE Setup

For the best development experience, it is recommended to use [Visual Studio Code (VSCode)](https://code.visualstudio.com/) with the following extensions:

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 support (disable Vetur if installed)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind CSS autocomplete and syntax highlighting
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting

## Project Setup

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/download/) and npm installed.

### Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/LilDarkin/planning-poker-online.git
cd planning-poker-online
npm install
```

Service Account: Obtain a service account JSON key from Google Cloud Console. Ensure the service account has the necessary permissions for your project.
```sh
It looks like this:

{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}

name it "pokeronline.json" and put it in "/src/Services" folder
```

Compile and Hot-Reload for Development
To start the development server with hot reloading:
```
npm run dev
```

Compile and Minify for Production
To build the project for production:

```
npm run build
```

## Tools Used

- **[Vue 3](https://v3.vuejs.org/)**: The progressive JavaScript framework
- **[Vite](https://vitejs.dev/)**: Next generation frontend tooling
- **[Firebase](https://firebase.google.com/)**: Backend-as-a-Service for real-time database and authentication
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[ChatGPT](https://www.openai.com/chatgpt)**: Assisted in development and troubleshooting
- **[Spotify](https://open.spotify.com)**: Pampagana

