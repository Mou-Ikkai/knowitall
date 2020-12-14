/*
 * File: base64.rs
 * Project: knowitall
 * Created Date: Monday, December 14th 2020, 10:17:39 am
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
	patterns::BASE64,
	provider::{InfoSegment, Provider, Tooltip},
};
use ::base64 as b64;

const MAX_DISPLAY_LEN: usize = 2000;
// 2k 4-byte unicode characters
const MAX_DECODE_LEN: usize = 8000;

pub struct Base64Provider;

impl Provider for Base64Provider {
	fn name(&self) -> &'static str {
		"Base64"
	}

	fn parse_message(&self, src: &str) -> Vec<InfoSegment> {
		BASE64
			.captures_iter(src)
			.filter_map(|capture| -> Option<InfoSegment> {
				let segment = capture.get(0)?;
				let decoded = b64::decode(segment.as_str()).ok()?;
				let len = decoded.len();

				if len > MAX_DECODE_LEN {
					return None;
				}

				let text = match String::from_utf8(decoded) {
					Ok(o) => o,
					Err(e) => {
						let valid_up_to = e.utf8_error().valid_up_to();
						if valid_up_to >= len.saturating_sub(4) {
							let mut valid_utf8 = e.into_bytes();
							valid_utf8.truncate(valid_up_to);
							if valid_utf8.len() > 0 {
								unsafe { String::from_utf8_unchecked(valid_utf8) }
							} else {
								return None;
							}
						} else {
							return None;
						}
					}
				};

				if text.len() > MAX_DISPLAY_LEN {
					return None;
				}

				InfoSegment {
					start: segment.start(),
					end: segment.end(),
					info: Tooltip::Base64 { text },
				}
				.into()
			})
			.collect()
	}
}
