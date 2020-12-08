/* 
 *  File: patterns.rs
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

use once_cell::sync::Lazy;
use regex::Regex;

macro_rules! lazy_regex {
	($name: ident, $regex: tt) => {
		pub static $name: Lazy<Regex> =
			Lazy::new(|| Regex::new($regex).unwrap_or_else(|e| unreachable!(e)));
	};
}

lazy_regex!(
	TWELVE_HOUR_TIME,
	r#"\b((?P<hour>1[0-2]|0?[1-9]):(?P<minute>[0-5][0-9]) (?P<meridiem>[AaPp][Mm]))"#
);

lazy_regex!(
	TWENTY_FOUR_HOUR_TIME,
	r#"\b((?P<hour>[01]?[0-9]|2[0-3]):(?P<minute>[0-5][0-9]))\b"#
);

lazy_regex!(
	BYTE_SIZE,
	r#"\b((?P<size_value>[\p{N},.\+]+)(?:\s*)(?P<size_prefix>(?:k|kilo|m|mega|g|giga|t|tera|p|peta))?(?P<is_normal>i)?(?P<size_unit>b|byte|bit)s?)\b"#
);

lazy_regex!(
	RGB_HEX,
	r#"(#(?P<r>[[:xdigit:]]{2})(?P<g>[[:xdigit:]]{2})(?P<b>[[:xdigit:]]{2}))"#
);
