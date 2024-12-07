interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return <button type="button" className="popup-close" onClick={onClick}></button>;
};

export default CloseButton;
