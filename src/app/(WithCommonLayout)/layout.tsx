import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

interface Props {
  children: React.ReactNode;
}

const CommonLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
