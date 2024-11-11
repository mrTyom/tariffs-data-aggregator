Задача: создать на уровне MVP сервис, который реализует логику обращения по расписанию к маркетплейсу Wildberries через заданный Endpoint, получает и ежедневно накапливает в базе данных информацию, получаемую по api, и выдает ее в произвольное количество google-таблиц.
Входные данные

В качестве СУБД использовать PostgreSQL.
Библиотека для работы с СУБД knex.js
Описание типов выполнить при помощи jsDoc.
Проверка типов - typescript - strict.
Endpoint: https://dev.wildberries.ru/openapi/wb-tariffs#tag/Koefficienty-skladov (api “Тарифы коробов”)
Обращение к google-таблицам для выгрузки данных из PostgreSQL должно производится по их идентификатору. Количество таблиц не ограничено, минимум 3 шт.

Тезисный план решения задачи:

Настроить Docker.
Подготовить compose файл для контейнеров с PostgreSQL и приложением на node.js.
Разобрать структуру api “Тарифы коробов”.
Подготовить миграции для базы данных.
Написать логику для получения данных по API WB
Ежечасное получение данных по api “Тарифы коробов” .
Полученные данные накапливать в PostgreSQL на каждый день.
Информация, получаемая ежечасно в течение одного дня, должна обновлять уже имеющиеся на этот день данные.
Создать механизм выгрузки данных из PostgreSQL в произвольное количество google-таблиц.
Данные должны регулярно выгружаться в таблицы на лист stocks_coefs (тестовые таблицы создать самостоятельно, но учесть, что ссылки на таблицы могут меняться и что таблиц может быть N штук).
Данные отсортировать по возрастанию коэффициента.
Код необходимо разместить на GitHub. Репозиторий должен содержать код приложения, конфигурацию для docker и readme с инструкцией.

Токен WB API будет выдан на сайте hh.ru после подтверждения готовности  выполнить задачу в указанный дедлайн.


Готовая задача - это репозиторий на GitHub, который содержит код приложения, конфигурацию для docker и readme с инструкцией.


Для упрощения настройки можно воспользоваться следующими готовыми конфигурациями:
package.json
{

  "name": "",

  "version": "0.0.1",

  "description": "",

  "main": "index.js",

  "type": "module",

  "scripts": {},

  "imports": {

    "#*": ["./src/*"]

  },

  "author": "",

  "license": "ISC",

  "dependencies": {

    "axios": "^1.6.2",

    "dotenv": "^16.3.1",

    "express": "^4.18.2",

    "knex": "^3.0.1",

    "log4js": "^6.9.1",

    "pg": "^8.11.3",

    "zod": "^3.23.8"

  },

  "devDependencies": {

    "@babel/core": "^7.23.6",

    "@babel/preset-env": "^7.23.6",

    "@babel/preset-typescript": "^7.24.7",

    "@types/axios": "^0.14.0",

    "@types/express": "^4.17.21",

    "@types/jest": "^29.5.11",

    "babel-jest": "^29.7.0",

    "eslint": "^9.13.0",

    "eslint-config-prettier": "^9.1.0",

    "eslint-plugin-jsdoc": "^50.3.0",

    "eslint-plugin-node": "^11.1.0",

    "eslint-plugin-prettier": "^5.2.1",

    "eslint-plugin-unused-imports": "^4.1.4",

    "prettier-plugin-jsdoc": "^1.3.0",

    "jest": "^29.7.0",

    "prettier": "^3.3.3",

    "prettier-plugin-sql": "^0.18.1"

  }

}


tsconfig.json
{

  "compilerOptions": {

    "strict": true,

    "module": "NodeNext",

    "target": "es2017",

    "baseUrl": "./",

    "paths": {

      "#*": ["./src/*"]

    },

    "esModuleInterop": true,

    "allowJs": true,

    "checkJs": true,

    "noEmit": true,

    "skipLibCheck": true

  },

  "include": ["src/**/*"],

  "exclude": ["node_modules", "src/**/*.test.*", "src/**/*.spec.*"]

}


.prettierrc.json
{

  "plugins": ["prettier-plugin-jsdoc", "prettier-plugin-sql"],

  "tabWidth": 4,

  "printWidth": 160,

  "singleQuote": false,

  "trailingComma": "all",

  "singleAttributePerLine": false,

  "quoteProps": "preserve",

  "bracketSpacing": true,

  "language": "postgresql"

}


eslint.config.mjs
import eslint from '@eslint/js';

import node from 'eslint-plugin-node';

import jsdoc from 'eslint-plugin-jsdoc';

import prettier from 'eslint-plugin-prettier';

import unusedImports from 'eslint-plugin-unused-imports';

import globals from 'globals';


export default [

  eslint.configs.recommended,

  // prettier.configs.recommended,

  {

    files: ['src/**/*.js', 'src/**/*.d.js', 'src/**/*.dto.js', 'src/**/*.cjs'],

    languageOptions: {

      sourceType: 'module',

      globals: {

        ...globals.node,

        atob: 'readonly',

        structuredClone: 'readonly',

      },

    },

    plugins: {

      node,

      prettier,

      jsdoc,

      unusedImports,

    },


    rules: {

      'no-async-promise-executor': 'off',

      'jsdoc/check-param-names': 'error',

      'jsdoc/check-types': 'error',

      'jsdoc/require-param-type': 'error',

      'jsdoc/require-returns-type': 'error',

      'jsdoc/check-syntax': 'error',

      'jsdoc/valid-types': 'warn',

      'prettier/prettier': [

        'error',

        {

          endOfLine: 'auto',

        },

      ],

      ...prettier.configs.recommended.rules,

    },

  },

  { ignores: ['node_modules', '.dev', '.devsrc', '.local', '**/*.test.ts', '**/*.test.js', 'src/global.d.ts'] },

];

