
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  ChevronLeft,
  Search,
  Users,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Settings,
  Home
} from "lucide-react";
import AdminAuth from "@/components/admin/AdminAuth";
import OrdersList from "@/components/admin/OrdersList";
import CustomersList from "@/components/admin/CustomersList";
import PaymentStatus from "@/components/admin/PaymentStatus";
import AdminNavigation from "@/components/admin/AdminNavigation";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Simple authentication for demo purposes
    if (credentials.username === "admin" && credentials.password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo"
      });
    } else {
      toast({
        title: "Falha no login",
        description: "Credenciais inválidas",
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      
      <div className="container mx-auto p-4 pt-6">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
              <p className="text-gray-500 mt-1">Gerencie pedidos, clientes e pagamentos</p>
            </div>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Voltar para a loja
              </Button>
            </Link>
          </div>
        </header>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg text-gray-700">
                <ShoppingCart className="h-5 w-5 mr-2 text-emerald-500" />
                Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
              <div className="text-sm text-gray-500">Total de pedidos hoje</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg text-gray-700">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">124</div>
              <div className="text-sm text-gray-500">Total de clientes cadastrados</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg text-gray-700">
                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                Pagamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 6.480,00</div>
              <div className="text-sm text-gray-500">Faturamento do mês</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border-0 p-1">
          <Tabs defaultValue="orders">
            <TabsList className="w-full bg-gray-50 p-1 rounded-t-lg">
              <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-white">
                <ShoppingCart className="h-4 w-4" />
                <span>Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Users className="h-4 w-4" />
                <span>Clientes</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2 data-[state=active]:bg-white">
                <CreditCard className="h-4 w-4" />
                <span>Pagamentos</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="p-4 pt-6">
              <OrdersList />
            </TabsContent>
            
            <TabsContent value="customers" className="p-4 pt-6">
              <CustomersList />
            </TabsContent>
            
            <TabsContent value="payments" className="p-4 pt-6">
              <PaymentStatus />
            </TabsContent>
            
            <TabsContent value="settings" className="p-4 pt-6">
              <Card className="border-0">
                <CardHeader>
                  <CardTitle>Configurações do Checkout</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-6">Configure as opções de pagamento e entrega do seu checkout.</p>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Métodos de Pagamento</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="credit-card" className="rounded text-emerald-600" defaultChecked />
                          <label htmlFor="credit-card">Cartão de Crédito</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="pix" className="rounded text-emerald-600" defaultChecked />
                          <label htmlFor="pix">PIX</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="boleto" className="rounded text-emerald-600" />
                          <label htmlFor="boleto">Boleto Bancário</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="paypal" className="rounded text-emerald-600" />
                          <label htmlFor="paypal">PayPal</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Opções de Email</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="email-confirmation" className="rounded text-emerald-600" defaultChecked />
                          <label htmlFor="email-confirmation">Email de confirmação de compra</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="email-payment" className="rounded text-emerald-600" defaultChecked />
                          <label htmlFor="email-payment">Email de confirmação de pagamento</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Salvar Configurações</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
