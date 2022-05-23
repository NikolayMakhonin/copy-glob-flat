import fse from 'fs-extra'
import path from 'path'
import {copyGlobFlat} from './copyGlobFlat'

describe('copyGlobFlat', function () {
  async function checkFileContent(dir: string, fileName: string, checkContent: string) {
    const content = await fse.readFile(path.join(dir, fileName), {encoding: 'utf-8'})
    assert.strictEqual(
      content.trim(),
      checkContent,
    )
  }

  it('base', async function () {
    const sourceDir = path.resolve(__dirname, 'test/assets/source')
    const destDir = 'tmp/test'
    if (fse.existsSync(destDir)) {
      await fse.remove(destDir)
    }
    await fse.copy(path.resolve(__dirname, 'test/assets/dest'), destDir)
    assert.ok(fse.statSync(path.join(destDir, 'file1.txt')).isFile())
    assert.ok(fse.statSync(path.join(destDir, 'file2.txt')).isDirectory())

    await copyGlobFlat({
      destDir,
      globs: [
        path.join(sourceDir, '**/*.txt').replace(/\\/g, '/'),
        '!**/ignore.txt',
      ],
    })

    assert.ok(fse.statSync(path.join(destDir, 'file2.txt')).isDirectory())
    await checkFileContent(destDir, 'file.txt', 'file')
    await checkFileContent(destDir, 'file0.txt', 'dir/file')
    await checkFileContent(destDir, 'file1.txt', 'exist')
    await checkFileContent(destDir, 'file3.txt', 'dir/dir1/file')
    await checkFileContent(destDir, 'file4.txt', 'dir/dir2/file')
  })
})
