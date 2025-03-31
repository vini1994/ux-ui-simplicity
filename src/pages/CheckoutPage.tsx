
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, CreditCard, QrCode, ArrowRight, Check } from "lucide-react";
import { triggerAllWebhooks } from "@/utils/webhookUtils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface OrderBump {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

interface CustomerInfo {
  name: string;
  email: string;
  document: string;
  phone: string;
}

const CheckoutPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    document: "",
    phone: ""
  });

  // Exemplo de Order Bump (será configurável pelo painel admin)
  const [orderBump, setOrderBump] = useState<OrderBump>({
    id: "bump-1",
    name: "Garantia Estendida",
    description: "Estenda sua garantia por mais 12 meses com 50% de desconto!",
    price: 47.00,
    selected: false
  });

  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix">("credit");
  const [isLoading, setIsLoading] = useState(false);
  
  // Carregar produto do localStorage (no futuro, isso virá do backend)
  useEffect(() => {
    const storedProduct = localStorage.getItem('selectedProduct');
    
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    } else if (productId) {
      // Em uma implementação real, buscaríamos o produto do backend usando o ID
      // Por enquanto, usamos dados de exemplo
      const demoProducts = [
        {
          id: "prod-1",
          name: "Curso de Marketing Digital",
          description: "Aprenda estratégias avançadas de marketing digital para aumentar suas conversões.",
          price: 297.00
        },
        {
          id: "prod-2",
          name: "Mentoria de Negócios",
          description: "6 semanas de mentoria personalizada para alavancar seu negócio online.",
          price: 997.00
        },
        {
          id: "prod-3",
          name: "E-book: Vendas na Internet",
          description: "Guia completo com 150 páginas sobre como vender mais na internet.",
          price: 47.00
        }
      ];
      
      const foundProduct = demoProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [productId]);

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleOrderBump = () => {
    setOrderBump(prev => ({
      ...prev,
      selected: !prev.selected
    }));
  };

  const calculateTotal = () => {
    if (!product) return 0;
    
    let total = product.price;
    if (orderBump.selected) {
      total += orderBump.price;
    }
    
    return total;
  };

  const handlePayment = async () => {
    // Validar informações do cliente
    if (!customerInfo.name || !customerInfo.email || !customerInfo.document) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular processamento de pagamento
    setTimeout(() => {
      setIsLoading(false);
      
      // Aqui será integrado com o Mercado Pago
      // Por enquanto, vamos simular um pagamento bem-sucedido
      
      // Criar objeto de pedido
      const order = {
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        product: product,
        customer: customerInfo,
        orderBump: orderBump.selected ? orderBump : null,
        paymentMethod: paymentMethod,
        total: calculateTotal(),
        status: "approved",
        date: new Date().toISOString()
      };
      
      // Armazenar pedido no localStorage (em produção, isso iria para o banco de dados)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Enviar webhook de checkout concluído
      triggerAllWebhooks("checkout.completed", order);
      
      // Redirecionar para a página de agradecimento
      navigate(`/thank-you/${order.id}`);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="mb-4">Produto não encontrado.</p>
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Link to="/products">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Voltar para produtos
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">Checkout Seguro</h1>
          <div className="w-24"></div> {/* Spacer para centralizar o título */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário do cliente e pagamento */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo*</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    placeholder="Seu nome completo" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail*</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    placeholder="seu-email@exemplo.com" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="document">CPF*</Label>
                    <Input 
                      id="document" 
                      name="document"
                      value={customerInfo.document}
                      onChange={handleCustomerInfoChange}
                      placeholder="000.000.000-00" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      placeholder="(00) 00000-0000" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Button
                    type="button"
                    variant={paymentMethod === "credit" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("credit")}
                    className={`h-20 flex flex-col items-center justify-center gap-2 ${paymentMethod === "credit" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                  >
                    <CreditCard className={`h-6 w-6 ${paymentMethod === "credit" ? "text-white" : ""}`} />
                    <span>Cartão de Crédito</span>
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === "pix" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("pix")}
                    className={`h-20 flex flex-col items-center justify-center gap-2 ${paymentMethod === "pix" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                  >
                    <QrCode className={`h-6 w-6 ${paymentMethod === "pix" ? "text-white" : ""}`} />
                    <span>PIX</span>
                  </Button>
                </div>

                {paymentMethod === "credit" ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Aqui será integrado o CardForm do Mercado Pago. Por enquanto, estamos usando um placeholder.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-md border border-dashed">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Número do Cartão</Label>
                          <Input id="card-number" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-expiry">Data de Validade</Label>
                            <Input id="card-expiry" placeholder="MM/AA" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-cvc">Código de Segurança</Label>
                            <Input id="card-cvc" placeholder="CVC" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Nome no Cartão</Label>
                          <Input id="card-name" placeholder="NOME COMO ESTÁ NO CARTÃO" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="installments">Parcelas</Label>
                          <select 
                            id="installments" 
                            className="w-full h-10 px-3 rounded-md border"
                          >
                            <option value="1">1x de R$ {calculateTotal().toFixed(2)}</option>
                            <option value="2">2x de R$ {(calculateTotal() / 2).toFixed(2)}</option>
                            <option value="3">3x de R$ {(calculateTotal() / 3).toFixed(2)}</option>
                            <option value="4">4x de R$ {(calculateTotal() / 4).toFixed(2)}</option>
                            <option value="5">5x de R$ {(calculateTotal() / 5).toFixed(2)}</option>
                            <option value="6">6x de R$ {(calculateTotal() / 6).toFixed(2)}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 p-4 rounded-md border border-dashed text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <QrCode className="h-32 w-32 text-gray-800" />
                      <div className="text-sm text-gray-500">
                        Aqui será exibido o QR Code do PIX gerado pelo Mercado Pago
                      </div>
                      <div className="text-sm bg-gray-200 p-2 rounded w-full text-center">
                        Código PIX Copia e Cola
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                  <span className="font-medium">R$ {product.price.toFixed(2)}</span>
                </div>

                {/* Order Bump */}
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="order-bump"
                      checked={orderBump.selected}
                      onChange={toggleOrderBump}
                      className="mt-1 rounded text-emerald-600"
                    />
                    <div className="flex-1">
                      <label htmlFor="order-bump" className="font-medium cursor-pointer">
                        {orderBump.name}
                      </label>
                      <p className="text-sm text-gray-600">{orderBump.description}</p>
                      <p className="text-emerald-600 font-medium">+ R$ {orderBump.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {product.price.toFixed(2)}</span>
                  </div>
                  {orderBump.selected && (
                    <div className="flex justify-between text-sm">
                      <span>Order Bump</span>
                      <span>+ R$ {orderBump.price.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>R$ {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 gap-2"
                  onClick={handlePayment}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Processando...</>
                  ) : (
                    <>
                      Finalizar Compra
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
