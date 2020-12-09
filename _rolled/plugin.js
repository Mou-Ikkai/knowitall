/**
 * Bundle of knowitall
 * Generated: 12-08-2020
 * Version: 1.0.0
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

const { React } = require('powercord/webpack');

const { Tooltip } = require('powercord/components');

class Inline extends React.Component {
	render() {
		const { original_text } = this.props;
		return /*#__PURE__*/ React.createElement(
			Tooltip,
			{
				text: 'test',
				className: 'knital-tooltip',
			},
			original_text
		);
	}
}

/*
 *  File: plugin.js
 *  Author: Aspen
 *  Copyright (C) 2020 aspen
 *
 *  This software is provided 'as-is', without any express or implied warranty. In
 *  no event will the authors be held liable for any damages arising from the use of
 *  this software.
 *
 *  Permission is granted to anyone to use this software for any purpose, including
 *  commercial applications, and to alter it and redistribute it freely, subject to
 *  the following restrictions:
 *
 *  1.  The origin of this software must not be misrepresented; you must not claim
 *      that you wrote the original software. If you use this software in a product,
 *      an acknowledgment in the product documentation would be appreciated but is
 *      not required.
 *
 *  2.  Altered source versions must be plainly marked as such, and must not be
 *      misrepresented as being the original software.
 *
 *  3.  This notice may not be removed or altered from any source distribution.
 *
 */
class KnowItAll extends entities.Plugin {
	async startPlugin() {
		this.loadStylesheet('scss/tooltip.scss');
		await this.load_wasm_provider();
		await this.import_functions();
		await this.inject_hooks();
	}

	async load_wasm_provider() {
		this.wasm = await Promise.resolve().then(function () {
			return require('./Cargo-5dacaa05.js');
		});
		this.Provider = await this.wasm.default();
	}

	async import_functions() {
		this.get_member = await webpack.getModule(['getMember']);
		this.get_channel = await webpack.getModule(['getChannel']);
	}

	async inject_hooks() {
		const ChannelMessage = (await webpack.getModule(['MESSAGE_ID_PREFIX']))
			.default;
		const oType = ChannelMessage.type;
		injector.inject(
			'knowitall_ChannelMessage',
			ChannelMessage,
			'type',
			(args, res) => {
				try {
					if (
						typeof res?.props?.childrenMessageContent?.props?.content ===
						'object'
					) {
						res.props.childrenMessageContent.props.content = this.handle_message_content(
							res.props.childrenMessageContent.props.content
						);
					}
				} catch (e) {
					this.error(e);
				}

				return res;
			}
		);
	}

	async import(filter, functionName = filter) {
		if (typeof filter === 'string') {
			filter = [filter];
		}

		return (await webpack.getModule(filter))[functionName];
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
									original_text: element.slice(segment.start, segment.end),
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
		injector.uninject('knowitall_ChannelMessage');
	}
}

module.exports = KnowItAll;
