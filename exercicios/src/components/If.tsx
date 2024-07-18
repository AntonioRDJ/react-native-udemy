import { PropsWithChildren } from "react"

export const If = (props: {test: boolean} & PropsWithChildren) => {
  if(props.test) {
    return props.children;
  }
  return false;
}