import {icons} from 'lucide-react-native';

export type IconNameType = keyof typeof icons;

type IconProps = {
  name: IconNameType;
  color: string;
  size: number;
};

const Icon = ({name, color, size}: IconProps) => {
  const LucideIcon: any = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export {Icon};
