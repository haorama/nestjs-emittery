type DebugLogger<EventData, Name extends keyof EventData> = (
  type: string,
  debugName: string,
  eventName?: Name,
  eventData?: EventData[Name]
) => void;

interface DebugOptions<EventData> {
  name: string;
  enabled?: boolean;
  logger?: DebugLogger<EventData, keyof EventData>;
}

interface Options<EventData = any> {
  debug?: DebugOptions<EventData>;
}

export type EmitteryModuleOptions = Options;
