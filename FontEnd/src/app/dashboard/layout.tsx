import Navbar from "@/components/dashboard/Navbar";
import SearchAvatar from "@/components/dashboard/SearchAvatar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
<>
 
 <main className="w-full flex h-screen bg-gray-100">
    <Navbar/>
    <div className="flex-1 w-4/5 p-8">
    <SearchAvatar/>
    {children}
    </div>
      
        
      </main>
     
</>
     
     
   
  );
}
