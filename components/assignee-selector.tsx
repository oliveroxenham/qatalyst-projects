'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar } from '@/components/ui/avatar';
import { getInitialsFromName } from '@/lib/utils';
import { updateAssignee } from '@/server/actions';

export function AssigneeSelector({
  projectId,
  currentUser,
  assessment,
  assignedTo,
  disabled,
}: {
  projectId: string;
  currentUser?: string | null;
  assessment: 'esg' | 'financial' | 'carbonQuality';
  assignedTo?: string | null;
  disabled?: boolean;
}) {
  const handleAssigneeChange = (assignee: string) => {
    updateAssignee({
      projectId,
      assignee,
      assessment,
    });
  };
  return (
    <Select disabled={disabled} onValueChange={handleAssigneeChange}>
      <SelectTrigger id="assignee-selector">
        {assignedTo && <SelectValue placeholder={assignedTo} />}
        {!assignedTo && <SelectValue placeholder="Unassigned" />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {currentUser && (
            <SelectItem value={currentUser}>
              <div className="flex flex-row items-center justify-center gap-2">
                <Avatar className="bg-branding-green-100 flex items-center justify-center text-black">
                  {getInitialsFromName(currentUser)}
                </Avatar>
                <span>{currentUser}</span>
              </div>
            </SelectItem>
          )}
          <SelectItem value="John Doe">
            <div className="flex flex-row items-center justify-center gap-2">
              <Avatar className="bg-branding-green-100 flex items-center justify-center text-black">
                {getInitialsFromName('John Doe')}
              </Avatar>
              <span>John Doe</span>
            </div>
          </SelectItem>
          <SelectItem value="Jane Doe">
            <div className="flex flex-row items-center justify-center gap-2">
              <Avatar className="bg-branding-green-100 flex items-center justify-center text-black">
                {getInitialsFromName('Jane Doe')}
              </Avatar>
              <span>Jane Doe</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
