import Avatar from '../avatar';

function Header() {
  return (
    <div className="w-full shadow p-2 px-4 flex justify-between items-center">
      <div className="font-medium text-lg">Campus Pulse</div>
      <div>
        <Avatar />
      </div>
    </div>
  );
}

export default Header;
