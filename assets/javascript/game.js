// ---------------------------------------------------------------------------------
// Character Object & Statistics
// ---------------------------------------------------------------------------------

function characterStats(name, hp, ap ) {
	this.name = name;
	this.hp = hp;
	this.ap = ap;
}

var eliwood = new characterStats(
	'Eliwood',
	'32',
	'6'
);

var lyn = new characterStats(
	'Lyn',
	'30',
	'7'
);

var hector = new characterStats(
	'Hector',
	'38',
	'8'
);

var marcus = new characterStats(
	'Marcus',
	'45',
	'9'
);


// ---------------------------------------------------------------------------------
// Variables
// ---------------------------------------------------------------------------------

var characters = ['eliwood', 'lyn', 'hector', 'marcus'];
var hero = "";
var enemy = "";


// ---------------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------------

//Function to display all characters
function displayCharacters() {
	$('#message').html('Pick Your Character');
	for (var i = 0; i < characters.length; i++) {
		var chara = characters[i];
		var html = '<div class="character ' + chara + '"><img class="character-img ' + chara + '" src="assets/images/profile/' + chara + '.gif" alt="' + this[chara].name + '" value="' + chara + '"></div>';
		$('#show-characters').append(html);
	}
}

//Function to pick a hero
function pickCharacters() {
	//When a character image is clicked
	$('.character-img').on('click', function() {

		//If no character has been chosen yet
		if (hero === "") {
			//Update hero variable with character name
			hero = $(this).attr('value');
			console.log("Hero: " + window[hero].name);

			//Remove character image from list of characters
			$('.character .'+hero).remove();
			$('#message').html('Pick Your Enemy');
		}

		//If no enemy has been chosen
		else if (enemy === "") {
			//Update enemy variable with character name
			enemy = $(this).attr('value');
			console.log("Enemy: " + window[enemy].name);

			//Remove character image from list of characters
			$('.character .'+enemy).remove();
		}

		else console.log("Hero and Enemy have been chosen!");
	});
}


// ---------------------------------------------------------------------------------
// JS to run on Window Load
// ---------------------------------------------------------------------------------

window.onload = function() {
	displayCharacters();
	pickCharacters();

};