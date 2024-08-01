export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <main className="xl:max-w-screen-2xl m-auto mx-5 sm:mx-5 md:mx-10">
      {children}
    </main>
  );
}
