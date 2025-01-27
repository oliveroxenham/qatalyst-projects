import { Badge } from '@/components/ui/badge';

export function CollaboratorTag({ collaborator }: { collaborator: string }) {
  return <Badge variant="outline" className="text-xs capitalize">{collaborator}</Badge>;
}
