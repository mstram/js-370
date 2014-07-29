//
// m390.js "Hercules" in Javascript ver 1.00      July 22 / 2014  - Mike Stramba
//

//function M390() {

var M390 = M390 || {};

M390 = Class.extend({

   init: function() {
     console.log("(M390)(init)");

   var foo = 42;

   this.ct = 0;
   //this.pc = 0;
   //this.mem =[0x41,0x23,0x41,0x23,0x18,23,0x58,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

   this.opm =[];
   this.opm[0x41] = "LA";
   this.opm[0x18] = "LR";

   this.opval = [];
   this.opval[0x41] = true;

//   this.curCpu = 0;
//   this.running = false;

  // var msecs = 100;
},

//  function glob1(){
 //  console.log("(glob1) ($(document).ready)::global1Var:" + global1Var);
 // }

//
//  RX  R1,D2(X2,B2)
//  00  rx bd dd
//      12 2

//  41 23 40 01     LA    2,1(3,4)

//  L  load         RX  58  0100 1000
//  LR load reg     RR  18  0000 1000
//  LA load addrs   RX  41  0100 0001
//  LH load half    RX  48  0100 1000
//
//  ST  store       RX  50  0101 0000
//  STH store half  RX  40  0100 0000
//
//
//



// function rxDisp(Mnem,r1,x2,b2,dx){

  rxDisp: function(Mnem,r1,x2,b2,dx){
  var t = '';
  t = Mnem + "\t" + r1 + "," + dx + "(" + x2 + "," + b2 + ")";

  $('#disLine').html(t);

  console.log("(rxDisp) t:" + t);

//    $('#disR1').html(r1)
},

//function dispRunState(){

  dispRunState: function(){
  if(this.running) {
     $('#runstate').toggleClass('txtG');
     $('#runstate').html('Running')
     }
    else {
      $('#runstate').toggleClass('txtRed');
      $('#runstate').html('Stopped')
     }
},

//  function update1(){

   update1: function(){
    //M390.decode(M390.pc);
//    M1.decode(M390.pc);
//    M1.cpus[M390.curCpu].step();

    $('#pswIA').html("0x"+M1.pswIa().toString(16));
//    $('#pcCont').html(M1.mem[M1.pswIa]);
    $('#pcCont').html(M1.dispMemByteAtPswIa());
 },
    // step one instruction
   step: function(){
     M390.update1();  // temp for now
     M1.step();
   },

   restart: function(){
     console.log("(M390)(restart)");
     M1.restart();
     M390.update1();
   }

});


// ------------------------------------------


// --------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

// hmm what's the difference between using var or just M390 = new M390(); ???
//var  M390 = new M390();

 // ref : function(ob){

 M390 = new M390();
 M1   = new Machine();
