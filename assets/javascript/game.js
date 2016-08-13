// ---------------------------------------------------------------------------------
// Character Object & Statistics
// ---------------------------------------------------------------------------------

function characterStats(name, hp, ap, apConstant ) {
	this.name = name;				//Name
	this.hp = hp;					//Health Points
	this.ap = ap;					//Initial Attack Points (will be updated every round)
	this.apConstant = apConstant;	//Attack Point Constant (the number that AP will be increased by every round)
}

var eliwood = new characterStats(
	'Eliwood',
	'30',
	'7',
	'7'
);

var lyn = new characterStats(
	'Lyn',
	'28',
	'8',
	'8'
);

var hector = new characterStats(
	'Hector',
	'34',
	'10',
	'10'
);

var marcus = new characterStats(
	'Marcus',
	'40',
	'9',
	'9'
);


// ---------------------------------------------------------------------------------
// Variables
// ---------------------------------------------------------------------------------

var hero = "";
var enemy = "";
var characters = ['eliwood', 'lyn', 'hector', 'marcus'];

// ---------------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------------

//Function to display all characters
function displayCharacters() {
	$('#message').html('Pick Your Character');

	for (var i = 0; i < characters.length; i++) {
		var chara = characters[i];
		var html = '<div class="character ' + chara + '"><img class="character-img ' + chara + '" src="assets/images/profile/' + chara + '.gif" alt="' + this[chara].name + '" value="' + chara + '"></div>';
		$('#character-portraits').append(html);
	}
}

//Function to pick a hero and enemy
function pickCharacters() {
	//When a character image is clicked
	$('.character-img').on('click', function() {

		//If no character has been chosen yet
		if (hero === "") {
			//Update hero variable with character name
			hero = $(this).attr('value');
			console.log("Hero: " + window[hero].name);

			//Character image fades out and is removed
			$('.character .'+hero).attr('class','animated fadeOut character ' + hero);
			setTimeout(function() {
				$('.character .'+hero).remove();
			},500);

			//Update message
			$('#message').html('Pick Your Enemy');

			//Add hero and hero stats to arena
			$('.arena').append('<img id="hero" src="assets/images/battle/' + hero + '.gif">');
			$('#hero').attr('class','animated fadeInRight');
			$('#hero-name').html(window[hero].name);
			$('#hero-stats').html('100<br><div id="hero-ap">' + window[hero].ap + '</div>0');
			$('#hero-hp').html(window[hero].hp);
			$('#hero-name, #hero-stats, #hero-hp').attr('class','animated fadeIn');

			//Remove hero stats animation classes after 1 second
			setTimeout(function() {
				$('#hero-name, #hero-stats, #hero-hp').attr('class','');
			},1000);

			//Remove hero from charactesr array
			charaIndex = characters.indexOf(hero);
			characters.splice(charaIndex,1);
		}

		//If no enemy has been chosen
		else if (enemy === "") {
			//Update enemy variable with character name
			enemy = $(this).attr('value');
			console.log("Enemy: " + window[enemy].name);

			//Character image fades out and is removed
			$('.character .' + enemy).attr('class','animated fadeOut character ' + enemy);
			setTimeout(function() {
				$('.character .' + enemy).remove();
			},500);

			//Add enemy and enemy stats to arena
			$('.arena').append('<img id="enemy" src="assets/images/battle/enemy/' + enemy + '.gif">');
			$('#enemy').attr('class','animated fadeInLeft');
			$('#enemy-name').html(window[enemy].name);
			$('#enemy-stats').html('100<br>' + window[enemy].ap + '<br>0');
			$('#enemy-hp').html(window[enemy].hp);
			$('#enemy-name, #enemy-stats, #enemy-hp').attr('class','animated fadeIn');

			//Remove enemy stats animation classes after 1 second
			setTimeout(function() {
				$('#enemy-name, #enemy-stats, #enemy-hp').attr('class','');
			},1000);

			//Remove enemy from charactesr array
			charaIndex = characters.indexOf(enemy);
			characters.splice(charaIndex,1);
		}
	});
}

//Increase Hhro AP every round and update display
function increaseHeroAP() {
	window[hero].ap = parseInt(window[hero].ap) + parseInt(window[hero].apConstant);
	$('#hero-ap').html(window[hero].ap);
	$('#hero-ap').attr('class','animated rubberBand');

	//Reset #hero-ap animation classes after 1 second
	setTimeout(function() {
		$('#hero-ap').attr('class','');
	},1000);
}

