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
              &ldquo;Every event is a chance to write a new story, a blank page
              where we can pen our own triumphs and joys. Embrace each gathering
              as an opportunity to create unforgettable memories and inspire
              those around you. Life&apos;s most beautiful moments are often
              found in the shared experiences of events, where every connection
              is a spark of potential greatness.&rdquo;
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
