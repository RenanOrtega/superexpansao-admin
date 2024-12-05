import { proprietarioService } from "@/services/proprietarioService";
import { Proprietario } from "@/types/Proprietario";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Imovel } from "@/types/Imovel";

export function ProprietarioDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proprietario, setProprietario] = useState<Proprietario | null>(null);
  const [imoveis, setImoveis] = useState<Imovel[]>([]);

  useEffect(() => {
    const fetchProprietario = async () => {
      try {
        const response = await proprietarioService.getById(id);
        console.log(response);
        setProprietario(response);
        setImoveis(response.imoveis);
      } catch (error) {
        console.error("Erro ao buscar proprietário:", error);
        navigate("/proprietarios");
      }
    };

    fetchProprietario();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      await proprietarioService.update(id!, { ...proprietario });
    } catch (error) {
      console.error("Erro ao salvar proprietário:", error);
    }
  };

  const handleChange = (field: keyof Proprietario, value: string) => {
    setProprietario((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  if (!proprietario) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4 ">
      <Button
        variant="outline"
        onClick={() => navigate("/proprietarios")}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Proprietarios
      </Button>
      <div className="flex flex-col gap-5 bg-white shadow-lg rounded border-l-2 p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Label>Nome</Label>
            <Input
              value={proprietario.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="flex-2">
            <Label>Telefone</Label>
            <Input
              value={proprietario.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Email</Label>
            <Input
              value={proprietario.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Label>Endereço</Label>
            <Input
              value={proprietario.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div>
            <Label>Bairro</Label>
            <Input
              value={proprietario.neighboor}
              onChange={(e) => handleChange("neighboor", e.target.value)}
            />
          </div>
          <div>
            <Label>Estado</Label>
            <Input
              value={proprietario.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>
          <div>
            <Label>Cidade</Label>
            <Input
              value={proprietario.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>
        </div>
        <Label>Observações</Label>
        <Input
          value={proprietario.observations}
          onChange={(e) => handleChange("observations", e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save size={16} /> Salvar
          </Button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded p-5">
        <h2 className="text-2xl font-bold mb-4 ">Imóveis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imoveis.map((imovel) => (
            <Card
              key={imovel.id}
              onClick={() => {
                navigate(`/imoveis/${imovel.id}`);
              }}
              className="cursor-pointer hover:bg-gray-200"
            >
              <CardHeader>
                <CardTitle>{imovel.address}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div>
                    <Label className="font-bold">Disponibilidade: </Label>
                    {imovel.availability}
                  </div>
                  <div>
                    <Label className="font-bold">Área Total: </Label>
                    {imovel.totalArea} m²
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {imoveis.length === 0 && (
          <p className="text-gray-500">Nenhum imóvel encontrado</p>
        )}
      </div>
    </div>
  );
}
