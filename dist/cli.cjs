'use strict';

var copyGlobFlat = require('./copyGlobFlat.cjs');
require('tslib');
require('path');
require('fs');
require('globby');

const [destDir, ...globs] = process.argv.slice(2);
copyGlobFlat.copyGlobFlat({
    destDir,
    globs,
})
    .catch(err => {
    console.error(err);
    process.exit(1);
});
