//var Texec = Texec || {};
Texec = Class.extend({
 init : function(opcode,r1,r2,x2,b2,dx,opLen) {
// function Texec(opcode,r1,r2,x2,b2,dx,opLen) {
  this.opcode = opcode;
  this.r1 = r1;
  this.r2 = r2;
  this.x2 = x2;
  this.b2 = b2;
  this.dx = dx;
  this.opLen = opLen;
 }
});
