interface IBackdropProps {
  onClick: (e: React.MouseEvent) => void;
}

export default function Backdrop({ onClick }: IBackdropProps) {
  return <div className="bg-grey01/50 absolute inset-0 opacity-50" onClick={onClick} />;
}
