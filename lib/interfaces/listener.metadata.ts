import { ListenerOptions } from ".";

export interface ListenerMetadata {
  event: string | Array<string>;
  options?: ListenerOptions;
}
