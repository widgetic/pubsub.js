pubsub.js
=========

A tiny (~600 bytes when minified, ~300 bytes when gzip'd) and robust
[pubsub][pubsub definition]
implementation in the spirit of [microjs.com][microjs] evolved
from an original implementation by [Daniel Lamb][daniel's blog]
(of which, after refactoring and optimizing, only the method names have been kept,
hence the change in the project's name).

The library is implemented as a universal module to support CommonJS-enabled, AMD-enabled and
traditional Javascript environments and the code is optimized to be as compact,
fast and memory-savvy as possible.

The code has also been tested toroughly and the functionality is secured with a
complete [set of unit tests][tests]
built with [Jasmine][jasmine].

Supported platforms
-------------------

*	Node.js
*	Rhino
*	Appcelerator Titanium Mobile 2.0+
*	EcmaScript 5 capable browsers
	*	Google Chrome 5+
	*	Safari 4+
	*	Internet Explorer 5+
	*	Firefox 3+
	*	Opera 10+
	*	Android
	*	Mobile Safari
	*	Firefox Mobile (Fennec)
	*	Opera Mobile 10+

Documentation
-------------

The description of each method and its' parameters are inlined in the [library's source][source]
using the Javadoc syntax.

### Examples ###
Using the library as a traditional Javascript module:

```javascript
	var p = PubSub;

	//subscribe to a channel
	var handle = p.subscribe("/some/channel", function(msg){
		console.log(msg);
	});

	//publish a message
	p.publish("/some/channel", "Hello!");

	//unsubscribe from the topic
	p.unsubscribe(handle);
```

Here's the same example using the library as a standard CommonJS module:

```javascript
	var p = require('pubsub');

	//subscribe to a channel
	var handle = p.subscribe("/some/channel", function(msg){
		console.log(msg);
	});

	//publish a message
	p.publish("/some/channel", "Hello!");

	//unsubscribe from the topic
	p.unsubscribe(handle);
```

Alternatively using the library as an AMD module (where possible, see
[RequireJS][requirejs] for more info):

```javascript
	require('pubsub', function(p){
		//subscribe to a channel
		var handle = p.subscribe("some/channel", function(msg){
			console.log(msg);
		});
	
		//publish a message
		p.publish("/some/channel", "Hello!");
	
		//unsubscribe from the topic
		p.unsubscribe(handle);
	});
```

The publish function support any number and type of data parameters:

```javascript
	PubSub.subscribe('/some/channel', function( a, b, c, d ){ /* ... */ });
	PubSub.publish('/some/channel', 1 /* a */, "two" /* b */, [3, 4, 5] /* c */, {total: 15} /* d */);
```

Credits
-------

*	[Federico "Lox" Lucignano](https://plus.google.com/117046182016070432246 "Google profile"), creator and mantainer
*	[Daniel Lamb](daniellmb.com), original code
*	All the [contributors](http://github.com/federico-lox/pubsub.js/contributors "pubsub.js contributors at GitHub")


[codeclimate]: https://codeclimate.com/github/federico-lox/pubsub.js
[pubsub definition]: http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
[microjs]: http://www.microjs.com
[daniel's blog]: http://daniellmb.com
[tests]: https://github.com/federico-lox/pubsub.js/tree/master/spec
[jasmine]: http://pivotal.github.com/jasmine/
[source]: https://github.com/federico-lox/pubsub.js/blob/master/src/pubsub.js
[requirejs]: http://requirejs.org/
