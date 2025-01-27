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

export function AssigneeSelector({
  currentUser,
  assignedTo,
  disabled,
  onChange,
}: {
  currentUser?: string | null;
  assignedTo?: string | null;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <Select disabled={disabled} onValueChange={onChange}>
      <SelectTrigger>
        {assignedTo && <SelectValue placeholder={assignedTo} />}
        {!assignedTo && <SelectValue placeholder="Unassigned" />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {currentUser && (
            <SelectItem value={currentUser}>
              <div className="flex flex-row items-center justify-center gap-2">
                <Avatar className="bg-branding-green-100 flex items-center justify-center">
                  {getInitialsFromName(currentUser)}
                </Avatar>
                <span>{currentUser}</span>
              </div>
            </SelectItem>
          )}
          <SelectItem value="John Doe">
            <div className="flex flex-row items-center justify-center gap-2">
              <Avatar className="bg-branding-green-100 flex items-center justify-center">
                {getInitialsFromName('John Doe')}
              </Avatar>
              <span>John Doe</span>
            </div>
          </SelectItem>
          <SelectItem value="Jane Doe">
            <div className="flex flex-row items-center justify-center gap-2">
              <Avatar className="bg-branding-green-100 flex items-center justify-center">
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
