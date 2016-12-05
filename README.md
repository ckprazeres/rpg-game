# RPG Game
A JavaScript Role Playing Game utilizing sprites from Intelligent Systems' _Fire Emblem_ (2003) for the Nintendo Game Boy Advance. The player picks a character to play and attacks an opponent until one of the characters loses all health points (HP). 

![Screenshot](/assets/screenshots/screenshot.png "RPG Game Screenshot")

# How to Play
First, select a character by clicking on one of the available character profile images. Next, chose an enemy by clicking on any of the remaining character profile images. Attack your opponent by clicking on the red "Attack" button. By default, the attack animations will be hidden. Uncheck the "Hide attack animations" checkbox to display the attack animations.

After the player's character and opponent have finished attacking, the health points (HP) of both characters will be updated. The player's character will double their attack power (AP) every turn, but enemy character's AP will not increase. Once an enemy has been defeated, the player will choose another enemy to fight. The AP of the player's character will rollover between each battle.

The player wins once all enemies are defeated.

# Technologies Used
* HTML
* CSS
  * Bootstrap
  * Reset CSS
  * [Animate.css](https://daneden.github.io/animate.css)
* JavaScript
  * jQuery
* Google Fonts

# Credits
* Srites and images &copy; Intelligent Systems