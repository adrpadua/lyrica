
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

function get_ntriggers(word)
{
	var base = "https://api.datamuse.com/words?ml=";
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

function has_ntriggers(word)
{
	var t = get_ntriggers(word);
	return (t.length > 0)
}

function contains_item(arr, item)
{
	return arr.indexOf(item) !== -1;
}
function shuffle(a)
{
	var j, x, i;
	for (i = a.length - 1; i > 0; i--)
	{
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
}

function randomize_first_third(arr)
{
	var c = Math.floor(arr.length/3);
	var first_ = arr.slice(0,c);
	var second_ = arr.slice(c,arr.length);

	shuffle(first_);
	var new_arr = first_.concat(second_);
	return new_arr;
}

function get_next_rhyme(word, forbidden = [])
{
	var rhymes = randomize_first_third(get_rhymes(word));
	for (r in rhymes)
	{
		if ((word != rhymes[r].word) && !contains_item(forbidden,rhymes[r].word) && has_rhymes(rhymes[r].word))
		{
			return rhymes[r].word;
		}
		if ( (word != rhymes[r].word) && !contains_item(forbidden,rhymes[r].word) && has_nrhymes(rhymes[r].word))
		{
			return rhymes[r].word;
		}
	}
	var rhymes = randomize_first_third(get_nrhymes(word));
	for (r in rhymes)
	{
		if ((word != rhymes[r].word) &&!contains_item(forbidden,rhymes[r].word) && has_rhymes(rhymes[r].word))
		{
			return rhymes[r].word;
		}
		if ((word != rhymes[r].word)&&!contains_item(forbidden,rhymes[r].word) && has_nrhymes(rhymes[r].word))
		{
			return rhymes[r].word;
		}
	}
	return "Error"
}

function get_next_trigger(word, forbidden = [])
{
	var triggers = randomize_first_third(get_triggers(word));
	for (t in triggers)
	{
		if ((word != triggers[t].word) && !contains_item(forbidden,triggers[t].word) && has_triggers(triggers[t].word))
			return triggers[t].word;
		if ((word != triggers[t].word) && !contains_item(forbidden,triggers[t].word) && has_ntriggers(triggers[t].word))
			return triggers[t].word;
	}
	var triggers = randomize_first_third(get_ntriggers(word));
	for (t in triggers)
	{
		if ((word != triggers[t].word) && !contains_item(forbidden,triggers[t].word) && has_triggers(triggers[t].word))
			return triggers[t].word;
		if ((word != triggers[t].word) && !contains_item(forbidden,triggers[t].word) && has_ntriggers(triggers[t].word))
			return triggers[t].word;
	}
	return "Error"
}

