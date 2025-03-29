
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Bem-vindo à nossa loja</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Experimente nosso novo sistema de checkout com uma experiência de usuário aprimorada.
        </p>
        <Link to="/checkout">
          <Button size="lg" className="mt-4 bg-emerald-600 hover:bg-emerald-700">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Ir para o Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
