import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import { execa, execaCommand } from 'execa'
import outputFiles from 'output-files'
import P from 'path'
import unifyMochaOutput from 'unify-mocha-output'

export default tester(
  {
    'after test': {
      files: {
        'index.spec.js': endent`
          export default {
            after: () => console.log('foo'),
            bar: () => {},
          }
        `,
      },
    },
    array: {
      files: {
        'index.spec.js': endent`
          export default [
              () => {},
            ]
        `,
      },
    },
    'beforeEach test': {
      files: {
        'index.spec.js': endent`
          export default {
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
          export default {
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
          export default {
            bar: () => {},
          }
        `,
        'index.spec.js': endent`
          export default {
            foo: () => {},
          }
        `,
      },
    },
    'multiple tests': {
      files: {
        'index.spec.js': endent`
          export default {
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
          export default {
            before: () => console.log('foo'),
          }
        `,
        'index.spec.js': endent`
          export default {
            bar: () => {},
            baz: () => {},
          }
        `,
      },
    },
    valid: {
      files: {
        'index.spec.js': endent`
          export default {
            foo: () => {},
          }
        `,
      },
    },
  },
  [
    testerPluginTmpDir(),
    {
      before: () => execaCommand('base prepublishOnly'),
      transform: test =>
        async function () {
          test = { args: [], ...test }
          await outputFiles(test.files)

          const output = await execa(
            'mocha',
            [
              '--ui',
              P.join('..', 'dist', 'cjs-fallback.cjs'),
              ...test.args,
              '*.spec.js',
            ],
            { all: true },
          )
          expect(output.all |> unifyMochaOutput).toMatchSnapshot(this)
        },
    },
  ],
)
