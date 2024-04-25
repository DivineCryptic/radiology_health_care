import { Navbar } from "@/modules/navigation/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div lang="en">
      <div className="p-5">

        <Navbar>
          {children}
        </Navbar>
      </div>
    </div>
  );
}
