interface ComponentSize {
  width: number
  height: number
}

export default function useComponentSize<T = any>(ref: T | React.RefObject<T>): ComponentSize
