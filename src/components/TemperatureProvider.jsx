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

import { React } from 'powercord/webpack';

const F_MUL = 9 / 5;

export default class TemperatureProvider extends React.Component {
	render() {
		const { data } = this.props;

		return (
			<div>
				<div>{(data.kelvin - 273.15).toFixed(2)} °C</div>
				<div>{((data.kelvin - 273.15) * F_MUL + 32).toFixed(2)} °F</div>
				<div>{data.kelvin.toFixed(2)} °K</div>
			</div>
		);
	}
}
