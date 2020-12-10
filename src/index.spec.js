import { endent, mapValues } from '@dword-design/functions'
import execa from 'execa'
import outputFiles from 'output-files'
import withLocalTmpDir from 'with-local-tmp-dir'

const runTest = config => () =>
  withLocalTmpDir(async () => {
    config = { args: [], ...config }
    await outputFiles(config.files)
    const output = await execa(
      'mocha',
      ['--ui', require.resolve('.'), ...config.args, '*.spec.js'],
      { all: true }
    )
    expect(output.all).toMatch(config.regex)
  })

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
    regex: new RegExp(endent`
      ^

        index
          . bar
      foo


        1 passing \\(.*?\\)
      $
    `),
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
    regex: new RegExp(endent`
      ^

        index
      foo
          . bar
      foo
          . baz


        2 passing \\(.*?\\)
      $
    `),
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
    regex: new RegExp(endent`
      ^

        index
          foo
            . bar


        1 passing \\(.*?\\)
      $
    `),
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
    regex: new RegExp(endent`
      ^

        cli
          . bar

        index
          . foo


        2 passing \\(.*?\\)
      $
    `),
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
    regex: new RegExp(endent`
      ^

        index
          . bar
      foo
          . baz
      foo


        2 passing \\(.*?\\)
      $
    `),
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
    regex: new RegExp(endent`
      ^

      foo
        index
          . bar
          . baz


        2 passing \\(.*?\\)
      $
    `),
  },
  valid: {
    files: {
      'index.spec.js': endent`
        module.exports = {
          foo: () => {},
        }
      `,
    },
    regex: new RegExp(endent`
      ^

        index
          . foo


        1 passing \\(.*?\\)
      $
    `),
  },
} |> mapValues(runTest)
