$(document).ready(function()
{
	function sync_request(my_url)
	{
		return $.ajax({
			type: "GET",
			url: my_url,
			async: false
		}).responseText;
	}
	
	function get_rhymes(word)
	{
		var base = "https://api.datamuse.com/words?rel_rhy=";	
		return(JSON.parse(sync_request(base + word)));
	}
	
	function get_nrhymes(word)
	{
		var base = "https://api.datamuse.com/words?nel_nry=";	
		return(JSON.parse(sync_request(base + word)));
	}
	
	function get_triggers(word)
	{
		var base = "https://api.datamuse.com/words?rel_trg=";
		return(JSON.parse(sync_request(base + word)));
	}
	
	function has_rhymes(word)
	{
		var r = get_rhymes(word);
		return (r.length > 0)
	}
	
	function has_nrhymes(word)
	{
		var r = get_nrhymes(word);
		return (r.length > 0)
	}
	
	function has_triggers(word)
	{
		var t = get_triggers(word);
		return (t.length > 0)
	}
	
	function contains_substr(string, substr)
	{
		return string.indexOf(substr) !== -1;
	}
	
	function get_next_rhyme(word)
	{
		var rhymes = get_rhymes(word);
		for (r in rhymes)
		{
			if (has_rhymes(rhymes[r].word) && (word != rhymes[r].word))
			{
				return rhymes[r].word;
			}
			if (has_nrhymes(rhymes[r].word) && (word != rhymes[r].word))
			{
				return rhymes[r].word;
			}
		}
		var rhymes = get_nrhymes(word);
		for (r in rhymes)
		{
			if (has_rhymes(rhymes[r].word) && (word != rhymes[r].word))
			{
				return rhymes[r].word;
			}
			if (has_nrhymes(rhymes[r].word) && (word != rhymes[r].word))
			{
				return rhymes[r].word;
			}
		}
		return "Error"
	}
	
	function get_next_trigger(word)
	{
		var triggers = get_triggers(word);
		for (t in triggers)
		{
			if (has_triggers(triggers[t].word) && (word != triggers[t].word))
				return triggers[t].word;
		}
		return "Error"
	}
	
	var cw = "keyboard";
	console.log(cw);
	while(true)
	{
		var nr = get_next_rhyme(cw);
		console.log(nr);
		console.log("---");
		var nt = get_next_trigger(nr);
		console.log(nt);
		cw = nt;
	}
});

