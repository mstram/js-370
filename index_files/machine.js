// var Machine = Machine || {};
Machine = Class.extend({
  init : function () {
// function Machine() {
  console.log("(Machine)");

   //this.pc = 0;
   this.mem = [];
   for(var x =0;x<2000;x++) this.mem[x] = 0;
   this.mem[0] = 0;    // PSW CWP
   this.mem[1] = 8;    // PSW CWP

   this.mem[4] = 0;   //
   this.mem[5] = 0;
   this.mem[6] = 2;
   this.mem[7] = 0;
   
   // ccw
   this.mem[16] = 7;      // seek cc aa aa aa  ffffff 00 cc cc
   this.mem[17] = 0;      // seek data at 0x220
   this.mem[18] = 0x02;
   this.mem[19] = 0x20;

   this.mem[20] = 0x60;
   this.mem[21] = 0;
   this.mem[22] = 0;
   this.mem[23] = 6;
                              // seek data
   this.mem[0x220] = 0;  // always 00
   this.mem[0x221] = 0;  // always 00
   this.mem[0x222] = 0;  // C
   this.mem[0x223] = 0;  // C
   this.mem[0x224] = 0;  // H
   this.mem[0x225] = 1;  // H

//   this.mem[6] = 2;   // 0x0200 restart address


   this.mem[0x200] = 0x9c;   // SIO  0x100
   this.mem[0x201] = 0;
   this.mem[0x202] = 1;
   this.mem[0x203] = 0;

   this.mem[0x204] = 0x18;   // LR 7,3
   this.mem[0x205] = 0x73;

   // caw
   this.mem[72] = 0;
   this.mem[73] = 0;
   this.mem[74] = 0;
   this.mem[75] = 0x10;

   this.curCpu = 0;
//   this.running = false;

  this.caw = [];  // internal caw at

  this.cpus = [];
  this.devs = [];
  this.channels = [];

  this.channels[0x100] = new Channel(this);

  this.channels[0x100].addDevice(0x100,new Dasd3350(),3350);

 //addDevice: function(devAddr,device){
 // this.devs[0x100] = new Device(new Dasd3350(),0x100,3350);

  this.numCpu = 3;
  this.cpus[0] = new CPU('CPU0',this);
  this.cpus[1] = new CPU('CPU1',this);
  this.cpus[2] = new CPU('CPU1',this);
 },

  storeBytes: function(startAddr,data){
   console.log("(Machine)storeBytes startAddr:"+startAddr + " data:" + data);
  },

  dispMemByteAtPswIa: function(){
   var tb =  this.mem[this.cpus[this.curCpu].psw.ia];
   console.log("(Machine)(dispMemByteAtPswIa) this.cpus[this.curCpu].psw.ia:" + this.cpus[this.curCpu].psw.ia + " tb:"+ tb);
   return tb;
  },

  pswIa: function(){
    return this.cpus[this.curCpu].pswIa();
  },

  step: function(){
   console.log("(machine)(step)");
   this.cpus[this.curCpu].step();
 },

 sio: function(devAddr){
   console.log("(machine)(sio) devAddr:" + devAddr);
   this.channels[devAddr].sio(devAddr);
 },

 readCaw: function() {
  console.log("(machine)(readCaw)");
   return this.mem.slice(72,76);
 },

  restart: function(){
   console.log("(machine)(restart)");
   this.cpus[this.curCpu].restart();
 },

  ipl: function(){
   console.log("(machine)(ipl)");
 },

  stop: function(){
   console.log("(machine)(stop)");
 },

  start: function(){
   console.log("(machine)(start)");
 },

  reset: function(){
   console.log("(machine)(reset)");
 }

});
