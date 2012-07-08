/*
 * pubsub.js environments support unit tests
 *
 * @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
 */

var context = this;

describe("Supported environments", function(){
	var fakeContext;

	beforeEach(function(){
		this.addMatchers({
			toMatchImplementation: function(){
				var api = this.actual;
				return api &&
					(api.publish instanceof Function) &&
					(api.subscribe instanceof Function) &&
					(api.unsubscribe instanceof Function);
			}
		});
	});

	it("Should work as a traditional JS module", function(){
		expect(PubSub).toMatchImplementation();
	});

	xit("Should work as a CommonJS module", function(){
		expect(require('pubsub')).toMatchImplementation();
	});

	xit("Should work as an AMD module", function(){
		require('pubsub', function(p){
			expect(p).toMatchImplementation();
		});
	});
});