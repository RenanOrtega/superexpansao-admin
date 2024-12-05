import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Imovel } from "@/types/Imovel";
import { imovelService } from "@/services/imovelService";

export function ImovelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imovel, setImovel] = useState<Imovel | null>(null);

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        const response = await imovelService.getById(id);
        setImovel(response);
      } catch (error) {
        console.error("Erro ao buscar imovel:", error);
        navigate("/imoveis");
      }
    };

    fetchImovel();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      await imovelService.update(id!, imovel!);
    } catch (error) {
      console.error("Erro ao salvar imovel:", error);
    }
  };

  const handleChange = (field: keyof Imovel, value: string) => {
    setImovel((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  if (!imovel) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4 ">
      <Button
        variant="outline"
        onClick={() => navigate("/imoveis")}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Imóveis
      </Button>

      <div className="flex flex-col gap-5 bg-white shadow-lg rounded border-l-2 p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Label>Endereço</Label>
            <Input
              value={imovel.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Bairro</Label>
            <Input
              value={imovel.neighboorhoud}
              onChange={(e) => handleChange("neighboorhoud", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Cidade</Label>
            <Input
              value={imovel.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Label>Estado</Label>
            <Input
              value={imovel.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Zona</Label>
            <Input
              value={imovel.zone}
              onChange={(e) => handleChange("zone", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Perfil do Imóvel</Label>
            <Input
              value={imovel.propertyProfile}
              onChange={(e) => handleChange("propertyProfile", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Label>Link</Label>
            <Input
              value={imovel.link}
              onChange={(e) => handleChange("link", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Disponibilidade</Label>
            <Input
              value={imovel.availability}
              onChange={(e) => handleChange("availability", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Label>Valor do Aluguel</Label>
            <Input
              type="number"
              value={imovel.rentValue}
              onChange={(e) => handleChange("rentValue", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Valor de Venda</Label>
            <Input
              type="number"
              value={imovel.saleValue}
              onChange={(e) => handleChange("saleValue", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>IPTU</Label>
            <Input
              type="number"
              value={imovel.iptuValue}
              onChange={(e) => handleChange("iptuValue", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Label>Metragem</Label>
            <Input
              type="number"
              value={imovel.searchMeterage}
              onChange={(e) => handleChange("searchMeterage", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Área Total</Label>
            <Input
              type="number"
              value={imovel.totalArea}
              onChange={(e) => handleChange("totalArea", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Label>Imobiliária</Label>
            <Input
              value={imovel.realEstate}
              onChange={(e) => handleChange("realEstate", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save size={16} /> Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
