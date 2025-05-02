'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/qbutton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Checkbox } from '@/components/ui/checkbox';

interface InviteDeveloperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const teamMembers = [
  { id: 'kopal', name: 'Kopal Agarwal' },
  { id: 'poyan', name: 'Poyan Rajamand' },
  { id: 'wesley', name: 'Wesley Oxenham' },
];

export function InviteDeveloperDialog({
  open,
  onOpenChange,
}: InviteDeveloperDialogProps) {
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>(
    []
  );

  const handleCollaboratorToggle = (collaborator: string) => {
    setSelectedCollaborators((prev) => {
      if (prev.includes(collaborator)) {
        return prev.filter((item) => item !== collaborator);
      } else {
        return [...prev, collaborator];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the actual invitation logic
    console.log('Submitted form:', {
      email,
      requirements,
      newTeamMember,
      selectedCollaborators,
    });
    onOpenChange(false);
  };

  // Generate a display string for the selected collaborators
  const getCollaboratorsDisplay = () => {
    if (selectedCollaborators.length === 0) return 'Select collaborators';
    if (selectedCollaborators.length === 1) {
      const member = teamMembers.find((m) => m.id === selectedCollaborators[0]);
      return member?.name || '1 collaborator';
    }
    return `${selectedCollaborators.length} collaborators`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Invite a project developer to create project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-normal">
                Enter the email of the Project Developer{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="requirements" className="font-normal">
                Add specific requirements for the developer
              </Label>
              <Textarea
                id="requirements"
                placeholder="Example: Need carbon credits certified by Q4 2024. Must align with SDG 7 and 13. Budget ceiling: $50,000"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="min-h-[100px] border-purple-200 border-2 border-dashed"
              />
            </div>
            <div className="grid gap-4">
              <Label className="font-normal">
                Involve collaborators to this project
              </Label>
              <div className="grid gap-2">
                <Label
                  htmlFor="existing-members"
                  className="text-sm font-normal"
                >
                  Existing team members
                </Label>
                <Select value="" onValueChange={() => {}}>
                  <SelectTrigger id="existing-members">
                    <SelectValue placeholder={getCollaboratorsDisplay()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {teamMembers.map((member) => (
                        <div key={member.id} className="px-2 py-1.5">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`collaborator-${member.id}`}
                              checked={selectedCollaborators.includes(
                                member.id
                              )}
                              onCheckedChange={() =>
                                handleCollaboratorToggle(member.id)
                              }
                            />
                            <div className="flex flex-row items-center justify-center gap-2">
                              <label
                                htmlFor={`collaborator-${member.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {member.name}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-members" className="text-sm font-normal">
                  Or invite new team members
                </Label>
                <Input
                  id="new-members"
                  type="email"
                  placeholder="Type Email Address"
                  value={newTeamMember}
                  onChange={(e) => setNewTeamMember(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Send invitation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
