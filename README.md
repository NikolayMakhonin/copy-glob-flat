[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][github-image]][github-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Copy files to single directory with auto rename duplicates

# Installation
```
npm i @flemist/copy-glob-flat
```
# Usage
```ts
import {copyGlobFlat} from '@flemist/copy-glob-flat'

/*
Initial:

/source
  /dir
    /dir1
      file.txt
      ignore.txt
    /dir2
      file.txt
      ignore.txt
    file.txt
    ignore.txt
  file.txt
  ignore.txt
/dest
  /file2.txt
    file.txt
  file1.txt
*/

await copyGlobFlat({
  destDir: 'tmp',
  globs: [
    '**/*.txt',
    '**/!ignore.txt',
  ],
})

/*
Result:

/source
  ...
/dest
  /file2.txt
    file.txt
  file.txt   - copied from source/file
  file0.txt  - copied from source/dir/file
  file1.txt
  file3.txt  - copied from source/dir/dir1/file
  file4.txt  - copied from source/dir/dir2/file
*/
```

[npm-image]: https://img.shields.io/npm/v/@flemist/copy-glob-flat.svg
[npm-url]: https://npmjs.org/package/@flemist/copy-glob-flat
[downloads-image]: https://img.shields.io/npm/dm/@flemist/copy-glob-flat.svg
[downloads-url]: https://npmjs.org/package/@flemist/copy-glob-flat
[github-image]: https://github.com/NikolayMakhonin/copy-glob-flat/actions/workflows/test.yml/badge.svg
[github-url]: https://github.com/NikolayMakhonin/copy-glob-flat/actions
[coveralls-image]: https://coveralls.io/repos/github/NikolayMakhonin/copy-glob-flat/badge.svg
[coveralls-url]: https://coveralls.io/github/NikolayMakhonin/copy-glob-flat
