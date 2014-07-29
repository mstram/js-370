//var Dasd350 = Dasd350 || {};
// D:\Hercules\IPL>dasdinit -z -a t3350 3350 t01
// HHCDU044I Creating 3350 volume T01: 560 cyls, 30 trks/cyl, 19456 bytes/track
// HHCDU041I 560 cylinders successfully written to file t3350
// HHCDI001I DASD initialization successfully completed.

// 19456 :: 4C00 bytes / track
// 30 trks (1 cyl) = 19,456 * 30 = 583,680 : 8E800

// head
// -----
//  1   583,680    8E800
//  2   1,167,360 11D000





Dasd3350 = Class.extend({

 init : function () {

  this.StatusCode = Object.freeze({IDLE: 99, BUSY: 1, DEVEND: 2});
   // if(this.status == this.StatusCode.IDLE) {
    // ....

 // console.log("(Dasd350)");
  this.numCyls = 560;
  this.numTrks = 30;
  this.byteTrkMax  = 19456;

  this.cyls = [];
  this.trks = [];

  this.cyl = 0;
  this.hd  = 0;
  this.id  = 0;
  this.key = 0
  this.data = [];

  this.status = this.StatusCode.IDLE;
  console.log("Dasd3350 : this.status :" + this.status);

  this.cyls = new Array(this.numCyls);

  for (var i = 0; i < this.numCyls; i++) {
    this.cyls[i] = new Array(this.numTrks);
  }
  console.log("(Dasd3350)(init) cyls.length:" + this.cyls.length + " this.cyls[0].length:" + this.cyls[0].length);
 },

 getCCW: function(ccw){
   console.log("(Dasd3350)(getCCW) ccw:"+ ccw);

  switch(ccw[0]){

  /*
                      // seek data
   this.mem[0x220] = 0;  // always 00
   this.mem[0x221] = 0;  // always 00
   this.mem[0x222] = 0;  // C
   this.mem[0x223] = 0;  // C
   this.mem[0x224] = 0;  // H
   this.mem[0x225] = 1;  // H
   */

    case(0x07):  // seek

      this.cyl = Util.convertTwoBytes(ccw.slice(2,4));
      this.hd  = Util.convertTwoBytes(ccw.slice(4,6));
      console.log("(Dasd3350)(getCCW)(switch) 0x07(SEEK) ccw:"+ccw + " this.cyl:"+this.cyl + " this.hd"+this.hd);
      break;

    case(0x1d):  // Write CKD
      console.log("(Dasd3350)(getCCW)(switch) 0x1D Write CKD");
      
      break;
    }


 },

  // write Count, Key, Data (i.e. create a new record
 // opcode 0x1D
 // must be chained from write R0 / write CKD / Search ID Equal / Search Key equal

 writeCKD: function(addr,count) {
  console.log("(Dasd3350)(writeCKD addr:" + addr + " count:" + count);
 },

// READ DATA transfers the data area of a record from disk storage to main storage. The data read is:
//I. data area of record read by search ID or search key command from which read command is chained.
//2. data area of record read by read count command from which command is chained.
//3. data area of record following next count area on the track (excluding R0).
 readData: function(addr,count) {
  console.log("(Dasd3350)(readData addr:" + addr + " count:" + count);
 }
});
