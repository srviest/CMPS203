abstract class Expr{
	public abstract int eval();
}
class Num extends Expr{
	int n;
	public Num(int n){
		this.n = n;	
	}
	public int eval(){
		return n;
	}
}
class Sum extends Expr{
	Expr e1, e2;
	public Sum(Expr e1, Expr e2){
		this.e1 = e1;
		this.e2 = e2;
	}
	public int eval(){
		return this.e1.eval() + this.e2.eval();
	}
}
class Mul extends Expr{
	Expr e1, e2;
	public Mul(Expr e1, Expr e2){
		this.e1 = e1;
		this.e2 = e2;
	}
	public int eval(){
		return this.e1.eval() * this.e2.eval();
	}
}

public class hw1 {
	public static void main(String[] args){
		Expr e = new Mul(new Num(3), new Sum(new Num(2), new Num(1)));
		System.out.println(e.eval());
	}
}