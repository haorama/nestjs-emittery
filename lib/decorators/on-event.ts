import { SetMetadata } from '@nestjs/common';
import { EVENT_LISTENER_METADATA } from '../constants';
import { ListenerMetadata } from '../interfaces';

export function OnEvent(
  event: string | Array<string>,
  options?: any,
): MethodDecorator {
  return SetMetadata(EVENT_LISTENER_METADATA, {
    event,
    options,
  } as ListenerMetadata);
}
