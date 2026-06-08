import { Diversity2 } from "@mui/icons-material";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type RevealOwnProps = {
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: React.ReactNode;
  as?: ElementType;
};

type RevealProps<T extends ElementType> =
  RevealOwnProps & ComponentPropsWithoutRef<T>;

export function Reveal(props: RevealProps<ElementType>) {
  const {
    as: Component = "div",
    delay,
    className = "",
    children,
    ...rest
  } = props;

  return (
    <div>
       
      {children}
    </div>
  );
}