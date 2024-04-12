import { Navbar } from "@/modules/navigation/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div lang="en">
      <Navbar>{children}</Navbar>
    </div>
  );
}
