function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-60 p-4 border-r-2">
      <div className="flex gap-1 flex-col">{children}</div>
    </div>
  );
}

export default SidebarWrapper;
