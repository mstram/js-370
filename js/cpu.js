//var CPU = CPU || {};
CPU = Class.extend({

 init : function(id,parent){
// CPU :  function(id) {
// function CPU(id) {

  this.parent = parent;
  this.mem    = parent.mem;

  this.cpuid = id;
  this.gregs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  this.cregs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  this.psw = new PSW(this.cpuid);

  this.running = false;

//  console.log("(CPU)(init) cpuid:" + this.cpuid);  //+ " parent.mem:" + parent.mem);

 },
 
 //     00         00         00
 // 0000 0000  0000 0000  0000 0000
 // 2       1  1       8          0
 // 3       6  5
//  2 ** 24-1 16777215

  restart: function(){
   var t = [];
   var t = this.mem.slice(5,8);

//   var tt0 = t[0] * Math.pow(2,16);
//   var tt1 = t[1] * Math.pow(2,8);
//   var tt2 = t[2];
//   console.log("t[0] :" + t[0] + " t[1]:" + t[1] + " t[2]:" + t[2]);
//   console.log("tt0 :" + tt0 + " tt1:" + tt1 + " tt2:" + tt2);
   var pswIa = (t[0] * Math.pow(2,16)) + (t[1] * Math.pow(2,8)) + t[2];
   console.log("(CPU)(restart)cpuid:" + this.cpuid + "  mem.slice(5,9):" + this.mem.slice(5,8) + "pswIa:" + pswIa + "  0x" + pswIa.toString(16));
   this.psw.ia = pswIa;
   this.running = true;

   dumpMem(pswIa);
 },


 reset: function(){
 },

 doIo: function(devAddr){
   this.parent.sio(devAddr);
 },

 pswIa: function(){
   return this.psw.ia;
 },

 step: function(){
   console.log("(CPU)step")
   this.decode();
 },

 start: function(){
   this.running = true;
 },

 storeGPR: function(reg,val){
   this.gregs[reg] = val;
  // console.log("(CPU)(storeGPR) reg: " + reg + " val:" + val + "this.gregs["+reg+"]:" + this.gregs[reg]);
 },

  decode: function(){
// function decode(opc){
  var r1,x2,b2,dx,dxhi,dxlo = 0;

 // var opcode = M390.mem[M390.pc];
 // var op1 = M390.mem[M390.pc+1];
 // var op2 = M390.mem[M390.pc+2];
 // var op3 = M390.mem[M390.pc+3];

  var opcode = this.mem[this.psw.ia];
  var op1    = this.mem[this.psw.ia+1];
  var op2    = this.mem[this.psw.ia+2];
  var op3    = this.mem[this.psw.ia+3];

//  console.log("-- decode --- pc:"+ M390.pc + " opcode:0x" + opcode.toString(16) + " op1:0x" + op1.toString(16) + " op2:0x" + op2.toString(16) + " op3:0x" + op3.toString(16));

 console.log("(CPU)(this.cpuid):" + this.cpuid + "(decode) this.psw.ia:" + this.psw.ia + " opcode:0x" + opcode.toString(16) + " op1:0x" + op1.toString(16) + " op2:0x" + op2.toString(16) + " op3:0x" + op3.toString(16));

  var isRx = opcode & 0x4F;
  console.log("isRx (0x40): " + isRx);

  if(M390.opval[opcode])
   console.log("opval YES opm[opcode]:"+ M390.opm[opcode]);
  else
   console.log("opval NO");

  if(isRx) {
    console.log("op1: " + op1);
    r1   = (op1 & 0xf0) / 16;
    x2   = (op1 & 0x0f);
    b2   = (op2 & 0xf0) / 16;
    dxhi = (op2 & 0x0f) * 256;
    dx   = (dxhi + op3);

   console.log("isRx YES  r1:" + r1 + " x2:" + x2 + " b2:" + b2 + " dxhi:" + dxhi + " dx:" + dx);

   $('#disMnem').html(M390.opm[opcode]);
   M390.rxDisp(M390.opm[opcode],r1,x2,b2,dx)

   //this.psw.incBy(4);
 }

  switch(opcode){
    case(0x9c):  // sio
     var devAddr = this.mem[this.psw.ia +2] * Math.pow(2,8) + this.mem[this.psw.ia +3];
     console.log("(CPU)(decode)(switch) 0x9c SIO  this.psw.ia:" + this.psw.ia + " this.mem[this.psw.ia]:" + this.mem[this.psw.ia] + " devAddr:"+devAddr );
     this.doIo(devAddr);
     this.psw.incBy(4);
     break;

    case(0x41):
     console.log("(CPU)(decode)(switch) 0x41 LA");
     this.psw.incBy(4);
     break;

    case(0x18):
     console.log("(switch) 0x18 LR");
     this.decodeRR(opcode,r1,op1);
     break;

    default:
     console.log("(switch)unknown");
   }
 },

// function decodeRR(opcode,r1,op1){

 decodeRR: function(opcode,r1,op1){
  var r2 = (op1 & 0x0f);
  console.log("decodeRR opcode:" + opcode.toString(16) + " r1:" + r1 + " r2:" + r2 + " Mn:" + M390.opm[opcode]);

//  var tx = new Texec(opcode,r1,r2,x2,b2,dx,2);
  var tx = new Texec(opcode,r1,r2,0,0,0,2);
  this.execInst(tx);
},

// function execInst(txExec){

  execInst:  function(txExec){
  console.log('(execInst) txExec:' + txExec + "txExec.opcode:"+ txExec.opcode.toString(16) + " txExec.opLen:"+ txExec.opLen);

  switch(txExec.opcode){

   case(0x9c):  // sio
     console.log('(execInst)(switch) 0x9c (BEF)  this.gregs' + this.gregs);
    break;

   case(0x18):
    console.log('(execInst)(switch) 0x18 (BEF)  this.gregs' + this.gregs);
    this.gregs[txExec.r1] = this.gregs[txExec.r2];
    console.log('(execInst)(switch) 0x18 (AFT)  this.gregs' + this.gregs);
   break;

   default:
    console.log('(execInst)(default) unknown opcode :'+ txExec.opcode );
  }

  // M390.pc += txExec.opLen;
  this.psw.incBy(txExec.opLen);
 },

});
//CPU = new CPU();

//function test() {
// var a = ["a", "b", "c"];
// a.forEach(function(entry) {
//    console.log(entry);
// }
//}