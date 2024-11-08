import { Engine } from 'excalibur';

export class InputManager {
  engine: Engine;
  static [key: string]: any;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  static addConfig(action: string, conditions: () => boolean | number) {
    Object.defineProperty(InputManager, action, {
      get: function () {
        return conditions();
      },
    });
  }
}
