import css from "./TitleBox.module.scss";

interface TitleBoxProps {
  align?: "left" | "right" | "center";
  className?: string;
  children: React.ReactNode;
}

const TitleBox: React.FC<TitleBoxProps> = ({
  align = "left",
  className,
  children,
}) => {
  const alignmentClass = css[`align-${align}`];

  return (
    <div className={`${css.TitleBox} ${alignmentClass} ${className}`}>
      {children}
    </div>
  );
};

export default TitleBox;
