import {
  Actor,
  Axes,
  Buttons,
  CollisionType,
  Color,
  Engine,
  Gamepads,
  Keys,
  Scene,
} from 'excalibur';
import { InputManager } from './lib/input-manager';
import { MovementSystem } from './lib/movement.system';
import { PlayerControllerComponent } from './lib/player-controller.component';
import { Character } from './lib/character';

const game = new Engine({
  width: 800,
  height: 600,
});

const firstScene = new Scene();
game.addScene('first', firstScene);
game.start();
game.goToScene('first');

// CONFIG
Gamepads.MinAxisMoveThreshold = 0.2;

InputManager.addConfig(
  'rightPressed',
  () =>
    game.input.keyboard.isHeld(Keys.Right) ||
    game.input.gamepads.at(0).getAxes(Axes.RightStickX) > 0
);

InputManager.addConfig('leftStrength', () =>
  game.input.keyboard.isHeld(Keys.Left)
    ? -1
    : 0 || Math.min(game.input.gamepads.at(0).getAxes(Axes.RightStickX), 0)
);

InputManager.addConfig('horizontalStrength', () => {
  let strength = 0;

  if (game.input.keyboard.isHeld(Keys.Left)) {
    strength = -1;
  } else if (game.input.keyboard.isHeld(Keys.Right)) {
    strength = 1;
  } else {
    strength = game.input.gamepads.at(0).getAxes(Axes.RightStickX);
  }

  return strength;
});

InputManager.addConfig('verticalStrength', () => {
  let strength = 0;

  if (game.input.keyboard.isHeld(Keys.Up)) {
    strength = -1;
  } else if (game.input.keyboard.isHeld(Keys.Down)) {
    strength = 1;
  } else {
    strength = game.input.gamepads.at(0).getAxes(Axes.RightStickY);
  }

  return strength;
});

InputManager.addConfig('attack', () =>
  game.input.gamepads.at(0).wasButtonPressed(Buttons.Face4)
);

InputManager.addConfig('jump', () =>
  game.input.gamepads.at(0).isButtonHeld(Buttons.Face1)
);

// ACTORS

const player = new Character({
  color: Color.Rose,
  x: 100,
  y: 100,
  width: 50,
  height: 50,
  name: 'Player',
}).addTag('player');

player.addComponent(new PlayerControllerComponent(15));

const player2 = new Character({
  color: Color.Magenta,
  x: 200,
  y: 200,
  width: 50,
  height: 50,
  name: 'Player',
}).addTag('player');

player2.addComponent(new PlayerControllerComponent(10));

player.update = () => {
  // console.log(InputManager.rightPressed);
  // console.log(InputManager.leftStrength);
  // console.log(InputManager.horizontalStrength);
  // console.log(InputManager.attack);
  // console.log(InputManager.jump);
};
firstScene.add(player);
firstScene.add(player2);

firstScene.world.add(MovementSystem);
// game.scenes add(EightDirectionMovementSystem)
