/* eslint-disable no-undef */
import path from 'path'
import fs from 'fs'
import globby from 'globby'

/** Copy files to single directory with auto rename duplicates */
export async function copyGlobFlat({
  destDir,
  globs,
}: {
  destDir: string,
  /** globby patterns */
  globs: string[],
}) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, {recursive: true})
  }

  const files = await globby(globs)
  const destSourceMap = new Map<string, string>()
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const parsed = path.parse(file)
    const name = path.join(destDir, parsed.name)
    const ext = parsed.ext
    let destFile = name + ext
    let n = 0
    while (destSourceMap.has(destFile) || fs.existsSync(destFile)) {
      destFile = name + n + ext
      n++
    }
    destSourceMap.set(destFile, file)
  }

  Array.from(destSourceMap).map(([destFile, sourceFile]) => {
    return new Promise<void>((resolve, reject) => {
      fs.copyFile(sourceFile, destFile, err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  })
}
