/*
 * File: lib.rs
 * Project: knowitall
 * Created Date: Monday, December 7th 2020, 6:22:28 pm
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

pub mod patterns;
pub mod provider;

use provider::{InfoSegment, PROVIDERS};
use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn wasm_main() {
	console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn parse_message(msg: &str) -> JsValue {
	let mut segments: Vec<InfoSegment> = Vec::new();
	PROVIDERS
		.iter()
		.flat_map(|p| p.parse_message(msg))
		.for_each(|segment| {
			segment.insert_if_nonoverlapping(&mut segments);
		});

	segments.sort_by(|a, b| a.start.cmp(&b.start));

	JsValue::from_serde(&segments).unwrap()
}
