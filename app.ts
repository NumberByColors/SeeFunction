class Greeter {
	greet(name: string){
		alert("Hey there, " + name + "!");
	}
}

var myGreeter = new Greeter();
myGreeter.greet("David");