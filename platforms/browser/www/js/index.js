$(document).on("pagebeforeshow", "#page2", function(event){
	firstWord = corpus.randomWord();
	secondWord = corpus.randomWord();
	document.getElementById("firstWord").innerHTML = firstWord;
	document.getElementById("secondWord").innerHTML = secondWord;
});

$("#getRhyme").click(function randomWords(){
	firstWord = corpus.randomWord();
	secondWord = corpus.randomWord();
	document.getElementById("firstWord").innerHTML = firstWord;
	document.getElementById("secondWord").innerHTML = secondWord;
});