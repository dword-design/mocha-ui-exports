import { endsWith, forEach, startsWith } from '@dword-design/functions'
import Mocha from 'mocha'
import P from 'path'

const ui = suite => {
  const suites = [suite]
  suite.on('require', (obj, file) => {
    if (
      (file |> endsWith('.spec.js')) ||
      (file |> endsWith('.test.js')) ||
      (file |> startsWith(P.join(process.cwd(), 'test')))
    ) {
      const describeName = P.basename(file).match(
        /^(.*?)(\.(spec|test))?\.js$/
      )[1]
      obj = {
        [describeName]: obj,
      }
    }
    let newSuite

    const visit = currentObj =>
      forEach(currentObj, (value, key) => {
        if (typeof key === 'number') {
          key = key.toString()
        }
        if (typeof value === 'function') {
          switch (key) {
            case 'before':
              suites[0].beforeAll(value)
              break
            case 'after':
              suites[0].afterAll(value)
              break
            case 'beforeEach':
              suites[0].beforeEach(value)
              break
            case 'afterEach':
              suites[0].afterEach(value)
              break
            default: {
              const test = new Mocha.Test(key, value)
              test.file = file
              suites[0].addTest(test)
            }
          }
        } else {
          newSuite = Mocha.Suite.create(suites[0], key)
          suites.unshift(newSuite)
          visit(value)
          suites.shift()
        }
      })
    visit(obj)
  })
}
// needed for mocha < v8
Mocha.interfaces['exports-auto-describe'] = ui

export default ui
