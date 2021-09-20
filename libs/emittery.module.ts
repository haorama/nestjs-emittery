import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { EmitteryService } from '.';
import { EmitteryModuleOptions } from './interfaces';
import { ListenerLoader } from './listener.loader';

@Module({})
export class EmitteryModule {
  static forRoot(options?: EmitteryModuleOptions): DynamicModule {
    const provider: Provider = {
      provide: EmitteryService,
      useValue: new EmitteryService(options),
    };

    return {
      global: true,
      module: EmitteryModule,
      imports: [DiscoveryModule],
      providers: [ListenerLoader, provider],
      exports: [EmitteryService],
    };
  }
}
