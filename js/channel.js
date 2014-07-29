Channel = Class.extend({
  init : function (parent) {
  console.log("(Channel)(init)");

   //this.pc = 0;

   this.parent = parent;

   this.SIOstart = 1;

   this.devs = [];
   this.devAddr = [];
   this.curDevAddr = 0;
   this.devTypes = [];

   this.ccws = [];
   this.ccwIndx = [];
   this.states = [];
   this.caw = [];

   this.cmd = 0;
   this.mem = parent.mem;
   this.status = 0;

   this.curCpu = 0;
//   this.running = false;

  this.icaw = 0;  // internal caw at
 },


 // machine:  this.channels[0x100].addDevice(0x100,new Dasd3350(),3350);

 addDevice: function(devAddr,device,devtype){
   this.devs[devAddr] = device;
   this.devTypes[devAddr] = devtype;
   console.log("(Channel)(addDevice) devAddr:" + devAddr  + " devtype:" + devtype + " device:" + device );
//   ref('Channel::addDevice',device);
 },

 sio: function(devAddr){
   console.log("(Channel)(sio) devAddr:" + devAddr );
   //this.devs[devAddr]
   this.curDevAddr = devAddr;
   this.states[devAddr] = this.SIOstart;
   this.ccwIndx[devAddr] = 0;

   this.getFirstCCW(this.curDevAddr,this.states[devAddr]);
 },


 getFirstCCW: function(devAddr,state){
  //this.ccws[this.ccwIndx[devAddr]] = this.parent.readCaw();

  //this.caw[devAddr] = this.parent.readCaw();
    this.caw[devAddr] = this.mem.slice(72,76);

    var ccwAddr = Util.convert24BitAddress(this.caw[devAddr].slice(1,4));

   this.ccws[this.ccwIndx] = this.mem.slice(ccwAddr,ccwAddr+8);
  console.log("(Channel)(getCCW) state:" + state + " this.caw[devAddr]:" + this.caw[devAddr] + " ccwAddr:"+ccwAddr + " this.ccws[this.ccwIndx]:" + this.ccws[this.ccwIndx]);

//  console.log("(Channel)(getCCW) state:" + state + " this.caw[devAddr]:" + this.caw[devAddr] + " ccwAddr:" + ccwAddr);

   this.devs[devAddr].getCCW(this.ccws[this.ccwIndx]);
 }

});

