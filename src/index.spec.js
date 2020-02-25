import withLocalTmpDir from 'with-local-tmp-dir'
import execa from 'execa'
import outputFiles from 'output-files'
import { endent, mapValues } from '@dword-design/functions'

export default {
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
  'multiple tests': {
    files: {
      'index.spec.js': endent`
        module.exports = {
          foo: () => {},
          bar: () => {},
        }
      `,
    },
    regex: new RegExp(endent`
      ^

        index
          . foo
          . bar


        2 passing \\(.*?\\)
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
  before: {
    files: {
      'index.spec.js': endent`
        module.exports = {
          before: () => console.log('foo'),
          bar: () => {},
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
  after: {
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
  beforeEach: {
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
  afterEach: {
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
    args: ['--file', 'before.js'],
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
}
  |> mapValues(({ files, regex, args = [] }) => () => withLocalTmpDir(async () => {
    outputFiles(files) |> await
    const { all } = execa(
      'mocha',
      ['--require', require.resolve('.'), '--ui', 'exports-auto-describe', ...args, '*.spec.js'],
      { all: true },
    ) |> await
    expect(all).toMatch(regex)
  }))
