import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Credenciais inválidas. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-zinc-100 dark:bg-zinc-900 
      transition-colors duration-300"
    >
      <div
        className="w-full max-w-md p-8 space-y-6 
        bg-white dark:bg-zinc-800 
        rounded-xl shadow-lg 
        "
      >
        <h2
          className="text-center text-3xl font-bold 
          text-zinc-800 dark:text-zinc-100"
        >
          SuperExpansão
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div
              className="flex items-center 
              bg-red-50 dark:bg-red-900/20 
              p-3 rounded-md 
              text-red-600 dark:text-red-400"
            >
              <AlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium 
                text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 
                border border-zinc-300 dark:border-zinc-600
                bg-white dark:bg-zinc-700
                text-zinc-900 dark:text-zinc-100
                rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                transition-colors duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium 
                text-zinc-700 dark:text-zinc-300"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 
                border border-zinc-300 dark:border-zinc-600
                bg-white dark:bg-zinc-700
                text-zinc-900 dark:text-zinc-100
                rounded-md shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                transition-colors duration-300"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full 
              bg-blue-600 hover:bg-blue-700 
              dark:bg-purple-700 dark:hover:bg-purple-600
              text-white
              transition-colors duration-300"
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
