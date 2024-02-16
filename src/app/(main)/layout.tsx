import Header from "./header";

function mainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="space-y-4 px-2 py-16 md:px-4 xl:px-8">{children}</main>
    </>
  );
}

export default mainLayout;
