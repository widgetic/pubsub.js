pubsub.js
=========

A tiny pubsub implementation in the spirit of [microjs.com](http://www.microjs.com)
evolved from an original implementation by [Daniel Lamb](http://daniellmb.com).

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

Example
-------

```javascript
	var p = PubSub;// or require('pubsub');

	//subscribe to a topic
	var handle = p.subscribe("/some/topic", function(msg){
		console.log(msg);
	});

	//publish topic a few times
	p.publish("/some/topic", ["first time"]);
	p.publish("/some/topic", ["second time"]);

	//unsubscribe from the topic
	p.unsubscribe(handle);

	//subscriber is no longer listening to the topic
	p.publish("/some/topic", ["message will not be logged"]);
```

Documentation
------------- 
The library is implemented as a universal module, in non-AMD environments can be
used via the global PubSub instance.

##### Methods:

- **publish** *(`String` topic, `Array?` args)*

	- summary: 
		- Publish some data on a named topic.
	
	- topic: `String`
		- The channel to publish on
	
	- args: `Array?`
		- Optional data to publish. Each array item is converted into ordered arguments on the subscribed functions. 
	
	- example:
		- Publish stuff on '/some/topic'. Anything subscribed will be called with a function signature like: function(a,b,c){ ... }

		  ```javascript
		  publish("/some/topic", ["a","b","c"]);
		  ```

- **subscribe** *(`String` topic, `Function` callback)*

	- summary:
		- Register a callback on a named topic.

	- topic: `String`
		- The channel to subscribe to

	- callback: `Function`
		- The handler event. Anytime something is publish'ed on a subscribed channel, the callback will be called with the published array as ordered arguments.

	- returns: `Array`
		- A handle which can be used to unsubscribe this particular subscription.

	- example:

		  ```javascript
		  subscribe("/some/topic", function(a, b, c){ /* handle data */ });
		  ```

- **unsubscribe** *(`Array` handle)*

	- summary:
		- Disconnect a subscribed function for a topic.

	- handle: `Array`
		- The return value from a subscribe call.
	
	- example:

		```javascript
		var handle = subscribe("/some/topic", function(){});
		unsubscribe(handle);
		  ```