/*
 *  File: color.rs
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
