import { ReactNode } from "react";
import AdminDrawer from "../pages/admin/AdminDrawer";
import AdmiMenu from "../pages/admin/AdminMenu";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="w-screen h-screen flex">
      <AdminDrawer />
      <div className="flex-1 flex-col relative">
        <AdmiMenu />
        <main className="flex-1 w-full max-h-[calc(100vh_-_80px)] overflow-y-scroll p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

// https://www.anycodings.com/2021/12/static-generation-with-nextjs-pass-page.html
