/* 
 *  File: plugin.js
 *  Author: Aspen
 *  Copyright (C) 2020 aspen
 *  
 *  This program is free software: you can redistribute it and/or modify it
 *  under the terms of the GNU General Public License as published by the Free
 *  Software Foundation, either version 3 of the License, or (at your option)
 *  any later version.
 *  
 *  This program is distributed in the hope that it will be useful, but WITHOUT
 *  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 *  more details.
 *  
 *  You should have received a copy of the GNU General Public License along with
 *  this program. If not, see <http://www.gnu.org/licenses/>.
 *  
 */

const {
	Plugin
} = require('powercord/entities');
const {
	React,
	Flux,
	getModule,
	getModuleByDisplayName,
	i18n: {
		Messages
	}
} = require('powercord/webpack');

import KnowItAllWASM from '../provider/pkg/knowitall_provider';

module.exports = class KnowItAll extends Plugin {
	async startPlugin() {
		await import_functions();
	}

	async import_functions() {
		this.get_typing_users = await getModule(['getTypingUsers']);
		this.get_current_user = await getModule(['getCurrentUser']);
		this.get_member = await getModule(['getMember']);
		this.get_channel = await getModule(['getChannel']);

		this.PrivateChannel = await getModuleByDisplayName('PrivateChannel');
	}

	async import(filter, functionName = filter) {
		if (typeof filter === 'string') {
			filter = [filter];
		}

		return (await getModule(filter))[functionName];
	};

	pluginWillUnload() {

	}
}
