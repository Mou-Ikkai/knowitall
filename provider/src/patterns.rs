/*
 * File: patterns.rs
 * Project: knowitall
 * Created Date: Monday, December 7th 2020, 6:26:39 pm
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

use once_cell::sync::Lazy;
use regex::Regex;

macro_rules! lazy_regex {
	($name: ident, $regex: tt) => {
		pub static $name: Lazy<Regex> =
			Lazy::new(|| Regex::new(concat!("(?iu)", $regex)).unwrap_or_else(|e| unreachable!(e)));
	};
}

lazy_regex!(
	BYTE_SIZE,
	r#"\b((?P<size_value>[\p{N},.\+]+)(?:\s*)(?P<size_prefix>(?:k|kilo|m|mega|g|giga|t|tera|p|peta))?(?P<is_normal>i)?(?P<size_unit>b|byte|bit)s?)\b"#
);

lazy_regex!(
	RGB_HEX,
	r#"(#(?P<r>[[:xdigit:]]{2})(?P<g>[[:xdigit:]]{2})(?P<b>[[:xdigit:]]{2})(?P<a>[[:xdigit:]]{2})?)"#
);

lazy_regex!(
	TEMPERATURE,
	r#"[+-]?(?P<value>[\d.]+)[\s°]*(?P<unit>k|f|c|kelvin|fahrenheit|celsius|celcius)\b"#
);

lazy_regex!(
	BASE64,
	r#"((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=))"#
);
