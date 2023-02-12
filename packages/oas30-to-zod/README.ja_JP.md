# oas30-to-zod

[![npm version](https://img.shields.io/npm/v/oas30-to-zod.svg?style=flat-square)](https://www.npmjs.com/package/oas30-to-zod)
[![MIT](https://img.shields.io/npm/l/oas30-to-zod?style=flat-square)](./LICENSE)
[![Codecov](https://img.shields.io/codecov/c/github/macropygia/oas-stack?token=U3HD8ZUF98&style=flat-square&logo=codecov)](https://codecov.io/gh/macropygia/oas-stack)

[English](README.md) | **日本語**

OpenAPI Specification 3.0のコンポーネントから[Zod](https://zod.dev/)スキーマを生成する。

- OpenAPI 3.1との互換性なし
- 不安定版につき予告なく破壊的変更が行われる可能性あり
    - 変更点は [CHANGELOG](./CHANGELOG.md) を参照
- CLIおよびAPIとして使用可能
- CommonJS/ES Modules両対応デュアルパッケージ
- カスタマイズ可能
    - 差し替え可能なパーサー
    - [EJS](https://ejs.co/)テンプレート
- 参考
    - [OpenAPI Specification 3.0.3](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md)
    - [Data Models (Schemas) - OpenAPI Guide](https://swagger.io/docs/specification/data-models/)

## 仕様

### 制限事項

- 処理するドキュメントは外部への参照を持たず独立している必要がある
    - `$ref` は `#/components/schemas/<component_name>` の形式のみ有効
    - または事前に解決が必要
- 以下のキーワードは非対応
    - `anyOf`
    - `not`
    - `minProperties`
    - `maxProperties`

### 対応する `format` の値

- `string`
    - `email` -> `.email()`
    - `url` -> `.url()`
    - `uuid` -> `.uuid()`
    - `cuid` -> `.cuid()`
    - `cuid2` -> `.cuid2()`
    - `date-time` -> `.datetime()`
- `number`
    - `int32` , `int64` -> `.int()`

詳細は[Zodのドキュメント](https://github.com/colinhacks/zod#strings)を参照のこと。

## API

### oasComponentsToZod(input, options)

| 引数      | 型                 | 既定値 | 必須 |
| --------- | ------------------ | ------ | ---- |
| `input`   | `string \| object` |        | Yes  |
| `options` | `object`           | {}     | No   |

- `input`
    - YAML/JSONファイルのパス ( `string` )
    - またはパース済のオブジェクト ( `object` )
- `options`
    - 下記参照

```js
// e.g.
import { oasComponentsToZod } from 'oas30-to-zod';

const zodSchemasString = await oasComponentsToZod('path/to/oas_document.yml');

console.log(zodSchemasString);
```

#### オプション一覧

| 名前                  | 型                  | 既定値    | 必須 |
| :-------------------- | :------------------ | :-------- | :--- |
| `output`              | `string \| false`   | `false`   | No   |
| `dereference`         | `boolean`           | `false`   | No   |
| `exportName`          | `string`            | `schemas` | No   |
| `individually`        | `boolean`           | `false`   | No   |
| `eslintDisable`       | `boolean`           | `false`   | No   |
| `disableRules`        | `string[]`          | `[]`      | No   |
| `withoutImport`       | `boolean`           | `false`   | No   |
| `withoutExport`       | `boolean`           | `false`   | No   |
| `inheritPrettier`     | `boolean \| object` | `false`   | No   |
| `disableFormat`       | `boolean`           | `false`   | No   |
| `withoutDefaults`     | `boolean`           | `false`   | No   |
| `withDesc`            | `boolean`           | `false`   | No   |
| `withAnchors`         | `boolean`           | `false`   | No   |
| `disableAutocomplete` | `boolean`           | `false`   | No   |
| `template`            | `string`            |           | No   |
| `parsers`             | `object`            |           | No   |

#### output

ファイルに出力する。

- 出力先のパスを指定する
- `false` に設定すると変換結果を文字列で返す
- 既定値: `false`

#### dereference

処理前に参照（ `$ref` ）を解決する。

- 全ての `$ref` を解決する
- コンポーネント間に循環参照が存在する場合は `true` 必須
- 既定値: `false`

#### exportName

エクスポート時の変数名を指定する。

- 既定値: `schemas`

```js
import { z } from 'zod';

const Comp1 = z.any();
const Comp2 = z.any();
const Comp3 = z.any();

export const schemas = { Comp1, Comp2, Comp3 };
//              ^-- この変数名
```

#### individually

コンポーネントを個別にエクスポートする。

- 既定値: `false`

```js
import { z } from 'zod';

export const Comp1 = z.any();
export const Comp2 = z.any();
export const Comp3 = z.any();
```

#### eslintDisable

先頭行に `/* eslint-disable */` を挿入する。

- 既定値: `false`

```js
/* eslint-disable */
import { z } from 'zod';

const Comp = z.any();
```

#### disableRules

`eslint-disable` の後に指定したESLintのルールをカンマ区切りで挿入する。

- `eslintDisable: true` の場合のみ有効
- 既定値: `[]`

```js
// ['no-control-regex', 'import/no-named-export']

/* eslint-disable no-control-regex, import/no-named-export */
import { z } from 'zod';

const Comp = z.any();
```

#### withoutImport

インポート文の出力を無効化する。

- `import { z } from 'zod';` を出力しない
- 既定値: `false`

#### withoutExport

エクスポート文の出力を無効化する。

- `export const <exportName> { ... };` を出力しない
- 既定値: `false`

#### inheritPrettier

Prettierの設定をプロジェクトから継承するか、または直接指定する。

- 既定ではPrettierは標準設定で動作する
- `true` に設定すると実行されたプロジェクトからPrettierの設定ファイルを検索して使用する
    - 検索には [prettier.resolveConfigFile()](https://prettier.io/docs/en/api.html#prettierresolveconfigfilefilepath) を使用する（パス指定は `process.cwd()` ）
- またはPrettireの設定オブジェクトで直接指定する
- 既定値: `false`

#### disableFormat

出力のフォーマットを無効化する。

- 既定ではPrettierでフォーマットされる
- 既定値: `false`

#### withoutDefaults

`default` から `.default()` への変換を無効化する。

- `.default()` は出力されなくなる
- 既定値: `false`

#### withDesc

`description` から `.descrive()` への変換を有効化する。

- `.descrive()` が出力されるようになる
- 既定値: `false`

#### withAnchors

正規表現を `^` と `$` で囲む。

- 既定値: `false`

```js
// OAS
{
  type: 'string',
  pattern: '[a-z]+'
}

// withAnchors: false
z.string().regex(new RegExp("[a-z]+"))

// withAnchors: true
z.string().regex(new RegExp("^[a-z]+$"))
```

#### disableAutocomplete

`type: 'object'` の自動補完を無効化する。

- 既定では「 `type` の指定がなく `properties` または `additionalProperties` のいずれかないし両方を持つスキーマ」に対して `type: 'object'` を自動補完する
- 既定値: `false`

#### template

カスタム[EJS](https://ejs.co/)テンプレートを使用する。

- テンプレートファイルのパスを指定する
- 既定値: [default.ts.ejs](https://github.com/macropygia/oas-stack/blob/main/packages/oas30-to-zod/src/default.ts.ejs)

#### parsers

パーサーのプリセットを指定するか、またはカスタムパーサーを使用する。

```ts
interface SchemaParsers {
  referenceParser?: ReferenceParser
  nullableParser?: NullableParser
  objectParser?: ObjectParser
  arrayParser?: ArrayParser
  anyOfParser?: AnyOfParser
  allOfParser?: AllOfParser
  oneOfParser?: OneOfParser
  notParser?: NotParser
  enumParser?: EnumParser
  stringParser?: StringParser | StringPreset
  numberParser?: NumberParser
  booleanParser?: BooleanParser
  defaultParser?: DefaultParser
}

// 例
const options = {
  parsers: {
    stringParser: 'minmax-format-regex',
    objectParser: (schema, ctx) => 'Zodスキーマ文字列'
  }
}
```

##### プリセット

```ts
type StringPreset =
  // 文字列用キーワードの処理順序を指定するプリセット
  | 'minmax-regex-format'
  | 'minmax-format-regex'
  | 'regex-format-minmax'
  | 'regex-minmax-format'
  | 'format-minmax-regex'
  | 'format-regex-minmax'
```

##### カスタムパーサー

[標準パーサー](https://github.com/macropygia/oas-stack/tree/main/packages/oas30-to-zod/src/parsers)と[型定義](https://github.com/macropygia/oas-stack/blob/main/packages/oas30-to-zod/src/types/index.ts)を参照のこと。  
カスタムテンプレートと組み合わせることで複雑な処理も可能。

### parseSchema(schema, context)

パーサーを単独で使用する。  
Zodスキーマの文字列（未フォーマット）を返す。

| Parameter         | Type     | Default         | Required |
| ----------------- | -------- | --------------- | -------- |
| `schema`          | `object` |                 | Yes      |
| `context`         | `object` |                 | No       |
| `context.options` | `object` |                 | No       |
| `context.parsers` | `object` |                 | No       |

```ts
// 例
import { parseSchema } from 'oas30-to-zod';

const parsed = parseSchema(
  {
    type: 'object',
    required: ['Prop2'],
    properties: {
      Prop1: {
        type: 'string',
        pattern: '[a-z]+',
        default: 'alpha',
        description: 'beta',
      },
      Prop2: {
        type: 'number',
      },
    },
  },
  {
    options: { withAnchors: true, withDesc: true },
    parsers: {
      numberParser: () => 'z.any()',
    },
  }
);

console.log(parsed);
```

#### context.options

`oasComponentsToZod` のオプションと同一。  
以下のプロパティのみ使用可。

- `context.options.withoutDefaults`
- `context.options.withDesc`
- `context.options.withAnchors`

#### context.parsers

`oasComponentsToZod` のオプションの `parses` と同一。

### contextのその他のプロパティ

型定義・ソースコードを参照のこと。

## CLI

```bash
# インストール
$ npm i -G oas30-to-zod

# ヘルプ
$ oas30-to-zod --help

# 使用方法
# oas30-to-zod <input> [options]

# 例
$ oas30-to-zod oas_document.yml # --> output `oas_document.ts`
```

### コマンドラインフラグ

| フラグ                    | 短縮形 |
| :------------------------ | :----: |
| `--output <path>`         |  `-o`  |
| `--dereference`           |        |
| `--export-name <name>`    |  `-n`  |
| `--individually`          |  `-i`  |
| `--eslint-disable`        |  `-e`  |
| `--disable-rules <rules>` |  `-r`  |
| `--without-import`        |        |
| `--without-export`        |        |
| `--inherit-prettier`      |  `-p`  |
| `--disable-format`        |        |
| `--without-defaults`      |        |
| `--with-desc`             |  `-d`  |
| `--with-anchors`          |  `-a`  |
| `--disable-autocomplete`  |        |
| `--template <path>`       |  `-t`  |

- 全てのフラグは任意
- 以下に特記なき場合、APIの同名の機能と同じ仕様
- `--output <path>`
    - 指定しない場合、入力ファイルの拡張子を `.ts` に置き換えたパスを使用する
- `--disable-rules <rules>`
    - カンマ区切り文字列で指定する
    - 例
        - `--disable-rules no-control-regex`
        - `--disable-rules "no-control-regex, import/no-named-export"`
- `--inherit-prettier`
    - 有効・無効のみ設定可能
