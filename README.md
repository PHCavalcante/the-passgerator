# The Passgerator

The passgerator web application developed with React, Typescript and Vite that generates random and secure passwords. The project is configured with with ESLint to maintain quality of code.

# Index

- [Overview](#Overview)
- [Features](#Features)
- [Installation](#Installation)
- [Usage](#Usage)
- [Avaliable Scripts](#Avaliable%20Scripts)
- [Project Structure](#Project%20Structure)
- [Contributions](#Contributions)
- [License](#LICENSE)

# Overview

The goal of The Passgerator is to provide a simple interface for generating secure passwords. The application allows users to configure the criteria for the generated passwords, such as length and inclusion of special characters.

# Features

- Generation of secure and random passwords.
- Option to set password length.
- Inclusion of special characters, numbers, upper and lower case letters.
- Option to check whether the generated password has already been exposed in data breaches.
- Clean, friendly and easy to use interface.

# Installation

To install and run the project locally, follow the steps below:

1. Clone the repository: 

```
git clone https://github.com/PHCavalcante/the-passgerator.git
cd the-passgerator
```
2. Install the dependencies:
```
npm install
```

# Usage

To start the application in development mode, use the command:

```
npm run dev
```

# Avaliable Scripts

- `` npm run dev `` Starts the application in development mode.
- `` npm run lint `` Runs ESLint to check for code issues.

# Project Structure
```bash
the-passgerator/
├── src/
│   ├── assets/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
├── .eslintrc.js
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── viteconfig.json
├── vite.config.ts
```

# Contributions

Contributions are welcome! Feel free to open issues and pull requests. For more information, see the [contribution guidelines](.github\CONTRIBUTING.md).

# License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.