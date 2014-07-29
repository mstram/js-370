  function ref(msg,ob){
   var ct = 1;
    console.log("(ref)" + msg + " -------------------------------------");
   for (var m in ob) {
//     console.log("(ref) : ----------- " + m + " ----------------");
   ct++;
   //console.log(m + "[]:"+ ob[m]);}
    console.log("(ref)"+ m +" :" +ob[m]);
  // console.log("========================================");
  }
  console.log("============ ref ============================");
 }

