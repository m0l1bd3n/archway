declare global {
  interface PlayerMp {
    name: string;
    customProperty: number;

    customMethod(): void;
  }
}

export {};
