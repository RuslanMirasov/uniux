interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      Close Button
    </button>
  );
};

export default CloseButton;
