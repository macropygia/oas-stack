# oas30-to-zod

[![npm version](https://img.shields.io/npm/v/oas30-to-zod.svg?style=flat-square)](https://www.npmjs.com/package/oas30-to-zod)
[![MIT](https://img.shields.io/npm/l/oas30-to-zod?style=flat-square)](./LICENSE)
[![Codecov](https://img.shields.io/codecov/c/github/macropygia/oas-stack?token=U3HD8ZUF98&style=flat-square&logo=codecov)](https://codecov.io/gh/macropygia/oas-stack)

**English** | [日本語](README.ja_JP.md)

Generate Zod schemas from OpenAPI Specification 3.0 Components Object.

- Not compatible with OpenAPI Specification 3.1.
- This package is currently unstable.
    - Breaking changes may occur without any notice.
- Available as API and CLI.
- Dual package for CommonJS/ES Modules.
- Customizable.
    - Parsers are pluggable.
    - Can edit output using [EJS](https://ejs.co/).
- References
    - [OpenAPI Specification 3.0.3](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md)
    - [Data Models (Schemas) - OpenAPI Guide](https://swagger.io/docs/specification/data-models/)

## Limitations

- Document must be stand-alone.
    - `$ref` works only with `#/components/schemas/<component_name>` format.
    - Or dereference before processing.
- These keywords are not supported.
    - `anyOf`
    - `not`
    - `minProperties`
    - `maxProperties`

## API

```js
import { oasComponentsToZod } from 'oas30-to-zod';

const zodSchemasString = await oasComponentsToZod('path/to/oas_document.yml');

console.log(zodSchemasString);
```

### oasComponentsToZod(input, options)

| Parameter | Type               | Default | Required |
| --------- | ------------------ | ------- | -------- |
| `input`   | `string \| object` |         | Yes      |
| `options` | `object`           | {}      | No       |

- `input`
    - Path to YAML/JSON ( `string` )
    - Or parsed document ( `object` )
- `options`
    - See following

### Options

| Name                  | Type                | Default   | Required |
| :-------------------- | :------------------ | :-------- | :------- |
| `output`              | `string \| false`   | `false`   | No       |
| `dereference`         | `boolean`           | `false`   | No       |
| `exportName`          | `string`            | `schemas` | No       |
| `individually`        | `boolean`           | `false`   | No       |
| `eslintDisable`       | `boolean`           | `false`   | No       |
| `disableRules`        | `string[]`          | `[]`      | No       |
| `withoutImport`       | `boolean`           | `false`   | No       |
| `withoutExport`       | `boolean`           | `false`   | No       |
| `inheritPrettier`     | `boolean \| object` | `false`   | No       |
| `disableFormat`       | `boolean`           | `false`   | No       |
| `withoutDefaults`     | `boolean`           | `false`   | No       |
| `withDesc`            | `boolean`           | `false`   | No       |
| `withAnchors`         | `boolean`           | `false`   | No       |
| `disableAutocomplete` | `boolean`           | `false`   | No       |
| `template`            | `string`            |           | No       |
| `parsers`             | `object`            |           | No       |

#### output

Output path for the `.ts` file.

- If set `false`, returns string.
- Default: `false`

#### dereference

Use dereferenced document.

- Resolve all `$ref` before processing.
- Need to be `true` if circular references exist between components.
- Default: `false`

#### exportName

Set variable name for export.

- Default: `schemas`

```js
import { z } from 'zod';

const Comp1 = z.any();
const Comp2 = z.any();
const Comp3 = z.any();

export schemas = { Comp1, Comp2, Comp3 };
//        ^-- This
```

#### individually

Export individually.

- Default: `false`

```js
import { z } from 'zod';

export const Comp1 = z.any();
export const Comp2 = z.any();
export const Comp3 = z.any();
```

#### eslintDisable

Add `/* eslint-disable */` to first line.

- Default: `false`

```js
/* eslint-disable */
import { z } from 'zod';

const Comp = z.any();
```

#### disableRules

Insert comma-separated rules after `eslint-disable` .

- Only works with `eslintDisable: true`
- Default: `[]`

```js
// ['no-control-regex', 'import/no-named-export']

/* eslint-disable no-control-regex, import/no-named-export */
import { z } from 'zod';

const Comp = z.any();
```

#### withoutImport

Disable to output import statement.

- Remove `import { z } from 'zod';`
- Default: `false`

#### withoutExport

Disable to output export statement.

- Remove `export const <exportName> { ... };`
- Default: `false`

#### inheritPrettier

Inherit Prettier settings from the project or configure it manually.

- By default, Prettier runs with default settings.
- If set to `true` , Prettier find config file from the project directory.
    - Use [prettier.resolveConfigFile()](https://prettier.io/docs/en/api.html#prettierresolveconfigfilefilepath) with `process.cwd()` .
- Can pass Prettier Configuration Schema as an `object` .
- Default: `false`

#### disableFormat

Disable formatting for output.

- By default, the output is formatted by Prettier.
- Default: `false`

#### withoutDefaults

Disable convert `default` to `.default()` .

- Default: `false`

#### withDesc

Enable convert `description` to `.descrive()` .

- Default: `false`

#### withAnchors

Wrap regex with `^` and `$` .

- Default: `false`

```js
// OAS
{
  type: string
  pattern: '[a-z]+'
}

// withAnchors: false
z.string().regex(new RegExp("[a-z]+")

// withAnchors: true
z.string().regex(new RegExp("^[a-z]+$")
```

#### disableAutocomplete

Disable autocomplete for objects with missing `type: 'object'` .

- By default, add `type: 'object'` to a schema that has only `properties` or `additionalProperties` or both.
- Default: `false`

#### template

Use a user-specific [EJS](https://ejs.co/) template.

- Sets the path to the template file.
- Default: [default.ts.ejs](https://github.com/macropygia/oas-stack/blob/main/packages/oas30-to-zod/src/default.ts.ejs)

#### parsers

Select the preset or assign the user-specific parser.

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

// e.g.
const options = {
  parsers: {
    stringParser: 'minmax-format-regex',
    objectParser: (schema, ctx) => 'parsed zod schema'
  }
}
```

##### Presets

```ts
type StringPreset =
  // Change the processing order of keywords insert after `.string()`
  | 'minmax-regex-format'
  | 'minmax-format-regex'
  | 'regex-format-minmax'
  | 'regex-minmax-format'
  | 'format-minmax-regex'
  | 'format-regex-minmax'
```

##### User-specific parser

See [type definitions](https://github.com/macropygia/oas-stack/blob/main/packages/oas30-to-zod/src/types/index.ts) for details.  
Complex processing is possible when combined with a user-specific template.

## CLI

```bash
# Install
$ npm i -G oas30-to-zod

# Show help
$ oas30-to-zod --help

# Usage
# oas30-to-zod <input> [options]

# e.g.
$ oas30-to-zod oas_document.yml # --> output `oas_document.ts`
```

### Flags

| Flags                     | Shorthand |
| :------------------------ | :-------: |
| `--output <path>`         |   `-o`    |
| `--dereference`           |           |
| `--export-name <name>`    |   `-n`    |
| `--individually`          |   `-i`    |
| `--eslint-disable`        |   `-e`    |
| `--disable-rules <rules>` |   `-r`    |
| `--without-import`        |           |
| `--without-export`        |           |
| `--disable-format`        |           |
| `--without-defaults`      |           |
| `--with-desc`             |   `-d`    |
| `--with-anchors`          |   `-a`    |
| `--disable-autocomplete`  |           |
| `--template <path>`       |   `-t`    |

- All flags are optional.
- All flags are the same as API options except for the following.
- `--output <path>`
    - If not set, output to `<input>.ts` file. (replaces the extension of the input file)
- `--disable-rules <rules>`
    - Use comma-separeted string.
    - e.g.
        - `--disable-rules no-control-regex`
        - `--disable-rules "no-control-regex, import/no-named-export"`
