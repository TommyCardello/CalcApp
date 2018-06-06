
var Fcalc = document.calc;
var Currents = 0;
var FlagNewNum = false;
var PendingOp = "";
var stack=[];
var lastOp='@';
$(document).ready(function(){
  Fcalc={ReadOut:$('#editWide')[0]}
  $('.key').on('click',function(){
    var key=this.value;
    if('0123456789'.indexOf(key) != -1){
      NumPressed(this.value);
    } else if ('+-/*='.indexOf(key) != -1){
      Operation(key);
    } else {
      switch(key){
        case 'C': 
          Clear();    
          break;
        case 'CE': 
          ClearEntry(); 
          break;
        case '+/-': 
          Neg(); 
          break;  
        case '√': 
          Radic(); 
          break;
        case '²': 
          Invol(); 
          break;
        case '%': 
          Percent(); 
          break;
        case '.':
          Decimal();
          break;  
        default:
          console.log(key);
          break;
      }
    }
  })
});
// обработчик нажатия цифровой кнопки. 
// num button click handler
function NumPressed (Num) {
    if (FlagNewNum) 
    {
      Fcalc.ReadOut.value = Num;
      FlagNewNum = false;
    } 
    else 
    {
      if (Fcalc.ReadOut.value == "0")
        Fcalc.ReadOut.value = Num;
      else
        Fcalc.ReadOut.value += Num;
    }
}

function CalcStack(){
  var res=0;
      
  while(stack.length>=3){
    if(stack[stack.length-1]=='='){
      stack.pop();
    } else {
      var v1=parseFloat(stack.pop());
      var op=stack.pop();
      var v2=parseFloat(stack.pop());
      switch(op){
        case '+': res=v2+v1; break;
        case '-': res=v2-v1; break;
        case '*': res=v2*v1; break;
        case '/': res=v2/v1; break;
      }
      stack.push(res);
    }
  }
  lastOp='@';
  return res;
}  
// обработчик нажатия кнопки действия 
// Action Button click handler
function Operation (Op) 
{
    var Readout = Fcalc.ReadOut.value;
    stack.push(Readout);

    var priorities='=+-*/';
    var lastOpPriority=priorities.indexOf(lastOp);
    var opPriority=priorities.indexOf(Op);
    if(opPriority<=lastOpPriority){
      var stackVal=CalcStack();
    } else {
      stack.push(Op);
      lastOp=Op;
      stackVal='0';
    }
    FlagNewNum=false;
    Fcalc.ReadOut.value = stackVal;
}
  
// добавление точки к числу
// Adding dot
function Decimal () 
{
    var curReadOut = Fcalc.ReadOut.value;
    if (FlagNewNum) 
    {
      curReadOut = "0.";
      FlagNewNum = false;
    }
    else
    {
      if (curReadOut.indexOf(".") == -1)
        curReadOut += ".";
    }
    Fcalc.ReadOut.value = curReadOut;
}
  
// Очистка текущего результата
// Reset values
function ClearEntry () 
{
    Fcalc.ReadOut.value = "0";
    stack=[];
}
  
// Полная очистка всех результатов
// Full recet/clean values
function Clear () 
{
    lastOp = "@";
    ClearEntry();

}

//Корень квадратный
// square root

function Radic ()
{
	Fcalc.ReadOut.value = 
	Math.sqrt(parseFloat(Fcalc.ReadOut.value));
}
 
// меняем знак текущего результата
// change minus/plus
function Neg () 
{
    Fcalc.ReadOut.value = 
    parseFloat(Fcalc.ReadOut.value) * -1;
}
  
// вычисляем значение процентов
// % calc
function Percent () 
{
    Fcalc.ReadOut.value = 
      (parseFloat(Fcalc.ReadOut.value) / 100) * 
      1;
}

//Возведение в квадрат
// square 
function Invol ()
{ Fcalc.ReadOut.value = 
      Math.pow((Fcalc.ReadOut.value),(2))
  }

