
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, ShoppingCart, Users, CreditCard, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="space-y-4 py-4">
                  <h2 className="mb-6 text-lg font-semibold tracking-tight">ElementA Admin</h2>
                  <MobileNavItems />
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-lg font-semibold text-emerald-600 ml-2 md:ml-0">ElementA Admin</div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            <DesktopNavItems />
          </div>

          <div className="flex items-center">
            <Button variant="outline" size="sm" className="mr-2">
              Ajuda
            </Button>
            <div className="bg-gray-100 text-gray-800 rounded-full h-8 w-8 flex items-center justify-center">
              A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopNavItems = () => {
  return (
    <>
      <Link to="/admin">
        <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 flex items-center gap-1">
          <ShoppingCart className="h-4 w-4" />
          <span>Pedidos</span>
        </Button>
      </Link>
      <Link to="/admin">
        <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>Clientes</span>
        </Button>
      </Link>
      <Link to="/admin">
        <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 flex items-center gap-1">
          <CreditCard className="h-4 w-4" />
          <span>Pagamentos</span>
        </Button>
      </Link>
      <Link to="/admin">
        <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 flex items-center gap-1">
          <Settings className="h-4 w-4" />
          <span>Configurações</span>
        </Button>
      </Link>
    </>
  );
};

const MobileNavItems = () => {
  return (
    <div className="space-y-1">
      <Link to="/" className="block">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Home className="h-4 w-4" />
          <span>Página Inicial</span>
        </Button>
      </Link>
      <Link to="/admin" className="block">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Pedidos</span>
        </Button>
      </Link>
      <Link to="/admin" className="block">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Users className="h-4 w-4" />
          <span>Clientes</span>
        </Button>
      </Link>
      <Link to="/admin" className="block">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <CreditCard className="h-4 w-4" />
          <span>Pagamentos</span>
        </Button>
      </Link>
      <Link to="/admin" className="block">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          <span>Configurações</span>
        </Button>
      </Link>
    </div>
  );
};

export default AdminNavigation;
