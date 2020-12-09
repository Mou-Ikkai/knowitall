/*
 * File: time.rs
 * Project: knowitall
 * Created Date: Monday, December 7th 2020, 8:05:56 pm
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
	patterns::{TWELVE_HOUR_TIME, TWENTY_FOUR_HOUR_TIME},
	provider::{InfoSegment, Provider, Tooltip},
};
use chrono::NaiveTime;

pub struct TimeProvider;

impl Provider for TimeProvider {
	fn name(&self) -> &'static str {
		"Time"
	}

	fn parse_message(&self, src: &str) -> Vec<InfoSegment> {
		TWELVE_HOUR_TIME
			.captures_iter(src)
			.chain(TWENTY_FOUR_HOUR_TIME.captures_iter(src))
			.filter_map(|capture| -> Option<InfoSegment> {
				let segment = capture.get(0)?;
				let meridiem = match capture.name("meridiem") {
					Some(s) => match s.as_str().to_lowercase().as_str() {
						"am" => 0,
						"pm" => 12,
						_ => unreachable!(),
					},
					None => 0,
				};
				let hour =
					lexical::parse::<u32, _>(capture.name("hour")?.as_str()).ok()? + meridiem;
				let minute = lexical::parse(capture.name("minute")?.as_str()).ok()?;

				// 00:00 AM is valid, but 24:00 isn't, and neither is HH:60.
				if hour > 23 || minute > 59 {
					None
				} else {
					InfoSegment {
						start: segment.start(),
						end: segment.end(),
						info: Tooltip::Time {
							time: NaiveTime::from_hms(hour, minute, 0),
						},
					}
					.into()
				}
			})
			.collect()
	}
}
