import { forIn } from '@dword-design/functions'
import Mocha from 'mocha'
import P from 'path'

const ui = suite => {
  const suites = [suite]

  suite.on('require', (obj, file) => {
    const describeName = P.basename(__filename).match(/(.*)(\.(spec|test))?\.js/)[1]
    obj = {
      [describeName]: obj,
    }
    let suite
    const visit = forIn((value, key) => {
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
        suite = Mocha.Suite.create(suites[0], key)
        suites.unshift(suite)
        visit(value)
        suites.shift()
      }
    })
    visit(obj)
  })
}

Mocha.interfaces['exports-auto-describe'] = ui

export default ui
