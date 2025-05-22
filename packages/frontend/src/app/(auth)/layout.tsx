import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </div>
  );
} 