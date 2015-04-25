/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
 AngularJS v1.3.14
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/

(function(P,X,u){'use strict';function M(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.14/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Ta(b){if(null==b||Ua(b))return!1;var a=b.length;return b.nodeType===
na&&a?!0:x(b)||E(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function s(b,a,c){var d,e;if(b)if(G(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(E(b)||Ta(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==s)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Ed(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
b[d[e]],d[e]);return d}function lc(b){return function(a,c){b(c,a)}}function Fd(){return++ob}function mc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function w(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var l=f[g];b[l]=e[l]}}mc(b,a);return b}function $(b){return parseInt(b,10)}function Pb(b,a){return w(Object.create(b),a)}function B(){}function oa(b){return b}function da(b){return function(){return b}}function z(b){return"undefined"===
typeof b}function y(b){return"undefined"!==typeof b}function J(b){return null!==b&&"object"===typeof b}function x(b){return"string"===typeof b}function V(b){return"number"===typeof b}function pa(b){return"[object Date]"===Da.call(b)}function G(b){return"function"===typeof b}function pb(b){return"[object RegExp]"===Da.call(b)}function Ua(b){return b&&b.window===b}function Va(b){return b&&b.$evalAsync&&b.$watch}function Wa(b){return"boolean"===typeof b}function nc(b){return!(!b||!(b.nodeName||b.prop&&
b.attr&&b.find))}function Gd(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function ta(b){return R(b.nodeName||b[0]&&b[0].nodeName)}function Xa(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Ea(b,a,c,d){if(Ua(b)||Va(b))throw Ka("cpws");if(a){if(b===a)throw Ka("cpi");c=c||[];d=d||[];if(J(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(E(b))for(var f=a.length=0;f<b.length;f++)e=Ea(b[f],null,c,d),J(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);
else{var g=a.$$hashKey;E(a)?a.length=0:s(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Ea(b[f],null,c,d),J(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);mc(a,g)}}else if(a=b)E(b)?a=Ea(b,[],c,d):pa(b)?a=new Date(b.getTime()):pb(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):J(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Ea(b,e,c,d));return a}function qa(b,a){if(E(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(J(b))for(c in a=a||{},
b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function ea(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(E(b)){if(!E(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ea(b[d],a[d]))return!1;return!0}}else{if(pa(b))return pa(a)?ea(b.getTime(),a.getTime()):!1;if(pb(b)&&pb(a))return b.toString()==a.toString();if(Va(b)||Va(a)||Ua(b)||Ua(a)||E(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!G(b[d])){if(!ea(b[d],
a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==u&&!G(a[d]))return!1;return!0}return!1}function Ya(b,a,c){return b.concat(Za.call(a,c))}function oc(b,a){var c=2<arguments.length?Za.call(arguments,2):[];return!G(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,Ya(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Hd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?
c=u:Ua(a)?c="$WINDOW":a&&X===a?c="$DOCUMENT":Va(a)&&(c="$SCOPE");return c}function $a(b,a){if("undefined"===typeof b)return u;V(a)||(a=a?2:null);return JSON.stringify(b,Hd,a)}function pc(b){return x(b)?JSON.parse(b):b}function ua(b){b=C(b).clone();try{b.empty()}catch(a){}var c=C("<div>").append(b).html();try{return b[0].nodeType===qb?R(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+R(b)})}catch(d){return R(c)}}function qc(b){try{return decodeURIComponent(b)}catch(a){}}function rc(b){var a=
{},c,d;s((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,"%20").split("="),d=qc(c[0]),y(d)&&(b=y(c[1])?qc(c[1]):!0,sc.call(a,d)?E(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Qb(b){var a=[];s(b,function(b,d){E(b)?s(b,function(b){a.push(Fa(d,!0)+(!0===b?"":"="+Fa(b,!0)))}):a.push(Fa(d,!0)+(!0===b?"":"="+Fa(b,!0)))});return a.length?a.join("&"):""}function rb(b){return Fa(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Fa(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Id(b,a){var c,d,e=sb.length;b=C(b);for(d=0;d<e;++d)if(c=sb[d]+a,x(c=b.attr(c)))return c;return null}function Jd(b,a){var c,d,e={};s(sb,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});s(sb,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Id(c,"strict-di"),
a(c,d?[d]:[],e))}function tc(b,a,c){J(c)||(c={});c=w({strictDi:!1},c);var d=function(){b=C(b);if(b.injector()){var d=b[0]===X?"document":ua(b);throw Ka("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=ab(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",
d);c(b)(a)})}]);return d},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;P&&e.test(P.name)&&(c.debugInfoEnabled=!0,P.name=P.name.replace(e,""));if(P&&!f.test(P.name))return d();P.name=P.name.replace(f,"");aa.resumeBootstrap=function(b){s(b,function(b){a.push(b)});return d()};G(aa.resumeDeferredBootstrap)&&aa.resumeDeferredBootstrap()}function Kd(){P.name="NG_ENABLE_DEBUG_INFO!"+P.name;P.location.reload()}function Ld(b){b=aa.element(b).injector();if(!b)throw Ka("test");return b.get("$$testability")}
function uc(b,a){a=a||"_";return b.replace(Md,function(b,d){return(d?a:"")+b.toLowerCase()})}function Nd(){var b;vc||((ra=P.jQuery)&&ra.fn.on?(C=ra,w(ra.fn,{scope:La.scope,isolateScope:La.isolateScope,controller:La.controller,injector:La.injector,inheritedData:La.inheritedData}),b=ra.cleanData,ra.cleanData=function(a){var c;if(Rb)Rb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=ra._data(e,"events"))&&c.$destroy&&ra(e).triggerHandler("$destroy");b(a)}):C=Q,aa.element=C,vc=!0)}function Sb(b,a,c){if(!b)throw Ka("areq",
a||"?",c||"required");return b}function tb(b,a,c){c&&E(b)&&(b=b[b.length-1]);Sb(G(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ma(b,a){if("hasOwnProperty"===b)throw Ka("badname",a);}function wc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&G(b)?oc(e,b):b}function ub(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return C(c)}function fa(){return Object.create(null)}
function Od(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=M("$injector"),d=M("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||M;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return t}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],q=a("$injector","invoke","push",d),t={_invokeQueue:b,_configBlocks:d,
_runBlocks:e,requires:g,name:f,provider:a("$provide","provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:q,run:function(a){e.push(a);return this}};h&&q(h);return t})}})}function Pd(b){w(b,{bootstrap:tc,copy:Ea,extend:w,equals:ea,
element:C,forEach:s,injector:ab,noop:B,bind:oc,toJson:$a,fromJson:pc,identity:oa,isUndefined:z,isDefined:y,isString:x,isFunction:G,isObject:J,isNumber:V,isElement:nc,isArray:E,version:Qd,isDate:pa,lowercase:R,uppercase:vb,callbacks:{counter:0},getTestability:Ld,$$minErr:M,$$csp:bb,reloadWithDebugInfo:Kd});cb=Od(P);try{cb("ngLocale")}catch(a){cb("ngLocale",[]).provider("$locale",Rd)}cb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Sd});a.provider("$compile",xc).directive({a:Td,
input:yc,textarea:yc,form:Ud,script:Vd,select:Wd,style:Xd,option:Yd,ngBind:Zd,ngBindHtml:$d,ngBindTemplate:ae,ngClass:be,ngClassEven:ce,ngClassOdd:de,ngCloak:ee,ngController:fe,ngForm:ge,ngHide:he,ngIf:ie,ngInclude:je,ngInit:ke,ngNonBindable:le,ngPluralize:me,ngRepeat:ne,ngShow:oe,ngStyle:pe,ngSwitch:qe,ngSwitchWhen:re,ngSwitchDefault:se,ngOptions:te,ngTransclude:ue,ngModel:ve,ngList:we,ngChange:xe,pattern:zc,ngPattern:zc,required:Ac,ngRequired:Ac,minlength:Bc,ngMinlength:Bc,maxlength:Cc,ngMaxlength:Cc,
ngValue:ye,ngModelOptions:ze}).directive({ngInclude:Ae}).directive(wb).directive(Dc);a.provider({$anchorScroll:Be,$animate:Ce,$browser:De,$cacheFactory:Ee,$controller:Fe,$document:Ge,$exceptionHandler:He,$filter:Ec,$interpolate:Ie,$interval:Je,$http:Ke,$httpBackend:Le,$location:Me,$log:Ne,$parse:Oe,$rootScope:Pe,$q:Qe,$$q:Re,$sce:Se,$sceDelegate:Te,$sniffer:Ue,$templateCache:Ve,$templateRequest:We,$$testability:Xe,$timeout:Ye,$window:Ze,$$rAF:$e,$$asyncCallback:af,$$jqLite:bf})}])}function db(b){return b.replace(cf,
function(a,b,d,e){return e?d.toUpperCase():d}).replace(df,"Moz$1")}function Fc(b){b=b.nodeType;return b===na||!b||9===b}function Gc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Tb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(ef.exec(b)||["",""])[1].toLowerCase();d=ga[d]||ga._default;c.innerHTML=d[1]+b.replace(ff,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=Ya(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";s(f,function(a){e.appendChild(a)});
return e}function Q(b){if(b instanceof Q)return b;var a;x(b)&&(b=T(b),a=!0);if(!(this instanceof Q)){if(a&&"<"!=b.charAt(0))throw Ub("nosel");return new Q(b)}if(a){a=X;var c;b=(c=gf.exec(b))?[a.createElement(c[1])]:(c=Gc(b,a))?c.childNodes:[]}Hc(this,b)}function Vb(b){return b.cloneNode(!0)}function xb(b,a){a||yb(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)yb(c[d])}function Ic(b,a,c,d){if(y(d))throw Ub("offargs");var e=(d=zb(b))&&d.events,f=d&&d.handle;if(f)if(a)s(a.split(" "),
function(a){if(y(c)){var d=e[a];Xa(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function yb(b,a){var c=b.ng339,d=c&&Ab[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Ic(b)),delete Ab[c],b.ng339=u))}function zb(b,a){var c=b.ng339,c=c&&Ab[c];a&&!c&&(b.ng339=c=++hf,c=Ab[c]={events:{},data:{},handle:u});return c}function Wb(b,a,c){if(Fc(b)){var d=y(c),e=!d&&a&&!J(a),
f=!a;b=(b=zb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];w(b,a)}}}function Bb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Cb(b,a){a&&b.setAttribute&&s(a.split(" "),function(a){b.setAttribute("class",T((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+T(a)+" "," ")))})}function Db(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");
s(a.split(" "),function(a){a=T(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",T(c))}}function Hc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Jc(b,a){return Eb(b,"$"+(a||"ngController")+"Controller")}function Eb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=E(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=C.data(b,a[d]))!==u)return c;b=b.parentNode||
11===b.nodeType&&b.host}}function Kc(b){for(xb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Lc(b,a){a||xb(b);var c=b.parentNode;c&&c.removeChild(b)}function jf(b,a){a=a||P;if("complete"===a.document.readyState)a.setTimeout(b);else C(a).on("load",b)}function Mc(b,a){var c=Fb[a.toLowerCase()];return c&&Nc[ta(b)]&&c}function kf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Oc[a]}function lf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=
a[e||c.type],g=f?f.length:0;if(g){if(z(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=qa(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||f[l].call(b,c)}};c.elem=b;return c}function bf(){this.$get=function(){return w(Q,{hasClass:function(b,a){b.attr&&(b=b[0]);
return Bb(b,a)},addClass:function(b,a){b.attr&&(b=b[0]);return Db(b,a)},removeClass:function(b,a){b.attr&&(b=b[0]);return Cb(b,a)}})}}function Na(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Fd)():c+":"+b}function eb(b,a){if(a){var c=0;this.nextUid=function(){return++c}}s(b,this.put,this)}function mf(b){return(b=b.toString().replace(Pc,"").match(Qc))?"function("+(b[1]||"").replace(/[\s\r\n]+/,
" ")+")":"fn"}function ab(b,a){function c(a){return function(b,c){if(J(b))s(b,lc(a));else return a(b,c)}}function d(a,b){Ma(a,"service");if(G(b)||E(b))b=q.instantiate(b);if(!b.$get)throw Ga("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=r.invoke(b,this);if(z(c))throw Ga("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;s(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=q.get(e[0]);f[e[1]].apply(f,
e[2])}}if(!m.get(a)){m.put(a,!0);try{x(a)?(c=cb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):G(a)?b.push(q.invoke(a)):E(a)?b.push(q.invoke(a)):tb(a,"module")}catch(e){throw E(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ga("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===l)throw Ga("cdep",a+" <- "+k.join(" <- "));return b[a]}try{return k.unshift(a),
b[a]=l,b[a]=c(a,e)}catch(f){throw b[a]===l&&delete b[a],f;}finally{k.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[],k=ab.$$annotate(b,a,g),l,q,p;q=0;for(l=k.length;q<l;q++){p=k[q];if("string"!==typeof p)throw Ga("itkn",p);h.push(f&&f.hasOwnProperty(p)?f[p]:d(p,g))}E(b)&&(b=b[l]);return b.apply(c,h)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((E(a)?a[a.length-1]:a).prototype||null);a=e(a,d,b,c);return J(a)||G(a)?a:d},get:d,annotate:ab.$$annotate,has:function(a){return p.hasOwnProperty(a+
"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var l={},k=[],m=new eb([],!0),p={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,da(b),!1)}),constant:c(function(a,b){Ma(a,"constant");p[a]=b;t[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=r.invoke(d,c);return r.invoke(b,null,{$delegate:a})}}}},q=p.$injector=h(p,function(a,b){aa.isString(b)&&k.push(b);
throw Ga("unpr",k.join(" <- "));}),t={},r=t.$injector=h(t,function(a,b){var c=q.get(a+"Provider",b);return r.invoke(c.$get,c,u,a)});s(g(b),function(a){r.invoke(a||B)});return r}function Be(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ta(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;G(c)?c=c():nc(c)?(c=c[0],c="fixed"!==
a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):V(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||jf(function(){d.$evalAsync(g)})});return g}]}function af(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:
function(b){return a(b,0,!1)}}]}function nf(b,a,c,d){function e(a){try{a.apply(null,Za.call(arguments,1))}finally{if(n--,0===n)for(;D.length;)try{D.pop()()}catch(b){c.error(b)}}}function f(a,b){(function ca(){s(H,function(a){a()});v=b(ca,a)})()}function g(){h();l()}function h(){A=b.history.state;A=z(A)?null:A;ea(A,O)&&(A=O);O=A}function l(){if(F!==m.url()||N!==A)F=m.url(),N=A,s(W,function(a){a(m.url(),A)})}function k(a){try{return decodeURIComponent(a)}catch(b){return a}}var m=this,p=a[0],q=b.location,
t=b.history,r=b.setTimeout,S=b.clearTimeout,K={};m.isMock=!1;var n=0,D=[];m.$$completeOutstandingRequest=e;m.$$incOutstandingRequestCount=function(){n++};m.notifyWhenNoOutstandingRequests=function(a){s(H,function(a){a()});0===n?a():D.push(a)};var H=[],v;m.addPollFn=function(a){z(v)&&f(100,r);H.push(a);return a};var A,N,F=q.href,ba=a.find("base"),I=null;h();N=A;m.url=function(a,c,e){z(e)&&(e=null);q!==b.location&&(q=b.location);t!==b.history&&(t=b.history);if(a){var f=N===e;if(F===a&&(!d.history||
f))return m;var g=F&&Ha(F)===Ha(a);F=a;N=e;!d.history||g&&f?(g||(I=a),c?q.replace(a):g?(c=q,e=a.indexOf("#"),a=-1===e?"":a.substr(e+1),c.hash=a):q.href=a):(t[c?"replaceState":"pushState"](e,"",a),h(),N=A);return m}return I||q.href.replace(/%27/g,"'")};m.state=function(){return A};var W=[],va=!1,O=null;m.onUrlChange=function(a){if(!va){if(d.history)C(b).on("popstate",g);C(b).on("hashchange",g);va=!0}W.push(a);return a};m.$$checkUrlChange=l;m.baseHref=function(){var a=ba.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,
""):""};var wa={},y="",ha=m.baseHref();m.cookies=function(a,b){var d,e,f,g;if(a)b===u?p.cookie=encodeURIComponent(a)+"=;path="+ha+";expires=Thu, 01 Jan 1970 00:00:00 GMT":x(b)&&(d=(p.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+ha).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(p.cookie!==y)for(y=p.cookie,d=y.split("; "),wa={},f=0;f<d.length;f++)e=d[f],g=e.indexOf("="),0<g&&(a=k(e.substring(0,g)),
wa[a]===u&&(wa[a]=k(e.substring(g+1))));return wa}};m.defer=function(a,b){var c;n++;c=r(function(){delete K[c];e(a)},b||0);K[c]=!0;return c};m.defer.cancel=function(a){return K[a]?(delete K[a],S(a),e(B),!0):!1}}function De(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new nf(b,d,a,c)}]}function Ee(){this.$get=function(){function b(b,d){function e(a){a!=p&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw M("$cacheFactory")("iid",
b);var g=0,h=w({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,m={},p=null,q=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!z(b))return a in l||g++,l[a]=b,g>k&&this.remove(q.key),b},get:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;b==p&&(p=b.p);b==q&&(q=b.n);f(b.n,b.p);delete m[a]}delete l[a];g--},removeAll:function(){l={};g=0;m={};p=q=null},destroy:function(){m=
h=l=null;delete a[b]},info:function(){return w({},h,{size:g})}}}var a={};b.info=function(){var b={};s(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Ve(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function xc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};s(a,function(a,e){var f=a.match(c);if(!f)throw ia("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d=
{},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Gd("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/;this.directive=function p(a,e){Ma(a,"directive");x(a)?(Sb(e,"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];s(d[a],function(d,g){try{var h=b.invoke(d);G(h)?h={compile:da(h)}:!h.compile&&h.link&&(h.compile=da(h.link));h.priority=h.priority||0;h.index=
g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";J(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(l){e(l)}});return f}])),d[a].push(e)):s(a,lc(p));return this};this.aHrefSanitizationWhitelist=function(b){return y(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var k=!0;this.debugInfoEnabled=
function(a){return y(a)?(k=a,this):k};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,r,S,K,n,D,H,v,A){function N(a,b){try{a.addClass(b)}catch(c){}}function F(a,b,c,d,e){a instanceof C||(a=C(a));s(a,function(b,c){b.nodeType==qb&&b.nodeValue.match(/\S+/)&&(a[c]=C(b).wrap("<span></span>").parent()[0])});var f=ba(a,b,a,c,d,e);F.$$addScopeClass(a);var g=null;return function(b,
c,d){Sb(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ta(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?C(Xb(g,C("<div>").append(a).html())):c?La.clone.call(a):a;if(h)for(var l in h)d.data("$"+l+"Controller",h[l].instance);F.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function ba(a,b,c,d,e,f){function g(a,c,d,e){var f,l,k,q,p,r,D;if(n)for(D=
Array(c.length),q=0;q<h.length;q+=3)f=h[q],D[f]=c[f];else D=c;q=0;for(p=h.length;q<p;)l=D[h[q++]],c=h[q++],f=h[q++],c?(c.scope?(k=a.$new(),F.$$addScopeInfo(C(l),k)):k=a,r=c.transcludeOnThisElement?I(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?I(a,b):null,c(f,k,l,d,r)):f&&f(a,l.childNodes,u,e)}for(var h=[],l,k,q,p,n,r=0;r<a.length;r++){l=new Yb;k=W(a[r],[],l,0===r?d:u,e);(f=k.length?y(k,a[r],l,b,c,null,[],[],f):null)&&f.scope&&F.$$addScopeClass(l.$$element);
l=f&&f.terminal||!(q=a[r].childNodes)||!q.length?null:ba(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||l)h.push(r,f,l),p=!0,n=n||f;f=null}return p?g:null}function I(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function W(a,b,c,d,g){var h=c.$attr,l;switch(a.nodeType){case na:ha(b,ya(ta(a)),"E",d,g);for(var k,q,p,n=a.attributes,r=0,D=n&&n.length;r<
D;r++){var S=!1,t=!1;k=n[r];l=k.name;q=T(k.value);k=ya(l);if(p=Pa.test(k))l=l.replace(Sc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});var A=k.replace(/(Start|End)$/,"");fb(A)&&k===A+"Start"&&(S=l,t=l.substr(0,l.length-5)+"end",l=l.substr(0,l.length-6));k=ya(l.toLowerCase());h[k]=l;if(p||!c.hasOwnProperty(k))c[k]=q,Mc(a,k)&&(c[k]=!0);Aa(a,b,q,k,p);ha(b,k,"A",d,g,S,t)}a=a.className;J(a)&&(a=a.animVal);if(x(a)&&""!==a)for(;l=f.exec(a);)k=ya(l[2]),ha(b,k,"C",d,g)&&(c[k]=T(l[3])),
a=a.substr(l.index+l[0].length);break;case qb:P(b,a.nodeValue);break;case 8:try{if(l=e.exec(a.nodeValue))k=ya(l[1]),ha(b,k,"M",d,g)&&(c[k]=T(l[2]))}catch(v){}}b.sort(ca);return b}function va(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ia("uterdir",b,c);a.nodeType==na&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return C(d)}function O(a,b,c){return function(d,e,f,g,h){e=va(e[0],b,c);return a(d,e,f,g,h)}}function y(a,
d,e,f,g,l,k,p,n){function r(a,b,c,d){if(a){c&&(a=O(a,c,d));a.require=L.require;a.directiveName=ca;if(I===L||L.$$isolateScope)a=Y(a,{isolateScope:!0});k.push(a)}if(b){c&&(b=O(b,c,d));b.require=L.require;b.directiveName=ca;if(I===L||L.$$isolateScope)b=Y(b,{isolateScope:!0});p.push(b)}}function D(a,b,c,d){var e,f="data",g=!1,l=c,k;if(x(b)){k=b.match(h);b=b.substring(k[0].length);k[3]&&(k[1]?k[3]=null:k[1]=k[3]);"^"===k[1]?f="inheritedData":"^^"===k[1]&&(f="inheritedData",l=c.parent());"?"===k[2]&&(g=
!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||l[f]("$"+b+"Controller");if(!e&&!g)throw ia("ctreq",b,a);return e||null}E(b)&&(e=[],s(b,function(b){e.push(D(a,b,c,d))}));return e}function A(a,c,f,g,h){function l(a,b,c){var d;Va(a)||(c=b,b=a,a=u);B&&(d=N);c||(c=B?W.parent():W);return h(a,b,d,c,va)}var n,r,t,v,N,gb,W,O;d===f?(O=e,W=e.$$element):(W=C(f),O=new Yb(W,e));I&&(v=c.$new(!0));h&&(gb=l,gb.$$boundTransclude=h);H&&(ba={},N={},s(H,function(a){var b={$scope:a===I||a.$$isolateScope?v:c,$element:W,
$attrs:O,$transclude:gb};t=a.controller;"@"==t&&(t=O[a.name]);b=K(t,b,!0,a.controllerAs);N[a.name]=b;B||W.data("$"+a.name+"Controller",b.instance);ba[a.name]=b}));if(I){F.$$addScopeInfo(W,v,!0,!(ja&&(ja===I||ja===I.$$originalDirective)));F.$$addScopeClass(W,!0);g=ba&&ba[I.name];var xa=v;g&&g.identifier&&!0===I.bindToController&&(xa=g.instance);s(v.$$isolateBindings=I.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,l,k;switch(a.mode){case "@":O.$observe(e,function(a){xa[d]=a});O.$$observers[e].$$scope=
c;O[e]&&(xa[d]=b(O[e])(c));break;case "=":if(f&&!O[e])break;h=S(O[e]);k=h.literal?ea:function(a,b){return a===b||a!==a&&b!==b};l=h.assign||function(){g=xa[d]=h(c);throw ia("nonassign",O[e],I.name);};g=xa[d]=h(c);f=function(a){k(a,xa[d])||(k(a,g)?l(c,a=xa[d]):xa[d]=a);return g=a};f.$stateful=!0;f=a.collection?c.$watchCollection(O[e],f):c.$watch(S(O[e],f),null,h.literal);v.$on("$destroy",f);break;case "&":h=S(O[e]),xa[d]=function(a){return h(c,a)}}})}ba&&(s(ba,function(a){a()}),ba=null);g=0;for(n=k.length;g<
n;g++)r=k[g],Z(r,r.isolateScope?v:c,W,O,r.require&&D(r.directiveName,r.require,W,N),gb);var va=c;I&&(I.template||null===I.templateUrl)&&(va=v);a&&a(va,f.childNodes,u,h);for(g=p.length-1;0<=g;g--)r=p[g],Z(r,r.isolateScope?v:c,W,O,r.require&&D(r.directiveName,r.require,W,N),gb)}n=n||{};for(var v=-Number.MAX_VALUE,N,H=n.controllerDirectives,ba,I=n.newIsolateScopeDirective,ja=n.templateDirective,wa=n.nonTlbTranscludeDirective,ha=!1,fb=!1,B=n.hasElementTranscludeDirective,w=e.$$element=C(d),L,ca,U,R=f,
P,Q=0,Aa=a.length;Q<Aa;Q++){L=a[Q];var Pa=L.$$start,$=L.$$end;Pa&&(w=va(d,Pa,$));U=u;if(v>L.priority)break;if(U=L.scope)L.templateUrl||(J(U)?(Oa("new/isolated scope",I||N,L,w),I=L):Oa("new/isolated scope",I,L,w)),N=N||L;ca=L.name;!L.templateUrl&&L.controller&&(U=L.controller,H=H||{},Oa("'"+ca+"' controller",H[ca],L,w),H[ca]=L);if(U=L.transclude)ha=!0,L.$$tlb||(Oa("transclusion",wa,L,w),wa=L),"element"==U?(B=!0,v=L.priority,U=w,w=e.$$element=C(X.createComment(" "+ca+": "+e[ca]+" ")),d=w[0],V(g,Za.call(U,
0),d),R=F(U,f,v,l&&l.name,{nonTlbTranscludeDirective:wa})):(U=C(Vb(d)).contents(),w.empty(),R=F(U,f));if(L.template)if(fb=!0,Oa("template",ja,L,w),ja=L,U=G(L.template)?L.template(w,e):L.template,U=Tc(U),L.replace){l=L;U=Tb.test(U)?Uc(Xb(L.templateNamespace,T(U))):[];d=U[0];if(1!=U.length||d.nodeType!==na)throw ia("tplrt",ca,"");V(g,w,d);Aa={$attr:{}};U=W(d,[],Aa);var of=a.splice(Q+1,a.length-(Q+1));I&&z(U);a=a.concat(U).concat(of);Rc(e,Aa);Aa=a.length}else w.html(U);if(L.templateUrl)fb=!0,Oa("template",
ja,L,w),ja=L,L.replace&&(l=L),A=M(a.splice(Q,a.length-Q),w,e,g,ha&&R,k,p,{controllerDirectives:H,newIsolateScopeDirective:I,templateDirective:ja,nonTlbTranscludeDirective:wa}),Aa=a.length;else if(L.compile)try{P=L.compile(w,e,R),G(P)?r(null,P,Pa,$):P&&r(P.pre,P.post,Pa,$)}catch(aa){c(aa,ua(w))}L.terminal&&(A.terminal=!0,v=Math.max(v,L.priority))}A.scope=N&&!0===N.scope;A.transcludeOnThisElement=ha;A.elementTranscludeOnThisElement=B;A.templateOnThisElement=fb;A.transclude=R;n.hasElementTranscludeDirective=
B;return A}function z(a){for(var b=0,c=a.length;b<c;b++)a[b]=Pb(a[b],{$$isolateScope:!0})}function ha(b,e,f,g,h,l,k){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var q;e=a.get(e+"Directive");for(var n=0,r=e.length;n<r;n++)try{q=e[n],(g===u||g>q.priority)&&-1!=q.restrict.indexOf(f)&&(l&&(q=Pb(q,{$$start:l,$$end:k})),b.push(q),h=q)}catch(D){c(D)}}return h}function fb(b){if(d.hasOwnProperty(b))for(var c=a.get(b+"Directive"),e=0,f=c.length;e<f;e++)if(b=c[e],b.multiElement)return!0;return!1}function Rc(a,
b){var c=b.$attr,d=a.$attr,e=a.$$element;s(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});s(b,function(b,f){"class"==f?(N(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function M(a,b,c,d,e,f,g,h){var l=[],k,q,p=b[0],n=a.shift(),D=Pb(n,{templateUrl:null,transclude:null,replace:null,$$originalDirective:n}),
S=G(n.templateUrl)?n.templateUrl(b,c):n.templateUrl,t=n.templateNamespace;b.empty();r(H.getTrustedResourceUrl(S)).then(function(r){var A,v;r=Tc(r);if(n.replace){r=Tb.test(r)?Uc(Xb(t,T(r))):[];A=r[0];if(1!=r.length||A.nodeType!==na)throw ia("tplrt",n.name,S);r={$attr:{}};V(d,b,A);var H=W(A,[],r);J(n.scope)&&z(H);a=H.concat(a);Rc(c,r)}else A=p,b.html(r);a.unshift(D);k=y(a,A,c,e,b,n,f,g,h);s(d,function(a,c){a==A&&(d[c]=b[0])});for(q=ba(b[0].childNodes,e);l.length;){r=l.shift();v=l.shift();var F=l.shift(),
K=l.shift(),H=b[0];if(!r.$$destroyed){if(v!==p){var O=v.className;h.hasElementTranscludeDirective&&n.replace||(H=Vb(A));V(F,C(v),H);N(C(H),O)}v=k.transcludeOnThisElement?I(r,k.transclude,K):K;k(q,r,H,d,v)}}l=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(k.transcludeOnThisElement&&(a=I(b,k.transclude,e)),k(q,b,c,d,a)))}}function ca(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Oa(a,b,c,d){if(b)throw ia("multidir",
b.name,c.name,a,ua(d));}function P(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&F.$$addBindingClass(a);return function(a,c){var e=c.parent();b||F.$$addBindingClass(e);F.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Xb(a,b){a=R(a||"html");switch(a){case "svg":case "math":var c=X.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function Q(a,b){if("srcdoc"==
b)return H.HTML;var c=ta(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return H.RESOURCE_URL}function Aa(a,c,d,e,f){var h=Q(a,e);f=g[e]||f;var k=b(d,!0,h,f);if(k){if("multiple"===e&&"select"===ta(a))throw ia("selmulti",ua(a));c.push({priority:100,compile:function(){return{pre:function(a,c,g){c=g.$$observers||(g.$$observers={});if(l.test(e))throw ia("nodomevents");var n=g[e];n!==d&&(k=n&&b(n,!0,h,f),d=n);k&&(g[e]=k(a),(c[e]||(c[e]=[])).$$inter=!0,(g.$$observers&&g.$$observers[e].$$scope||
a).$watch(k,function(a,b){"class"===e&&a!=b?g.$updateClass(a,b):g.$set(e,a)}))}}}})}}function V(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var l=a.length;g<l;g++,h++)h<l?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=X.createDocumentFragment();a.appendChild(d);C(c).data(C(d).data());ra?(Rb=!0,ra.cleanData([d])):delete C.cache[d[C.expando]];d=1;for(e=b.length;d<e;d++)f=b[d],C(f).remove(),
a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Y(a,b){return w(function(){return a.apply(null,arguments)},a,b)}function Z(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ua(d))}}var Yb=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};Yb.prototype={$normalize:ya,$addClass:function(a){a&&0<a.length&&v.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&v.removeClass(this.$$element,a)},$updateClass:function(a,
b){var c=Vc(a,b);c&&c.length&&v.addClass(this.$$element,c);(c=Vc(b,a))&&c.length&&v.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Mc(f,a),h=kf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=uc(a,"-"));g=ta(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=A(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=T(b),l=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,l=/\s/.test(h)?
l:/(,)/,h=h.split(l),l=Math.floor(h.length/2),k=0;k<l;k++)var q=2*k,g=g+A(T(h[q]),!0),g=g+(" "+T(h[q+1]));h=T(h[2*k]).split(/\s/);g+=A(T(h[0]),!0);2===h.length&&(g+=" "+T(h[1]));this[a]=b=g}!1!==d&&(null===b||b===u?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&s(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=fa()),e=d[a]||(d[a]=[]);e.push(b);n.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});
return function(){Xa(e,b)}}};var U=b.startSymbol(),ja=b.endSymbol(),Tc="{{"==U||"}}"==ja?oa:function(a){return a.replace(/\{\{/g,U).replace(/}}/g,ja)},Pa=/^ngAttr[A-Z]/;F.$$addBindingInfo=k?function(a,b){var c=a.data("$binding")||[];E(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:B;F.$$addBindingClass=k?function(a){N(a,"ng-binding")}:B;F.$$addScopeInfo=k?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:B;F.$$addScopeClass=k?function(a,b){N(a,b?"ng-isolate-scope":
"ng-scope")}:B;return F}]}function ya(b){return db(b.replace(Sc,""))}function Vc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Uc(b){b=C(b);var a=b.length;if(1>=a)return b;for(;a--;)8===b[a].nodeType&&pf.call(b,a,1);return b}function Fe(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){Ma(a,"controller");J(a)?w(b,a):b[a]=c};this.allowGlobals=function(){a=
!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!J(a.$scope))throw M("$controller")("noscp",d,b);a.$scope[b]=c}return function(g,h,l,k){var m,p,q;l=!0===l;k&&x(k)&&(q=k);if(x(g)){k=g.match(c);if(!k)throw qf("ctrlfmt",g);p=k[1];q=q||k[3];g=b.hasOwnProperty(p)?b[p]:wc(h.$scope,p,!0)||(a?wc(e,p,!0):u);tb(g,p,!0)}if(l)return l=(E(g)?g[g.length-1]:g).prototype,m=Object.create(l||null),q&&f(h,q,m,p||g.name),w(function(){d.invoke(g,m,h,p);return m},{instance:m,identifier:q});
m=d.instantiate(g,h,p);q&&f(h,q,m,p||g.name);return m}}]}function Ge(){this.$get=["$window",function(b){return C(b.document)}]}function He(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Zb(b,a){if(x(b)){var c=b.replace(rf,"").trim();if(c){var d=a("Content-Type");(d=d&&0===d.indexOf(Wc))||(d=(d=c.match(sf))&&tf[d[0]].test(c));d&&(b=pc(c))}}return b}function Xc(b){var a=fa(),c,d,e;if(!b)return a;s(b.split("\n"),function(b){e=b.indexOf(":");c=R(T(b.substr(0,
e)));d=T(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Yc(b){var a=J(b)?b:u;return function(c){a||(a=Xc(b));return c?(c=a[R(c)],void 0===c&&(c=null),c):a}}function Zc(b,a,c,d){if(G(d))return d(b,a,c);s(d,function(d){b=d(b,a,c)});return b}function Ke(){var b=this.defaults={transformResponse:[Zb],transformRequest:[function(a){return J(a)&&"[object File]"!==Da.call(a)&&"[object Blob]"!==Da.call(a)&&"[object FormData]"!==Da.call(a)?$a(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},
post:qa($b),put:qa($b),patch:qa($b)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return y(b)?(a=!!b,this):a};var c=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(d,e,f,g,h,l){function k(a){function c(a){var b=w({},a);b.data=a.data?Zc(a.data,a.headers,a.status,e.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:h.reject(b)}function d(a){var b,c={};s(a,function(a,d){G(a)?(b=
a(),null!=b&&(c[d]=b)):c[d]=a});return c}if(!aa.isObject(a))throw M("$http")("badreq",a);var e=w({method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},a);e.headers=function(a){var c=b.headers,e=w({},a.headers),f,g,c=w({},c.common,c[R(a.method)]);a:for(f in c){a=R(f);for(g in e)if(R(g)===a)continue a;e[f]=c[f]}return d(e)}(a);e.method=vb(e.method);var f=[function(a){var d=a.headers,e=Zc(a.data,Yc(d),u,a.transformRequest);z(e)&&s(d,function(a,b){"content-type"===R(b)&&
delete d[b]});z(a.withCredentials)&&!z(b.withCredentials)&&(a.withCredentials=b.withCredentials);return m(a,e).then(c,c)},u],g=h.when(e);for(s(t,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var l=f.shift(),g=g.then(a,l)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,e)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,e)});
return g};return g}function m(c,f){function l(b,c,d,e){function f(){n(c,b,d,e)}N&&(200<=b&&300>b?N.put(I,[b,c,Xc(d),e]):N.remove(I));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function n(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?v.resolve:v.reject)({data:a,status:b,headers:Yc(d),config:c,statusText:e})}function m(a){n(a.data,a.status,qa(a.headers()),a.statusText)}function t(){var a=k.pendingRequests.indexOf(c);-1!==a&&k.pendingRequests.splice(a,1)}var v=h.defer(),A=v.promise,N,F,s=c.headers,I=p(c.url,
c.params);k.pendingRequests.push(c);A.then(t,t);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(N=J(c.cache)?c.cache:J(b.cache)?b.cache:q);N&&(F=N.get(I),y(F)?F&&G(F.then)?F.then(m,m):E(F)?n(F[1],F[0],qa(F[2]),F[3]):n(F,200,{},"OK"):N.put(I,A));z(F)&&((F=$c(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:u)&&(s[c.xsrfHeaderName||b.xsrfHeaderName]=F),d(c.method,I,f,l,s,c.timeout,c.withCredentials,c.responseType));return A}function p(a,b){if(!b)return a;var c=[];Ed(b,
function(a,b){null===a||z(a)||(E(a)||(a=[a]),s(a,function(a){J(a)&&(a=pa(a)?a.toISOString():$a(a));c.push(Fa(b)+"="+Fa(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var q=f("$http"),t=[];s(c,function(a){t.unshift(x(a)?l.get(a):l.invoke(a))});k.pendingRequests=[];(function(a){s(arguments,function(a){k[a]=function(b,c){return k(w(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){s(arguments,function(a){k[a]=function(b,c,d){return k(w(d||{},{method:a,
url:b,data:c}))}})})("post","put","patch");k.defaults=b;return k}]}function uf(){return new P.XMLHttpRequest}function Le(){this.$get=["$browser","$window","$document",function(b,a,c){return vf(b,uf,b.defer,a.angular.callbacks,c[0])}]}function vf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,t="unknown";a&&("load"!==
a.type||d[b].called||(a={type:"error"}),t=a.type,g="error"===a.type?404:200);c&&c(g,t)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,l,k,m,p,q,t){function r(){n&&n();D&&D.abort()}function S(a,d,e,f,g){v!==u&&c.cancel(v);n=D=null;a(d,e,f,g);b.$$completeOutstandingRequest(B)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==R(e)){var K="_"+(d.counter++).toString(36);d[K]=function(a){d[K].data=a;d[K].called=!0};var n=f(h.replace("JSON_CALLBACK",
"angular.callbacks."+K),K,function(a,b){S(k,a,d[K].data,"",b);d[K]=B})}else{var D=a();D.open(e,h,!0);s(m,function(a,b){y(a)&&D.setRequestHeader(b,a)});D.onload=function(){var a=D.statusText||"",b="response"in D?D.response:D.responseText,c=1223===D.status?204:D.status;0===c&&(c=b?200:"file"==Ba(h).protocol?404:0);S(k,c,b,D.getAllResponseHeaders(),a)};e=function(){S(k,-1,null,null,"")};D.onerror=e;D.onabort=e;q&&(D.withCredentials=!0);if(t)try{D.responseType=t}catch(H){if("json"!==t)throw H;}D.send(l||
null)}if(0<p)var v=c(r,p);else p&&G(p.then)&&p.then(r)}}function Ie(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,t,r){function S(c){return c.replace(k,b).replace(m,a)}function K(a){try{var b=a;a=t?e.getTrusted(t,b):e.valueOf(b);var c;if(r&&!y(a))c=a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=
""+a;break;default:a=$a(a)}c=a}return c}catch(g){c=ac("interr",f,g.toString()),d(c)}}r=!!r;for(var n,D,H=0,v=[],A=[],N=f.length,F=[],s=[];H<N;)if(-1!=(n=f.indexOf(b,H))&&-1!=(D=f.indexOf(a,n+h)))H!==n&&F.push(S(f.substring(H,n))),H=f.substring(n+h,D),v.push(H),A.push(c(H,K)),H=D+l,s.push(F.length),F.push("");else{H!==N&&F.push(S(f.substring(H)));break}if(t&&1<F.length)throw ac("noconcat",f);if(!g||v.length){var I=function(a){for(var b=0,c=v.length;b<c;b++){if(r&&z(a[b]))return;F[s[b]]=a[b]}return F.join("")};
return w(function(a){var b=0,c=v.length,e=Array(c);try{for(;b<c;b++)e[b]=A[b](a);return I(e)}catch(g){a=ac("interr",f,g.toString()),d(a)}},{exp:f,expressions:v,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(A,function(c,e){var f=I(c);G(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,l=a.length,k=new RegExp(b.replace(/./g,f),"g"),m=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function Je(){this.$get=["$rootScope",
"$window","$q","$$q",function(b,a,c,d){function e(e,h,l,k){var m=a.setInterval,p=a.clearInterval,q=0,t=y(k)&&!k,r=(t?d:c).defer(),S=r.promise;l=y(l)?l:0;S.then(null,null,e);S.$$intervalId=m(function(){r.notify(q++);0<l&&q>=l&&(r.resolve(q),p(S.$$intervalId),delete f[S.$$intervalId]);t||b.$apply()},h);f[S.$$intervalId]=r;return S}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}
function Rd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function bc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=rb(b[a]);return b.join("/")}function ad(b,a){var c=Ba(b);a.$$protocol=
c.protocol;a.$$host=c.hostname;a.$$port=$(c.port)||wf[c.protocol]||null}function bd(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Ba(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=rc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function za(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ha(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Gb(b){return b.replace(/(#.+)|#$/,
"$1")}function cc(b){return b.substr(0,Ha(b).lastIndexOf("/")+1)}function dc(b,a){this.$$html5=!0;a=a||"";var c=cc(b);ad(b,this);this.$$parse=function(a){var b=za(c,a);if(!x(b))throw Hb("ipthprfx",a,c);bd(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Qb(this.$$search),b=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=bc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),
!0;var f,g;(f=za(b,d))!==u?(g=f,g=(f=za(a,f))!==u?c+(za("/",f)||f):b+g):(f=za(c,d))!==u?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function ec(b,a){var c=cc(b);ad(b,this);this.$$parse=function(d){d=za(b,d)||za(c,d);var e;"#"===d.charAt(0)?(e=za(a,d),z(e)&&(e=d)):e=this.$$html5?d:"";bd(e,this);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Qb(this.$$search),e=this.$$hash?
"#"+rb(this.$$hash):"";this.$$url=bc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ha(b)==Ha(a)?(this.$$parse(a),!0):!1}}function cd(b,a){this.$$html5=!0;ec.apply(this,arguments);var c=cc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ha(d)?f=d:(g=za(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=function(){var c=Qb(this.$$search),e=this.$$hash?"#"+rb(this.$$hash):
"";this.$$url=bc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Ib(b){return function(){return this[b]}}function dd(b,a){return function(c){if(z(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Me(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return y(a)?(b=a,this):b};this.html5Mode=function(b){return Wa(b)?(a.enabled=b,this):J(b)?(Wa(b.enabled)&&(a.enabled=b.enabled),Wa(b.requireBase)&&(a.requireBase=b.requireBase),Wa(b.rewriteLinks)&&
(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function l(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,m;m=d.baseHref();var p=d.url(),q;if(a.enabled){if(!m&&a.requireBase)throw Hb("nobase");q=p.substring(0,p.indexOf("/",p.indexOf("//")+2))+(m||"/");m=e.history?dc:cd}else q=
Ha(p),m=ec;k=new m(q,"#"+b);k.$$parseLinkUrl(p,p);k.$$state=d.state();var t=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&!b.shiftKey&&2!=b.which&&2!=b.button){for(var e=C(b.target);"a"!==ta(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),l=e.attr("href")||e.attr("xlink:href");J(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=Ba(h.animVal).href);t.test(h)||!h||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(h,
l)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});Gb(k.absUrl())!=Gb(p)&&d.url(k.absUrl(),!0);var r=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,h(d,!1,e)):(r=!1,l(d,e)))});c.$$phase||c.$digest()});c.$watch(function(){var a=Gb(d.url()),b=Gb(k.absUrl()),f=d.state(),g=k.$$replace,
q=a!==b||k.$$html5&&e.history&&f!==k.$$state;if(r||q)r=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===b&&(d?(k.$$parse(a),k.$$state=f):(q&&h(b,g,f===k.$$state?null:k.$$state),l(a,f)))});k.$$replace=!1});return k}]}function Ne(){var b=!0,a=this;this.debugEnabled=function(a){return y(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?
"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||B;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=[];s(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function sa(b,a){if("__defineGetter__"===
b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw ka("isecfld",a);return b}function la(b,a){if(b){if(b.constructor===b)throw ka("isecfn",a);if(b.window===b)throw ka("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw ka("isecdom",a);if(b===Object)throw ka("isecobj",a);}return b}function fc(b){return b.constant}function hb(b,a,c,d,e){la(b,e);la(a,e);c=c.split(".");for(var f,g=0;1<c.length;g++){f=sa(c.shift(),e);var h=0===g&&a&&a[f]||
b[f];h||(h={},b[f]=h);b=la(h,e)}f=sa(c.shift(),e);la(b[f],e);return b[f]=d}function Qa(b){return"constructor"==b}function ed(b,a,c,d,e,f,g){sa(b,f);sa(a,f);sa(c,f);sa(d,f);sa(e,f);var h=function(a){return la(a,f)},l=g||Qa(b)?h:oa,k=g||Qa(a)?h:oa,m=g||Qa(c)?h:oa,p=g||Qa(d)?h:oa,q=g||Qa(e)?h:oa;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=l(h[b]);if(!a)return h;if(null==h)return u;h=k(h[a]);if(!c)return h;if(null==h)return u;h=m(h[c]);if(!d)return h;if(null==h)return u;
h=p(h[d]);return e?null==h?u:h=q(h[e]):h}}function xf(b,a){return function(c,d){return b(c,d,la,a)}}function yf(b,a,c){var d=a.expensiveChecks,e=d?zf:Af,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=6>h?ed(g[0],g[1],g[2],g[3],g[4],c,d):function(a,b){var e=0,f;do f=ed(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=u,a=f;while(e<h);return f};else{var l="";d&&(l+="s = eso(s, fe);\nl = eso(l, fe);\n");var k=d;s(g,function(a,b){sa(a,c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+
"."+a;if(d||Qa(a))e="eso("+e+", fe)",k=!0;l+="if(s == null) return undefined;\ns="+e+";\n"});l+="return s;";a=new Function("s","l","eso","fe",l);a.toString=da(l);k&&(a=xf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,c,d){return hb(a,d,b,c,b)};return e[b]=f}function gc(b){return G(b.valueOf)?b.valueOf():Bf.call(b)}function Oe(){var b=fa(),a=fa();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,
b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=gc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===e.length){var l=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,l)||(h=d(a),l=b&&gc(b));return h},b,c)}for(var k=[],q=0,p=e.length;q<p;q++)k[q]=
g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var l=e[c](a);if(b||(b=!g(l,k[c])))k[c]=l&&gc(l)}b&&(h=d(a));return h},b,c)}function l(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;G(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function k(a,b,c,d){function e(a){var b=!0;s(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;G(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&
f()})},c)}function m(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){G(b)&&b.apply(this,arguments);e()},c)}function p(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==k&&c!==l?function(c,d){var e=a(c,d);return b(e,c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);return y(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=[a]);return c}var q={csp:d.csp,expensiveChecks:!1},t={csp:d.csp,expensiveChecks:!0};
return function(d,f,g){var n,D,H;switch(typeof d){case "string":H=d=d.trim();var v=g?a:b;n=v[H];n||(":"===d.charAt(0)&&":"===d.charAt(1)&&(D=!0,d=d.substring(2)),g=g?t:q,n=new hc(g),n=(new ib(n,c,g)).parse(d),n.constant?n.$$watchDelegate=m:D?(n=e(n),n.$$watchDelegate=n.literal?k:l):n.inputs&&(n.$$watchDelegate=h),v[H]=n);return p(n,f);case "function":return p(d,f);default:return p(B,f)}}}]}function Qe(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return fd(function(a){b.$evalAsync(a)},
a)}]}function Re(){this.$get=["$browser","$exceptionHandler",function(b,a){return fd(function(a){b.defer(a)},a)}]}function fd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=u;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];
try{G(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=M("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,
b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(J(b)||G(b))d=b&&b.then;G(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||
this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(G(b)?b(c):c)}catch(h){a(h)}}})}};var l=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{G(c)&&(d=c())}catch(e){return l(e,!1)}return d&&G(d.then)?
d.then(function(){return l(a,b)},function(a){return l(a,!1)}):l(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},p=function t(a){if(!G(a))throw h("norslvr",a);if(!(this instanceof t))return new t(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};p.defer=function(){return new g};p.reject=function(a){var b=new g;b.reject(a);return b.promise};p.when=m;p.all=function(a){var b=new g,c=0,d=E(a)?[]:{};s(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||
(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return p}function $e(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Pe(){var b=
10,a=M("$rootScope"),c=null,d=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(e,f,g,h){function l(){this.$id=++ob;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function k(b){if(r.$$phase)throw a("inprog",r.$$phase);r.$$phase=b}function m(a,
b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function p(){}function q(){for(;n.length;)try{n.shift()()}catch(a){f(a)}d=null}function t(){null===d&&(d=h.defer(function(){r.$apply(q)}))}l.prototype={constructor:l,$new:function(a,b){function c(){d.$$destroyed=!0}var d;b=b||this;a?(d=new l,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners=
{};this.$$listenerCount={};this.$id=++ob;this.$$ChildScope=null},this.$$ChildScope.prototype=this),d=new this.$$ChildScope);d.$parent=b;d.$$prevSibling=b.$$childTail;b.$$childHead?(b.$$childTail.$$nextSibling=d,b.$$childTail=d):b.$$childHead=b.$$childTail=d;(a||b!=this)&&d.$on("$destroy",c);return d},$watch:function(a,b,d){var e=g(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,d,e);var f=this.$$watchers,h={fn:b,last:p,get:e,exp:a,eq:!!d};c=null;G(b)||(h.fn=B);f||(f=this.$$watchers=[]);f.unshift(h);
return function(){Xa(f,h);c=null}},$watchGroup:function(a,b){function c(){h=!1;l?(l=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,l=!0;if(!a.length){var k=!0;g.$evalAsync(function(){k&&b(e,e,g)});return function(){k=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});s(a,function(a,b){var l=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(l)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,
b){function c(a){e=a;var b,d,g,h;if(!z(e)){if(J(e))if(Ta(e))for(f!==q&&(f=q,t=f.length=0,k++),a=e.length,t!==a&&(k++,f.length=t=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(k++,f[b]=g);else{f!==m&&(f=m={},t=0,k++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(k++,f[b]=g)):(t++,f[b]=g,k++));if(t>a)for(b in k++,f)e.hasOwnProperty(b)||(t--,delete f[b])}else f!==e&&(f=e,k++);return k}}c.$stateful=!0;var d=this,e,f,h,l=1<b.length,k=0,p=g(a,c),q=[],m=
{},n=!0,t=0;return this.$watch(p,function(){n?(n=!1,b(e,e,d)):b(e,h,d);if(l)if(J(e))if(Ta(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)sc.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var e,g,l,m,n,t,s=b,I,W=[],y,O;k("$digest");h.$$checkUrlChange();this===r&&null!==d&&(h.defer.cancel(d),q());c=null;do{t=!1;for(I=this;S.length;){try{O=S.shift(),O.scope.$eval(O.expression,O.locals)}catch(w){f(w)}c=null}a:do{if(m=I.$$watchers)for(n=m.length;n--;)try{if(e=m[n])if((g=
e.get(I))!==(l=e.last)&&!(e.eq?ea(g,l):"number"===typeof g&&"number"===typeof l&&isNaN(g)&&isNaN(l)))t=!0,c=e,e.last=e.eq?Ea(g,null):g,e.fn(g,l===p?g:l,I),5>s&&(y=4-s,W[y]||(W[y]=[]),W[y].push({msg:G(e.exp)?"fn: "+(e.exp.name||e.exp.toString()):e.exp,newVal:g,oldVal:l}));else if(e===c){t=!1;break a}}catch(C){f(C)}if(!(m=I.$$childHead||I!==this&&I.$$nextSibling))for(;I!==this&&!(m=I.$$nextSibling);)I=I.$parent}while(I=m);if((t||S.length)&&!s--)throw r.$$phase=null,a("infdig",b,W);}while(t||S.length);
for(r.$$phase=null;u.length;)try{u.shift()()}catch(B){f(B)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==r){for(var b in this.$$listenerCount)m(this,this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);
this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=B;this.$on=this.$watch=this.$watchGroup=function(){return B};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){r.$$phase||S.length||h.defer(function(){S.length&&r.$digest()});S.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){u.push(a)},$apply:function(a){try{return k("$apply"),
this.$eval(a)}catch(b){f(b)}finally{r.$$phase=null;try{r.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&n.push(b);t()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,m(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,
stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},l=Ya([h],arguments,1),k,m;do{d=e.$$listeners[a]||c;h.currentScope=e;k=0;for(m=d.length;k<m;k++)if(d[k])try{d[k].apply(null,l)}catch(p){f(p)}else d.splice(k,1),k--,m--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;
for(var g=Ya([e],arguments,1),h,l;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(l=d.length;h<l;h++)if(d[h])try{d[h].apply(null,g)}catch(k){f(k)}else d.splice(h,1),h--,l--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var r=new l,S=r.$$asyncQueue=[],u=r.$$postDigestQueue=[],n=r.$$applyAsyncQueue=[];return r}]}function Sd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;
this.aHrefSanitizationWhitelist=function(a){return y(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Ba(c).href;return""===f||f.match(e)?c:"unsafe:"+f}}}function Cf(b){if("self"===b)return b;if(x(b)){if(-1<b.indexOf("***"))throw Ca("iwcard",b);b=gd(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(pb(b))return new RegExp("^"+b.source+"$");throw Ca("imatcher");}function hd(b){var a=
[];y(b)&&s(b,function(b){a.push(Cf(b))});return a}function Te(){this.SCE_CONTEXTS=ma;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=hd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=hd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?$c(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};
b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ca("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[ma.HTML]=e(g);h[ma.CSS]=e(g);h[ma.URL]=e(g);h[ma.JS]=e(g);h[ma.RESOURCE_URL]=e(h[ma.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ca("icontext",a,b);if(null===b||b===u||""===b)return b;if("string"!==typeof b)throw Ca("itype",a);return new c(b)},getTrusted:function(c,e){if(null===
e||e===u||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===ma.RESOURCE_URL){var g=Ba(e.toString()),p,q,t=!1;p=0;for(q=b.length;p<q;p++)if(d(b[p],g)){t=!0;break}if(t)for(p=0,q=a.length;p<q;p++)if(d(a[p],g)){t=!1;break}if(t)return e;throw Ca("insecurl",e.toString());}if(c===ma.HTML)return f(e);throw Ca("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Se(){var b=!0;this.enabled=function(a){arguments.length&&
(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Ra)throw Ca("iequirks");var d=qa(ma);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=oa);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;s(ma,function(a,b){var c=R(b);d[db("parse_as_"+c)]=function(b){return e(a,
b)};d[db("get_trusted_"+c)]=function(b){return f(a,b)};d[db("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function Ue(){this.$get=["$window","$document",function(b,a){var c={},d=$((/android (\d+)/.exec(R((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,l=f.body&&f.body.style,k=!1,m=!1;if(l){for(var p in l)if(k=h.exec(p)){g=k[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in l&&"webkit");
k=!!("transition"in l||g+"Transition"in l);m=!!("animation"in l||g+"Animation"in l);!d||k&&m||(k=x(f.body.style.webkitTransition),m=x(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===a&&11>=Ra)return!1;if(z(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:bb(),vendorPrefix:g,transitions:k,animations:m,android:d}}]}function We(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;
var g=a.defaults&&a.defaults.transformResponse;E(g)?g=g.filter(function(a){return a!==Zb}):g===Zb&&(g=null);return a.get(e,{cache:b,transformResponse:g}).finally(function(){d.totalPendingRequests--}).then(function(a){return a.data},function(a){if(!f)throw ia("tpload",e);return c.reject(a)})}d.totalPendingRequests=0;return d}]}function Xe(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];s(a,function(a){var d=
aa.element(a).data("$binding");d&&s(d,function(d){c?(new RegExp("(^|\\s)"+gd(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var l=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(l.length)return l}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function Ye(){this.$get=
["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,l,k){var m=y(k)&&!k,p=(m?d:c).defer(),q=p.promise;l=a.defer(function(){try{p.resolve(f())}catch(a){p.reject(a),e(a)}finally{delete g[q.$$timeoutId]}m||b.$apply()},l);q.$$timeoutId=l;g[l]=p;return q}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Ba(b){Ra&&(Y.setAttribute("href",b),b=Y.href);
Y.setAttribute("href",b);return{href:Y.href,protocol:Y.protocol?Y.protocol.replace(/:$/,""):"",host:Y.host,search:Y.search?Y.search.replace(/^\?/,""):"",hash:Y.hash?Y.hash.replace(/^#/,""):"",hostname:Y.hostname,port:Y.port,pathname:"/"===Y.pathname.charAt(0)?Y.pathname:"/"+Y.pathname}}function $c(b){b=x(b)?Ba(b):b;return b.protocol===id.protocol&&b.host===id.host}function Ze(){this.$get=da(P)}function Ec(b){function a(c,d){if(J(c)){var e={};s(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+
"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",jd);a("date",kd);a("filter",Df);a("json",Ef);a("limitTo",Ff);a("lowercase",Gf);a("number",ld);a("orderBy",md);a("uppercase",Hf)}function Df(){return function(b,a,c){if(!E(b))return b;var d;switch(typeof a){case "function":break;case "boolean":case "number":case "string":d=!0;case "object":a=If(a,c,d);break;default:return b}return b.filter(a)}}function If(b,a,c){var d=J(b)&&"$"in
b;!0===a?a=ea:G(a)||(a=function(a,b){if(J(a)||J(b))return!1;a=R(""+a);b=R(""+b);return-1!==a.indexOf(b)});return function(e){return d&&!J(e)?Ia(e,b.$,a,!1):Ia(e,b,a,c)}}function Ia(b,a,c,d,e){var f=typeof b,g=typeof a;if("string"===g&&"!"===a.charAt(0))return!Ia(b,a.substring(1),c,d);if(E(b))return b.some(function(b){return Ia(b,a,c,d)});switch(f){case "object":var h;if(d){for(h in b)if("$"!==h.charAt(0)&&Ia(b[h],a,c,!0))return!0;return e?!1:Ia(b,a,c,!1)}if("object"===g){for(h in a)if(e=a[h],!G(e)&&
(f="$"===h,!Ia(f?b:b[h],e,c,f,f)))return!1;return!0}return c(b,a);case "function":return!1;default:return c(b,a)}}function jd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){z(d)&&(d=a.CURRENCY_SYM);z(e)&&(e=a.PATTERNS[1].maxFrac);return null==b?b:nd(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function ld(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:nd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function nd(b,a,c,d,e){if(!isFinite(b)||J(b))return"";var f=
0>b;b=Math.abs(b);var g=b+"",h="",l=[],k=!1;if(-1!==g.indexOf("e")){var m=g.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?b=0:(h=g,k=!0)}if(k)0<e&&1>b&&(h=b.toFixed(e),b=parseFloat(h));else{g=(g.split(od)[1]||"").length;z(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(od),k=g[0],g=g[1]||"",p=0,q=a.lgSize,t=a.gSize;if(k.length>=q+t)for(p=k.length-q,m=0;m<p;m++)0===(p-m)%t&&0!==m&&(h+=c),h+=k.charAt(m);for(m=p;m<k.length;m++)0===
(k.length-m)%q&&0!==m&&(h+=c),h+=k.charAt(m);for(;g.length<e;)g+="0";e&&"0"!==e&&(h+=d+g.substr(0,e))}0===b&&(f=!1);l.push(f?a.negPre:a.posPre,h,f?a.negSuf:a.posSuf);return l.join("")}function Jb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function Z(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Jb(e,a,d)}}function Kb(b,a){return function(c,d){var e=c["get"+b](),f=vb(a?"SHORT"+b:b);return d[f][e]}}
function pd(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function qd(b){return function(a){var c=pd(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Jb(a,b)}}function kd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=$(b[9]+b[10]),g=$(b[9]+b[11]));h.call(a,$(b[1]),$(b[2])-1,$(b[3]));f=$(b[4]||0)-f;g=$(b[5]||
0)-g;h=$(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g="",h=[],l,k;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;x(c)&&(c=Jf.test(c)?$(c):a(c));V(c)&&(c=new Date(c));if(!pa(c))return c;for(;e;)(k=Kf.exec(e))?(h=Ya(h,k,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));
s(h,function(a){l=Lf[a];g+=l?l(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ef(){return function(b,a){z(a)&&(a=2);return $a(b,a)}}function Ff(){return function(b,a){V(b)&&(b=b.toString());return E(b)||x(b)?(a=Infinity===Math.abs(Number(a))?Number(a):$(a))?0<a?b.slice(0,a):b.slice(a):x(b)?"":[]:b}}function md(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a){switch(typeof a){case "number":case "boolean":case "string":return!0;
default:return!1}}function g(a){return null===a?"null":"function"===typeof a.valueOf&&(a=a.valueOf(),f(a))||"function"===typeof a.toString&&(a=a.toString(),f(a))?a:""}function h(a,b){var c=typeof a,d=typeof b;c===d&&"object"===c&&(a=g(a),b=g(b));return c===d?("string"===c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Ta(a))return a;c=E(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||oa;if(x(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);
if(""===a)return e(h,c);d=b(a);if(d.constant){var f=d();return e(function(a,b){return h(a[f],b[f])},c)}}return e(function(a,b){return h(d(a),d(b))},c)});return Za.call(a).sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ja(b){G(b)&&(b={link:b});b.restrict=b.restrict||"AC";return da(b)}function rd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Lb;f.$error={};f.$$success={};f.$pending=u;f.$name=e(a.name||a.ngForm||
"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){s(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){s(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ma(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];s(f.$pending,function(b,c){f.$setValidity(c,
null,a)});s(f.$error,function(b,c){f.$setValidity(c,null,a)});s(f.$$success,function(b,c){f.$setValidity(c,null,a)});Xa(g,a)};sd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Xa(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Sa);d.addClass(b,Mb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Sa,Mb+" ng-submitted");f.$dirty=!1;f.$pristine=
!0;f.$submitted=!1;s(g,function(a){a.$setPristine()})};f.$setUntouched=function(){s(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function ic(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function jb(b,a,c,d,e,f){var g=R(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;l()})}var l=function(b){k&&(f.defer.cancel(k),k=null);if(!h){var e=
a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=T(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,b)}};if(e.hasEvent("input"))a.on("input",l);else{var k,m=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",m)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)}}
function Nb(b,a){return function(c,d){var e,f;if(pa(c))return c;if(x(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(Mf.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},s(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,
1E3*f.sss||0)}return NaN}}function kb(b,a,c,d){return function(e,f,g,h,l,k,m){function p(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function q(a){return y(a)?pa(a)?a:c(a):u}td(e,f,g,h);jb(e,f,g,h,l,k);var t=h&&h.$options&&h.$options.timezone,r;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,r),"UTC"===t&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):u});h.$formatters.push(function(a){if(a&&!pa(a))throw Ob("datefmt",a);if(p(a)){if((r=a)&&"UTC"===
t){var b=6E4*r.getTimezoneOffset();r=new Date(r.getTime()+b)}return m("date")(a,d,t)}r=null;return""});if(y(g.min)||g.ngMin){var s;h.$validators.min=function(a){return!p(a)||z(s)||c(a)>=s};g.$observe("min",function(a){s=q(a);h.$validate()})}if(y(g.max)||g.ngMax){var K;h.$validators.max=function(a){return!p(a)||z(K)||c(a)<=K};g.$observe("max",function(a){K=q(a);h.$validate()})}}}function td(b,a,c,d){(d.$$hasNativeValidators=J(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};
return c.badInput&&!c.typeMismatch?u:b})}function ud(b,a,c,d,e){if(y(d)){b=b(d);if(!b.constant)throw M("ngModel")("constexpr",c,d);return b(a)}return e}function jc(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!E(a)){if(x(a))return a.split(" ");if(J(a)){var b=[];s(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,
g,h){function l(a,b){var c=g.data("$classCounts")||{},d=[];s(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||f.$index%2===a){var k=e(b||[]);if(!m){var t=l(k,1);h.$addClass(t)}else if(!ea(b,m)){var r=e(m),t=d(k,r),k=d(r,k),t=l(t,1),k=l(k,-1);t&&t.length&&c.addClass(g,t);k&&k.length&&c.removeClass(g,k)}}m=qa(b)}var m;f.$watch(h[b],k,!0);h.$observe("class",function(a){k(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",
function(c,d){var g=c&1;if(g!==(d&1)){var k=e(f.$eval(h[b]));g===a?(g=l(k,1),h.$addClass(g)):(g=l(k,-1),h.$removeClass(g))}})}}}]}function sd(b){function a(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+uc(b,"-"):"";a(lb+b,!0===c);a(vd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,l=b.parentForm,k=b.$animate;f[vd]=!(f[lb]=e.hasClass(lb));d.$setValidity=function(b,e,f){e===u?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&
h(d.$pending,b,f),wd(d.$pending)&&(d.$pending=u));Wa(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(xd,!0),d.$valid=d.$invalid=u,c("",null)):(a(xd,!1),d.$valid=wd(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?u:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);l.$setValidity(b,e,d)}}function wd(b){if(b)for(var a in b)return!1;return!0}var Nf=/^\/(.+)\/([a-z]*)$/,R=function(b){return x(b)?b.toLowerCase():
b},sc=Object.prototype.hasOwnProperty,vb=function(b){return x(b)?b.toUpperCase():b},Ra,C,ra,Za=[].slice,pf=[].splice,Of=[].push,Da=Object.prototype.toString,Ka=M("ng"),aa=P.angular||(P.angular={}),cb,ob=0;Ra=X.documentMode;B.$inject=[];oa.$inject=[];var E=Array.isArray,T=function(b){return x(b)?b.trim():b},gd=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},bb=function(){if(y(bb.isActive_))return bb.isActive_;var b=!(!X.querySelector("[ng-csp]")&&!X.querySelector("[data-ng-csp]"));
if(!b)try{new Function("")}catch(a){b=!0}return bb.isActive_=b},sb=["ng-","data-ng-","ng:","x-ng-"],Md=/[A-Z]/g,vc=!1,Rb,na=1,qb=3,Qd={full:"1.3.14",major:1,minor:3,dot:14,codeName:"instantaneous-browserification"};Q.expando="ng339";var Ab=Q.cache={},hf=1;Q._data=function(b){return this.cache[b[this.expando]]||{}};var cf=/([\:\-\_]+(.))/g,df=/^moz([A-Z])/,Pf={mouseleave:"mouseout",mouseenter:"mouseover"},Ub=M("jqLite"),gf=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Tb=/<|&#?\w+;/,ef=/<([\w:]+)/,ff=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
ga={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ga.optgroup=ga.option;ga.tbody=ga.tfoot=ga.colgroup=ga.caption=ga.thead;ga.th=ga.td;var La=Q.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===X.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),Q(P).on("load",a))},
toString:function(){var b=[];s(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?C(this[b]):C(this[this.length+b])},length:0,push:Of,sort:[].sort,splice:[].splice},Fb={};s("multiple selected checked disabled readOnly required open".split(" "),function(b){Fb[R(b)]=b});var Nc={};s("input select option textarea button form details".split(" "),function(b){Nc[b]=!0});var Oc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};
s({data:Wb,removeData:yb},function(b,a){Q[a]=b});s({data:Wb,inheritedData:Eb,scope:function(b){return C.data(b,"$scope")||Eb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return C.data(b,"$isolateScope")||C.data(b,"$isolateScopeNoTemplate")},controller:Jc,injector:function(b){return Eb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Bb,css:function(b,a,c){a=db(a);if(y(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=R(a);if(Fb[d])if(y(c))c?
(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||B).specified?d:u;else if(y(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?u:b},prop:function(b,a,c){if(y(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(z(b)){var d=a.nodeType;return d===na||d===qb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(z(a)){if(b.multiple&&"select"===ta(b)){var c=[];s(b.options,function(a){a.selected&&
c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(z(a))return b.innerHTML;xb(b,!0);b.innerHTML=a},empty:Kc},function(b,a){Q.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Kc&&(2==b.length&&b!==Bb&&b!==Jc?a:d)===u){if(J(a)){for(e=0;e<g;e++)if(b===Wb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===u?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});
s({removeData:yb,on:function a(c,d,e,f){if(y(f))throw Ub("onargs");if(Fc(c)){var g=zb(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=lf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],l=g.length;l--;){d=g[l];var k=f[d];k||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Pf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),k=f[d]);k.push(e)}}},off:Ic,one:function(a,c,d){a=C(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,
d)},replaceWith:function(a,c){var d,e=a.parentNode;xb(a);s(new Q(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];s(a.childNodes,function(a){a.nodeType===na&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===na||11===d){c=new Q(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===na){var d=a.firstChild;s(new Q(c),function(c){a.insertBefore(c,
d)})}},wrap:function(a,c){c=C(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Lc,detach:function(a){Lc(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new Q(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:Db,removeClass:Cb,toggleClass:function(a,c,d){c&&s(c.split(" "),function(c){var f=d;z(f)&&(f=!Bb(a,c));(f?Db:Cb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},
find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Vb,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=zb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:B,type:g,target:a},c.type&&(e=w(e,
c)),c=qa(h),f=d?[e].concat(d):[e],s(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){Q.prototype[c]=function(c,e,f){for(var g,h=0,l=this.length;h<l;h++)z(g)?(g=a(this[h],c,e,f),y(g)&&(g=C(g))):Hc(g,a(this[h],c,e,f));return y(g)?g:this};Q.prototype.bind=Q.prototype.on;Q.prototype.unbind=Q.prototype.off});eb.prototype={put:function(a,c){this[Na(a,this.nextUid)]=c},get:function(a){return this[Na(a,this.nextUid)]},remove:function(a){var c=this[a=Na(a,this.nextUid)];delete this[a];
return c}};var Qc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,Qf=/,/,Rf=/^\s*(_?)(\S+?)\1\s*$/,Pc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ga=M("$injector");ab.$$annotate=function(a,c,d){var e;if("function"===typeof a){if(!(e=a.$inject)){e=[];if(a.length){if(c)throw x(d)&&d||(d=a.name||mf(a)),Ga("strictdi",d);c=a.toString().replace(Pc,"");c=c.match(Qc);s(c[1].split(Qf),function(a){a.replace(Rf,function(a,c,d){e.push(d)})})}a.$inject=e}}else E(a)?(c=a.length-1,tb(a[c],"fn"),e=a.slice(0,c)):tb(a,"fn",!0);return e};
var Sf=M("$animate"),Ce=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Sf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=
d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=fa();s((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});s(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function l(){m||(m=a.defer(),d(function(){m.resolve();m=null}));return m.promise}function k(a,c){if(aa.isObject(c)){var d=w(c.from||{},c.to||{});a.css(d)}}var m;return{animate:function(a,
c,d){k(a,{from:c,to:d});return l()},enter:function(a,c,d,e){k(a,e);d?d.after(a):c.prepend(a);return l()},leave:function(a,c){a.remove();return l()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=C(a);c=x(c)?c:E(c)?c.join(" "):"";s(a,function(a){Db(a,c)});k(a,d);return l()},removeClass:function(a,c,d){return this.setClass(a,[],c,d)},$$removeClassImmediately:function(a,c,d){a=C(a);c=x(c)?c:E(c)?c.join(" "):
"";s(a,function(a){Cb(a,c)});k(a,d);return l()},setClass:function(a,c,d,e){var k=this,l=!1;a=C(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=aa.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=E(c)?c:c.split(" ");d=E(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));
return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,c);d&&this.$$removeClassImmediately(a,d);k(a,e);return l()},enabled:B,cancel:B}}]}],ia=M("$compile");xc.$inject=["$provide","$$sanitizeUriProvider"];var Sc=/^((?:x|data)[\:\-_])/i,qf=M("$controller"),Wc="application/json",$b={"Content-Type":Wc+";charset=utf-8"},sf=/^\[|^\{(?!\{)/,tf={"[":/]$/,"{":/}$/},rf=/^\)\]\}',?\n/,ac=M("$interpolate"),Tf=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,wf={http:80,https:443,ftp:21},Hb=
M("$location"),Uf={$$html5:!1,$$replace:!1,absUrl:Ib("$$absUrl"),url:function(a){if(z(a))return this.$$url;var c=Tf.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Ib("$$protocol"),host:Ib("$$host"),port:Ib("$$port"),path:dd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(x(a)||V(a))a=
a.toString(),this.$$search=rc(a);else if(J(a))a=Ea(a,{}),s(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Hb("isrcharg");break;default:z(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:dd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};s([cd,ec,dc],function(a){a.prototype=Object.create(Uf);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==dc||!this.$$html5)throw Hb("nostate");
this.$$state=z(c)?null:c;return this}});var ka=M("$parse"),Vf=Function.prototype.call,Wf=Function.prototype.apply,Xf=Function.prototype.bind,mb=fa();s({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;mb[c]=a});mb["this"]=function(a){return a};mb["this"].sharedGetter=!0;var nb=w(fa(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return y(d)?y(e)?d+e:d:y(e)?e:u},"-":function(a,c,d,e){d=d(a,
c);e=e(a,c);return(y(d)?d:0)-(y(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,
c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Yf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},hc=function(a){this.options=a};hc.prototype={constructor:hc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();
else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=nb[c],f=nb[d];nb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+
a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=y(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw ka("lexerr",a,c,this.text);
},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=R(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=
this.index;this.index<this.text.length;){var c=this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=
4,d+=String.fromCharCode(parseInt(f,16))):d+=Yf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var ib=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};ib.ZERO=w(function(){return 0},{sharedGetter:!0,constant:!0});ib.prototype={constructor:ib,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",
this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier&&this.peek().text in mb?a=mb[this.consume().text]:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,
d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw ka("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw ka("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===
f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){if(0===this.tokens.length)throw ka("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},unaryFn:function(a,c){var d=nb[a];return w(function(a,f){return d(a,f,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,c,d,e){var f=nb[c];return w(function(c,e){return f(c,e,a,d)},{constant:a.constant&&
d.constant,inputs:!e&&[a,d]})},identifier:function(){for(var a=this.consume().text;this.peek(".")&&this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return yf(a,this.options,this.text)},constant:function(){var a=this.consume().value;return w(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,
d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.$filter(this.consume().text),d,e;if(this.peek(":"))for(d=[],e=[];this.expect(":");)d.push(this.expression());var f=[a].concat(d||[]);return w(function(f,h){var l=a(f,h);if(e){e[0]=l;for(l=d.length;l--;)e[l+1]=d[l](f,h);return c.apply(u,e)}return c(l)},{constant:!c.$stateful&&f.every(fc),inputs:!c.$stateful&&f})},expression:function(){return this.assignment()},
assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),w(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c;if(this.expect("?")&&(c=this.assignment(),this.consume(":"))){var d=this.assignment();return w(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})}return a},
logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},logicalAND:function(){for(var a=this.equality(),c;c=this.expect("&&");)a=this.binaryFn(a,c.text,this.equality(),!0);return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=","===","!==");)a=this.binaryFn(a,c.text,this.relational());return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a=this.binaryFn(a,c.text,
this.additive());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.text,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.text,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(ib.ZERO,a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var c=
this.identifier();return w(function(d,e,f){d=f||a(d,e);return null==d?u:c(d)},{assign:function(d,e,f){var g=a(d,f);g||a.assign(d,g={},f);return c.assign(g,e)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return w(function(e,f){var g=a(e,f),h=d(e,f);sa(h,c);return g?la(g[h],c):u},{assign:function(e,f,g){var h=sa(d(e,g),c),l=la(a(e,g),c);l||a.assign(e,l={},g);return l[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());
while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var l=c?c(g,h):y(c)?u:g,k=a(g,h,l)||B;if(f)for(var m=d.length;m--;)f[m]=la(d[m](g,h),e);la(l,e);if(k){if(k.constructor===k)throw ka("isecfn",e);if(k===Vf||k===Wf||k===Xf)throw ka("isecff",e);}l=k.apply?k.apply(l,f):k(f[0],f[1],f[2],f[3],f[4]);f&&(f.length=0);return la(l,e)}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))
}this.consume("]");return w(function(c,d){for(var e=[],f=0,g=a.length;f<g;f++)e.push(a[f](c,d));return e},{literal:!0,constant:a.every(fc),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.consume();d.constant?a.push(d.value):d.identifier?a.push(d.text):this.throwError("invalid key",d);this.consume(":");c.push(this.expression())}while(this.expect(","))}this.consume("}");return w(function(d,f){for(var g={},h=0,l=c.length;h<l;h++)g[a[h]]=
c[h](d,f);return g},{literal:!0,constant:c.every(fc),inputs:c})}};var Af=fa(),zf=fa(),Bf=Object.prototype.valueOf,Ca=M("$sce"),ma={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ia=M("$compile"),Y=X.createElement("a"),id=Ba(P.location.href);Ec.$inject=["$provide"];jd.$inject=["$locale"];ld.$inject=["$locale"];var od=".",Lf={yyyy:Z("FullYear",4),yy:Z("FullYear",2,0,!0),y:Z("FullYear",1),MMMM:Kb("Month"),MMM:Kb("Month",!0),MM:Z("Month",2,1),M:Z("Month",1,1),dd:Z("Date",2),d:Z("Date",
1),HH:Z("Hours",2),H:Z("Hours",1),hh:Z("Hours",2,-12),h:Z("Hours",1,-12),mm:Z("Minutes",2),m:Z("Minutes",1),ss:Z("Seconds",2),s:Z("Seconds",1),sss:Z("Milliseconds",3),EEEE:Kb("Day"),EEE:Kb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Jb(Math[0<a?"floor":"ceil"](a/60),2)+Jb(Math.abs(a%60),2))},ww:qd(2),w:qd(1)},Kf=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,Jf=/^\-?\d+$/;
kd.$inject=["$locale"];var Gf=da(R),Hf=da(vb);md.$inject=["$parse"];var Td=da({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){if("a"===c[0].nodeName.toLowerCase()){var f="[object SVGAnimatedString]"===Da.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}}),wb={};s(Fb,function(a,c){if("multiple"!=a){var d=ya("ng-"+c);wb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,
!!a)})}}}}});s(Oc,function(a,c){wb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Nf))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});s(["src","srcset","href"],function(a){var c=ya("ng-"+a);wb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Da.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,
function(c){c?(f.$set(h,c),Ra&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Lb={$addControl:B,$$renameControl:function(a,c){a.$name=c},$removeControl:B,$setValidity:B,$setDirty:B,$setPristine:B,$setSubmitted:B};rd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var yd=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:rd,compile:function(a){a.addClass(Sa).addClass(lb);return{pre:function(a,d,g,h){if(!("action"in g)){var l=function(c){a.$apply(function(){h.$commitViewValue();
h.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",l,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",l,!1)},0,!1)})}var k=h.$$parentForm,m=h.$name;m&&(hb(a,null,m,h,m),g.$observe(g.name?"name":"ngForm",function(c){m!==c&&(hb(a,null,m,u,m),m=c,hb(a,null,m,h,m),k.$$renameControl(h,m))}));d.on("$destroy",function(){k.$removeControl(h);m&&hb(a,null,m,u,m);w(h,Lb)})}}}}}]},Ud=yd(),ge=yd(!0),Mf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
Zf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,$f=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,ag=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,zd=/^(\d{4})-(\d{2})-(\d{2})$/,Ad=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,kc=/^(\d{4})-W(\d\d)$/,Bd=/^(\d{4})-(\d\d)$/,Cd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Dd={text:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);ic(e)},date:kb("date",zd,Nb(zd,["yyyy",
"MM","dd"]),"yyyy-MM-dd"),"datetime-local":kb("datetimelocal",Ad,Nb(Ad,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:kb("time",Cd,Nb(Cd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:kb("week",kc,function(a,c){if(pa(a))return a;if(x(a)){kc.lastIndex=0;var d=kc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,l=0,k=pd(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),l=c.getMilliseconds());return new Date(e,0,k.getDate()+f,d,g,h,l)}}return NaN},"yyyy-Www"),month:kb("month",
Bd,Nb(Bd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){td(a,c,d,e);jb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:ag.test(a)?parseFloat(a):u});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!V(a))throw Ob("numfmt",a);a=a.toString()}return a});if(y(d.min)||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||z(h)||a>=h};d.$observe("min",function(a){y(a)&&!V(a)&&(a=parseFloat(a,10));h=V(a)&&!isNaN(a)?a:u;e.$validate()})}if(y(d.max)||
d.ngMax){var l;e.$validators.max=function(a){return e.$isEmpty(a)||z(l)||a<=l};d.$observe("max",function(a){y(a)&&!V(a)&&(a=parseFloat(a,10));l=V(a)&&!isNaN(a)?a:u;e.$validate()})}},url:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);ic(e);e.$$parserName="url";e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||Zf.test(d)}},email:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);ic(e);e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||$f.test(d)}},radio:function(a,c,
d,e){z(d.name)&&c.attr("name",++ob);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,l){var k=ud(l,a,"ngTrueValue",d.ngTrueValue,!0),m=ud(l,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return ea(a,
k)});e.$parsers.push(function(a){return a?k:m})},hidden:B,button:B,submit:B,reset:B,file:B},yc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,l){l[0]&&(Dd[R(h.type)]||Dd.text)(f,g,h,l[0],c,a,d,e)}}}}],bg=/^(true|false|\d+)$/,ye=function(){return{restrict:"A",priority:100,compile:function(a,c){return bg.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",
a)})}}}},Zd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===u?"":a})}}}}],ae=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===u?"":a})}}}}],$d=["$sce",
"$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],xe=da({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),be=jc("",!0),de=jc("Odd",0),ce=jc("Even",1),ee=Ja({compile:function(a,c){c.$set("ngCloak",
u);a.removeClass("ng-cloak")}}),fe=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Dc={},cg={blur:!0,focus:!0};s("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=ya("ng-"+a);Dc[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};
cg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var ie=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,l,k;c.$watch(e.ngIf,function(c){c?l||g(function(c,f){l=f;c[c.length++]=X.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=ub(h.clone),a.leave(k).then(function(){k=null}),h=null))})}}}],je=["$templateRequest","$anchorScroll",
"$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:aa.noop,compile:function(f,g){var h=g.ngInclude||g.src,l=g.onload||"",k=g.autoscroll;return function(f,g,q,s,r){var u=0,w,n,D,H=function(){n&&(n.remove(),n=null);w&&(w.$destroy(),w=null);D&&(d.leave(D).then(function(){n=null}),n=D,D=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=function(){!y(k)||k&&!f.$eval(k)||c()},n=++u;e?(a(e,!0).then(function(a){if(n===u){var c=f.$new();
s.template=a;a=r(c,function(a){H();d.enter(a,null,g).then(h)});w=c;D=a;w.$emit("$includeContentLoaded",e);f.$eval(l)}},function(){n===u&&(H(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(H(),s.template=null)})}}}}],Ae=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Gc(f.template,X).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],
ke=Ja({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),we=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?T(f):f;e.$parsers.push(function(a){if(!z(a)){var c=[];a&&s(a.split(h),function(a){a&&c.push(g?T(a):a)});return c}});e.$formatters.push(function(a){return E(a)?a.join(f):u});e.$isEmpty=function(a){return!a||!a.length}}}},lb="ng-valid",vd="ng-invalid",Sa="ng-pristine",
Mb="ng-dirty",xd="ng-pending",Ob=new M("ngModel"),dg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,l,k,m){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=u;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success=
{};this.$pending=u;this.$name=m(d.name||"",!1)(a);var p=f(d.ngModel),q=p.assign,t=p,r=q,w=null,C,n=this;this.$$setOptions=function(a){if((n.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");t=function(a){var d=p(a);G(d)&&(d=c(a));return d};r=function(a,c){G(p(a))?g(a,{$$$p:n.$modelValue}):q(a,n.$modelValue)}}else if(!p.assign)throw Ob("nonassign",d.ngModel,ua(e));};this.$render=B;this.$isEmpty=function(a){return z(a)||""===a||null===a||a!==a};var D=e.inheritedData("$formController")||
Lb,H=0;sd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:D,$animate:g});this.$setPristine=function(){n.$dirty=!1;n.$pristine=!0;g.removeClass(e,Mb);g.addClass(e,Sa)};this.$setDirty=function(){n.$dirty=!0;n.$pristine=!1;g.removeClass(e,Sa);g.addClass(e,Mb);D.$setDirty()};this.$setUntouched=function(){n.$touched=!1;n.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){n.$touched=!0;n.$untouched=!1;g.setClass(e,"ng-touched",
"ng-untouched")};this.$rollbackViewValue=function(){h.cancel(w);n.$viewValue=n.$$lastCommittedViewValue;n.$render()};this.$validate=function(){if(!V(n.$modelValue)||!isNaN(n.$modelValue)){var a=n.$$rawModelValue,c=n.$valid,d=n.$modelValue,e=n.$options&&n.$options.allowInvalid;n.$$runValidators(a,n.$$lastCommittedViewValue,function(f){e||c===f||(n.$modelValue=f?a:u,n.$modelValue!==d&&n.$$writeModelToScope())})}};this.$$runValidators=function(a,c,d){function e(){var d=!0;s(n.$validators,function(e,
f){var h=e(a,c);d=d&&h;g(f,h)});return d?!0:(s(n.$asyncValidators,function(a,c){g(c,null)}),!1)}function f(){var d=[],e=!0;s(n.$asyncValidators,function(f,h){var k=f(a,c);if(!k||!G(k.then))throw Ob("$asyncValidators",k);g(h,u);d.push(k.then(function(){g(h,!0)},function(a){e=!1;g(h,!1)}))});d.length?k.all(d).then(function(){h(e)},B):h(!0)}function g(a,c){l===H&&n.$setValidity(a,c)}function h(a){l===H&&d(a)}H++;var l=H;(function(){var a=n.$$parserName||"parse";if(C===u)g(a,null);else return C||(s(n.$validators,
function(a,c){g(c,null)}),s(n.$asyncValidators,function(a,c){g(c,null)})),g(a,C),C;return!0})()?e()?f():h(!1):h(!1)};this.$commitViewValue=function(){var a=n.$viewValue;h.cancel(w);if(n.$$lastCommittedViewValue!==a||""===a&&n.$$hasNativeValidators)n.$$lastCommittedViewValue=a,n.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=n.$$lastCommittedViewValue;if(C=z(c)?u:!0)for(var d=0;d<n.$parsers.length;d++)if(c=n.$parsers[d](c),z(c)){C=!1;break}V(n.$modelValue)&&
isNaN(n.$modelValue)&&(n.$modelValue=t(a));var e=n.$modelValue,f=n.$options&&n.$options.allowInvalid;n.$$rawModelValue=c;f&&(n.$modelValue=c,n.$modelValue!==e&&n.$$writeModelToScope());n.$$runValidators(c,n.$$lastCommittedViewValue,function(a){f||(n.$modelValue=a?c:u,n.$modelValue!==e&&n.$$writeModelToScope())})};this.$$writeModelToScope=function(){r(a,n.$modelValue);s(n.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};this.$setViewValue=function(a,c){n.$viewValue=a;n.$options&&!n.$options.updateOnDefault||
n.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=n.$options;e&&y(e.debounce)&&(e=e.debounce,V(e)?d=e:V(e[c])?d=e[c]:V(e["default"])&&(d=e["default"]));h.cancel(w);d?w=h(function(){n.$commitViewValue()},d):l.$$phase?n.$commitViewValue():a.$apply(function(){n.$commitViewValue()})};a.$watch(function(){var c=t(a);if(c!==n.$modelValue){n.$modelValue=n.$$rawModelValue=c;C=u;for(var d=n.$formatters,e=d.length,f=c;e--;)f=d[e](f);n.$viewValue!==f&&(n.$viewValue=n.$$lastCommittedViewValue=
f,n.$render(),n.$$runValidators(c,f,B))}return c})}],ve=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:dg,priority:1,compile:function(c){c.addClass(Sa).addClass("ng-untouched").addClass(lb);return{pre:function(a,c,f,g){var h=g[0],l=g[1]||Lb;h.$$setOptions(g[2]&&g[2].$options);l.$addControl(h);f.$observe("name",function(a){h.$name!==a&&l.$$renameControl(h,a)});a.$on("$destroy",function(){l.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];
if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],eg=/(\s+|^)default(\s+|$)/,ze=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==u?(this.$options.updateOnDefault=!1,this.$options.updateOn=T(this.$options.updateOn.replace(eg,function(){d.$options.updateOnDefault=
!0;return" "}))):this.$options.updateOnDefault=!0}]}},le=Ja({terminal:!0,priority:1E3}),me=["$locale","$interpolate",function(a,c){var d=/{}/g,e=/^when(Minus)?(.+)$/;return{restrict:"EA",link:function(f,g,h){function l(a){g.text(a||"")}var k=h.count,m=h.$attr.when&&g.attr(h.$attr.when),p=h.offset||0,q=f.$eval(m)||{},t={},m=c.startSymbol(),r=c.endSymbol(),u=m+k+"-"+p+r,w=aa.noop,n;s(h,function(a,c){var d=e.exec(c);d&&(d=(d[1]?"-":"")+R(d[2]),q[d]=g.attr(h.$attr[c]))});s(q,function(a,e){t[e]=c(a.replace(d,
u))});f.$watch(k,function(c){c=parseFloat(c);var d=isNaN(c);d||c in q||(c=a.pluralCat(c-p));c===n||d&&isNaN(n)||(w(),w=f.$watch(t[c],l),n=c)})}}}],ne=["$parse","$animate",function(a,c){var d=M("ngRepeat"),e=function(a,c,d,e,k,m,p){a[d]=e;k&&(a[k]=m);a.$index=c;a.$first=0===c;a.$last=c===p-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,l=X.createComment(" end ngRepeat: "+
h+" "),k=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw d("iexp",h);var m=k[1],p=k[2],q=k[3],t=k[4],k=m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!k)throw d("iidexp",m);var r=k[3]||k[1],w=k[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(q)))throw d("badident",q);var y,n,D,H,v={$id:Na};t?y=a(t):(D=function(a,c){return Na(c)},
H=function(a){return a});return function(a,f,g,k,m){y&&(n=function(c,d,e){w&&(v[w]=c);v[r]=d;v.$index=e;return y(a,v)});var t=fa();a.$watchCollection(p,function(g){var k,p,y=f[0],F,v=fa(),B,z,G,E,J,x,K;q&&(a[q]=g);if(Ta(g))J=g,p=n||D;else{p=n||H;J=[];for(K in g)g.hasOwnProperty(K)&&"$"!=K.charAt(0)&&J.push(K);J.sort()}B=J.length;K=Array(B);for(k=0;k<B;k++)if(z=g===J?k:J[k],G=g[z],E=p(z,G,k),t[E])x=t[E],delete t[E],v[E]=x,K[k]=x;else{if(v[E])throw s(K,function(a){a&&a.scope&&(t[a.id]=a)}),d("dupes",
h,E,G);K[k]={id:E,scope:u,clone:u};v[E]=!0}for(F in t){x=t[F];E=ub(x.clone);c.leave(E);if(E[0].parentNode)for(k=0,p=E.length;k<p;k++)E[k].$$NG_REMOVED=!0;x.scope.$destroy()}for(k=0;k<B;k++)if(z=g===J?k:J[k],G=g[z],x=K[k],x.scope){F=y;do F=F.nextSibling;while(F&&F.$$NG_REMOVED);x.clone[0]!=F&&c.move(ub(x.clone),null,C(y));y=x.clone[x.clone.length-1];e(x.scope,k,r,G,w,z,B)}else m(function(a,d){x.scope=d;var f=l.cloneNode(!1);a[a.length++]=f;c.enter(a,null,C(y));y=f;x.clone=a;v[x.id]=x;e(x.scope,k,r,
G,w,z,B)});t=v})}}}}],oe=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],he=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],pe=Ja(function(a,c,d){a.$watchCollection(d.ngStyle,function(a,d){d&&a!==d&&s(d,function(a,
d){c.css(d,"")});a&&c.css(a)})}),qe=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],l=[],k=[],m=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=l.length;d<e;++d)a.cancel(l[d]);d=l.length=0;for(e=k.length;d<e;++d){var r=ub(h[d].clone);k[d].$destroy();(l[d]=a.leave(r)).then(m(l,d))}h.length=0;k.length=0;(g=f.cases["!"+c]||f.cases["?"])&&s(g,function(c){c.transclude(function(d,
e){k.push(e);var f=c.element;d[d.length++]=X.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],re=Ja({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),se=Ja({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,
element:c})}}),ue=Ja({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw M("ngTransclude")("orphan",ua(c));f(function(a){c.empty();c.append(a)})}}),Vd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],fg=M("ngOptions"),te=da({restrict:"A",terminal:!0}),Wd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
e={$setViewValue:B};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var l=this,k={},m=e,p;l.databound=d.ngModel;l.init=function(a,c,d){m=a;p=d};l.addOption=function(c,d){Ma(c,'"option value"');k[c]=!0;m.$viewValue==c&&(a.val(c),p.parent()&&p.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};l.removeOption=function(a){this.hasOption(a)&&(delete k[a],m.$viewValue===a&&this.renderUnknownOption(a))};l.renderUnknownOption=function(c){c=
"? "+Na(c)+" ?";p.val(c);a.prepend(p);a.val(c);p.prop("selected",!0)};l.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){l.renderUnknownOption=B})}],link:function(e,g,h,l){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(v.parent()&&v.remove(),c.val(a),""===a&&B.prop("selected",!0)):z(a)&&B?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){v.parent()&&v.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;
d.$render=function(){var a=new eb(d.$viewValue);s(c.find("option"),function(c){c.selected=y(a.get(c.value))})};a.$watch(function(){ea(e,d.$viewValue)||(e=qa(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];s(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function p(e,f,g){function h(a,c,d){R[B]=d;G&&(R[G]=c);return a(e,R)}function k(a){var c;if(t)if(K&&E(a)){c=new eb([]);for(var d=0;d<a.length;d++)c.put(h(K,null,a[d]),!0)}else c=
new eb(a);else K&&(a=h(K,null,a));return function(d,e){var f;f=K?K:z?z:A;return t?y(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){n||(e.$$postDigest(p),n=!0)}function m(a,c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function p(){n=!1;var a={"":[]},c=[""],d,l,r,u,v;r=g.$viewValue;u=N(e)||[];var B=G?Object.keys(u).sort():u,x,z,E,A,O={};v=k(r);var M=!1,T,V;Q={};for(A=0;E=B.length,A<E;A++){x=A;if(G&&(x=B[A],"$"===x.charAt(0)))continue;z=u[x];d=h(J,x,z)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=v(x,z);M=M||d;z=h(C,x,z);
z=y(z)?z:"";V=K?K(e,R):G?B[A]:A;K&&(Q[V]=x);l.push({id:V,label:z,selected:d})}t||(w||null===r?a[""].unshift({id:"",label:"",selected:!M}):M||a[""].unshift({id:"?",label:"",selected:!0}));x=0;for(B=c.length;x<B;x++){d=c[x];l=a[d];P.length<=x?(r={element:H.clone().attr("label",d),label:l.label},u=[r],P.push(u),f.append(r.element)):(u=P[x],r=u[0],r.label!=d&&r.element.attr("label",r.label=d));M=null;A=0;for(E=l.length;A<E;A++)d=l[A],(v=u[A+1])?(M=v.element,v.label!==d.label&&(m(O,v.label,!1),m(O,d.label,
!0),M.text(v.label=d.label),M.prop("label",v.label)),v.id!==d.id&&M.val(v.id=d.id),M[0].selected!==d.selected&&(M.prop("selected",v.selected=d.selected),Ra&&M.prop("selected",v.selected))):(""===d.id&&w?T=w:(T=D.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),u.push(v={element:T,label:d.label,id:d.id,selected:d.selected}),m(O,d.label,!0),M?M.after(T):r.element.append(T),M=T);for(A++;u.length>A;)d=u.pop(),m(O,d.label,!1),d.element.remove()}for(;P.length>
x;){l=P.pop();for(A=1;A<l.length;++A)m(O,l[A].label,!1);l[0].element.remove()}s(O,function(a,c){0<a?q.addOption(c):0>a&&q.removeOption(c)})}var v;if(!(v=r.match(d)))throw fg("iexp",r,ua(f));var C=c(v[2]||v[1]),B=v[4]||v[6],x=/ as /.test(v[0])&&v[1],z=x?c(x):null,G=v[5],J=c(v[3]||""),A=c(v[2]?v[1]:B),N=c(v[7]),K=v[8]?c(v[8]):null,Q={},P=[[{element:f,label:""}]],R={};w&&(a(w)(e),w.removeClass("ng-scope"),w.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=N(e)||[],c;if(t)c=[],s(f.val(),
function(d){d=K?Q[d]:d;c.push("?"===d?u:""===d?null:h(z?z:A,d,a[d]))});else{var d=K?Q[f.val()]:f.val();c="?"===d?u:""===d?null:h(z?z:A,d,a[d])}g.$setViewValue(c);p()})});g.$render=p;e.$watchCollection(N,l);e.$watchCollection(function(){var a=N(e),c;if(a&&E(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(C,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(C,d,a[d]));return c},l);t&&e.$watchCollection(function(){return g.$modelValue},l)}if(l[1]){var q=l[0];l=l[1];var t=h.multiple,
r=h.ngOptions,w=!1,B,n=!1,D=C(X.createElement("option")),H=C(X.createElement("optgroup")),v=D.clone();h=0;for(var x=g.children(),G=x.length;h<G;h++)if(""===x[h].value){B=w=x.eq(h);break}q.init(l,w,v);t&&(l.$isEmpty=function(a){return!a||0===a.length});r?p(e,g,l):t?m(e,g,l):k(e,g,l,q)}}}}],Yd=["$interpolate",function(a){var c={addOption:B,removeOption:B};return{restrict:"E",priority:100,compile:function(d,e){if(z(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var k=
d.parent(),m=k.data("$selectController")||k.parent().data("$selectController");m&&m.databound||(m=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&m.removeOption(c);m.addOption(a,d)}):m.addOption(e.value,d);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],Xd=da({restrict:"E",terminal:!1}),Ac=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},
zc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){x(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw M("ngPattern")("noregexp",g,a,ua(c));f=a||u;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||z(f)||f.test(a)}}}}},Cc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=$(a);f=isNaN(a)?-1:a;e.$validate()});
e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(c)||c.length<=f}}}}},Bc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=$(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}};P.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(Nd(),Pd(aa),C(X).ready(function(){Jd(X,tc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map
;
//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=d(e,i,4);var o=!w(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=b(r,e);for(var u=null!=t&&t.length,i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t){var r=S.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||o,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=S[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var e=this,u=e._,i=Array.prototype,o=Object.prototype,a=Function.prototype,c=i.push,l=i.slice,f=o.toString,s=o.hasOwnProperty,p=Array.isArray,h=Object.keys,v=a.bind,g=Object.create,y=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):e._=m,m.VERSION="1.8.2";var d=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},b=function(n,t,r){return null==n?m.identity:m.isFunction(n)?d(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return b(n,t,1/0)};var x=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var l=o[c];t&&r[l]!==void 0||(r[l]=i[l])}return r}},_=function(n){if(!m.isObject(n))return{};if(g)return g(n);y.prototype=n;var t=new y;return y.prototype=null,t},j=Math.pow(2,53)-1,w=function(n){var t=n&&n.length;return"number"==typeof t&&t>=0&&j>=t};m.each=m.forEach=function(n,t,r){t=d(t,r);var e,u;if(w(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=w(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=b(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(b(t)),r)},m.every=m.all=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r){return w(n)||(n=m.values(n)),m.indexOf(n,t,"number"==typeof r&&r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=w(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(w(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=b(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var A=function(n){return function(t,r,e){var u={};return r=b(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=A(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=A(function(n,t,r){n[r]=t}),m.countBy=A(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):w(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:w(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=b(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var k=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=n&&n.length;a>o;o++){var c=n[o];if(w(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=k(c,t,r));var l=0,f=c.length;for(u.length+=f;f>l;)u[i++]=c[l++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return k(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){if(null==n)return[];m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=b(r,e));for(var u=[],i=[],o=0,a=n.length;a>o;o++){var c=n[o],l=r?r(c,o,n):c;t?(o&&i===l||u.push(c),i=l):r?m.contains(i,l)||(i.push(l),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(k(arguments,!0,!0))},m.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=k(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,"length").length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=n&&n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.indexOf=function(n,t,r){var e=0,u=n&&n.length;if("number"==typeof r)e=0>r?Math.max(0,u+r):r;else if(r&&u)return e=m.sortedIndex(n,t),n[e]===t?e:-1;if(t!==t)return m.findIndex(l.call(n,e),m.isNaN);for(;u>e;e++)if(n[e]===t)return e;return-1},m.lastIndexOf=function(n,t,r){var e=n?n.length:0;if("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1)),t!==t)return m.findLastIndex(l.call(n,0,e),m.isNaN);for(;--e>=0;)if(n[e]===t)return e;return-1},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=b(r,e,1);for(var u=r(t),i=0,o=n.length;o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var O=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=_(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(v&&n.bind===v)return v.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return O(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return O(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var l=m.now();a||r.leading!==!1||(a=l);var f=t-(l-a);return e=this,u=arguments,0>=f||f>t?(o&&(clearTimeout(o),o=null),a=l,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,f)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var l=m.now()-o;t>l&&l>=0?e=setTimeout(c,t-l):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var F=!{toString:null}.propertyIsEnumerable("toString"),S=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(h)return h(n);var t=[];for(var e in n)m.has(n,e)&&t.push(e);return F&&r(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var e in n)t.push(e);return F&&r(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=x(m.allKeys),m.extendOwn=m.assign=x(m.keys),m.findKey=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=d(t,r)):(u=k(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var l=u[a],f=o[l];e(f,l,o)&&(i[l]=f)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(k(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=x(m.allKeys,!0),m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var E=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=f.call(n);if(u!==f.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!E(n[c],t[c],r,e))return!1}else{var l,s=m.keys(n);if(c=s.length,m.keys(t).length!==c)return!1;for(;c--;)if(l=s[c],!m.has(t,l)||!E(n[l],t[l],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return E(n,t)},m.isEmpty=function(n){return null==n?!0:w(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=p||function(n){return"[object Array]"===f.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return f.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===f.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&s.call(n,t)},m.noConflict=function(){return e._=u,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=function(n){return function(t){return null==t?void 0:t[n]}},m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=d(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},N=m.invert(M),I=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=I(M),m.unescape=I(N),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var B=0;m.uniqueId=function(n){var t=++B+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},q=/\\|'|\r|\n|\u2028|\u2029/g,K=function(n){return"\\"+R[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||T).source,(t.interpolate||T).source,(t.evaluate||T).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(q,K),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},l=t.variable||"obj";return c.source="function("+l+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var z=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return c.apply(n,arguments),z(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=i[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],z(this,r)}}),m.each(["concat","join","slice"],function(n){var t=i[n];m.prototype[n]=function(){return z(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
;
(function() {


}).call(this);
{
"version":3,
"file":"angular.min.js",
"lineCount":196,
"mappings":"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",
"sources":["angular.js","MINERR_ASSET"],
"names":["window","document","undefined","minErr","isArrayLike","obj","isWindow","length","nodeType","isString","isArray","forEach","iterator","context","key","isFunction","hasOwnProperty","call","sortedKeys","keys","push","sort","forEachSorted","i","reverseParams","iteratorFn","value","nextUid","index","uid","digit","charCodeAt","join","String","fromCharCode","unshift","setHashKey","h","$$hashKey","extend","dst","arguments","int","str","parseInt","inherit","parent","extra","noop","identity","$","valueFn","isUndefined","isDefined","isObject","isNumber","isDate","toString","apply","isRegExp","location","alert","setInterval","isElement","node","nodeName","on","find","map","results","list","indexOf","array","arrayRemove","splice","copy","source","destination","$evalAsync","$watch","ngMinErr","Date","getTime","RegExp","shallowCopy","src","substr","equals","o1","o2","t1","t2","keySet","charAt","bind","self","fn","curryArgs","slice","startIndex","concat","toJsonReplacer","val","toJson","pretty","JSON","stringify","fromJson","json","parse","toBoolean","v","lowercase","startingTag","element","jqLite","clone","html","e","elemHtml","append","TEXT_NODE","match","replace","tryDecodeURIComponent","decodeURIComponent","parseKeyValue","keyValue","key_value","split","toKeyValue","parts","arrayValue","encodeUriQuery","encodeUriSegment","pctEncodeSpaces","encodeURIComponent","angularInit","bootstrap","elements","appElement","module","names","NG_APP_CLASS_REGEXP","name","getElementById","querySelectorAll","exec","className","attributes","attr","modules","doBootstrap","injector","tag","$provide","createInjector","invoke","scope","compile","animate","$apply","data","enabled","NG_DEFER_BOOTSTRAP","test","angular","resumeBootstrap","angular.resumeBootstrap","extraModules","snake_case","separator","SNAKE_CASE_REGEXP","letter","pos","toLowerCase","assertArg","arg","reason","assertArgFn","acceptArrayAnnotation","constructor","assertNotHasOwnProperty","getter","path","bindFnToScope","lastInstance","len","setupModuleLoader","ensure","factory","$injectorMinErr","Object","requires","configFn","invokeLater","provider","method","insertMethod","invokeQueue","moduleInstance","runBlocks","config","run","block","camelCase","SPECIAL_CHARS_REGEXP","_","offset","toUpperCase","MOZ_HACK_REGEXP","JQLitePatchJQueryRemove","dispatchThis","filterElems","getterIfNoArguments","removePatch","param","filter","fireEvent","set","setIndex","setLength","childIndex","children","shift","triggerHandler","childLength","jQuery","originalJqFn","$original","JQLite","jqLiteMinErr","div","createElement","innerHTML","removeChild","firstChild","JQLiteAddNodes","childNodes","fragment","createDocumentFragment","JQLiteClone","cloneNode","JQLiteDealoc","JQLiteRemoveData","JQLiteOff","type","unsupported","events","JQLiteExpandoStore","handle","eventHandler","removeEventListenerFn","expandoId","jqName","expandoStore","jqCache","$destroy","jqId","JQLiteData","isSetter","keyDefined","isSimpleGetter","JQLiteHasClass","selector","getAttribute","JQLiteRemoveClass","cssClasses","setAttribute","cssClass","trim","JQLiteAddClass","existingClasses","root","JQLiteController","JQLiteInheritedData","getBooleanAttrName","booleanAttr","BOOLEAN_ATTR","BOOLEAN_ELEMENTS","createEventHandler","event","preventDefault","event.preventDefault","returnValue","stopPropagation","event.stopPropagation","cancelBubble","target","srcElement","defaultPrevented","prevent","isDefaultPrevented","event.isDefaultPrevented","msie","elem","hashKey","objType","HashMap","put","annotate","$inject","fnText","STRIP_COMMENTS","argDecl","FN_ARGS","FN_ARG_SPLIT","FN_ARG","all","underscore","last","modulesToLoad","supportObject","delegate","provider_","providerInjector","instantiate","$get","providerCache","providerSuffix","factoryFn","loadModules","loadedModules","get","moduleFn","angularModule","_runBlocks","_invokeQueue","ii","invokeArgs","message","stack","createInternalInjector","cache","getService","serviceName","INSTANTIATING","locals","args","Type","Constructor","returnedValue","prototype","instance","has","service","$injector","constant","instanceCache","decorator","decorFn","origProvider","orig$get","origProvider.$get","origInstance","instanceInjector","servicename","$AnchorScrollProvider","autoScrollingEnabled","disableAutoScrolling","this.disableAutoScrolling","$window","$location","$rootScope","getFirstAnchor","result","scroll","hash","elm","scrollIntoView","getElementsByName","scrollTo","autoScrollWatch","autoScrollWatchAction","Browser","$log","$sniffer","completeOutstandingRequest","outstandingRequestCount","outstandingRequestCallbacks","pop","error","startPoller","interval","setTimeout","check","pollFns","pollFn","pollTimeout","fireUrlChange","newLocation","lastBrowserUrl","url","urlChangeListeners","listener","rawDocument","history","clearTimeout","pendingDeferIds","isMock","$$completeOutstandingRequest","$$incOutstandingRequestCount","self.$$incOutstandingRequestCount","notifyWhenNoOutstandingRequests","self.notifyWhenNoOutstandingRequests","callback","addPollFn","self.addPollFn","href","baseElement","self.url","replaceState","pushState","urlChangeInit","onUrlChange","self.onUrlChange","hashchange","baseHref","self.baseHref","lastCookies","lastCookieString","cookiePath","cookies","self.cookies","cookieLength","cookie","escape","warn","cookieArray","unescape","substring","defer","self.defer","delay","timeoutId","cancel","self.defer.cancel","deferId","$BrowserProvider","$document","$CacheFactoryProvider","this.$get","cacheFactory","cacheId","options","refresh","entry","freshEnd","staleEnd","n","link","p","nextEntry","prevEntry","caches","size","stats","capacity","Number","MAX_VALUE","lruHash","lruEntry","remove","removeAll","destroy","info","cacheFactory.info","cacheFactory.get","$TemplateCacheProvider","$cacheFactory","$CompileProvider","hasDirectives","Suffix","COMMENT_DIRECTIVE_REGEXP","CLASS_DIRECTIVE_REGEXP","aHrefSanitizationWhitelist","imgSrcSanitizationWhitelist","EVENT_HANDLER_ATTR_REGEXP","directive","this.directive","registerDirective","directiveFactory","$exceptionHandler","directives","priority","require","controller","restrict","this.aHrefSanitizationWhitelist","regexp","this.imgSrcSanitizationWhitelist","$interpolate","$http","$templateCache","$parse","$controller","$sce","$animate","$compileNodes","transcludeFn","maxPriority","ignoreDirective","previousCompileContext","nodeValue","wrap","compositeLinkFn","compileNodes","publicLinkFn","cloneConnectFn","$linkNode","JQLitePrototype","eq","safeAddClass","$element","addClass","nodeList","$rootElement","boundTranscludeFn","childLinkFn","childScope","childTranscludeFn","stableNodeList","linkFns","nodeLinkFn","$new","transclude","cloneFn","transcludeScope","$$transcluded","attrs","linkFnFound","Attributes","collectDirectives","applyDirectivesToNode","terminal","attrsMap","$attr","addDirective","directiveNormalize","nodeName_","nName","nAttrs","j","jj","attrStartName","attrEndName","specified","ngAttrName","NG_ATTR_BINDING","directiveNName","addAttrInterpolateDirective","addTextInterpolateDirective","byPriority","groupScan","attrStart","attrEnd","nodes","depth","hasAttribute","$compileMinErr","nextSibling","groupElementsLinkFnWrapper","linkFn","controllers","compileNode","templateAttrs","jqCollection","originalReplaceDirective","preLinkFns","postLinkFns","addLinkFns","pre","post","getControllers","retrievalMethod","optional","$$controller","directiveName","linkNode","$$element","newIsolateScopeDirective","LOCAL_REGEXP","parentScope","$parent","definition","scopeName","attrName","mode","lastValue","parentGet","parentSet","$$isolateBindings","$observe","$$observers","$$scope","assign","parentValueWatch","parentValue","controllerDirectives","controllerInstance","controllerAs","$scope","terminalPriority","newScopeDirective","templateDirective","$compileNode","$template","transcludeDirective","$$start","$$end","directiveValue","templateUrl","assertNoDuplicate","createComment","replaceWith","replaceDirective","contents","template","denormalizeTemplate","newTemplateAttrs","mergeTemplateAttributes","compileTemplateUrl","Math","max","tDirectives","startAttrName","endAttrName","srcAttr","dstAttr","$set","tAttrs","linkQueue","afterTemplateNodeLinkFn","afterTemplateChildLinkFn","beforeTemplateCompileNode","origAsyncDirective","derivedSyncDirective","getTrustedResourceUrl","success","content","tempTemplateAttrs","beforeTemplateLinkNode","linkRootElement","response","code","headers","delayedNodeLinkFn","ignoreChildLinkFn","rootElement","a","b","diff","what","previousDirective","text","interpolateFn","textInterpolateLinkFn","bindings","interpolateFnWatchAction","getTrustedContext","attrNormalizedName","RESOURCE_URL","attrInterpolateLinkFn","$$inter","elementsToRemove","newNode","firstElementToRemove","removeCount","parentNode","j2","replaceChild","appendChild","expando","k","kk","$addClass","classVal","$removeClass","removeClass","writeAttr","tokenDifference","str1","str2","values","tokens1","tokens2","token","current","booleanKey","prop","normalizedVal","urlResolve","removeAttr","listeners","startSymbol","endSymbol","PREFIX_REGEXP","$ControllerProvider","CNTRL_REG","register","this.register","expression","identifier","$DocumentProvider","$ExceptionHandlerProvider","exception","cause","parseHeaders","parsed","line","headersGetter","headersObj","transformData","fns","$HttpProvider","JSON_START","JSON_END","PROTECTION_PREFIX","CONTENT_TYPE_APPLICATION_JSON","defaults","d","interceptorFactories","interceptors","responseInterceptorFactories","responseInterceptors","$httpBackend","$browser","$q","requestConfig","transformResponse","resp","status","reject","transformRequest","mergeHeaders","execHeaders","headerContent","headerFn","header","defHeaders","reqHeaders","defHeaderName","reqHeaderName","common","lowercaseDefHeaderName","uppercase","xsrfValue","urlIsSameOrigin","xsrfCookieName","xsrfHeaderName","chain","serverRequest","reqData","withCredentials","sendReq","then","promise","when","reversedInterceptors","interceptor","request","requestError","responseError","thenFn","rejectFn","promise.success","promise.error","done","headersString","resolvePromise","$$phase","deferred","resolve","removePendingReq","idx","pendingRequests","cachedResp","buildUrl","params","defaultCache","timeout","responseType","interceptorFactory","responseFn","createShortMethods","createShortMethodsWithData","$HttpBackendProvider","createHttpBackend","XHR","callbacks","protocol","$browserDefer","locationProtocol","jsonpReq","script","doneWrapper","body","onreadystatechange","script.onreadystatechange","readyState","onload","onerror","timeoutRequest","jsonpDone","xhr","abort","completeRequest","callbackId","counter","open","setRequestHeader","xhr.onreadystatechange","responseHeaders","getAllResponseHeaders","responseText","send","$InterpolateProvider","this.startSymbol","this.endSymbol","mustHaveExpression","trustedContext","endIndex","hasInterpolation","startSymbolLength","exp","endSymbolLength","$interpolateMinErr","part","getTrusted","valueOf","err","newErr","$interpolate.startSymbol","$interpolate.endSymbol","$IntervalProvider","count","invokeApply","clearInterval","iteration","skipApply","$$intervalId","tick","notify","intervals","interval.cancel","$LocaleProvider","short","pluralCat","num","encodePath","segments","parseAbsoluteUrl","absoluteUrl","locationObj","parsedUrl","$$protocol","$$host","hostname","$$port","port","DEFAULT_PORTS","parseAppUrl","relativeUrl","prefixed","$$path","pathname","$$search","search","$$hash","beginsWith","begin","whole","stripHash","stripFile","lastIndexOf","LocationHtml5Url","appBase","basePrefix","$$html5","appBaseNoFile","$$parse","this.$$parse","pathUrl","$locationMinErr","$$compose","this.$$compose","$$url","$$absUrl","$$rewrite","this.$$rewrite","appUrl","prevAppUrl","LocationHashbangUrl","hashPrefix","withoutBaseUrl","withoutHashUrl","LocationHashbangInHtml5Url","locationGetter","property","locationGetterSetter","preprocess","$LocationProvider","html5Mode","this.hashPrefix","prefix","this.html5Mode","afterLocationChange","oldUrl","$broadcast","absUrl","initialUrl","LocationMode","ctrlKey","metaKey","which","absHref","rewrittenUrl","newUrl","$digest","changeCounter","$locationWatch","currentReplace","$$replace","$LogProvider","debug","debugEnabled","this.debugEnabled","flag","formatError","Error","sourceURL","consoleLog","console","logFn","log","arg1","arg2","ensureSafeMemberName","fullExpression","$parseMinErr","ensureSafeObject","setter","setValue","fullExp","propertyObj","unwrapPromises","promiseWarning","$$v","cspSafeGetterFn","key0","key1","key2","key3","key4","cspSafePromiseEnabledGetter","pathVal","cspSafeGetter","getterFn","getterFnCache","pathKeys","pathKeysLength","csp","evaledFnGetter","Function","evaledFnGetter.toString","$ParseProvider","$parseOptions","this.unwrapPromises","logPromiseWarnings","this.logPromiseWarnings","$filter","promiseWarningCache","parsedExpression","lexer","Lexer","parser","Parser","$QProvider","qFactory","nextTick","exceptionHandler","defaultCallback","defaultErrback","pending","ref","progress","errback","progressback","wrappedCallback","wrappedErrback","wrappedProgressback","catch","finally","makePromise","resolved","handleCallback","isResolved","callbackOutput","promises","$RootScopeProvider","TTL","$rootScopeMinErr","digestTtl","this.digestTtl","Scope","$id","$$watchers","$$nextSibling","$$prevSibling","$$childHead","$$childTail","$root","$$destroyed","$$asyncQueue","$$postDigestQueue","$$listeners","beginPhase","phase","compileToFn","initWatchVal","isolate","child","Child","watchExp","objectEquality","watcher","listenFn","watcher.fn","newVal","oldVal","originalFn","$watchCollection","oldValue","newValue","changeDetected","objGetter","internalArray","internalObject","oldLength","$watchCollectionWatch","newLength","$watchCollectionAction","watch","watchers","asyncQueue","postDigestQueue","dirty","ttl","watchLog","logIdx","logMsg","asyncTask","$eval","isNaN","next","expr","$$postDigest","$on","namedListeners","$emit","empty","listenerArgs","array1","currentScope","adjustMatcher","matcher","$sceMinErr","adjustMatchers","matchers","adjustedMatchers","$SceDelegateProvider","SCE_CONTEXTS","resourceUrlWhitelist","resourceUrlBlacklist","this.resourceUrlWhitelist","this.resourceUrlBlacklist","generateHolderType","base","holderType","trustedValue","$$unwrapTrustedValue","this.$$unwrapTrustedValue","holderType.prototype.valueOf","holderType.prototype.toString","htmlSanitizer","trustedValueHolderBase","byType","HTML","CSS","URL","JS","trustAs","maybeTrusted","allowed","$SceProvider","this.enabled","$sceDelegate","documentMode","sce","isEnabled","sce.isEnabled","sce.getTrusted","parseAs","sce.parseAs","literal","sceParseAsTrusted","enumValue","lName","$SnifferProvider","eventSupport","android","userAgent","navigator","boxee","vendorPrefix","vendorRegex","bodyStyle","style","transitions","animations","webkitTransition","webkitAnimation","hasEvent","divElm","securityPolicy","isActive","$TimeoutProvider","deferreds","$$timeoutId","timeout.cancel","urlParsingNode","host","requestUrl","originUrl","$WindowProvider","$FilterProvider","filters","suffix","currencyFilter","dateFilter","filterFilter","jsonFilter","limitToFilter","lowercaseFilter","numberFilter","orderByFilter","uppercaseFilter","comperator","predicates","predicates.check","objKey","filtered","$locale","formats","NUMBER_FORMATS","amount","currencySymbol","CURRENCY_SYM","formatNumber","PATTERNS","GROUP_SEP","DECIMAL_SEP","number","fractionSize","pattern","groupSep","decimalSep","isFinite","isNegative","abs","numStr","formatedText","hasExponent","toFixed","fractionLen","min","minFrac","maxFrac","pow","round","fraction","lgroup","lgSize","group","gSize","negPre","posPre","negSuf","posSuf","padNumber","digits","neg","dateGetter","date","dateStrGetter","shortForm","jsonStringToDate","string","R_ISO8601_STR","tzHour","tzMin","dateSetter","setUTCFullYear","setFullYear","timeSetter","setUTCHours","setHours","m","s","ms","parseFloat","format","DATETIME_FORMATS","NUMBER_STRING","DATE_FORMATS_SPLIT","DATE_FORMATS","object","input","limit","out","sortPredicate","reverseOrder","reverseComparator","comp","descending","predicate","v1","v2","arrayCopy","comparator","ngDirective","FormController","toggleValidCss","isValid","validationErrorKey","INVALID_CLASS","VALID_CLASS","form","parentForm","nullFormCtrl","invalidCount","errors","$error","controls","$name","ngForm","$dirty","$pristine","$valid","$invalid","$addControl","PRISTINE_CLASS","form.$addControl","control","$removeControl","form.$removeControl","queue","validationToken","$setValidity","form.$setValidity","$setDirty","form.$setDirty","DIRTY_CLASS","$setPristine","form.$setPristine","textInputType","ctrl","ngTrim","$viewValue","$setViewValue","deferListener","keyCode","$render","ctrl.$render","$isEmpty","ngPattern","validate","patternValidator","patternObj","$formatters","$parsers","ngMinlength","minlength","minLengthValidator","ngMaxlength","maxlength","maxLengthValidator","classDirective","ngClassWatchAction","$index","flattenClasses","classes","old$index","mod","version","addEventListenerFn","addEventListener","attachEvent","removeEventListener","detachEvent","ready","trigger","fired","removeAttribute","css","currentStyle","lowercasedName","getNamedItem","ret","getText","textProp","NODE_TYPE_TEXT_PROPERTY","$dv","multiple","option","selected","onFn","eventFns","contains","compareDocumentPosition","adown","documentElement","bup","eventmap","related","relatedTarget","replaceNode","insertBefore","prepend","wrapNode","after","newElement","toggleClass","condition","nextElementSibling","getElementsByTagName","eventName","eventData","arg3","unbind","off","$animateMinErr","$AnimateProvider","$$selectors","$timeout","enter","afterNode","afterNextSibling","leave","move","XMLHttpRequest","ActiveXObject","e1","e2","e3","PATH_MATCH","paramValue","OPERATORS","null","true","false","+","-","*","/","%","^","===","!==","==","!=","<",">","<=",">=","&&","||","&","|","!","ESCAPE","lex","ch","lastCh","tokens","is","readString","peek","readNumber","isIdent","readIdent","was","isWhitespace","ch2","ch3","fn2","fn3","throwError","chars","isExpOperator","start","end","colStr","peekCh","ident","lastDot","peekIndex","methodName","quote","rawString","hex","rep","ZERO","Parser.ZERO","assignment","logicalOR","functionCall","fieldAccess","objectIndex","filterChain","this.filterChain","primary","statements","expect","consume","arrayDeclaration","msg","peekToken","e4","t","unaryFn","right","ternaryFn","left","middle","binaryFn","statement","argsFn","fnInvoke","ternary","logicalAND","equality","relational","additive","multiplicative","unary","field","indexFn","o","safe","contextGetter","fnPtr","elementFns","allConstant","elementFn","keyValues","ampmGetter","getHours","AMPMS","timeZoneGetter","zone","getTimezoneOffset","paddedZone","htmlAnchorDirective","ngAttributeAliasDirectives","propName","normalized","ngBooleanAttrWatchAction","formDirectiveFactory","isNgForm","formDirective","formElement","action","preventDefaultListener","parentFormCtrl","alias","ngFormDirective","URL_REGEXP","EMAIL_REGEXP","NUMBER_REGEXP","inputType","numberInputType","minValidator","maxValidator","urlInputType","urlValidator","emailInputType","emailValidator","radioInputType","checked","checkboxInputType","trueValue","ngTrueValue","falseValue","ngFalseValue","ctrl.$isEmpty","inputDirective","NgModelController","$modelValue","NaN","$viewChangeListeners","ngModelGet","ngModel","ngModelSet","this.$isEmpty","inheritedData","this.$setValidity","this.$setPristine","this.$setViewValue","ngModelWatch","formatters","ngModelDirective","ctrls","modelCtrl","formCtrl","ngChangeDirective","ngChange","requiredDirective","required","validator","ngListDirective","ngList","viewValue","CONSTANT_VALUE_REGEXP","ngValueDirective","tpl","tplAttr","ngValue","ngValueConstantLink","ngValueLink","valueWatchAction","ngBindDirective","ngBind","ngBindWatchAction","ngBindTemplateDirective","ngBindTemplate","ngBindHtmlDirective","ngBindHtml","getStringValue","ngBindHtmlWatchAction","getTrustedHtml","ngClassDirective","ngClassOddDirective","ngClassEvenDirective","ngCloakDirective","ngControllerDirective","ngCspDirective","ngEventDirectives","ngIfDirective","childElement","ngIf","ngIfWatchAction","ngIncludeDirective","$anchorScroll","$compile","transclusion","srcExp","ngInclude","onloadExp","autoScrollExp","autoscroll","currentElement","cleanupLastIncludeContent","parseAsResourceUrl","ngIncludeWatchAction","thisChangeId","newScope","ngInitDirective","ngInit","ngNonBindableDirective","ngPluralizeDirective","BRACE","numberExp","whenExp","whens","whensExpFns","isWhen","attributeName","ngPluralizeWatch","ngPluralizeWatchAction","ngRepeatDirective","getBlockElements","startNode","endNode","ngRepeatMinErr","linker","ngRepeat","trackByExpGetter","trackByIdExpFn","trackByIdArrayFn","trackByIdObjFn","rhs","valueIdentifier","keyIdentifier","hashFnLocals","lhs","trackByExp","lastBlockMap","ngRepeatAction","collection","previousNode","nextNode","nextBlockMap","arrayLength","collectionKeys","nextBlockOrder","trackByIdFn","trackById","id","$first","$last","$middle","$odd","$even","ngShowDirective","ngShow","ngShowWatchAction","ngHideDirective","ngHide","ngHideWatchAction","ngStyleDirective","ngStyle","ngStyleWatchAction","newStyles","oldStyles","ngSwitchDirective","ngSwitchController","cases","selectedTranscludes","selectedElements","selectedScopes","ngSwitch","ngSwitchWatchAction","change","selectedTransclude","selectedScope","caseElement","anchor","ngSwitchWhenDirective","ngSwitchWhen","ngSwitchDefaultDirective","ngTranscludeDirective","$transclude","$attrs","scriptDirective","ngOptionsMinErr","ngOptionsDirective","selectDirective","NG_OPTIONS_REGEXP","nullModelCtrl","optionsMap","ngModelCtrl","unknownOption","databound","init","self.init","ngModelCtrl_","nullOption_","unknownOption_","addOption","self.addOption","removeOption","self.removeOption","hasOption","renderUnknownOption","self.renderUnknownOption","unknownVal","self.hasOption","Single","selectElement","selectCtrl","ngModelCtrl.$render","emptyOption","Multiple","lastView","items","selectMultipleWatch","Options","render","optionGroups","optionGroupNames","optionGroupName","optionGroup","existingParent","existingOptions","modelValue","valuesFn","keyName","groupIndex","selectedSet","lastElement","trackFn","trackIndex","valueName","groupByFn","modelCast","label","displayFn","nullOption","groupLength","optionGroupsCache","optGroupTemplate","existingOption","optionTemplate","optionsExp","track","optionElement","ngOptions","ngRequired","requiredValidator","optionDirective","nullSelectCtrl","selectCtrlName","interpolateWatchAction","styleDirective","publishExternalAPI","ngModule"]
}
;
/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.2
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.2
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.2'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.2
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.2'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.2
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.2'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.2
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.2'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true,
    trigger: '[data-toggle="collapse"]'
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this })

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.2
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.2'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.2
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.2'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (that.options.backdrop) that.adjustBackdrop()
      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .prependTo(this.$element)
        .on('click.dismiss.bs.modal', $.proxy(function (e) {
          if (e.target !== e.currentTarget) return
          this.options.backdrop == 'static'
            ? this.$element[0].focus.call(this.$element[0])
            : this.hide.call(this)
        }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    if (this.options.backdrop) this.adjustBackdrop()
    this.adjustDialog()
  }

  Modal.prototype.adjustBackdrop = function () {
    this.$backdrop
      .css('height', 0)
      .css('height', this.$element[0].scrollHeight)
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.2
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.2'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
    this.arrow()
      .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isHorizontal ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.2
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.2'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.2
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.2'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.2
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.2'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.2
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.2'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $('body').height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.2",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.2",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.2",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.2",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.2",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.2",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()
}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.2",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
var indexCtrl = calculator.controller('indexCtrl', function($scope){
  $scope.calcInput = '';
  $scope.userInputs = [];

  $scope.clearCalculation = function() {
    $scope.calcInput = '';
    $scope.userInputs = [];
  };

  // $scope.userNumber = function(calcNumber) {
  //   // console.log($target);
  //   $scope.calcInput = $scope.calcInput.concat(calcNumber);
  // };

  $scope.userNumber1 = function() {
    $scope.calcInput = $scope.calcInput.concat(1);
  };
  $scope.userNumber2 = function() {
    $scope.calcInput = $scope.calcInput.concat(2);
  };
  $scope.userNumber3 = function() {
    $scope.calcInput = $scope.calcInput.concat(3);
  };
  $scope.userNumber4 = function() {
    $scope.calcInput = $scope.calcInput.concat(4);
  };
  $scope.userNumber5 = function() {
    $scope.calcInput = $scope.calcInput.concat(5);
  };
  $scope.userNumber6 = function() {
    $scope.calcInput = $scope.calcInput.concat(6);
  };
  $scope.userNumber7 = function() {
    $scope.calcInput = $scope.calcInput.concat(7);
  };
  $scope.userNumber8 = function() {
    $scope.calcInput = $scope.calcInput.concat(8);
  };
  $scope.userNumber9 = function() {
    $scope.calcInput = $scope.calcInput.concat(9);
  };
  $scope.userNumber0 = function() {
    $scope.calcInput = $scope.calcInput.concat(0);
  };
  $scope.userNumberPlus = function() {
    $scope.userInputs.push($scope.calcInput);
    console.log($scope.userInputs);
    $scope.calcInput = '';
    console.log($scope.calcInput);
  };
  $scope.userNumberMinus = function() {
    $scope.userInputs.push($scope.calcInput);
    $scope.calcInput = '-';
    console.log($scope.userInputs);
  };
  $scope.userNumberEquals = function() {
    // add final item to array and then reduce
    $scope.userInputs.push($scope.calcInput);
    $scope.userInputs = $scope.userInputs.map(Number);
    var total = _.reduce($scope.userInputs, function(memo, num){return memo + num; },0);
    $scope.calcInput = total;
    $scope.userInputs = [];
  };

});
var calculator = angular.module('calculator', []);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//







;
