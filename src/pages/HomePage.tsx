import Container from "@/components/Container";
import { PendingApproachesCard } from "@/components/Home/PendingApproachesCard";
import { useAuth } from "@/contexts/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      <Container>
        <h1 className="text-2xl">
          Bem-vindo, <span className="text-orange-700">{user?.name}</span>
        </h1>
      </Container>
      <div className="flex gap-3 mt-5">
        <PendingApproachesCard />
      </div>
    </div>
  );
};

export default HomePage;
