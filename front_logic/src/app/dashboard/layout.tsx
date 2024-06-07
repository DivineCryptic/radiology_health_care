import { Navbar } from "@/modules/navigation/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  admin: React.ReactNode;
}

export default function Layout({ children, admin }: LayoutProps) {
  return (
    <div lang="en">
<Navbar children={children} user="admin" />
    </div>
  );
}
