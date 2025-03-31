
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Settings, Package } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Bem-vindo à nossa loja</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Experimente nosso novo sistema de checkout com uma experiência de usuário aprimorada.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <Link to="/products">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Package className="mr-2 h-5 w-5" />
              Ver Produtos
            </Button>
          </Link>
          <Link to="/checkout/prod-1">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Ir para o Checkout
            </Button>
          </Link>
          <Link to="/admin">
            <Button size="lg" variant="outline">
              <Settings className="mr-2 h-5 w-5" />
              Painel Admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
