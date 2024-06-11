import { Navbar } from "@/modules/navigation/Navbar";

interface LayoutProps {
  patient: React.ReactNode;
  admin: React.ReactNode;
}

export default function Layout({ patient, admin }: LayoutProps) {
  const isAdmin = true;

  return (
    <div lang="en">
      {isAdmin ? <Navbar children={patient} user="patient" /> : <>{patient}</>}
    </div>
  );
}
