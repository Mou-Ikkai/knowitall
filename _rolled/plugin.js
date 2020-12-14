/**
 * Bundle of knowitall
 * Generated: 12-14-2020
 * Version: 0.1.0
 *
 * Copyright(C) 2020 aspen
 *
 * This software is provided 'as-is', without any express or implied warranty. In
 * no event will the authors be held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software for any purpose, including
 * commercial applications, and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1.  The origin of this software must not be misrepresented; you must not claim
 * that you wrote the original software. If you use this software in a product,
 * an acknowledgment in the product documentation would be appreciated but is
 * not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */

'use strict';

var entities = require('powercord/entities');
var injector = require('powercord/injector');
var webpack = require('powercord/webpack');
var components = require('powercord/components');

/*
 * File: ByteProvider.jsx
 * Project: knowitall
 * Created Date: Wednesday, December 9th 2020, 2:40:04 pm
 * Author: aspen
 * -----
 * Copyright (c) 2020 aspen
 *
 * This software is provided 'as-is', without any express or implied warranty. In
 * no event will the authors be held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software for any purpose, including
 * commercial applications, and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1.  The origin of this software must not be misrepresented; you must not claim
 *     that you wrote the original software. If you use this software in a product,
 *     an acknowledgment in the product documentation would be appreciated but is
 *     not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */
class ByteProvider extends webpack.React.Component {
	render() {
		const { data, provider } = this.props;
		return /*#__PURE__*/ webpack.React.createElement(
			'div',
			null,
			provider
				.bytesizes(BigInt(data.bytes))
				.map((entry) =>
					/*#__PURE__*/ webpack.React.createElement('div', null, entry)
				)
		);
	}
}

/*
 * File: TemperatureProvider.jsx
 * Project: knowitall
 * Created Date: Wednesday, December 9th 2020, 4:42:07 pm
 * Author: aspen
 * -----
 * Copyright (c) 2020 aspen
 *
 * This software is provided 'as-is', without any express or implied warranty. In
 * no event will the authors be held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software for any purpose, including
 * commercial applications, and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1.  The origin of this software must not be misrepresented; you must not claim
 *     that you wrote the original software. If you use this software in a product,
 *     an acknowledgment in the product documentation would be appreciated but is
 *     not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */
const F_MUL = 9 / 5;
class TemperatureProvider extends webpack.React.Component {
	render() {
		const { data } = this.props;
		return /*#__PURE__*/ webpack.React.createElement(
			'div',
			null,
			/*#__PURE__*/ webpack.React.createElement(
				'div',
				null,
				(data.kelvin - 273.15).toFixed(2),
				' \xB0C'
			),
			/*#__PURE__*/ webpack.React.createElement(
				'div',
				null,
				((data.kelvin - 273.15) * F_MUL + 32).toFixed(2),
				' \xB0F'
			),
			/*#__PURE__*/ webpack.React.createElement(
				'div',
				null,
				data.kelvin.toFixed(2),
				' \xB0K'
			)
		);
	}
}

/*
 * File: PlaintextProvider.jsx
 * Project: knowitall
 * Created Date: Monday, December 14th 2020, 10:32:06 am
 * Author: aspen
 * -----
 * Copyright (c) 2020 aspen
 *
 * This software is provided 'as-is', without any express or implied warranty. In
 * no event will the authors be held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software for any purpose, including
 * commercial applications, and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1.  The origin of this software must not be misrepresented; you must not claim
 *     that you wrote the original software. If you use this software in a product,
 *     an acknowledgment in the product documentation would be appreciated but is
 *     not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */
class PlaintextProvider extends webpack.React.Component {
	render() {
		const { text } = this.props;
		return /*#__PURE__*/ webpack.React.createElement('div', null, text);
	}
}

