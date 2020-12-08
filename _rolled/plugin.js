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
	}

	async load_wasm_provider() {
		this.wasm = await Promise.resolve().then(function () {
			return require('./Cargo-3a03f3a8.js');
		});
		this.Provider = await this.wasm.default();
	}

	async import_functions() {
		this.get_member = await getModule(['getMember']);
		this.get_channel = await getModule(['getChannel']);
	}

	async import(filter, functionName = filter) {
		if (typeof filter === 'string') {
			filter = [filter];
		}

		return (await getModule(filter))[functionName];
	}

	pluginWillUnload() {}
}

module.exports = KnowItAll;
//# sourceMappingURL=plugin.js.map
