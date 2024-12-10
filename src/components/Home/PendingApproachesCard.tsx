import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, PhoneCall } from "lucide-react";
import { abordagemService } from "@/services/abordagemService";
import { AbordagemWithContato } from "@/types/Abordagem";

export const PendingApproachesCard: React.FC = () => {
  const [pendingApproaches, setPendingApproaches] = useState<
    AbordagemWithContato[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPendingApproaches = async () => {
      try {
        setIsLoading(true);
        const abordagens = await abordagemService.getAllPending();
        setPendingApproaches(abordagens);
      } catch (error) {
        console.error("Erro ao carregar abordagens pendentes", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPendingApproaches();
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full dark:bg-zinc-900">
        <CardHeader>
          <CardTitle>Abordagens Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Carregando...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full dark:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Abordagens Pendentes
        </CardTitle>
        <PhoneCall className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {pendingApproaches.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            Não há abordagens pendentes
          </div>
        ) : (
          <div className="space-y-2">
            {pendingApproaches.map((approach) => (
              <div
                key={approach.id}
                className="flex items-center justify-between bg-muted/50 p-3 rounded-lg dark:bg-zinc-800"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">
                      {approach.contato.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {approach.telephone} - {approach.approachType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    Próx. Contato:{" "}
                    {approach.nextApproachDate
                      ? new Date(approach.nextApproachDate).toLocaleDateString()
                      : "Não definido"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
