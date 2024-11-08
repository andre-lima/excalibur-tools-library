import {
  Actor,
  Query,
  System,
  SystemType,
  TagQuery,
  vec,
  Vector,
  World,
} from 'excalibur';
import { InputManager } from './input-manager';
import { PlayerControllerComponent } from './player-controller.component';

export class MovementSystem extends System {
  systemType: SystemType;

  query: Query<typeof PlayerControllerComponent>;

  constructor(world: World) {
    super();

    this.systemType = SystemType.Update;
    this.query = world.query([PlayerControllerComponent]);
  }

  update(elapsedMs: number) {
    this.query.getEntities().map((e) => {
      const entity: Actor = e as Actor;
      const playerController = entity.get(PlayerControllerComponent);

      if (
        InputManager.horizontalStrength === 0 &&
        InputManager.verticalStrength === 0
      ) {
        entity.vel.scaleEqual(0.95);
      } else {
        entity.vel = vec(
          InputManager.horizontalStrength,
          InputManager.verticalStrength
        )
          .normalize()
          .scale(playerController.speed * elapsedMs);
      }
    });
  }
}
