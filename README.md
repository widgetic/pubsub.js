pubsub.js
=========

A tiny (~600 bytes when minified, ~300 bytes when gzip'd)
[pubsub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
implementation in the spirit of [microjs.com](http://www.microjs.com) evolved
from an original implementation by [Daniel Lamb](http://daniellmb.com).

The library is implemented as a universal module to support CommonJS-enabled, AMD-enabled and
traditional Javascript environments.

Supported platforms
-------------------
*	Node.js
*	Rhino
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

Examples
--------
Using the library as a traditional Javascript module:

```javascript
	var p = PubSub;

	//subscribe to a channel
	var handle = p.subscribe("/some/channel", function(msg){
		console.log(msg);
	});

	//publish a message
	p.publish("/some/channel", ["Hello!"]);

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
	p.publish("/some/channel", ["Hello!"]);

	//unsubscribe from the topic
	p.unsubscribe(handle);
```

Alternatively using the library as an AMD module (where possible, see
[RequireJS](http://requirejs.org/) for more info):

```javascript
	require('pubsub', function(p){
		//subscribe to a channel
		var handle = p.subscribe("/some/channel", function(msg){
			console.log(msg);
		});
	
		//publish a message
		p.publish("/some/channel", ["Hello!"]);
	
		//unsubscribe from the topic
		p.unsubscribe(handle);
	});
```

Documentation
------------- 
The description of each method and its' parameters are inlined in the [library's
source](https://github.com/federico-lox/pubsub.js/blob/master/pubsub.js) using the Javadoc syntax.