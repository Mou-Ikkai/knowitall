/*
 *  File: mod.rs
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
