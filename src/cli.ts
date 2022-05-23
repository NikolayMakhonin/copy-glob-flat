import {copyGlobFlat} from './copyGlobFlat'

const [destDir, ...globs] = process.argv.slice(2)

copyGlobFlat({
  destDir,
  globs,
})
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
