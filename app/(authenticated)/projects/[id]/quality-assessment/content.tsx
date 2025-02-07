import { Button } from '@/components/qbutton';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

export function Content() {
  return (
    <div className="w-full p-4 bg-background rounded-sm border mr-2 overflow-scroll">
      <div className="p-4">
        <span className="text-lg font-semibold">
          Quality Assessment Criterias
        </span>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>How does the stove work?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>Who is the stove&apos;s manufacturer?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>What is the type of stove?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>
            Are there any risks associated with the delivery of the stove?
          </span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>What is the life expectancy of the stove?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>Where are the stoves sourced from?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>What is the energy source used?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>How frequently is the stove usage monitored?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>How is the usage monitored?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>
            What is the raw material used as fuel for the cookstove and how it
            is procured?
          </span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>Access to feedstock</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>What are the key risks of using this source?</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> source
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder="Key in your answer..."
        ></textarea>
      </div>

      <Separator className="my-4" />
      <span className="text-sm text-muted-foreground flex flex-row items-center gap-1">
        <Plus className="w-4 h-4" /> Add criteria
      </span>
    </div>
  );
}
