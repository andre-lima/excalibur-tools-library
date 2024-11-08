import { Actor, ActorArgs, CollisionType } from 'excalibur';

export class Character extends Actor {
  constructor(config: ActorArgs) {
    super({ collisionType: CollisionType.Active, ...config });
  }
}
