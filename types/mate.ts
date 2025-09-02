export type MateType = 'girl1' | 'girl2' | 'girl3' | 'girl4' | 'boy1' | 'boy2' | 'boy3' | 'boy4';

interface MateContext {
  mate: MateType;
}

interface MateActions {
  setMate: (mate: MateType) => void;
}

export interface MateStore {
  context: MateContext;
  actions: MateActions;
}
