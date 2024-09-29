import React from 'react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';

export const StablecoinActions = () => {
  return (
    <div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stablecoin Actions</SheetTitle>
          <SheetDescription className='flex flex-col gap-4 py-6'>
            <div className='flex flex-col gap-2'>
              <div>Update Price Feed</div>
              <div className='flex flex-row items-center gap-2'>
                <Input className='mx-0' placeholder='2478' />
                <Button>Update</Button>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>Contribute for Stability</div>
              <div className='flex flex-row items-center gap-2'>
                <Input className='mx-0' placeholder='0.0034' />
                <Button variant='outline'>Max</Button>
              </div>
              <Button>Contribute</Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </div>
  );
};
