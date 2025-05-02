'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { sendInvitationEmail, generateInvitationEmailHtml } from '@/server/email';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailId, setEmailId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCollaboratorToggle = (collaborator: string) => {
    setSelectedCollaborators((prev) => {
      if (prev.includes(collaborator)) {
        return prev.filter((item) => item !== collaborator);
      } else {
        return [...prev, collaborator];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get the names of selected collaborators
      const collaboratorNames = selectedCollaborators.map(id => {
        const member = teamMembers.find(m => m.id === id);
        return member?.name || '';
      }).filter(Boolean);

      // Generate email HTML
      const emailHtml = await generateInvitationEmailHtml(requirements, collaboratorNames);

      // Send the invitation email
      const result = await sendInvitationEmail({
        to: email,
        subject: 'Invitation to Create a Carbon Project on Qatalyst',
        html: emailHtml,
        requirements,
        collaborators: selectedCollaborators,
        newCollaborator: newTeamMember,
      });

      if (result.success) {
        setEmailSent(true);
        if (result.emailId) {
          setEmailId(result.emailId);
        }
        
        // Clear form after successful submission
        setTimeout(() => {
          // Don't auto-close on success so user can see confirmation
          // Just reset the form for another send if needed
          setEmail('');
          setRequirements('');
          setNewTeamMember('');
          setSelectedCollaborators([]);
        }, 1000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to send invitation. Please try again.');
      console.error('Error sending invitation:', err);
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Error message */}
            {error && (
              <Alert variant="destructive" className="mb-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Success message */}
            {emailSent && (
              <Alert className="mb-2 bg-branding-green-100 text-branding-green-800 border-branding-green-200">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <div>
                  <AlertDescription className="font-medium">Invitation sent successfully!</AlertDescription>
                  {emailId && (
                    <div className="text-xs mt-1">
                      Email ID: <code className="bg-branding-green-200/50 px-1 py-0.5 rounded">{emailId}</code>
                    </div>
                  )}
                  <div className="text-xs mt-2">
                    The developer <span className="font-medium">{email}</span> will receive an invitation to access our carbon estimator tool at: 
                    <a 
                      href="https://qatalyst-carbon-estimator-chat.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-branding-green-700 underline ml-1"
                    >
                      qatalyst-carbon-estimator-chat.vercel.app
                    </a>
                  </div>
                  {selectedCollaborators.length > 0 && (
                    <div className="text-xs mt-1">
                      Collaborators: {selectedCollaborators.map(id => {
                        const member = teamMembers.find(m => m.id === id);
                        return member?.name;
                      }).filter(Boolean).join(', ')}
                    </div>
                  )}
                  {newTeamMember && (
                    <div className="text-xs mt-1">
                      New team member invited: {newTeamMember}
                    </div>
                  )}
                </div>
              </Alert>
            )}
            
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
                disabled={isSubmitting || emailSent}
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
                className="min-h-[100px] border-branding-green-200 border-2 border-dashed"
                disabled={isSubmitting || emailSent}
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
                <Select value="" onValueChange={() => {}} disabled={isSubmitting || emailSent}>
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
                              disabled={isSubmitting || emailSent}
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
                  disabled={isSubmitting || emailSent}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            {!emailSent ? (
              <>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send invitation'
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setEmailSent(false);
                    setEmailId(null);
                  }}
                >
                  Send another
                </Button>
                <Button 
                  type="button" 
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
