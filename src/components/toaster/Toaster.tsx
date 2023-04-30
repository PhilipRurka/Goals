import { FC, forwardRef } from "react";
import { AnchorContent, StaticContent, Subtitle, Title, ToasterStyled } from "./Toaster.styled";

export type ToasterType = {
  title: string
  subtitle: string
  to?: string
}

type ToasterContentType = {
  children: JSX.Element[]
  to?: string
}

const Toaster = forwardRef<HTMLDivElement, ToasterType>(({
  title,
  subtitle,
  to
}, ref) => {
  return (
    <ToasterStyled
      id='toaster'
      ref={ref} >
      <ToasterContent to={to}>
        <Title>
          { title }
        </Title>
        <Subtitle>
          { subtitle }
        </Subtitle>
      </ToasterContent>
    </ToasterStyled>
  )
})

const ToasterContent: FC<ToasterContentType> = ({
  children,
  to
}) => {
  if(to) {
    return (
      <AnchorContent href={to}>
        { children }
      </AnchorContent>
    )

  } else {
    return (
      <StaticContent>
        { children }
      </StaticContent>
    )
  }
}

Toaster.displayName = 'Toaster'

export default Toaster