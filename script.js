var n, r, k, polinom, message, i, arrMain, arrTemp, encode, counter;
var decoceBtn = document.querySelector("#decoceBtn");
decoceBtn.classList.add("disabled");
decoceBtn.setAttribute("disabled", "disabled");

function Encode(){
  decoceBtn.classList.remove("disabled");
  decoceBtn.removeAttribute("disabled");
  document.querySelector("#main-2d-arr").innerHTML = "";
  document.querySelector("#k-str").innerHTML = "";
  document.querySelector("#k-message").innerHTML = "";

  n = document.querySelector("#n").value;
  k = document.querySelector("#k").value;
  polinom = document.querySelector("#polinom").value;
  message = document.querySelector("#message").value;

  r = n-k;
  polinom = polinom.split("").reverse().join("");

  arrMain = "";
  for (var j = 0; j < r; j++) {
    arrMain += "0";
  }
  document.querySelector("#add-bits").innerHTML = arrMain;

  arrTemp = "";
  encode = "";
  i = 0;
  while(i != k){

    arrTemp += message[i] ^ arrMain[arrMain.length-1];
    for (var j = 1; j < r; j++) {
      if(polinom[j] === "1"){
        arrTemp += arrTemp[0] ^ arrMain[j-1];
      }else if(polinom[j] === "0"){
        arrTemp += arrMain[j-1];
      }
    }

    arrMain = arrTemp;
    arrTemp = "";

    document.querySelector("#k-str").innerHTML += "k<br>";
    document.querySelector("#k-message").innerHTML += message[i] + "<br>";
    document.querySelector("#main-2d-arr").innerHTML += arrMain + "<br>";
    i++;
  }

  encode += message;
  encode += arrMain.split("").reverse().join("");
  document.querySelector("#encode-message").value = encode;
}

function Decode(){
  encode = document.querySelector("#encode-message").value;
  document.querySelector("#main-2d-arr-decode").innerHTML = "";
  document.querySelector("#k-str-decode").innerHTML = "";
  document.querySelector("#k-message-decode").innerHTML = "";
  document.querySelector("#output-message").innerHTML = "Message:<br>";

  arrMain = "";
  for (var j = 0; j < r; j++) {
    arrMain += "0";
  }
  document.querySelector("#add-bits-decode").innerHTML = arrMain;

  i = 0;
  while(i != encode.length){

    arrTemp += encode[i] ^ arrMain[arrMain.length-1];
    for (var j = 1; j < r; j++) {

      if(polinom[j] === "1"){
        arrTemp += arrMain[arrMain.length-1] ^ arrMain[j-1];
      }else if(polinom[j] === "0"){
        arrTemp += arrMain[j-1];
      }
    }

    arrMain = arrTemp;
    arrTemp = "";

    document.querySelector("#k-message-decode").innerHTML += encode[i] + "<br>";
    document.querySelector("#main-2d-arr-decode").innerHTML += arrMain + "<br>";
    i++;
  }

  for (var j = 0; j < k; j++) {
    document.querySelector("#k-str-decode").innerHTML += "k<br>";
  }
  for (var j = 0; j < r; j++) {
    document.querySelector("#k-str-decode").innerHTML += "r<br>";
  }

  if(isCorrect_p1(arrMain)){
    document.querySelector("#iscorrect-message").innerHTML = "Bug not found";
    for (var j = 0; j < k; j++) {
      document.querySelector("#output-message").innerHTML += encode[j];
    }
  }else{
    counter = 0;

    while(!isCorrect_p2(arrMain)){
      arrTemp += 0 ^ arrMain[arrMain.length-1];

      for (var j = 1; j < r; j++) {

        if(polinom[j] === "1"){
          arrTemp += arrMain[arrMain.length-1] ^ arrMain[j-1];
        }else if(polinom[j] === "0"){
          arrTemp += arrMain[j-1];
        }

      }
      counter++;
      arrMain = arrTemp;
      arrTemp = "";
      document.querySelector("#main-2d-arr-decode").innerHTML += arrMain + "<br>";
    }
    document.querySelector("#iscorrect-message").innerHTML = "Bug in " + counter + " Bit";

    encode = encode.split("");
    if(encode[counter-1] === "1"){
      encode[counter-1] = "0";
    }
    else{
      encode[counter-1] = "1";
    }
    encode = encode.join("");

    for (var j = 0; j < k; j++) {
      document.querySelector("#output-message").innerHTML += encode[j];
    }

  }
}

function isCorrect_p1(arrMain){

  for (var i = 0; i < arrMain.length; i++) {
    if(arrMain[i] === "1"){
      return false;
    }
  }
  return true;
}
function isCorrect_p2(arrMain){

  for (var i = 1; i < arrMain.length; i++) {
    if(arrMain[i] === "1"){
      return false;
    }
  }
  return true;
}
