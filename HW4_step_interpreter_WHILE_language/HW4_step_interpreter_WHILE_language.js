
function Expr() {
	this.print = function() {
		return ;
	}
    this.eval = function() {
        return ;
    }
}
function Num(n){
	this.n = n;
	this.print = function(){
		return this.n.toString() + ' ';
	}
	this.eval = function(s){
		return this.n;
	}
}
function Sum(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '+ ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s) + this.e2.eval(s);
	}
}

function Var(v){
	this.v = v;
	this.print = function(s){
		return this.v + ' ';
	}
	this.eval = function(s){
		return s[this.v];
	}
}

function Sub(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '- ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s)-this.e2.eval(s);
	}
}
function Mul(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '* ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s)*this.e2.eval(s);
	}
}
function Div(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '/ ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s)/this.e2.eval(s);
	}
}
function Mod(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '% ' + this.e2.print;
	}
	this.eval = function(s){
		return this.e1.eval(s)%this.e2.eval(s);
	}
}
function Neg(e1){
	this.e1 = e1;
	this.print = function(){
		return '- ' + this.e1.print();
	}
	this.eval = function(s){
		return - this.e1.eval(s);
	}
}

function Bool(){
	this.eval = function(){
		return;
	}
}
function Lit(l){
	this.l = l;
	this.print = function(){
		if(this.l)
			return 'true ';
		else
			return 'false ';
	}
	this.eval = function(s){
		return this.l;
	}
}
function And(b1, b2){
	this.b1 = b1;
	this.b2 = b2;
	this.print = function(){
		this.b1.print() + '&& ' + this.b2.print();
	}
	this.eval = function(s){
		return this.b1.eval(s) && this.b2.eval(s);
	}
}
function Or(b1, b2){
	this.b1 = b1;
	this.b2 = b2;
	this.print = function(){
		this.b1.print() + '|| ' + this.b2.print();
	}
	this.eval = function(s){
		return this.b1.eval(s) || this.b2.eval(s);
	}
}
function Not(b1){
	this.b1 = b1;
	this.print = function(){
		return '!' + this.b1.print();
	}
	this.eval = function(s){
		return ! this.b1.eval(s);
	}
}
function Equal(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '== ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s)==this.e2.eval(s);
	}
}
function NotEqual(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '!= ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s)!=this.e2.eval(s);
	}
}
function Great(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '> ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s)>this.e2.eval(s);
	}
}
function GreatEqual(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '>= ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s)>this.e2.eval(s);
	}
}
function Less(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '< ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s) < this.e2.eval(s);
	}
}
function LessEqual(e1, e2){
	this.e1 = e1;
	this.e2 = e2;
	this.print = function(){
		return this.e1.print() + '<= ' + this.e2.print();
	}
	this.eval = function(s){
		return this.e1.eval(s) <= this.e2.eval(s);
	}
}
function Com(){
	this.print = function(){
		return;
	}
	this.eval = function(s){
		return;
	}
}
function Skip(){
	this.print = function(){
		return "Skip(); ";
	}
	this.eval = function(s){
		return [s, new Skip()];
	}
}
function Next(c1, c2){
	this.c1 = c1;
	this.c2 = c2;
	this.print = function(){
		return this.c1.print() + this.c2.print();
	}
	this.eval = function(s){
		if(this.c1.constructor.name != "Skip"){
			sCom = this.c1.eval(s);
			return [sCom[0], new Next(sCom[1], this.c2)];
		}
		else
			return [s, this.c2];
	}
}
function Assign(varName, e){
	this.varName = varName;
	this.e = e;
	this.print = function(){
		return this.varName + ' := ' + this.e.print() + "; ";
	}
	this.eval = function(s){
		s[this.varName] = this.e.eval(s);
		return [s, new Skip()];
	}
}
function If(deter, trueC, elseC){
	this.deter = deter;
	this.trueC = trueC;
	this.elseC = elseC;
	this.print = function(){
		return "if( " + this.deter.print() + "){ " + this.trueC.print() 
				+ "} else{ " + this.elseC.print() + "} ";
	}
	this.eval = function(s){
	if(this.deter.eval(s))
		return [s, this.trueC];
	else
		return [s, this.elseC];
	}
}
function While(deter, trueC){
	this.deter = deter;
	this.trueC = trueC;
	this.print = function(){
		return "while( " + this.deter.print() + "){ " + this.trueC.print() + "} ";
	}
	this.eval = function(s){
	if(this.deter.eval(s)){
		return [s, new Next(this.trueC, new While(this.deter, this.trueC))];
	}
	else
		return [s, new Skip()];
	}
}
Num.prototype = new Expr();
Sum.prototype = new Expr();
Var.prototype = new Expr();
Sub.prototype = new Expr();
Mul.prototype = new Expr();
Div.prototype = new Expr();
Mod.prototype = new Expr();
Neg.prototype = new Expr();

Lit.prototype = new Bool();
And.prototype = new Bool();
Or.prototype = new Bool();
Not.prototype = new Bool();
Equal.prototype = new Bool();
NotEqual.prototype = new Bool();
Great.prototype = new Bool();
GreatEqual.prototype = new Bool();
Less.prototype = new Bool();
LessEqual.prototype = new Bool();

Skip.prototype = new Com();
Skip.prototype.constructor = Skip;
Next.prototype = new Com();
Next.prototype.constructor = Next;
Assign.prototype = new Com();
Assign.prototype.constructor = Assign;
If.prototype = new Com();
If.prototype.constructor = If;
While.prototype = new Com();
While.prototype.constructor = While;


function evalAll(s, c){
	res = "";
	sCom = [s,c];
	while(sCom[1].constructor.name != "Skip"){
		res += "\< ";
		res += sCom[1].print();
		res += ", ";
		res += JSON.stringify(sCom[0]);
		res += " \> -> <br><br>";
		sCom = sCom[1].eval(s);
	}
	res += "\< ";
	res += sCom[1].print();
	res += ", ";
	res += JSON.stringify(sCom[0]);
	res += " \> -> <br><br>";
	return res;
}

var testCaseDict = {};
// testCase
var c1 = new Assign('x', new Num(0));
var c2 = new If(new Great(new Num(7), new Num(15)), new Assign('x', new Num(10)), new Assign('x', new Num(20)));
var testCase = new Next(c1, c2);

s = {};
testCaseDict["testCase"] = evalAll(s, testCase); 

function showSomething(ID) {
    var div = document.getElementById(ID);
    if(div.style.display=="none"){
    	div.style.display='block';
    	div.innerHTML = testCaseDict[ID];
    }else{
    	div.style.display='none';
    }
}