/*
 * File: ColorProvider.jsx
 * Project: knowitall
 * Created Date: Monday, December 14th 2020, 11:43:11 am
 * Author: aspen
 * -----
 * Copyright (c) 2020 aspen
 *
 * This software is provided 'as-is', without any express or implied warranty. In
 * no event will the authors be held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software for any purpose, including
 * commercial applications, and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1.  The origin of this software must not be misrepresented; you must not claim
 *     that you wrote the original software. If you use this software in a product,
 *     an acknowledgment in the product documentation would be appreciated but is
 *     not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */
class ColorProvider extends webpack.React.Component {
	render() {
		const { color } = this.props;
		return /*#__PURE__*/ webpack.React.createElement('div', {
			className: 'knital-color-box',
			style: {
				backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
			},
		});
	}
}

/*
 * File: Inline.jsx
 * Project: knowitall
 * Created Date: Tuesday, December 8th 2020, 6:01:55 pm
 * Author: aspen
 * -----
 * Copyright (c) 2020 aspen
 *
 * This software is provided 'as-is', without any express or implied warranty. In
 * no event will the authors be held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software for any purpose, including
 * commercial applications, and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1.  The origin of this software must not be misrepresented; you must not claim
 *     that you wrote the original software. If you use this software in a product,
 *     an acknowledgment in the product documentation would be appreciated but is
 *     not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */
class Inline extends webpack.React.Component {
	render() {
		const { original_text, data, provider } = this.props;
		let inner = 'placeholkder';

		if (data.Bytes) {
			inner = webpack.React.createElement(ByteProvider, {
				data: data.Bytes,
				provider,
			});
		} else if (data.Temperature) {
			inner = webpack.React.createElement(TemperatureProvider, {
				data: data.Temperature,
				provider,
			});
		} else if (data.Base64) {
			inner = webpack.React.createElement(PlaintextProvider, {
				text: data.Base64.text,
			});
		} else if (data.Color) {
			inner = webpack.React.createElement(ColorProvider, {
				color: data.Color,
			});
		}

		return /*#__PURE__*/ webpack.React.createElement(
			components.Tooltip,
			{
				text: inner,
				className: 'knital-tooltip',
			},
			original_text
		);
	}
}

/*
 * File: Settings.jsx
 * Project: knowitall
 * Created Date: Monday, December 14th 2020, 2:57:00 pm
 * Author: aspen
 * -----
 * Copyright (c) 2020 aspen
 *
 * This software is provided 'as-is', without any express or implied warranty. In
 * no event will the authors be held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software for any purpose, including
 * commercial applications, and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1.  The origin of this software must not be misrepresented; you must not claim
 *     that you wrote the original software. If you use this software in a product,
 *     an acknowledgment in the product documentation would be appreciated but is
 *     not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */
class Settings extends webpack.React.Component {
	render() {
		return /*#__PURE__*/ webpack.React.createElement(
			'div',
			{
				className: 'knital-settings',
			},
			/*#__PURE__*/ webpack.React.createElement(
				'center',
				null,
				/*#__PURE__*/ webpack.React.createElement(
					'h1',
					null,
					'Settings is WIP!'
				)
			),
			/*#__PURE__*/ webpack.React.createElement(
				'div',
				{
					className: 'knital-settings-footer',
				},
				/*#__PURE__*/ webpack.React.createElement(
					'p',
					null,
					'Made by',
					' ',
					/*#__PURE__*/ webpack.React.createElement(
						'a',
						{
							href: 'http://github.com/aspenluxxxy',
						},
						'aspen#0042'
					),
					' ',
					/*#__PURE__*/ webpack.React.createElement('br', null),
					'KnowItAll is licensed under the',
					' ',
					/*#__PURE__*/ webpack.React.createElement(
						'a',
						{
							href: 'https://tldrlegal.com/license/zlib-libpng-license-(zlib)',
						},
						'zlib/libpng license'
					)
				),
				/*#__PURE__*/ webpack.React.createElement(
					'p',
					null,
					/*#__PURE__*/ webpack.React.createElement(
						'a',
						{
							className: 'knital-trans',
							href: 'https://transequality.org/',
						},
						'Trans rights are human rights!'
					)
				)
			)
		);
	}
}

