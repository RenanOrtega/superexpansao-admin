import { HomeCard } from "@/components/Home/HomeCard";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">
        Bem-vindo, <span className="text-orange-700">Renan</span>
      </h1>
      <div className="flex gap-3 mt-5">
        <HomeCard />
      </div>
    </div>
  );
};

export default HomePage;
