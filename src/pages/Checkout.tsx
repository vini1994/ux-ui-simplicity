import React, { useState, useEffect } from "react";
import { 
  CreditCard, 
  CheckCircle, 
  Lock, 
  ArrowRight,
  X,
  Clock,
  User,
  Phone,
  Mail,
  Home
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { triggerAllWebhooks } from "@/utils/webhookUtils";

const Checkout = () => {
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 53, seconds: 57 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: ""
  });

  // Contador regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePurchase = () => {
    setIsLoading(true);
    
    // Simulating checkout process and payment processing
    setTimeout(async () => {
      // Create the order data
      const orderData = {
        order_id: `#ORD-${Math.floor(Math.random() * 10000)}`,
        customer: {
          name: personalInfo.name || "Cliente",
          email: personalInfo.email || "cliente@exemplo.com",
          phone: personalInfo.phone || "Não informado"
        },
        payment: {
          method: selectedPayment === "credit-card" ? "Cartão de crédito" : "PIX",
          amount: 80.00,
          status: "approved"
        },
        items: [
          {
            name: "ElementA",
            price: 80.00,
            quantity: 1
          }
        ],
        created_at: new Date().toISOString()
      };
      
      // Trigger webhooks for checkout completion
      try {
        await triggerAllWebhooks("checkout.completed", orderData);
        console.log("Webhooks triggered successfully");
      } catch (error) {
        console.error("Error triggering webhooks:", error);
      }
      
      // Also trigger payment-specific webhook
      try {
        await triggerAllWebhooks("payment.success", orderData.payment);
        console.log("Payment webhooks triggered successfully");
      } catch (error) {
        console.error("Error triggering payment webhooks:", error);
      }
      
      setIsLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    toast({
      title: "Compra realizada com sucesso!",
      description: selectedPayment === "pix" 
        ? "O código PIX foi gerado e enviado para seu email." 
        : "Pagamento aprovado!",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header com indicador de compra segura */}
      <header className="bg-white shadow-sm py-3 px-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-800">ElementA</div>
          <div className="flex items-center text-emerald-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-1.5" />
            COMPRA SEGURA
          </div>
        </div>
      </header>
      
      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6 grid md:grid-cols-12 gap-6">
        {/* Coluna da esquerda: Produto e Detalhes */}
        <div className="md:col-span-7 space-y-6">
          {/* Countdown Timer */}
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="bg-gray-900 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                  <h3 className="font-medium">Promoção por tempo limitado</h3>
                </div>
              </div>
              <div className="flex justify-center mt-3 space-x-2">
                <div className="bg-gray-800 p-3 rounded-md text-center w-16">
                  <div className="text-2xl font-bold">{String(countdown.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">horas</div>
                </div>
                <div className="text-2xl font-bold flex items-center">:</div>
                <div className="bg-gray-800 p-3 rounded-md text-center w-16">
                  <div className="text-2xl font-bold">{String(countdown.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">min</div>
                </div>
                <div className="text-2xl font-bold flex items-center">:</div>
                <div className="bg-gray-800 p-3 rounded-md text-center w-16">
                  <div className="text-2xl font-bold">{String(countdown.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">seg</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Product Preview */}
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src="/lovable-uploads/7d8599a2-85ea-48b0-8cd2-32642f0e4c75.png" 
                alt="ElementA Product" 
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-2">Você não precisa mais criar tudo do zero!</h2>
                  <p className="text-gray-200 text-sm">Tenha acesso a minha IA para gerar automaticamente componentes e layouts responsivos para Elementor.</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4 bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Detalhes da compra</span>
                </div>
                <div className="text-lg font-bold">R$ 80,00</div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nome completo</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    value={personalInfo.name}
                    onChange={handleInputChange}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    className="pl-10"
                    value={personalInfo.email}
                    onChange={handleInputChange}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={personalInfo.cpf}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(00) 00000-0000"
                      className="pl-10"
                      value={personalInfo.phone}
                      onChange={handleInputChange}
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Coluna da direita: Pagamento */}
        <div className="md:col-span-5 space-y-6">
          <Card className="border-0 shadow-md sticky top-24">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Finalizar Pagamento</CardTitle>
                <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Compra Segura
                </div>
              </div>
              <CardDescription className="text-gray-500">
                Escolha seu método de pagamento preferido
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <Tabs defaultValue="credit-card" onValueChange={setSelectedPayment}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="credit-card" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>Cartão de crédito</span>
                  </TabsTrigger>
                  <TabsTrigger value="pix" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <img src="/lovable-uploads/b337519f-cba4-4c16-9687-ab770e93af5c.png" alt="PIX" className="w-4 h-4 mr-2" />
                    <span>PIX</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="credit-card" className="space-y-4">
                  <PaymentCardForm />
                </TabsContent>

                <TabsContent value="pix">
                  <div className="flex flex-col items-center text-center space-y-6 py-4">
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <img 
                        src="/lovable-uploads/b337519f-cba4-4c16-9687-ab770e93af5c.png"
                        alt="Logo PIX" 
                        className="w-20 mb-2 mx-auto" 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Pague instantaneamente</h3>
                      <p className="text-gray-600 text-sm">
                        Ao confirmar a compra, você receberá o código PIX para fazer o pagamento em segundos.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <Separator />

            <CardFooter className="flex flex-col space-y-4 pt-6">
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 text-sm">Subtotal:</span>
                  <span className="text-gray-700">R$ 80,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total:</span>
                  <span className="text-xl font-bold text-gray-900">R$ 80,00</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6" 
                onClick={handlePurchase}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    Processando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    FINALIZAR COMPRA
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center text-xs text-gray-500 mt-2">
                <Lock className="w-3 h-3 mr-1" />
                <span>Seus dados estão protegidos e sua compra é 100% segura</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <footer className="bg-white py-4 border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>Mercado Pago está processando este pagamento sob o número Vinicius Reinehart.</p>
          <p className="mt-1">Os seus dados pessoais serão utilizados para processar a sua compra, apoiar a sua experiência em todo este site e para outros fins descritos na nossa Política de Privacidade.</p>
        </div>
      </footer>

      {/* Dialog de Sucesso */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-center text-xl">
              <CheckCircle className="h-6 w-6 text-emerald-500 mr-2" />
              Pagamento confirmado!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-center">
              <p className="text-emerald-800 text-sm">
                Seu pagamento foi processado com sucesso! Enviamos um e-mail com os detalhes da sua compra.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={handleSuccessClose}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Continuar
              </Button>
              <Link to="/" className="text-center text-sm text-gray-500 hover:text-gray-700">
                Voltar para a loja
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PaymentCardForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700" htmlFor="cardNumber">
          Número do cartão
        </Label>
        <div className="relative">
          <Input
            id="cardNumber"
            type="text"
            placeholder="0000 0000 0000 0000"
            className="pl-4 pr-10"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700" htmlFor="expiryDate">
            Data de validade
          </Label>
          <Input
            id="expiryDate"
            type="text"
            placeholder="MM/AA"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700" htmlFor="securityCode">
            Código de segurança
          </Label>
          <Input
            id="securityCode"
            type="text"
            placeholder="CVV"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700" htmlFor="cardholderName">
          Nome no cartão
        </Label>
        <Input
          id="cardholderName"
          type="text"
          placeholder="Como aparece no cartão"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700" htmlFor="installments">
          Parcelas
        </Label>
        <select
          id="installments"
          className="w-full rounded-md border border-gray-200 py-3 px-4 text-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option>1x de R$ 80,00 sem juros</option>
          <option>2x de R$ 40,00 sem juros</option>
          <option>3x de R$ 26,67 sem juros</option>
        </select>
      </div>
    </div>
  );
};

export default Checkout;
