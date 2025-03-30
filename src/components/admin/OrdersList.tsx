
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle,
  Eye 
} from "lucide-react";

const mockOrders = [
  {
    id: "#ORD-5392",
    customer: "João Silva",
    date: "13/06/2023",
    amount: "R$ 80,00",
    status: "completed",
    paymentMethod: "Cartão de crédito"
  },
  {
    id: "#ORD-5391",
    customer: "Maria Souza",
    date: "13/06/2023",
    amount: "R$ 80,00",
    status: "processing",
    paymentMethod: "PIX"
  },
  {
    id: "#ORD-5390",
    customer: "Pedro Santos",
    date: "12/06/2023",
    amount: "R$ 80,00",
    status: "pending",
    paymentMethod: "PIX"
  },
  {
    id: "#ORD-5389",
    customer: "Ana Oliveira",
    date: "12/06/2023",
    amount: "R$ 80,00",
    status: "completed",
    paymentMethod: "Cartão de crédito"
  },
  {
    id: "#ORD-5388",
    customer: "Carlos Mendes",
    date: "11/06/2023",
    amount: "R$ 80,00",
    status: "canceled",
    paymentMethod: "Cartão de crédito"
  },
  {
    id: "#ORD-5387",
    customer: "Julia Costa",
    date: "11/06/2023",
    amount: "R$ 80,00",
    status: "completed",
    paymentMethod: "PIX"
  }
];

const OrdersList = () => {
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    
    if (searchTerm === "") {
      setFilteredOrders(mockOrders);
    } else {
      const filtered = mockOrders.filter(order => 
        order.id.toLowerCase().includes(searchTerm) || 
        order.customer.toLowerCase().includes(searchTerm)
      );
      setFilteredOrders(filtered);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Concluído
          </span>
        );
      case "processing":
        return (
          <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded text-xs font-medium">
            <Clock className="h-3 w-3" />
            Processando
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 px-2 py-1 rounded text-xs font-medium">
            <AlertCircle className="h-3 w-3" />
            Pendente
          </span>
        );
      case "canceled":
        return (
          <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded text-xs font-medium">
            <XCircle className="h-3 w-3" />
            Cancelado
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Pedidos recentes</h2>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar pedido..."
              className="pl-8 bg-white"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <Button>Filtrar</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>ID do Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Forma de Pagamento</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Mostrando {filteredOrders.length} de {mockOrders.length} pedidos</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Anterior</Button>
          <Button variant="outline" size="sm" disabled>Próximo</Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
