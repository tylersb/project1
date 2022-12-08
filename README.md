# Game Overview
A game about a ship trapped within a forcefield maze trying to avoid obstacles as it attempts to some day escape its prison. Move your ship up by holding down the "W" key if a keyboard is available or touching the screen if on a mobile device/tablet/other touch enabled device. While not holding down the movement key or touching the screen your ship will fall downwards toward the bottom of the screen. Avoid the obstacles for as long as you can and you'll get more points depending on how long you can last.

# Link to game
https://tylersb.github.io/project1/

# Approach Taken
I started off by rendering a hitbox for the player controlled avatar on the screen then worked on the logic for movement as well as the event listener to move the avatar. Once that part was working I focused on generating a wall attached to the top of the screen and setting its movement across the screen to a constant value. Once the wall was off the screen I realized that instead of just stopping it from rendering I could move it back to the start of the screen with a random height value to continually generate new obstacles.

To add some variety I applied the same logic from the first obstacle to a similar object with a few tweaks to attach it to the bottom of the screen and offset the initial generation of the second obstacle so that the two would be staggered every time they re-appear. After that I added some simple collision detection via the Axis-Aligned Bounding Box method and various incremental small additions such as background music, images/skins for the avatar and obstacles, tracking the player score, and a button to start/restart the game.

# Tech Stack
HTML/CSS/JS

JS Canvas

# Wireframe
![Game Wireframe](./assets/project1wireframe.jpg "Game Wireframe")

# MVP Goals
* A start screen with the background continuously moving foward but without obstacles.
* On game start, place the player controlled avatar and begin spawning obstacles.
* One statically designed stage with intentionally placed obstacles in order to strictly control difficulty.
* A finish line at the end of the stage to determine the win condition.
* Obstacles that will determine the fail condition if touched by the player avatar.
* Restart button on either/both Win and Loss screens.

# Stretch Goals
* Add MIDI music
* Implement an 'Infinite Run' mode that utilizes randomly generated obstacles.
* Adjust the game so that it can work either on PC using a keyboard or on a phone/tablet using the touch screen.
* Moderate stretch goal - change movement style to WASD and give the avatar a gun to destroy obstacles with.
* Super EXTRA stretch goal - Reforctor the game into a Galaga variant with enemies and weapons.

# Potential Roadblocks
* 0 previous experience interacting with mobile devices so that should create plenty of frustrating/fun new problems to solve for when implementing the stretch goals.

# Post-project Reflection
 Although when I learned about the usage of classes and OOP in JavaScript recently I had no trouble understanding it, I still hadn't gotten to a point where I could apply the concept to fresh code. Once I was mostly finished with the game and I went back to look for ways that I could clean up the code or refactor things I noticed a few areas that could be moved from independent functions into methods within an extended class and gave me a better understanding of how I can organize my code more cleanly in the future.

# Sources
Image Assets: "www.kenney.nl" / "www.opengameart.org"

Audio: "www.freemidi.org"