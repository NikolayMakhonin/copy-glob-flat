import {copyGlobFlat} from './copyGlobFlat'

const paths = process.argv.slice(2)

copyGlobFlat({
  destDir: paths[paths.length - 1],
  globs  : paths.slice(0, paths.length - 1),
})
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
