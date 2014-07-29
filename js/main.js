//
// main.js for hercules javascript
//

  function mainTimerFunction() {
    var date = new Date();

   if(M390.running)
     M390.update1();

    var t = date.toLocaleTimeString();
//    document.getElementById("timer1").innerHTML = t;
//    $('#timer1').html(t);
  }

  function mainTimerStop() {
    clearInterval(mainTimer);
  }

//
//  main start
//


// function mtest1(){

  function mtest1(){
 //  M1.cpus[M390.curCpu].gregs[0] = 10;

  M1.cpus[M1.curCpu].storeGPR(0,42);
  M1.cpus[M1.curCpu].storeGPR(1,10);
  M1.cpus[M1.curCpu].storeGPR(2,20);
  M1.cpus[M1.curCpu].storeGPR(3,30);
  M1.cpus[M1.curCpu].storeGPR(4,40);
  M1.cpus[M1.curCpu].storeGPR(5,50);
  M1.cpus[M1.curCpu].storeGPR(6,60);
  M1.cpus[M1.curCpu].storeGPR(7,70);
  M1.cpus[M1.curCpu].storeGPR(8,80);
  M1.cpus[M1.curCpu].storeGPR(9,90);
  M1.cpus[M1.curCpu].storeGPR(10,100);
  M1.cpus[M1.curCpu].storeGPR(11,110);
  M1.cpus[M1.curCpu].storeGPR(12,120);
  M1.cpus[M1.curCpu].storeGPR(13,130);
  M1.cpus[M1.curCpu].storeGPR(14,140);
  M1.cpus[M1.curCpu].storeGPR(15,150);


   M1.cpus[M1.curCpu].storeGPR(15,40);

//  console.log("mtest1 gregs:"+ M1.cpus[M1.curCpu].gregs );
 }


//  var M1 = new Machine();

  var mainTimer = {};
  var msecs = 1000;

     $(document).ready(function() {
           //  $('#myForm').ajaxForm();
            console.log("$(document).ready M1:" + M1);



                // var M390m = new M390();

             //var M = new M390();
            // var M1   =  new Machine();

             mtest1();

          // var global1Var = "initial stuff at document.ready";
         // glob1();

      // ----------------------------------------
       $('#restart').click(function() {
         console.log("restart-button");
         M390.restart();
         //dumpMem(0);
       })

      // -----------------------------------------
       $('#pauseBut').click(function() {
          console.log('pause button pressed');
           M390.running = ! running;

           if(M390.running) {
             console.log("cpu WAS running now stopped");
             mainTimerStop();
             $('#pauseBut').html('Start');
             M390.dispRunState();
            }
           else {
            console.log("cpu WAS stopped, now running");
            mainTimer = setInterval(function(){mainTimerFunction()}, msecs);
           $('#pauseBut').html('Stop');
           M390.dispRunState();
           }
       })
      // ---------------------------------------------

      // ----------------------------------------
       $('#stepBut').click(function() {
          console.log('STEP button pressed');
          // running = ! running;

           if(M390.running) {
             console.log("cpu IS running - stop it first");
             return 1;
           //  mainTimerStop();
           //  $('#pauseBut').html('Start');
            }
           else {
            console.log("cpu WAS stopped, stepping");
          //  mainTimer = setInterval(function(){mainTimerFunction()}, msecs);
           //$('#pauseBut').html('Stop');

           // M390.update1();
           M390.step();
           }
       })
       var vhide = false;

      // ---------------------------------------------
       $('#butest1').click(function() {

         vhide = ~ vhide;
         console.log("(#butest1) vhide:"+vhide);

         if(vhide)
          $('#vtest').toggleClass('txtHid');
         else
           $('#vtest').toggleClass('txtVis');

        // $('#vtest').hide()
         })
      // ------------------------------------------------

       //$('#memdump').html(mem);
        //dumpMem(M1);
        dumpMem(0);

       //running = true;
       M390.dispRunState();
       mainTimer = setInterval(function(){mainTimerFunction()}, msecs);

     //var jqt = $('#t1');
     //console.log("jqt $('#t1') : " + jqt);

  });

function d1(ob){
 var inh = '';
 console.log("(d1) ob: " + ob  + " ob.id:" + ob.id + " typeof(ob):" + typeof(ob) + " ob.length:" + ob.length);

 for (var i=0; i <ob.childNodes.length ;i++ ) {
   // if(! (inh = ob.innerHTML)) {
    inh = ob.childNodes[i].innerHTML;
    if(!inh)
       inh = '';
    console.log(i + ": " + ob.childNodes[i]  + " inh:" + inh);
   //console.log(i + ": " + ob.childNodes[i]);
   //console.log(i + ": " + ob.childNodes[11]  + " inh:" + inh);
  }
}

function dumpMem(startAddr){
//function dumpMem(M1,start){
  var lenmem = M1.mem.length;
  console.log('len: ' + lenmem);
 //mem.forEach(function(entry) {
   for(var x=startAddr ;x < startAddr + 18; x++){   // x < lenmem
    //console.log(entry.toString(16));
//    console.log(M1.mem[x]);
   $('#memdump2').append(M1.mem[x].toString(16)).append(' : ');
 }
 //)

}
