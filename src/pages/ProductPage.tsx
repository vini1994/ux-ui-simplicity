
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowRight, Home } from "lucide-react";
import { triggerAllWebhooks } from "@/utils/webhookUtils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

// Produtos de exemplo para demonstração
const demoProducts: Product[] = [
  {
    id: "prod-1",
    name: "Curso de Marketing Digital",
    description: "Aprenda estratégias avançadas de marketing digital para aumentar suas conversões.",
    price: 297.00,
    image: "/placeholder.svg"
  },
  {
    id: "prod-2",
    name: "Mentoria de Negócios",
    description: "6 semanas de mentoria personalizada para alavancar seu negócio online.",
    price: 997.00,
    image: "/placeholder.svg"
  },
  {
    id: "prod-3",
    name: "E-book: Vendas na Internet",
    description: "Guia completo com 150 páginas sobre como vender mais na internet.",
    price: 47.00,
    image: "/placeholder.svg"
  }
];

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  
  const handleBuyNow = (product: Product) => {
    // Armazena os dados do produto selecionado no localStorage para usar no checkout
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    
    // Dispara webhook de início de checkout (demonstração)
    triggerAllWebhooks("checkout.started", {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Produtos</h1>
            <p className="text-gray-500 mt-1">Escolha um produto para comprar</p>
          </div>
          <div className="flex gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Início
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="sm">Admin</Button>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border shadow-sm">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">Imagem do produto</div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="flex justify-between">
                  <span>{product.description}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-600">
                  R$ {product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="bg-gray-50">
                <Link to={`/checkout/${product.id}`} className="w-full" onClick={() => handleBuyNow(product)}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Comprar agora
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
