![NPM Version](https://img.shields.io/npm/v/react?logo=react)
![GitHub contributors](https://img.shields.io/github/contributors/PHCavalcante/the-passgerator)
![GitHub forks](https://img.shields.io/github/forks/PHCavalcante/the-passgerator?style=flat)
![GitHub Repo stars](https://img.shields.io/github/stars/PHCavalcante/the-passgerator?style=flat)
![GitHub License](https://img.shields.io/github/license/PHCavalcante/the-passgerator)
![Static Badge](https://img.shields.io/badge/React-%20black?style=static&logo=react&labelColor=black&color=blue)
![Static Badge](https://img.shields.io/badge/Vite%20-%20black?style=static&logo=vite&labelColor=gray&color=blue)
![Static Badge](https://img.shields.io/badge/Typescript-%20black?style=static&logo=typescript&labelColor=white&color=blue)


# The Passgerator

What is The Passgerator?

The Passgerator is your tool for generating random, complex and secure passwords for all your online accounts. With it, you can say goodbye to easy-to-guess passwords and significantly increase the security of your information.

## Why use The Passgerator?

- Simple: Intuitive and easy-to-use interface.
- Secure: Generates random and complex passwords, following best - security practices.
- Robust: Reliable and well-tested code.
- Customizable: Configure password length and allowed characters.
- Open-source: Contribute to the project and help make it even better!

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
- `` npm run test `` Runs the test files.
- `` npm build `` Builds the project for production.

# Project Structure
```bash
the-passgerator/
├── src/
│   ├── assets/
│   ├── components/
│   ├── services/
│   ├── tests/
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

Contributions are welcome! Feel free to open issues and pull requests. For more information, see the [contribution guidelines](.github/CONTRIBUTING.md).

# License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.