/*
 * File: plugin.js
 * Project: knowitall
 * Created Date: Monday, December 7th 2020, 5:57:56 pm
 * Author: aspen
 * -----
 * Copyright (c) 2020 aspen
 *
 * This software is provided 'as-is', without any express or implied warranty. In
 * no event will the authors be held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software for any purpose, including
 * commercial applications, and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1.  The origin of this software must not be misrepresented; you must not claim
 *     that you wrote the original software. If you use this software in a product,
 *     an acknowledgment in the product documentation would be appreciated but is
 *     not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */
class KnowItAll extends entities.Plugin {
	async startPlugin() {
		if (
			typeof window.WebAssembly !== 'object' ||
			typeof WebAssembly !== 'object'
		) {
			powercord.api.notices.sendToast('knital-someone-fucked-up-wasm', {
				header: 'KnowItAll',
				content: 'WebAssembly is disabled. KnowItAll will not work without it.',
				type: 'danger',
			});
			return;
		}

		this.loadStylesheet('scss/tooltip.scss');
		await this.load_wasm_provider();
		await this.import_functions();
		await this.inject_hooks();
		powercord.api.settings.registerSettings('knowitall', {
			label: 'KnowItAll',
			category: this.entityID,
			render: Settings,
		});
	}

	async load_wasm_provider() {
		this.wasm = await Promise.resolve().then(function () {
			return require('./Cargo-8ea1dea2.js');
		});
		this.Provider = await this.wasm.default();
	}

	async import_functions() {
		this.get_member = await webpack.getModule(['getMember']);
		this.get_channel = await webpack.getModule(['getChannel']);
	}

	async inject_hooks() {
		const parser = await webpack.getModule(['parse', 'parseTopic']);
		const topic_handler = this.handle_topic.bind(this);
		injector.inject('knowitall_parse', parser, 'parse', topic_handler);
		injector.inject(
			'knowitall_parse_links',
			parser,
			'parseAllowLinks',
			topic_handler
		);
		injector.inject(
			'knowitall_parse_topic',
			parser,
			'parseTopic',
			topic_handler
		);
	}

	async import(filter, functionName = filter) {
		if (typeof filter === 'string') {
			filter = [filter];
		}

		return (await webpack.getModule(filter))[functionName];
	}

	handle_topic(args, res) {
		try {
			if (typeof res === 'object') {
				res = this.handle_message_content(res);
			}
		} catch (e) {
			this.error(e);
		}

		return res;
	}

	handle_message_content(content) {
		try {
			if (typeof content === 'string') {
				content = [content];
			} else if (typeof content === 'function') {
				// da fuck?
				return content;
			}

			return content.flatMap((element) => {
				if (
					typeof element === 'object' &&
					element?.props?.children?.length > 0
				) {
					element.props.children = this.handle_message_content(
						element.props.children
					);
					return element;
				} else if (typeof element === 'string') {
					let segments = this.Provider.parse_message(element);

					if (segments && segments.length > 0) {
						let split_segments = [];
						let cursor = 0;
						segments.forEach((segment) => {
							if (segment.start > cursor) {
								split_segments.push(element.slice(cursor, segment.start));
							}

							let end = segment.end + 1;
							split_segments.push(
								webpack.React.createElement(Inline, {
									provider: this.Provider,
									original_text: element.slice(segment.start, segment.end),
									data: segment.info,
								})
							);
							cursor = end;
						});
						let remaining = element.slice(cursor - 1);

						if (remaining.length > 0) {
							split_segments.push(remaining);
						}

						return split_segments;
					}

					return element;
				} else {
					return element;
				}
			});
		} catch (e) {
			this.error(e);
		}

		return content;
	}

	pluginWillUnload() {
		injector.uninject('knowitall_parse');
		injector.uninject('knowitall_parse_links');
		injector.uninject('knowitall_parse_topic');
		powercord.api.settings.unregisterSettings(this.entityID);
	}
}

module.exports = KnowItAll;
