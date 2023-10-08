import type { Emotion } from '../core'
import { createContext } from '../utils/context'

export const createEmotionContext = (emotion: Emotion) => createContext<Emotion>(emotion)
