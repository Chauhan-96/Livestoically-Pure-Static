import { Shield, Waves, Users, Compass, Clock, Wind, Eye, Mountain, Sun } from 'lucide-react';

export const pillarIcons = {
  Shield,
  Waves,
  Users,
  Compass,
  Clock,
  Wind,
  Eye,
  Mountain,
  Sun
};

export const getPillarIcon = (iconName) => {
  return pillarIcons[iconName] || Shield;
};
