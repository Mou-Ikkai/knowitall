# KnowItAll

KnowItAll is a [Powercord](https://powercord.dev) plugin, for effortlessly parsing and displaying data in messages in an easy-to-understand format

The intent is similar to [powercord-message-tooltips](https://github.com/lorencerri/powercord-message-tooltips), however that is not being actively developed any more, and the author said it was fine if I made something similar.

## Supported Data Types


| Name        | Description                                                                                             | Example | Provider                                               |
| ----------- | ------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------ |
| Bytes       | Byte measurement units, such as kilo/mega/giga/tera/pera bytes/bits. Supports both binary and SI units. | 14 GB   | [bytes.rs](provider/src/provider/bytes.rs)             |
| RGB Colors  | Hex-encoded RGB color                                                                                   | #2f2f2f | [color.rs](provider/src/provider/color.rs)             |
| Time        | Time of the day, in both 24-hour and 12-hour format                                                     | 6:30 AM | [time.rs](provider/src/provider/time.rs)               |
| Temperature | Conversions between Celsius, Fahrenheit, and Kelvin                                                     | 23.0 F  | [temperature.rs](provider/src/provider/temperature.rs) |

## License

Copyright (c) `2020` `aspen

This software is provided 'as-is', without any express or implied warranty. In
no event will the authors be held liable for any damages arising from the use of
this software.

Permission is granted to anyone to use this software for any purpose, including
commercial applications, and to alter it and redistribute it freely, subject to
the following restrictions:

1.  The origin of this software must not be misrepresented; you must not claim
    that you wrote the original software. If you use this software in a product,
    an acknowledgment in the product documentation would be appreciated but is
    not required.

2.  Altered source versions must be plainly marked as such, and must not be
    misrepresented as being the original software.

3.  This notice may not be removed or altered from any source distribution.
