/*!
* MinPubSub
* 
* @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
* 
* Original implementation by Daniel Lamb <daniellmb.com>
*/

var context = this;

(function(){
	//universal module
	if(context.module)//CommonJS module
		context.module.exports = init();
	else if(context.define)//CommonJS AMD module
		context.define("pubsub", init);
	else//traditional module
		context.PubSub = init();

	function init(){
		// the topic/subscription hash
		var cache = {};

		return {
			/*
			 * Publish some data on a named topic
			 *
			 * @param String channel The channel to publish on
			 * @param Array args The data to publish. Each array item is
			 * converted into an ordered arguments on the subscribed functions
			 *
			 * @example Publish stuff on '/some/topic'. Anything subscribed will be called with a function signature like: function(a,b,c){ ... }
			 * PubSub.publish("/some/topic", ["a", "b", "c"]);
			 */
			publish: function(channel, args){
				var subs = cache[channel],
					len = subs ? subs.length : 0,
					args = args ? args : [];

				//can change loop or reverse array if the order matters
				while(len--)
					subs[len].apply(context, args);
			},

			/*
			 * Register a callback on a named topic
			 * 
			 * @param String channel The channel to subscribe to
			 * @param Function callback The event handler, anytime something is
			 * publish'ed on a subscribed channel, the callback will be called
			 * with the published array as ordered arguments
			 * 
			 * @return Array A handle which can be used to unsubscribe this
			 * particular subscription
			 *
			 * @example PubSub.subscribe("/some/topic", function(a, b, c){ ... });
			 */
			subscribe: function(channel, callback){
				if(!(callback instanceof Function))
					throw "callback is not a function";

				if(!cache[channel])
					cache[channel] = [];

				cache[channel].push(callback);

				return [channel, callback];
			},

			/*
			 * Disconnect a subscribed function for a topic.
			 * 
			 * @param Mixed handle The return value from a subscribe call or the
			 * name of a channel as a String
			 * @param Function callback [OPTIONAL] The event handler originaally
			 * registered, not needed if handle contains the return value of subscribe
			 * 
			 * @example
			 * var handle = PubSub.subscribe("/some/topic", function(){});
			 * PubSub.unsubscribe(handle);
			 * 
			 * or
			 * 
			 * PubSub.unsubscribe("/some/topic", callback);
			 */
			unsubscribe: function(handle, callback){
				if(handle instanceof Array && handle.length > 1){
					callback = handle[1];
					handle = handle[0];
				}

				if(!(callback instanceof Function))
					throw "callback is not a function";

				var subs = cache[handle],
					len = subs ? subs.length : 0;
				
				while(len--){
					if(subs[len] === callback){
						subs.splice(len, 1);
					}
				}
			}
		};
	}	
})();

//don't hold a reference to the context to facilitate garbage collection in some
//environments
context = null;