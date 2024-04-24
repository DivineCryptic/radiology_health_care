import { Navbar } from "@/modules/navigation/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div lang="en">
      <div className="px-4">
        <Navbar>{children}</Navbar>
      </div>
    </div>
  );
}
