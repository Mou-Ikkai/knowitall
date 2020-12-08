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

const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const {
	React,
	Flux,
	getModule,
	getModuleByDisplayName,
	i18n: { Messages },
} = require('powercord/webpack');

class KnowItAll extends Plugin {
	async startPlugin() {
		await this.load_wasm_provider();
		await this.import_functions();
		await this.inject_hooks();
	}

	async load_wasm_provider() {
		this.wasm = await Promise.resolve().then(function () {
			return require('./Cargo-ba3dd2fc.js');
		});
		this.Provider = await this.wasm.default();
	}

	async import_functions() {
		this.get_member = await getModule(['getMember']);
		this.get_channel = await getModule(['getChannel']);
	}

	async inject_hooks() {
		const ChannelMessage = (await getModule(['MESSAGE_ID_PREFIX'])).default;
		const oType = ChannelMessage.type;
		inject('knowitall_ChannelMessage', ChannelMessage, 'type', (args, res) => {
			try {
				if (
					typeof res?.props?.childrenMessageContent?.props?.content === 'object'
				) {
					res.props.childrenMessageContent.props.content = this.handle_message_content(
						res.props.childrenMessageContent.props.content
					);
				}
			} catch (e) {
				this.error(e);
			}
			return res;
		});
	}

	async import(filter, functionName = filter) {
		if (typeof filter === 'string') {
			filter = [filter];
		}

		return (await getModule(filter))[functionName];
	}

	handle_message_content(content) {
		try {
			if (typeof content === 'string') {
				content = [content];
			} else if (typeof content === 'function') {
				// da fuck?
				return content;
			}
			return content.map((element) => {
				if (
					typeof element === 'object' &&
					element?.props?.children?.length > 0
				) {
					element.props.children = this.handle_message_content(
						element.props.children
					);
					return element;
				} else if (typeof element === 'string') {
					let x = this.Provider.parse_message(element);
					if (x && x.length > 0) {
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
		uninject('knowitall_ChannelMessage');
	}
}

module.exports = KnowItAll;
//# sourceMappingURL=plugin.js.map
