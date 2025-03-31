
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Copy, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

interface Order {
  id: string;
  product: {
    name: string;
    price: number;
  };
  orderBump: {
    name: string;
    price: number;
  } | null;
  customer: {
    name: string;
    email: string;
  };
  paymentMethod: string;
  total: number;
  status: string;
  date: string;
}

const ThankYouPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Em produção, isso seria uma chamada de API para obter detalhes do pedido
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);
  
  const handleCopyOrderId = () => {
    if (order?.id) {
      navigator.clipboard.writeText(order.id);
      toast({
        title: "Número do pedido copiado",
        description: "O número do pedido foi copiado para a área de transferência."
      });
    }
  };
  
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="mb-4">Pedido não encontrado.</p>
              <Link to="/products">
                <Button>Ver produtos disponíveis</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-gray-600">
              Obrigado pela sua compra, {order.customer.name.split(' ')[0]}!
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div>Detalhes do Pedido</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span>{order.id}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={handleCopyOrderId}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{order.product.name}</span>
                  <span>R$ {order.product.price.toFixed(2)}</span>
                </div>
                
                {order.orderBump && (
                  <div className="flex justify-between text-sm">
                    <span>{order.orderBump.name}</span>
                    <span>R$ {order.orderBump.price.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Forma de pagamento</span>
                  <span>
                    {order.paymentMethod === "credit" ? "Cartão de Crédito" : "PIX"}
                  </span>
                </div>
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
              
              {order.paymentMethod === "pix" && (
                <div className="bg-blue-50 p-4 rounded-md text-center mt-4">
                  <p className="text-sm text-blue-700 mb-2">
                    Pagamento via PIX já registrado e aprovado.
                  </p>
                  <p className="text-xs text-blue-600">
                    O comprovante foi enviado para seu e-mail.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">O que acontece agora?</h3>
              <p className="text-sm text-gray-600">
                Um e-mail de confirmação foi enviado para {order.customer.email} com todos os detalhes do seu pedido.
              </p>
            </div>
            
            <div className="text-center">
              <Link to="/products">
                <Button variant="outline" className="mr-2">
                  Continuar Comprando
                </Button>
              </Link>
              <Link to="/">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Home className="h-4 w-4 mr-2" />
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
