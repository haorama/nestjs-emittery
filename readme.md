# NESTJS Emittery

NESTJS async Event Emitter

## Installation
NPM

```
npm install @haorama/nestjs-emittery
```

YARN
```
yarn add @haorama/nestjs-emittery
```

## Usage
```typescript
import { EmitteryModule } from '@haorama/nestjs-emittery';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    EmitteryModule.forRoot()
  ],
})
export class AppModule {}
```

## Dispatching Events
To dispatch (i.e., fire) an event, first inject `EmitteryService` using standard constructor injection:

```typescript
import {EmitteryService} from '@haorama/nestjs-emittery';

constructor(private emitteryService: EmitteryService) {}
```

Then use it in a class as follows:

```typescript
this.emitteryService.emit(
  'order.created',
  new OrderCreatedEvent({
    orderId: 1,
    payload: {},
  }),
);
```

or directly using class, this will automatically use `constructor.name` as `eventName`:

```typescript
this.emitteryService.emit(
  new OrderCreatedEvent({
    orderId: 1,
    payload: {},
  }),
);

//eventName = 'OrderCreatedEvent'
```