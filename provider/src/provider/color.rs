/* 
 *  File: color.rs
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

use crate::{
	patterns::RGB_HEX,
	provider::{InfoSegment, Provider, Tooltip},
};

pub struct ColorProvider;

impl Provider for ColorProvider {
	const NAME: &'static str = "RGB Color";

	fn parse_message(src: &str) -> Vec<InfoSegment> {
		RGB_HEX
			.captures_iter(src)
			.filter_map(|capture| -> Option<InfoSegment> {
				let segment = capture.get(0)?;
				let (r, g, b) = (
					u8::from_str_radix(capture.name("r")?.as_str(), 16).ok()?,
					u8::from_str_radix(capture.name("g")?.as_str(), 16).ok()?,
					u8::from_str_radix(capture.name("b")?.as_str(), 16).ok()?,
				);

				InfoSegment {
					start: segment.start(),
					end: segment.end(),
					info: Tooltip::Color { r, g, b },
				}
				.into()
			})
			.collect()
	}
}
