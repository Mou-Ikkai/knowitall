/*
 * File: mod.rs
 * Project: knowitall
 * Created Date: Monday, December 7th 2020, 6:35:55 pm
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

pub mod bytes;
pub mod color;
pub mod temperature;
pub mod time;

use chrono::NaiveTime;
use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};

pub static PROVIDERS: Lazy<Vec<Box<dyn Provider>>> = Lazy::new(|| {
	vec![
		Box::new(temperature::TemperatureProvider),
		Box::new(bytes::ByteProvider),
		Box::new(color::ColorProvider),
		Box::new(time::TimeProvider),
	]
});

#[derive(Debug, Serialize, Deserialize)]
pub enum Tooltip {
	Time { time: NaiveTime },
	Bytes { bytes: u64, bits: bool, si: bool },
	Color { r: u8, g: u8, b: u8 },
	Temperature { kelvin: f32 },
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InfoSegment {
	pub start: usize,
	pub end: usize,
	pub info: Tooltip,
}

impl InfoSegment {
	pub fn intersects(&self, other: &Self) -> bool {
		other.start >= self.start && other.end <= self.end
	}

	pub fn insert_if_nonoverlapping(self, list: &mut Vec<Self>) {
		if list.iter().any(|other| other.intersects(&self)) {
			std::mem::drop(self)
		} else {
			list.push(self);
		}
	}
}

pub trait Provider: Send + Sync {
	fn name(&self) -> &'static str;
	fn parse_message(&self, src: &str) -> Vec<InfoSegment>;
}
