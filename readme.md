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

## Listening to Events
To declare an event listener, decorate a method with the @OnEvent() decorator preceding the method definition containing the code to be executed, as follows:

```typescript
import { OnEvent } from '@haorama/nestjs-emittery';

@OnEvent('order.created')
handleOrderCreatedEvent(payload: OrderCreatedEvent) {
  // handle and process "OrderCreatedEvent" event
}

//if using class as name
@OnEvent(OrderCreatedEvent.name)
handleOrderCreatedEvent(payload: OrderCreatedEvent) {
  // handle and process "OrderCreatedEvent" event
}
```