import Logo from '../_components/logo';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <Logo />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Taking notes is not only about remembering information, but
              also about understanding it. Good notes transform complex ideas
              into simpler ones, making learning an active process.&rdquo;
            </p>
            <footer className="text-sm">Anonymous</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
