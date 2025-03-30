
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Webhook,
  Copy,
  Check,
  Trash2,
  Plus,
  Play,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

interface WebhookData {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  lastTriggered?: string;
  lastStatus?: "success" | "failed" | "pending";
}

// Mock data for demonstration
const initialWebhooks: WebhookData[] = [
  {
    id: "wh-1",
    name: "Novo Pedido",
    url: "https://exemple.com/webhooks/new-order",
    events: ["checkout.completed"],
    active: true,
    lastTriggered: "13/06/2023 14:30",
    lastStatus: "success"
  },
  {
    id: "wh-2",
    name: "Pagamento Processado",
    url: "https://exemple.com/webhooks/payment",
    events: ["payment.success", "payment.failed"],
    active: true,
    lastTriggered: "12/06/2023 18:45",
    lastStatus: "success"
  },
  {
    id: "wh-3",
    name: "Notificação de Abandono",
    url: "https://exemple.com/webhooks/cart-abandoned",
    events: ["checkout.abandoned"],
    active: false,
    lastTriggered: "10/06/2023 09:15",
    lastStatus: "failed"
  }
];

const eventOptions = [
  { id: "checkout.started", label: "Checkout Iniciado" },
  { id: "checkout.completed", label: "Checkout Concluído" },
  { id: "checkout.abandoned", label: "Checkout Abandonado" },
  { id: "payment.success", label: "Pagamento com Sucesso" },
  { id: "payment.failed", label: "Pagamento Falhou" },
  { id: "payment.refunded", label: "Pagamento Reembolsado" }
];

