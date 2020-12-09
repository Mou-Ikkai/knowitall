const LICENSE_TEMPLATE = `Bundle of <%= pkg.name %>
Generated: <%= moment().format('MM-DD-YYYY') %>
Version: <%= pkg.version %>

Copyright(C) <%= moment().format('YYYY') %> aspen

This software is provided 'as-is', without any express or implied warranty. In
no event will the authors be held liable for any damages arising from the use of
this software.

Permission is granted to anyone to use this software for any purpose, including
commercial applications, and to alter it and redistribute it freely, subject to
the following restrictions:

1.  The origin of this software must not be misrepresented; you must not claim
    that you wrote the original software. If you use this software in a product,
    an acknowledgment in the product documentation would be appreciated but is
    not required.

2.  Altered source versions must be plainly marked as such, and must not be
    misrepresented as being the original software.

3.  This notice may not be removed or altered from any source distribution.
`;

import babel from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import license from 'rollup-plugin-license';
import prettier from 'rollup-plugin-prettier';
import resolve from '@rollup/plugin-node-resolve';
import rust from '@wasm-tool/rollup-plugin-rust';

export default {
	input: 'src/plugin.js',
	preserveEntrySignatures: 'strict',
	external: [
		'powercord/entities',
		'powercord/injector',
		'powercord/webpack',
		'powercord/components',
	],
	output: {
		dir: '_rolled',
		format: 'cjs',
		exports: 'default',
	},
	plugins: [
		del({
			targets: '_rolled/*',
		}),
		resolve({ extensions: ['.js', '.jsx'] }),
		babel({
			configFile: false,
			exclude: ['node_modules/**'],
			babelHelpers: 'runtime',
			extensions: ['.js', '.jsx'],
			presets: ['@babel/preset-react'],
			plugins: [['@babel/transform-runtime', { useESModules: true }]],
		}),
		license({
			banner: {
				commentStyle: 'regular',
				content: LICENSE_TEMPLATE,
			},
		}),
		prettier({
			singleQuote: true,
			useTabs: true,
			semi: true,
			trailingComma: 'es5',
		}),
		rust({
			nodejs: true,
			watchPatterns: ['provider/src/**/*'],
			importHook: function (path) {
				return (
					"require('path').join(__dirname, " +
					JSON.stringify(path) +
					')'
				);
			},
		}),
	],
};
