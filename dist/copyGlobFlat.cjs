'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var path = require('path');
var fs = require('fs');
var globby = require('globby');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var globby__default = /*#__PURE__*/_interopDefaultLegacy(globby);

/** Copy files to single directory with auto rename duplicates */
function copyGlobFlat({ destDir, globs, }) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        if (!fs__default["default"].existsSync(destDir)) {
            fs__default["default"].mkdirSync(destDir, { recursive: true });
        }
        const files = yield globby__default["default"](globs);
        const destSourceMap = new Map();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const parsed = path__default["default"].parse(file);
            const name = path__default["default"].join(destDir, parsed.name);
            const ext = parsed.ext;
            let destFile = name + ext;
            let n = 0;
            while (destSourceMap.has(destFile) || fs__default["default"].existsSync(destFile)) {
                destFile = name + n + ext;
                n++;
            }
            destSourceMap.set(destFile, file);
        }
        Array.from(destSourceMap).map(([destFile, sourceFile]) => {
            return new Promise((resolve, reject) => {
                fs__default["default"].copyFile(sourceFile, destFile, err => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        });
    });
}

exports.copyGlobFlat = copyGlobFlat;
