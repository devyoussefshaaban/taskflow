import CommingSoon from "@/components/comming-soon";
import LoginPage from "./(auth)/login/page";

const HomePage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      {process.env.NODE_ENV === "production" ? <CommingSoon /> : <LoginPage />}
    </main>
  );
};

export default HomePage;
