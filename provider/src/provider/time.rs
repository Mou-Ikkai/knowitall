/* 
 *  File: time.rs
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
	patterns::{TWELVE_HOUR_TIME, TWENTY_FOUR_HOUR_TIME},
	provider::{InfoSegment, Provider, Tooltip},
};
use chrono::NaiveTime;

pub struct TimeProvider;

impl Provider for TimeProvider {
	const NAME: &'static str = "Time";

	fn parse_message(src: &str) -> Vec<InfoSegment> {
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
