import SidebarNav from '@/components/SidebarNav';
import ThemeToggler from '@/components/ThemeToggler';
import { AuthContextProvider } from '@/context/AuthContext';
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';





export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex">
      <Toaster/>
    {/* Modificado: Simplificar la estructura para la barra lateral y el contenido principal */}
    <SidebarNav />
    <div className="p-8 w-full">{children}</div>
  </div>
   
  );
};

   
