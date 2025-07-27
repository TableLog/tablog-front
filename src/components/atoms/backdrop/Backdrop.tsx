interface IBackdropProps {
  onClick: (e: React.MouseEvent) => void;
}

export default function Backdrop({ onClick }: IBackdropProps) {
  return <div className="fixed inset-0 bg-grey01/50 opacity-50" onClick={onClick} />;
}
