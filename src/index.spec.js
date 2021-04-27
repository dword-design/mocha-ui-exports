import { endent, mapValues } from '@dword-design/functions'
import execa from 'execa'
import outputFiles from 'output-files'
import unifyMochaOutput from 'unify-mocha-output'
import withLocalTmpDir from 'with-local-tmp-dir'

const runTest = test =>
  function () {
    return withLocalTmpDir(async () => {
      test = { args: [], ...test }
      await outputFiles(test.files)

      const output = await execa(
        'mocha',
        ['--ui', require.resolve('.'), ...test.args, '**/*.spec.js'],
        { all: true }
      )
      expect(output.all |> unifyMochaOutput).toMatchSnapshot(this)
    })
  }

export default {
  'after test': {
    files: {
      'index.spec.js': endent`
        module.exports = {
          after: () => console.log('foo'),
          bar: () => {},
        }
      `,
    },
  },
  array: {
    files: {
      'index.spec.js': endent`
        module.exports = [
          () => {},
        ]
      `,
    },
  },
  'beforeEach test': {
    files: {
      'index.spec.js': endent`
        module.exports = {
          beforeEach: () => console.log('foo'),
          bar: () => {},
          baz: () => {},
        }
      `,
    },
  },
  describe: {
    files: {
      'index.spec.js': endent`
        module.exports = {
          foo: {
            bar: () => {},
          },
        }
      `,
    },
  },
  'multiple suites': {
    files: {
      'cli.spec.js': endent`
        module.exports = {
          bar: () => {},
        }
      `,
      'index.spec.js': endent`
        module.exports = {
          foo: () => {},
        }
      `,
    },
  },
  'multiple tests': {
    files: {
      'index.spec.js': endent`
        module.exports = {
          afterEach: () => console.log('foo'),
          bar: () => {},
          baz: () => {},
        }
      `,
    },
  },
  'non-test file': {
    args: ['--file', 'before.js'],
    files: {
      'before.js': endent`
        module.exports = {
          before: () => console.log('foo'),
        }
      `,
      'index.spec.js': endent`
        module.exports = {
          bar: () => {},
          baz: () => {},
        }
      `,
    },
  },
  subdirectory: {
    files: {
      sub: {
        'index.spec.js': endent`
          module.exports = {
            foo: () => {},
            bar: () => {},
          }
        `,
        'other.spec.js': endent`
          module.exports = {
            foo: () => {},
          }
        `,
      },
    },
  },
  valid: {
    files: {
      'index.spec.js': endent`
        module.exports = {
          foo: () => {},
        }
      `,
    },
  },
} |> mapValues(runTest)
