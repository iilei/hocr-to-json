import yargs from 'yargs'
import runner from './runner'

const {
  argv: { 'out-dir': outDir, 'src-glob': srcGlob },
} = yargs
  .option('out-dir', {
    describe: 'Output directory',
    default: 'hocr-json',
  })
  .option('src-glob', {
    describe: 'Glob pattern for input Files',
    default: '*.hocr',
  })

runner(outDir, srcGlob)
