import { Injectable } from '@nestjs/common';
import Emittery from 'emittery';

@Injectable()
export class EmitteryService extends Emittery {
  emit(nameOrClass: object | string, eventData?: object) {
    if (eventData !== undefined && typeof nameOrClass != 'object') {
      return super.emit(nameOrClass, eventData);
    }

    return super.emit(nameOrClass.constructor.name, nameOrClass);
  }
}
