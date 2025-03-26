import { cn } from '@/utils/cn';

interface IconProps {
  iconName: string;
  className?: string;
  onClick?: () => void;
}

const Icon = ({ iconName, className, onClick }: IconProps) => {
  return <i className={cn('text-[24px]', iconName, className ?? '')} onClick={onClick}></i>;
};

export default Icon;
