/**
 * Bundle of knowitall
 * Generated: 12-09-2020
 * Version: 1.0.0
 *
 * Copyright(C) 2020 aspen
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
 * that you wrote the original software. If you use this software in a product,
 * an acknowledgment in the product documentation would be appreciated but is
 * not required.
 *
 * 2.  Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 *
 * 3.  This notice may not be removed or altered from any source distribution.
 */

'use strict';

let wasm;
let cachedTextDecoder = new TextDecoder('utf-8', {
	ignoreBOM: true,
	fatal: true,
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;

function getUint8Memory0() {
	if (
		cachegetUint8Memory0 === null ||
		cachegetUint8Memory0.buffer !== wasm.memory.buffer
	) {
		cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
	}

	return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
	return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);
let heap_next = heap.length;

function addHeapObject(obj) {
	if (heap_next === heap.length) heap.push(heap.length + 1);
	const idx = heap_next;
	heap_next = heap[idx];
	heap[idx] = obj;
	return idx;
}

function getObject(idx) {
	return heap[idx];
}

function dropObject(idx) {
	if (idx < 36) return;
	heap[idx] = heap_next;
	heap_next = idx;
}

function takeObject(idx) {
	const ret = getObject(idx);
	dropObject(idx);
	return ret;
}
/**
 */

function wasm_main() {
	wasm.wasm_main();
}
let WASM_VECTOR_LEN = 0;
let cachedTextEncoder = new TextEncoder('utf-8');
const encodeString =
	typeof cachedTextEncoder.encodeInto === 'function'
		? function (arg, view) {
				return cachedTextEncoder.encodeInto(arg, view);
		  }
		: function (arg, view) {
				const buf = cachedTextEncoder.encode(arg);
				view.set(buf);
				return {
					read: arg.length,
					written: buf.length,
				};
		  };

function passStringToWasm0(arg, malloc, realloc) {
	if (realloc === undefined) {
		const buf = cachedTextEncoder.encode(arg);
		const ptr = malloc(buf.length);
		getUint8Memory0()
			.subarray(ptr, ptr + buf.length)
			.set(buf);
		WASM_VECTOR_LEN = buf.length;
		return ptr;
	}

	let len = arg.length;
	let ptr = malloc(len);
	const mem = getUint8Memory0();
	let offset = 0;

	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 0x7f) break;
		mem[ptr + offset] = code;
	}

	if (offset !== len) {
		if (offset !== 0) {
			arg = arg.slice(offset);
		}

		ptr = realloc(ptr, len, (len = offset + arg.length * 3));
		const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
		const ret = encodeString(arg, view);
		offset += ret.written;
	}

	WASM_VECTOR_LEN = offset;
	return ptr;
}
/**
 * @param {string} msg
 * @returns {any}
 */

function parse_message(msg) {
	var ptr0 = passStringToWasm0(
		msg,
		wasm.__wbindgen_malloc,
		wasm.__wbindgen_realloc
	);
	var len0 = WASM_VECTOR_LEN;
	var ret = wasm.parse_message(ptr0, len0);
	return takeObject(ret);
}
const u32CvtShim = new Uint32Array(2);
const uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);
/**
 * @param {BigInt} bytes
 * @returns {any}
 */

function bytesizes(bytes) {
	uint64CvtShim[0] = bytes;
	const low0 = u32CvtShim[0];
	const high0 = u32CvtShim[1];
	var ret = wasm.bytesizes(low0, high0);
	return takeObject(ret);
}
let cachegetInt32Memory0 = null;

function getInt32Memory0() {
	if (
		cachegetInt32Memory0 === null ||
		cachegetInt32Memory0.buffer !== wasm.memory.buffer
	) {
		cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
	}

	return cachegetInt32Memory0;
}

async function load(module, imports) {
	if (typeof Response === 'function' && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === 'function') {
			try {
				return await WebAssembly.instantiateStreaming(module, imports);
			} catch (e) {
				if (module.headers.get('Content-Type') != 'application/wasm') {
					console.warn(
						'`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
						e
					);
				} else {
					throw e;
				}
			}
		}

		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);

		if (instance instanceof WebAssembly.Instance) {
			return {
				instance,
				module,
			};
		} else {
			return instance;
		}
	}
}

async function init(input) {
	if (typeof input === 'undefined') {
		input = (typeof document === 'undefined'
			? new (require('u' + 'rl').URL)('file:' + __filename).href
			: (document.currentScript && document.currentScript.src) ||
			  new URL('Cargo-8ea1dea2.js', document.baseURI).href
		).replace(/\.js$/, '_bg.wasm');
	}

	const imports = {};
	imports.wbg = {};

	imports.wbg.__wbindgen_json_parse = function (arg0, arg1) {
		var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
		return addHeapObject(ret);
	};

	imports.wbg.__wbg_new_59cb74e423758ede = function () {
		var ret = new Error();
		return addHeapObject(ret);
	};

	imports.wbg.__wbg_stack_558ba5917b466edd = function (arg0, arg1) {
		var ret = getObject(arg1).stack;
		var ptr0 = passStringToWasm0(
			ret,
			wasm.__wbindgen_malloc,
			wasm.__wbindgen_realloc
		);
		var len0 = WASM_VECTOR_LEN;
		getInt32Memory0()[arg0 / 4 + 1] = len0;
		getInt32Memory0()[arg0 / 4 + 0] = ptr0;
	};

	imports.wbg.__wbg_error_4bb6c2a97407129a = function (arg0, arg1) {
		try {
			console.error(getStringFromWasm0(arg0, arg1));
		} finally {
			wasm.__wbindgen_free(arg0, arg1);
		}
	};

	imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
		takeObject(arg0);
	};

	if (
		typeof input === 'string' ||
		(typeof Request === 'function' && input instanceof Request) ||
		(typeof URL === 'function' && input instanceof URL)
	) {
		input = fetch(input);
	}

	const { instance, module } = await load(await input, imports);
	wasm = instance.exports;
	init.__wbindgen_wasm_module = module;

	wasm.__wbindgen_start();

	return wasm;
}

var exports$1 = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	wasm_main: wasm_main,
	parse_message: parse_message,
	bytesizes: bytesizes,
	default: init,
});

function loadFile(url) {
	return new Promise((resolve, reject) => {
		require('fs').readFile(url, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

var Cargo = async () => {
	await init(
		loadFile(
			require('path').join(__dirname, 'assets/knowitall-provider-cbe173dd.wasm')
		)
	);
	return exports$1;
};

exports.default = Cargo;
