interface ComponentSize {
  width: number
  height: number
}

export default function useComponentSize<T = any>(ref: React.RefObject<T>): ComponentSize
