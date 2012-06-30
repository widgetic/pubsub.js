/*
 * pubsub.js environments support unit tests
 * 
 * @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
 */

var context = this;

describe("Supported environments", function(){
	var fakeContext;

	function initModule(scope){
		context.__pubsub_js_init__(scope);
	}

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
	})

	it("Should work as a traditional JS module", function(){
		fakeContext = {};
		initModule(fakeContext);
		expect(fakeContext.PubSub).toMatchImplementation();
	});

	it("Should work as a CommonJS module", function(){
		fakeContext = {
			module: {
				exports: {}
			}
		};

		initModule(fakeContext);
		expect(fakeContext.module.exports).toMatchImplementation();
	});

	it("Should work as an AMD module", function(){
		var definedModule = {};
		fakeContext = {
			define: function(name, func){
				definedModule.name = name;
				definedModule.instance = func();	
			}
		};

		initModule(fakeContext);
		expect(definedModule.name).toEqual('pubsub');
		expect(definedModule.instance).toMatchImplementation();
	});
});