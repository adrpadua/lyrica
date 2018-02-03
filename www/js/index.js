$(document).on("pagebeforeshow", "#page2", function(event){
	firstWord = rapMachine.get_next_rhyme(1);
	secondWord = rapMachine.get_next_rhyme(0);
	document.getElementById("firstWord").innerHTML = firstWord;
	document.getElementById("secondWord").innerHTML = secondWord;
});

function rhyme() {
	console.log("hi");

	firstWord = rapMachine.get_next_rhyme(1);
	secondWord = rapMachine.get_next_rhyme(0);
	
	refreshWords();
}

function trigger() {
	firstWord = rapMachine.get_next_trigger();
	secondWord = rapMachine.get_next_rhyme(0);
	
	refreshWords();
}

function refreshWords() {
	$('.word-container').fadeOut(100, fadeWordsIn);
}

function fadeWordsIn() {
	document.getElementById("firstWord").innerHTML = firstWord;
	document.getElementById("secondWord").innerHTML = secondWord;
	$('.word-container').fadeIn(50)
}
