/*
 * File: length.rs
 * Project: knowitall
 * Created Date: Thursday, December 10th 2020, 3:31:42 pm
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

use crate::{
	patterns::LENGTH,
	provider::{InfoSegment, Provider, Tooltip},
};
use measurements::Length;

pub struct LengthProvider;

impl Provider for LengthProvider {
	fn name(&self) -> &'static str {
		"Length"
	}

	fn parse_message(&self, src: &str) -> Vec<InfoSegment> {
		LENGTH
			.captures_iter(src)
			.filter_map(|capture| -> Option<InfoSegment> {
				let segment = capture.get(0)?;

				let value = lexical::parse::<f64, _>(capture.name("value")?.as_str()).ok()?;
				let measurement = if capture.name("metric").is_some() {
					match capture.name("metric_prefix") {
						Some(s) => match s.as_str().to_lowercase().as_str() {
							"k" | "kilo" => Length::from_kilometers(value),
							"c" | "centi" => Length::from_centimetres(value),
							_ => return None,
						},
						None => Length::from_meters(value),
					}
				} else if let Some(imperial_unit) = capture.name("imperial") {
					match imperial_unit.as_str().to_lowercase().as_str() {
						"feet" | "ft" => Length::from_feet(value),
						"inch" | "in" => Length::from_inches(value),
						"yard" | "yd" => Length::from_yards(value),
						_ => return None,
					}
				} else {
					return None;
				};

				InfoSegment {
					start: segment.start(),
					end: segment.end(),
					info: Tooltip::Length {
						meters: measurement.as_centimetres(),
					},
				}
				.into()
			})
			.collect()
	}
}
