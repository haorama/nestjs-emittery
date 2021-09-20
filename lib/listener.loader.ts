import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, Reflector, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { EmitteryService } from './emittery.service';
import { EVENT_LISTENER_METADATA } from './constants';
import { ListenerMetadata } from './interfaces';

@Injectable()
export class ListenerLoader
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly emittery: EmitteryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  async onApplicationBootstrap() {
    await this.loadListeners();
  }

  onApplicationShutdown() {
    this.emittery.clearListeners();
  }

  async loadListeners() {
    const providers = this.discoveryService.getProviders();
    providers
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter((wrapper) => wrapper.instance)
      .forEach((wrapper: InstanceWrapper) => {
        const { instance } = wrapper;

        const prototype = Object.getPrototypeOf(instance);

        this.metadataScanner.scanFromPrototype(
          instance,
          prototype,
          (key: string) => {
            return this.subscribeListener(instance, key);
          },
        );
      });
  }

  private subscribeListener(instance: any, key: any) {
    const listener = this.reflector.get<ListenerMetadata>(
      EVENT_LISTENER_METADATA,
      instance[key],
    );

    if (!listener) {
      return;
    }

    if (this.emittery) {
      this.emittery.on(listener.event as any, (data) => {
        return instance[key](data);
      });
    }
  }
}
