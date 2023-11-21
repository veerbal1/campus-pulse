import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

function SlideSidebar({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default SlideSidebar;
