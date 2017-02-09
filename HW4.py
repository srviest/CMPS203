# Programming Assignment 2 - The WHILE language:
# In Haskell (or the language of your choice), write an interpreter for the WHILE language (slides on the WHILE language are available on the course webpage -> resources -> slides ).  Your program should consist of:

# A data structure for the abstract syntax tree (AST) of WHILE. You can decide on an appropriate representation (e.g. strings) for variables.
# An interpreter for this AST.  You should choose a suitable representation for stores. Your interpreter should include functions to evaluate arithmetic expressions, boolean expressions, and commands.
# Test cases which show that your AST and interpreter work.  These test cases should show good code coverage (i.e. test all cases)
# Finally, add a feature to your language.  This addition will involve modifying the AST and interpreter to support this new feature.
class Exp(object):
    def __init__(self):
        self.e = None
    def eval(self,s):
        return 

class IntExp(Exp):
    def __init__(self, n):
        self.e = n
    def eval(self,s):
        return self.e

class VarExp(Exp):
    def __init__(self, n):
        self.str = n
    def eval(self,s):
        return s[self.str]

class SumExp(Exp):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval() + self.e2.eval()

class MinExp(Exp):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval() - self.e2.eval()

class MulExp(Exp):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval() * self.e2.eval()

class DivExp(Exp):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval() / self.e2.eval()

class ModExp(Exp):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval() % self.e2.eval()



class Bool(object):
    def __init__(self):
        self.b = None
    def eval(self,s):
        return 

class Great(Bool):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval(s) > self.e2.eval(s)

class GreatEqual(Bool):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval(s) >= self.e2.eval(s)

class Equal(Bool):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval(s) == self.e2.eval(s)

class LessEqual(Bool):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval(s) <= self.e2.eval(s)

class Less(Bool):
    def __init__(self, e1, e2):
        self.e1 = e1
        self.e2 = e2
    def eval(self,s):
        return self.e1.eval(s) < self.e2.eval(s)



class Comm(object):
    def eval(self,s):
        return 

class Skip(Comm):
    def __init__(self):
        self.e = None
    def eval(self,s):
        return s

class Assign(Comm):
    def __init__(self, Str, e):
        self.e = e
        self.Str = Str

    def eval(self, s):
        s[self.Str] = self.e.eval(s)
        return s

class Next(Comm):
    def __init__(self,c1,c2):
        self.c1 = c1
        self.c2 = c2
    def eval(self,s):
        s1 = self.c1.eval(s)
        s2 = self.c1.eval(s1)
        return s2

class If(Comm):
    def __init__(self,b,c1,c2):
        self.b = b
        self.c1 = c1
        self.c2 = c2
    def eval(self,s):
        if b.eval(s):
            return c1.eval(s) 
        else:
            return c2.eval(s) 

class While(Comm):
    def __init__(self,b,c):
        self.b = b
        self.c = c
    def eval(self,s):
        if b.eval(s):
            s1=c.eval(s)
            s2 = While(b,c).eval(s1)
            return s2
        else: 
            return s            


def evalAll(s,c):
    res=''
    sCom = [s,c]
    # print type(sCom[1]).__name__
    while (type(sCom[1]).__name__!="Skip"):
        "enter loop"
        res += "\\< "
        # # res += sCom[1].print()
        res += ", "
        res += str(sCom[0])
        res += " \\> -> <br><br>"
        # sCom = sCom[1].eval(s)
    
    res += "\\< "
    # res += sCom[1].print()
    res += ", "
    res += str(sCom[0])
    res += " \> -> <br><br>"
    return res
# test cases

c1 = Assign('i',IntExp(0))
c2 = Assign('x', IntExp(0))
ifC1_d1 = Assign('x', MinExp(DivExp(MulExp(SumExp(VarExp('x'), VarExp('i')), IntExp(4)), IntExp(2)), IntExp(-2)))
ifC1_d2 = Assign('x', DivExp(MulExp(SumExp(VarExp('x'), VarExp('i')), IntExp(4)), IntExp(2)))
ifC1 = If(Equal(ModExp(VarExp('i'), IntExp(2)), IntExp(0)), ifC1_d1, ifC1_d2)
ifC2_d1 = Assign('y', IntExp(3))
ifC2_d2 = Skip()
ifC2 = If(Great(IntExp(3), IntExp(1)), ifC2_d1, ifC2_d2)
whileC = Next(Next(ifC1, Assign('i', SumExp(VarExp('i'), IntExp(1)))), ifC2)
c3 = While(Less(VarExp('i'), IntExp(5)), whileC)
testCase1 = Next(Next(Next(c1, Skip()),c2), c3)
s = dict()
c3 = While(Less(VarExp('i'), IntExp(5)), whileC)
tc0 =  Next(Next(Next(c1, Skip()),c2), c3)
# print tc0.eval(s)

evalAll(s, tc0)