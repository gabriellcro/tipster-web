import { Navbar } from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main
        className="max-w-7xl min-h-screen mx-auto mt-20 p-4 md:p-6"
        role="main"
        aria-label="Conteúdo principal da página"
      >
        {children}
      </main>
    </>
  );
}
