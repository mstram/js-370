var PSW = PSW || {};
PSW = Class.extend({
 init : function(p) {
//  console.log("(PSW) p: " + p);
  this.sm = 0;
  this.pk = 0;
  this.cmwp = 0;
  this.as   = 'pri';
  this.cc   = 0;
  this.pm   = 0;
  this.am   = 24;
  this.ia   = 0;
 },

 iaInc: function(cnt){
  this.ia++;
 },

 getIA: function(){
   return this.ia;
 },

 incBy: function(n){
   this.ia += n;
 }

});

//PSW  = new PSW();
