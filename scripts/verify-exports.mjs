import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

for (const [name, target] of Object.entries(pkg.exports)) {
  for (const kind of ['import', 'types']) {
    const path = target[kind]
    assert.ok(path, `${name} is missing its ${kind} export`)
    assert.ok(existsSync(new URL(`../${path.replace(/^\.\//, '')}`, import.meta.url)), `${name} ${kind} export does not exist: ${path}`)
  }
}

const root = await import(new URL('../dist/index.js', import.meta.url))
const react = await import(new URL('../dist/react/index.js', import.meta.url))
const client = await import(new URL('../dist/runtime/client.js', import.meta.url))
const i18n = await import(new URL('../dist/i18n/index.js', import.meta.url))

assert.equal(typeof root.cleverForms, 'function')
assert.equal(typeof root.validateSubmission, 'function')
assert.equal(typeof root.validateFormSchema, 'function')
assert.equal(typeof react.CleverForm, 'function')
assert.equal(typeof client.createCleverFormsClient, 'function')
assert.ok(i18n.cleverFormsTranslations)

console.log('Published exports verified.')
