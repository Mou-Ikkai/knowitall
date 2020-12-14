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

import { React } from 'powercord/webpack';

export default class Settings extends React.Component {
	render() {
		return (
			<div className="knital-settings">
				<center>
					<h1>Settings is WIP!</h1>
				</center>

				<div className="knital-settings-footer">
					<p>
						Made by{' '}
						<a href="http://github.com/aspenluxxxy">aspen#0042</a>{' '}
						<br />
						KnowItAll is licensed under the{' '}
						<a href="https://tldrlegal.com/license/zlib-libpng-license-(zlib)">
							zlib/libpng license
						</a>
					</p>
					<p>
						<a
							className="knital-trans"
							href="https://transequality.org/"
						>
							Trans rights are human rights!
						</a>
					</p>
				</div>
			</div>
		);
	}
}