const WebhookManager = () => {
  const [webhooks, setWebhooks] = useState<WebhookData[]>(initialWebhooks);
  const [newWebhook, setNewWebhook] = useState<Partial<WebhookData>>({
    name: "",
    url: "",
    events: [],
    active: true
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [webhookToDelete, setWebhookToDelete] = useState<string | null>(null);
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null);
  const { toast } = useToast();

  const handleNewWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewWebhook(prev => ({ ...prev, [name]: value }));
  };

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const handleAddWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e URL são campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (selectedEvents.length === 0) {
      toast({
        title: "Selecione ao menos um evento",
        description: "Você precisa selecionar pelo menos um evento para o webhook.",
        variant: "destructive"
      });
      return;
    }

    const newHook: WebhookData = {
      id: `wh-${Date.now()}`,
      name: newWebhook.name || "",
      url: newWebhook.url || "",
      events: selectedEvents,
      active: true
    };

    setWebhooks([...webhooks, newHook]);
    setIsAddingNew(false);
    setNewWebhook({ name: "", url: "", events: [], active: true });
    setSelectedEvents([]);

    toast({
      title: "Webhook adicionado",
      description: `O webhook ${newHook.name} foi adicionado com sucesso!`
    });
  };

  const toggleWebhookStatus = (id: string) => {
    setWebhooks(webhooks.map(hook => 
      hook.id === id ? { ...hook, active: !hook.active } : hook
    ));

    const webhook = webhooks.find(hook => hook.id === id);
    if (webhook) {
      toast({
        title: webhook.active ? "Webhook desativado" : "Webhook ativado",
        description: `O webhook ${webhook.name} foi ${webhook.active ? "desativado" : "ativado"} com sucesso.`
      });
    }
  };

  const confirmDeleteWebhook = (id: string) => {
    setWebhookToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const deleteWebhook = () => {
    if (!webhookToDelete) return;

    const webhookName = webhooks.find(hook => hook.id === webhookToDelete)?.name;
    setWebhooks(webhooks.filter(hook => hook.id !== webhookToDelete));
    setDeleteConfirmOpen(false);
    setWebhookToDelete(null);

    toast({
      title: "Webhook removido",
      description: `O webhook ${webhookName} foi removido com sucesso.`
    });
  };

  const testWebhook = (id: string) => {
    setTestingWebhook(id);
    
    // Simulate webhook test
    setTimeout(() => {
      setTestingWebhook(null);
      
      // Update the webhook's last triggered time and status
      setWebhooks(webhooks.map(hook => 
        hook.id === id 
          ? { 
              ...hook, 
              lastTriggered: new Date().toLocaleString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              lastStatus: "success"
            } 
          : hook
      ));
      
      toast({
        title: "Webhook testado",
        description: "O teste do webhook foi concluído com sucesso!"
      });
    }, 1500);
  };

  const copyWebhookUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiada",
      description: "URL do webhook copiada para a área de transferência."
    });
  };

  const getStatusIndicator = (status?: "success" | "failed" | "pending") => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Webhook className="mr-2 h-5 w-5 text-blue-500" />
            Gerenciamento de Webhooks
          </h2>
          <p className="text-gray-500 mt-1">Configure webhooks para integrar o checkout com sistemas externos</p>
        </div>
        <Button 
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Webhook
        </Button>
      </div>

      {isAddingNew && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Adicionar Novo Webhook</CardTitle>
            <CardDescription>
              Configure um novo endpoint de webhook para receber notificações em tempo real
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Webhook</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="Ex: Notificação de Novo Pedido" 
                  value={newWebhook.name} 
                  onChange={handleNewWebhookChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL do Endpoint</Label>
                <Input 
                  id="url" 
                  name="url"
                  placeholder="https://sua-api.com/webhook" 
                  value={newWebhook.url} 
                  onChange={handleNewWebhookChange} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Selecione os eventos</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {eventOptions.map(event => (
                  <div key={event.id} className="flex items-center space-x-2">
                    <Switch 
                      checked={selectedEvents.includes(event.id)} 
                      onCheckedChange={() => handleEventToggle(event.id)} 
                      id={`event-${event.id}`}
                    />
                    <Label htmlFor={`event-${event.id}`}>{event.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>Cancelar</Button>
            <Button onClick={handleAddWebhook}>Salvar Webhook</Button>
          </CardFooter>
        </Card>
      )}

      {webhooks.length > 0 ? (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Nome</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Eventos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[180px]">Última Execução</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Webhook className="h-4 w-4 text-gray-500" />
                      {webhook.name}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    <div className="flex items-center">
                      <span className="truncate mr-2">{webhook.url}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => copyWebhookUrl(webhook.url)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map(event => (
                        <span 
                          key={event} 
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={webhook.active} 
                        onCheckedChange={() => toggleWebhookStatus(webhook.id)} 
                      />
                      <span className={webhook.active ? "text-green-600" : "text-gray-400"}>
                        {webhook.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {webhook.lastTriggered ? (
                      <div className="flex items-center gap-1">
                        {getStatusIndicator(webhook.lastStatus)}
                        <span className="text-sm">{webhook.lastTriggered}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Nunca executado</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8"
                        disabled={!webhook.active || testingWebhook === webhook.id}
                        onClick={() => testWebhook(webhook.id)}
                      >
                        {testingWebhook === webhook.id ? (
                          <Clock className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Play className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => confirmDeleteWebhook(webhook.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card className="border-dashed border-2 bg-gray-50">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-6">
            <Webhook className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Nenhum webhook configurado</h3>
            <p className="text-gray-500 mt-1 mb-4">
              Crie seu primeiro webhook para conectar seu checkout a sistemas externos
            </p>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Webhook
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Integração com o Checkout</CardTitle>
          <CardDescription>
            Como integrar webhooks com seu processo de checkout
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Eventos disponíveis:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {eventOptions.map(event => (
                <li key={event.id}>
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">{event.id}</span>
                  <span className="ml-2">{event.label}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">
              Para usar webhooks, configure um endpoint em seu servidor que possa receber solicitações POST. 
              Seu endpoint receberá dados em tempo real sempre que os eventos selecionados ocorrerem 
              durante o processo de checkout.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Exemplo de payload recebido:</h4>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
              {`{
  "event": "checkout.completed",
  "timestamp": "2023-06-13T15:30:45Z",
  "data": {
    "order_id": "#ORD-5392",
    "customer": {
      "name": "João Silva",
      "email": "joao@exemplo.com"
    },
    "payment": {
      "method": "Cartão de crédito",
      "amount": 80.00,
      "status": "approved"
    }
  }
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este webhook? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteWebhook} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WebhookManager;
