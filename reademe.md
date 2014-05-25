Glory Foreverever (Working Title)
=================
Fight forever, glory forever
----------------------------
Glory Forever is an RPG incremental where you explore and battle your way through the world of Vesta

* ATB style battle system
* Crafting, create everything from swords to skills
* More loot than you can shake a stick at.
* Skill Equip system. No classes, equip the skills you want to fully customize your character
* Upgrade everything! Skills, items, stats etc.
* Mining, do your own mining or hire someone to do it for you
* Alchemy, brew all sorts of potions
* Native mod support
* Online saves

Installation
============
First you need [Node+Npm](http://nodejs.org/).

Next using the commandline install Gulp.js

    npm install -g gulp

Install the project dependencies

    npm install
    
Now build the project with gulp then simply open index.html in the dist/ directory.

    gulp
    
Default is to minify the files, if you want to run the files unminified run the gulp dev task. Open index.html in dev/

    gulp dev
    
To test simple run mocha

    mocha