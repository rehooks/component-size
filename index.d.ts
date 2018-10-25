interface ComponentSize {
  width: number
  height: number
}

interface ComponentSizeReturn {
  size: ComponentSize
  ref: any
}

export default function useComponentSize(): ComponentSizeReturn
