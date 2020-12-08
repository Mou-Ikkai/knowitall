/* 
 *  File: mod.rs
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

pub mod bytes;
pub mod color;
pub mod time;

use chrono::NaiveTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum Tooltip {
	Time { time: NaiveTime },
	Bytes { bytes: u64 },
	Color { r: u8, g: u8, b: u8 },
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InfoSegment {
	start: usize,
	end: usize,
	info: Tooltip,
}

impl InfoSegment {
	pub fn intersects(&self, offset: usize) -> bool {
		offset >= self.start && offset <= self.end
	}
}

pub trait Provider {
	const NAME: &'static str;

	fn parse_message(src: &str) -> Vec<InfoSegment>;
}
