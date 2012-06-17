/*
 * pubsub.js environments support unit tests
 * 
 * @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
 */

//this test is a bit hacky since it requires mocking different JS environments
//and re-initialize the code each time
describe("Supported environments", function(){
	var definedModule = {},
	scriptPath = "src/pubsub.js",
	xhReq = new XMLHttpRequest(),
	code;

	//fetch the library code
	xhReq.open("GET", scriptPath, false /* synchronous */);
	xhReq.send(null);
	code = xhReq.responseText;

	beforeEach(function(){
		this.addMatchers({
			toMatchImplementation: function(){
				var api = this.actual;
				return api && api.publish && api.subscribe && api.unsubscribe;
			}
		})
	})

	afterEach(function(){
		//re-initialize the library
		eval(code);
	});

	it("Should work as a traditional JS module", function(){
		expect(PubSub).toMatchImplementation();

		//prepare for next test
		window.module = {
			exports: {}
		};
	});

	it("Should work as a CommonJS module", function(){
		expect(module.exports).toMatchImplementation();

		//prepare for next test
		window.module = undefined;
		window.define = function(name, func){
			definedModule.name = name;
			definedModule.instance = func();	
		};
	});

	it("Should work as an AMD module", function(){
		expect(definedModule.name).toEqual('pubsub');
		expect(definedModule.instance).toMatchImplementation();

		//cleanup
		window.define = undefined;
		definedModule = null;
	});
});