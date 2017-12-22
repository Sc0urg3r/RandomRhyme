
function updateText(id, string) {
	document.getElementById(id).innerHTML += string;
	document.getElementById("results").innerHTML = "";
	document.getElementById("definitions").innerHTML = "";

}

function backspace(id) {
	var text = document.getElementById(id).innerHTML
	document.getElementById(id).innerHTML = text.substring(0, text.length - 2);
}

function searchForDefinitions(id) {
	
	if (document.getElementById("definitions").innerHTML != "") {
		document.getElementById("definitions").innerHTML = "";
		return
	}
	
	var word = document.getElementById("results").innerHTML;
	var jsonData = JSON.parse(Get("http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" + word));
	
	var definition = jsonData.results[0].senses[0].definition[0];
	document.getElementById("definitions").innerHTML = definition;
}

function searchForRhymes(id) {
	var word = document.getElementById(id).innerHTML;
	var jsonData = JSON.parse(Get("http://rhymebrain.com/talk?function=getRhymes&word=" + word));
	var maxIndex = 0;
		
	for (i = 0; i < jsonData.length; i++) {
		if (jsonData[i].score == 300) {
			maxIndex = i;
		} 
		else {
			break;
		}
	}
	
	var randIndex = Math.floor((Math.random() * maxIndex));
	var randWord = jsonData[randIndex].word
	
	while (randWord == word) {
		randIndex = Math.floor((Math.random() * maxIndex));
		randWord = jsonData[randIndex].word
	}
		
	document.getElementById("results").innerHTML = randWord;
}

function myKeyPress(key){

    var keynum;
    
    if (window.event) {                 
    	keynum = key.keyCode;
    }
    
    else if (key.which) {              
      	keynum = key.which;
    }
	
	//delete
	
	if (keynum == 8) { 
		backspace("mainHeader");
	}
	//enter 
	
	if (keynum == 13) { 
		searchForRhymes("mainHeader");
	}  
	
	else if (keynum != 32) {
		updateText("mainHeader", String.fromCharCode(keynum));
	}	  
  }
  
function Get(url){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 10,
        display = document.querySelector('#timer');
    startTimer(fiveMinutes, display);
};
