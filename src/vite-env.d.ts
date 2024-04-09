/// <reference types="vite/client" />
declare class FontFaceObserver {
  constructor(fontFamily: string, options?: object);
  load(): Promise<any>;
}
