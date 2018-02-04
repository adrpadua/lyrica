$(document).on("pagebeforeshow", "#page2", function(event){
	rapMachine.first_rhyme_scheme();
	firstWord = rapMachine.get_next_rhyme();
	secondWord = rapMachine.get_next_rhyme();
	document.getElementById("firstWord").innerHTML = firstWord;
	document.getElementById("secondWord").innerHTML = secondWord;
	$(document).on("swiperight", function(e){
		rhyme();
	});
	$(document).on("swipeleft", function(e){
		trigger();
	});
});

function rhyme() {
	if (rapMachine.can_rhyme(2))
	{
		firstWord = rapMachine.get_next_rhyme();
		secondWord = rapMachine.get_next_rhyme();
	}
	else
	{
		rapMachine.first_rhyme_scheme();
		firstWord = rapMachine.get_next_rhyme();
		secondWord = rapMachine.get_next_rhyme();
	}
	
	refreshWords();
}

function trigger() {
	/*
	var new_word = rapMachine.get_pivot_word(secondWord);
	rapMachine.new_rhyme_scheme(new_word);
	firstWord = new_word;
	secondWord = rapMachine.get_next_rhyme();
	*/
	rapMachine.first_rhyme_scheme();
	firstWord = rapMachine.get_next_rhyme();
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

function playAud() {
	if(playMode == 0)
	{
		playMode = 1;
		audio.play();
		document.getElementById("btn-play").src = "./img/playback-pause.svg";
	}
	else
	{
		playMode = 0;
		audio.pause();
		document.getElementById("btn-play").src = "./img/playback-play.svg";
	}
}
function nextAud()
{
	audio.src = ("media/" + ((++trackPos) % numTracks) + ".mp3");
	audio.play();
}
function prevAud()
{
	trackPos--;
	if(trackPos < 0)
		trackPos = numTracks-1;
	if(trackPos > numTracks)
		trackPos = numTracks-1;
	audio.src = ("media/" + (trackPos) + ".mp3");
	audio.play();
}
