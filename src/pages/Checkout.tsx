
import React, { useState } from "react";
import { 
  CreditCard, 
  CheckCircle, 
  Lock, 
  ArrowRight,
  X
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Checkout = () => {
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = () => {
    setIsLoading(true);
    
    // Simulando processamento de pagamento
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Compra realizada com sucesso!",
        description: selectedPayment === "pix" 
          ? "O código PIX foi gerado e enviado para seu email." 
          : "Pagamento aprovado!",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium text-gray-800">Finalizar Compra</CardTitle>
              <div className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
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
                <div className="flex flex-col items-center text-center space-y-4">
                  <img 
                    src="/lovable-uploads/b337519f-cba4-4c16-9687-ab770e93af5c.png"
                    alt="Logo PIX" 
                    className="w-40 mb-2" 
                  />
                  <h3 className="text-lg font-medium text-gray-800">Pague de forma segura e instantânea</h3>
                  <p className="text-gray-600 text-sm">
                    Ao confirmar a compra, nós vamos te mostrar o código para fazer o pagamento.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <Separator />

          <CardFooter className="flex flex-col space-y-4 pt-6">
            <div className="w-full flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total:</span>
              <span className="text-xl font-bold text-gray-900">R$ 80,00</span>
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
                  COMPRAR R$ 80,00
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

        <div className="mt-4 flex justify-center">
          <Button variant="ghost" size="sm" className="text-gray-500 text-sm">
            <ArrowRight className="w-4 h-4 mr-1 rotate-180" />
            Voltar para a loja
          </Button>
        </div>
      </div>
    </div>
  );
};

const PaymentCardForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="cardNumber">
          Número do cartão
        </label>
        <div className="relative">
          <input
            id="cardNumber"
            type="text"
            placeholder="0000 0000 0000 0000"
            className="w-full rounded-md border border-gray-200 py-3 px-4 text-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="expiryDate">
            Data de validade
          </label>
          <input
            id="expiryDate"
            type="text"
            placeholder="MM/AA"
            className="w-full rounded-md border border-gray-200 py-3 px-4 text-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="securityCode">
            Código de segurança
          </label>
          <input
            id="securityCode"
            type="text"
            placeholder="CVV"
            className="w-full rounded-md border border-gray-200 py-3 px-4 text-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="cardholderName">
          Nome no cartão
        </label>
        <input
          id="cardholderName"
          type="text"
          placeholder="Como aparece no cartão"
          className="w-full rounded-md border border-gray-200 py-3 px-4 text-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="installments">
          Parcelas
        </label>
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
