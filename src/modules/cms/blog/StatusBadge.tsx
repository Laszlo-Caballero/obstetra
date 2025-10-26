import Badge from '@/components/ui/badge/Badge';
import { StatusType } from '@/interface/blog-response.interface';
import cx from '@/libs/cx';

interface StatusBadgeProps {
  title: string;
  color: string;
}

export default function StatusBadge({ status }: { status: StatusType }) {
  const statusStyles: Record<StatusType, StatusBadgeProps> = {
    [StatusType.DRAFT]: { title: 'Borrador', color: 'bg-yellow-500 text-white' },
    [StatusType.PUBLISHED]: { title: 'Publicado', color: 'bg-green-500 text-white' },
    [StatusType.UNKNOWN]: { title: 'Desconocido', color: 'bg-gray-500 text-white' },
  };

  const findStatus = statusStyles[status] || statusStyles[StatusType.UNKNOWN];

  return (
    <Badge className={cx('px-3 py-1 text-sm font-medium', findStatus.color)}>
      {findStatus.title}
    </Badge>
  );
}
