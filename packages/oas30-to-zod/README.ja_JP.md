# oas30-to-zod

[![npm version](https://img.shields.io/npm/v/oas30-to-zod.svg?style=flat-square)](https://www.npmjs.com/package/oas30-to-zod)
[![MIT](https://img.shields.io/npm/l/oas30-to-zod?style=flat-square)](./LICENSE)
[![Codecov](https://img.shields.io/codecov/c/github/macropygia/oas-stack?token=U3HD8ZUF98&style=flat-square&logo=codecov)](https://codecov.io/gh/macropygia/oas-stack)

[English](README.md) | **日本語**

OpenAPI Specification 3.0のコンポーネントからZodスキーマを生成する。

- OpenAPI 3.1との互換性なし
- 不安定版につき予告なく破壊的変更が行われる可能性あり
- CLIおよびAPIとして使用可能
- CommonJS/ES Modules両対応デュアルパッケージ
- カスタマイズ可能
    - 差し替え可能なパーサー
    - [EJS](https://ejs.co/)テンプレート
- 参考
    - [OpenAPI Specification 3.0.3](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md)
    - [Data Models (Schemas) - OpenAPI Guide](https://swagger.io/docs/specification/data-models/)

## 制限事項

- 処理するドキュメントは外部への参照を持たず独立している必要がある
    - `$ref` は `#/components/schemas/<component_name>` の形式のみ有効
    - または事前に解決が必要
- 以下のキーワードは非対応
    - `anyOf`
    - `not`
    - `minProperties`
    - `maxProperties`
