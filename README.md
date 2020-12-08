# KnowItAll

KnowItAll is a [Powercord](https://powercord.dev) plugin, for effortlessly parsing and displaying data in messages in an easy-to-understand format

## Supported Data Types


| Name       | Description                                                                                             | Example | Provider                                   |
| ---------- | ------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------ |
| Bytes      | Byte measurement units, such as kilo/mega/giga/tera/pera bytes/bits. Supports both binary and SI units. | 14 GB   | [bytes.rs](provider/src/provider/bytes.rs) |
| RGB Colors | Hex-encoded RGB color                                                                                   | #2f2f2f | [color.rs](provider/src/provider/color.rs) |
| Time       | Time of the day, in both 24-hour and 12-hour format                                                     | 6:30 AM | [time.rs](provider/src/provider/time.rs)   |

## License

Copyright (C) 2020  aspen

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
