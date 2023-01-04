import clsx from "clsx";
import type { ElementType, ReactNode, ComponentProps } from "react";
import { Spinner } from "shared/ui/spinner";
import styles from "./styles.module.scss";

interface ButtonOwnProps<E extends ElementType = ElementType> {
  className?: string;
  loading?: boolean;
  variant?: "primary" | "small";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  as?: E;
}

const DEFAULT_ELEMENT: ElementType = "button";

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>;

export const Button = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  children,
  as,
  loading,
  startIcon,
  endIcon,
  variant = "primary",
  className,
  ...props
}: ButtonProps<E>) => {
  const ButtonSpinner = (
    <div className={styles.spinner}>
      <Spinner strokeWidth={4} />
    </div>
  );

  const Element = as || DEFAULT_ELEMENT;

  return (
    <Element className={clsx("btn-reset", styles.btn, styles[variant], className)} {...props}>
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      <span>{loading ? ButtonSpinner : children}</span>
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </Element>
  );
};
