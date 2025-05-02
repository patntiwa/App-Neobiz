import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bienvenue sur NeoBiz</h1>
        <p className="text-gray-600 dark:text-gray-400">Votre assistant intelligent pour freelances</p>
      </header>

      <main className="w-full max-w-md px-4">{children}</main>

      <footer className="mt-10 text-sm text-gray-500 dark:text-gray-400 text-center">
        &copy; {new Date().getFullYear()} NeoBiz. Tous droits réservés.
      </footer>
    </div>
  );
}