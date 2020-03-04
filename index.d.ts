interface ComponentSize {
  width: number
  height: number
}

export default function useComponentSize<T extends Element = Element>(ref: React.RefObject<T>): ComponentSize
