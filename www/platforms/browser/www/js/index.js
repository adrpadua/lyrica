$(document).on("pagebeforeshow", "#page2", function(event){
	firstWord = rapMachine.first_rhyme_scheme();
	secondWord = rapMachine.get_next_rhyme();
	document.getElementById("firstWord").innerHTML = firstWord;
	document.getElementById("secondWord").innerHTML = secondWord;
});

function rhyme() {
	if (rapMachine.can_rhyme(2))
	{
		firstWord = rapMachine.get_next_rhyme();
		secondWord = rapMachine.get_next_rhyme();
	}
	else
	{
		firstWord = rapMachine.first_rhyme_scheme();
		secondWord = rapMachine.get_next_rhyme();
	}
	
	refreshWords();
}

function trigger() {
	var new_word = rapMachine.get_pivot_word(secondWord);
	rapMachine.new_rhyme_scheme(new_word);
	firstWord = new_word;
	secondWord = rapMachine.get_next_rhyme();
	
	refreshWords();
}

function refreshWords() {
	$('.word-container').fadeOut(100, fadeWordsIn);
	if (!rapMachine.can_rhyme(2))
	{
		$('#getRhyme')[0].innerHTML = "MIX IT UP!"
		$('#getRhyme').css({
			"color":"darkgray",
			"border":"darkgray solid .15em"
		});
	}
	else
	{
		$('#getRhyme')[0].innerHTML = "RHYME"
		$('#getRhyme').css({
			"color":"white",
			"border":"white solid .15em"
		});
	}
}

function fadeWordsIn() {
	document.getElementById("firstWord").innerHTML = firstWord;
	document.getElementById("secondWord").innerHTML = secondWord;
	$('.word-container').fadeIn(50)
}