//Reduce HP after being attacked
function decreaseHP(attacker,defender) {
	window[defender].hp = window[defender].hp - window[attacker].ap;
}

//Time delays for characters
function attackTimeout(attacker) {
	if (attacker == "eliwood") {
		return 3000;
	}
	else if (attacker == "lyn") {
		return 3800;
	}
	else if (attacker == "hector") {
		return 6000;
	}
	else if (attacker == "marcus") {
		return 4000;
	}
}

//End battle if defender HP is 0. If hero is defeated, end game. If enemy is defeated, pick another enemy. Parameter must be passed as string.
function endBattle(defender) {
	//defender fades out after 1.5 seconds
	setTimeout(function() {

		//If defender is the hero, fade out from the right
		if(defender === 'hero') {
			$('#' + defender).attr('class','animated fadeOutRight');
		}
		//Else fade out from the left
		else {
			$('#' + defender).attr('class','animated fadeOutLeft');
		}
		//Fade out defender stats
		$('#' + defender + '-name, #' + defender + '-stats, #' + defender + '-hp').attr('class','animated fadeOut');

		//Remove defender image and reset defender stats animation classes after 1 second
		setTimeout(function() {
			$('#' + defender + '').remove();
			$('#' + defender + '-name, #' + defender + '-stats, #' + defender + '-hp').attr('class','');
			$('#' + defender + '-name, #' + defender + '-stats, #' + defender + '-hp').html('');

			//Increase hero AP after .5 seconds
			setTimeout(function () {
				//If hero is defeated
				if (window[hero].hp <= 0) {
					alert('You lose!');
					$('.centered').append('<button type="button" id="reset" class="btn btn-info" onclick="location.reload()">Play Again?</button>');
				}

				//If everyone is defeated
				else if(characters.length == 0) {
					alert('You win!');
					$('.centered').append('<button type="button" id="reset" class="btn btn-info" onclick="location.reload()">Play Again?</button>');
				}

				//Reset enemy and choose a new enemy
				else {
					increaseHeroAP();
					enemy = "";
					pickCharacters();
				}
			},500);

		},1000);

	},1500);
}

function attack() {
	$('.centered').append('<br><button type="button" id="attack" class="btn btn-danger">Attack</button>');
	console.log("Attack button initialized");

	//When Attack button is clicked
	$('#attack').on('click', function() {

		//If there's no enemy selected
		if (enemy == "" || window[hero].hp <= 0) {
			alert("No enemy selected!");
		}

		//Otherwise run attack animations
		else {
			//Hero attacks
			$('#hero').attr('src','assets/images/battle/' + hero + '-attack.gif');
			$('#hero').attr('class','attacker');
			$('#enemy').attr('class','defender');

			//Decrease enemy HP
			decreaseHP(hero,enemy);

			//Enemy attacks after hero finishes attacking
			setTimeout(function() {
				$('#enemy').attr('src','assets/images/battle/enemy/' + enemy + '-attack.gif');
				$('#hero').attr('class','defender');
				$('#enemy').attr('class','attacker');

				//Decrease hero HP
				decreaseHP(enemy,hero);

				//Update hero and enemy HPs after enemy finishes attacking
				setTimeout(function () {
					if (window[hero].hp <= 0) {
						$('#hero-hp').html('0');
					}
					else {
						$('#hero-hp').html(window[hero].hp);
					}
					$('#hero-hp').attr('class','animated bounce');

					if (window[enemy].hp <= 0) {
						$('#enemy-hp').html('0');
					}
					else {
						$('#enemy-hp').html(window[enemy].hp);
					}
					$('#enemy-hp').attr('class','animated bounce');

					//Rest HP animation classes and increase hero HP after 1 second
					setTimeout(function() {
						$('#hero-hp').attr('class','');
						$('#enemy-hp').attr('class','');
						increaseHeroAP();

						//If enemy is defeated, end battle
						if (window[enemy].hp <= 0) {
							endBattle('enemy');
						}

						//If hero is defeated, end battle
						else if (window[hero].hp <= 0) {
							endBattle('hero');
						}
					},1000);

				},attackTimeout(enemy));

			},attackTimeout(hero));
		}
	});
}


// ---------------------------------------------------------------------------------
// JS to run on Window Load
// ---------------------------------------------------------------------------------

window.onload = function() {
	displayCharacters();
	pickCharacters();
	attack();
};