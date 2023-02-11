import { z } from 'zod'

const String = z
  .string()
  .min(10)
  .max(20)
  .regex(new RegExp('[a-z]+'))
  .default('foo')
  .nullable()
const String2 = z
  .string()
  .min(10)
  .max(20)
  .regex(new RegExp('[a-z]+'))
  .nullable()
const String3 = z
  .string()
  .min(10)
  .max(20)
  .regex(new RegExp('[a-z]+'))
  .default('foo')
const Hoge = z.object({
  A: String.optional(),
  B: String2,
  D: String3.optional(),
})
const Fuga = z.object({
  A: z.object({
    A1: String.optional(),
    A2: z.object({ A3: String2, A4: String3 }),
  }),
  B: String2,
  D: String3.optional(),
})
const StringMail = z.string().email()
const StringUrl = z.string().url()
const StringUuid = z.string().uuid()

export const schemas = {
  String,
  String2,
  String3,
  Hoge,
  Fuga,
  StringMail,
  StringUrl,
  StringUuid,
}
