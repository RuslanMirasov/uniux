import clsx from "clsx";
import css from "./Text.module.scss";

interface TextProps {
  size?: "small" | "medium" | "big";
  color?: "color" | "green" | "red" | "error" | "black" | "grey";
  align?: "left" | "right" | "center";
  upper?: boolean;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  size = "medium",
  align = "left",
  color,
  upper,
  children,
}) => {
  const textClasses = clsx(
    css.Text,
    css[size],
    css[align],
    color && css[color],
    { [css.upper]: upper }
  );

  return <p className={textClasses}>{children}</p>;
};

export default Text;
