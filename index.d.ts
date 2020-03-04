interface ComponentSize {
  width: number
  height: number
}

export default function useComponentSize(ref: React.RefObject<Element>): ComponentSize
