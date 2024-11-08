import { Component } from 'excalibur';

export class PlayerControllerComponent extends Component {
  speed = 10;

  constructor(speed: number) {
    super();

    this.speed = speed;
  }
}
