/* 
 *  File: bytes.rs
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
	patterns::BYTE_SIZE,
	provider::{InfoSegment, Provider, Tooltip},
};

pub struct ByteProvider;

impl Provider for ByteProvider {
	const NAME: &'static str = "Byte Units";

	fn parse_message(src: &str) -> Vec<InfoSegment> {
		BYTE_SIZE
			.captures_iter(src)
			.filter_map(|capture| -> Option<InfoSegment> {
				let segment = capture.get(0)?;
				let value =
					lexical::parse(capture.name("size_value")?.as_str().replace(',', "")).ok()?;
				let prefix = match capture.name("size_prefix") {
					Some(x) => x.as_str().to_lowercase(),
					None => "".into(),
				};
				let is_si = capture.name("is_normal").is_none();
				let unit = capture.name("size_unit")?.as_str().to_lowercase();

				let mut value = match prefix.as_str() {
					"k" | "kilo" => {
						if is_si {
							bytesize::kb(value)
						} else {
							bytesize::kib(value)
						}
					}
					"m" | "mega" => {
						if is_si {
							bytesize::mb(value)
						} else {
							bytesize::mib(value)
						}
					}
					"g" | "giga" => {
						if is_si {
							bytesize::gb(value)
						} else {
							bytesize::gib(value)
						}
					}
					"t" | "tera" => {
						if is_si {
							bytesize::tb(value)
						} else {
							bytesize::tib(value)
						}
					}
					"p" | "peta" => {
						if is_si {
							bytesize::pb(value)
						} else {
							bytesize::pib(value)
						}
					}
					_ => value,
				};

				if unit.as_str() == "bit" {
					value /= 8;
				}

				InfoSegment {
					start: segment.start(),
					end: segment.end(),
					info: Tooltip::Bytes { bytes: value },
				}
				.into()
			})
			.collect()
	}
}
