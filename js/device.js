Device = Class.extend({
  init : function (driver,addr,devtype) {

  console.log("(Device)(init) driver:" + driver + " addr:"+ addr + " devtype:" + devtype);
//   console.log("(Machine)(init) driver:" + driver + " addr:"+ addr);
//  ref('Device::init',driver);  // debug display

  this.addr = addr;
  this.devtype = devtype;
  this.driver = driver;
 },
 sendCmd: function(cmd,args){
   console.log("(Device)(sendCmd) cmd:" + cmd + " args" + args);
 }
});

