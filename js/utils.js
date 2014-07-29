Util = Class.extend({

 convertTwoBytes: function(ar){
    return  (ar[0] *  Math.pow(2,8)) + ar[2];
  },

 convert24BitAddress: function(ar){
   return  (ar[0] * Math.pow(2,16)) + (ar[1] * Math.pow(2,8)) + ar[2];
 }
});

Util = new Util();