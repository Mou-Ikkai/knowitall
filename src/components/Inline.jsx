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

import { React } from 'powercord/webpack';
import { Tooltip } from 'powercord/components';

import ByteProvider from './ByteProvider';
import TemperatureProvider from './TemperatureProvider';
import PlaintextProvider from './PlaintextProvider';
import ColorProvider from './ColorProvider';

export default class Inline extends React.Component {
	render() {
		const { original_text, data, provider } = this.props;

		let inner = 'placeholkder';
		if (data.Bytes) {
			inner = React.createElement(ByteProvider, {
				data: data.Bytes,
				provider,
			});
		} else if (data.Temperature) {
			inner = React.createElement(TemperatureProvider, {
				data: data.Temperature,
				provider,
			});
		} else if (data.Base64) {
			inner = React.createElement(PlaintextProvider, {
				text: data.Base64.text,
			});
		} else if (data.Color) {
			inner = React.createElement(ColorProvider, {
				color: data.Color,
			});
		}

		return (
			<Tooltip text={inner} className="knital-tooltip">
				{original_text}
			</Tooltip>
		);
	}
}
