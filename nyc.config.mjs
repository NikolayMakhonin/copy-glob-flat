export default {
	include     : ['src/**/*.ts'],
	exclude     : ['**/test/**', '**/*.test.*'],
	reporter    : ['lcov'],
	'temp-dir'  : './tmp/coverage/tmp',
	'report-dir': './tmp/coverage/lcov',
}
