import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Avatar from '../avatar';
import { auth, signOut } from '@/auth';
import { ExitIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

async function Header({ sidebar }: { sidebar: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="fixed top-0 z-10 bg-white w-full shadow p-2 px-4 flex justify-between items-center">
      <div className="flex justify-center items-center gap-4">
        <div className="menu md:hidden">{sidebar}</div>
        <div className="font-medium text-lg">Campus Pulse</div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-6 gap-9 flex flex-col justify-center items-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {session?.user.name}
            </h4>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button>
                <ExitIcon className="mr-2" />
                Logout
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
