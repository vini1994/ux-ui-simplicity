
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Banknote,
  CreditCard, 
  BarChart3
} from "lucide-react";

const mockPayments = [
  {
    id: "PAY-001",
    orderId: "#ORD-5392",
    customer: "João Silva",
    date: "13/06/2023",
    amount: "R$ 80,00",
    method: "Cartão de crédito",
    status: "approved"
  },
  {
    id: "PAY-002",
    orderId: "#ORD-5391",
    customer: "Maria Souza",
    date: "13/06/2023",
    amount: "R$ 80,00",
    method: "PIX",
    status: "waiting"
  },
  {
    id: "PAY-003",
    orderId: "#ORD-5390",
    customer: "Pedro Santos",
    date: "12/06/2023",
    amount: "R$ 80,00",
    method: "PIX",
    status: "waiting"
  },
  {
    id: "PAY-004",
    orderId: "#ORD-5389",
    customer: "Ana Oliveira",
    date: "12/06/2023",
    amount: "R$ 80,00",
    method: "Cartão de crédito",
    status: "approved"
  },
  {
    id: "PAY-005",
    orderId: "#ORD-5388",
    customer: "Carlos Mendes",
    date: "11/06/2023",
    amount: "R$ 80,00",
    method: "Cartão de crédito",
    status: "rejected"
  }
];

const PaymentStatus = () => {
  const [search, setSearch] = useState("");
  const [filteredPayments, setFilteredPayments] = useState(mockPayments);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    
    if (searchTerm === "") {
      setFilteredPayments(mockPayments);
    } else {
      const filtered = mockPayments.filter(payment => 
        payment.id.toLowerCase().includes(searchTerm) || 
        payment.orderId.toLowerCase().includes(searchTerm) ||
        payment.customer.toLowerCase().includes(searchTerm)
      );
      setFilteredPayments(filtered);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Aprovado
          </span>
        );
      case "waiting":
        return (
          <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 px-2 py-1 rounded text-xs font-medium">
            <Clock className="h-3 w-3" />
            Aguardando
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded text-xs font-medium">
            <XCircle className="h-3 w-3" />
            Rejeitado
          </span>
        );
      default:
        return status;
    }
  };

  // Calculate summary statistics
  const approvedPayments = mockPayments.filter(p => p.status === "approved").length;
  const waitingPayments = mockPayments.filter(p => p.status === "waiting").length;
  const rejectedPayments = mockPayments.filter(p => p.status === "rejected").length;
  
  // Calculate totals by payment method
  const creditCardTotal = mockPayments
    .filter(p => p.method === "Cartão de crédito" && p.status === "approved")
    .reduce((total, current) => total + 80, 0);
  
  const pixTotal = mockPayments
    .filter(p => p.method === "PIX" && p.status === "approved")
    .reduce((total, current) => total + 80, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg text-gray-700">
              <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
              Cartão de Crédito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {creditCardTotal.toFixed(2).replace('.', ',')}</div>
            <div className="text-sm text-gray-500">Total recebido</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg text-gray-700">
              <Banknote className="h-5 w-5 mr-2 text-green-500" />
              PIX
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {pixTotal.toFixed(2).replace('.', ',')}</div>
            <div className="text-sm text-gray-500">Total recebido</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg text-gray-700">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Status de Pagamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-green-600">{approvedPayments}</div>
                <div className="text-xs text-gray-500">Aprovados</div>
              </div>
              <div>
                <div className="text-xl font-bold text-yellow-600">{waitingPayments}</div>
                <div className="text-xs text-gray-500">Aguardando</div>
              </div>
              <div>
                <div className="text-xl font-bold text-red-600">{rejectedPayments}</div>
                <div className="text-xs text-gray-500">Rejeitados</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Transações</h2>
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar pagamento..."
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
                <TableHead>ID</TableHead>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.orderId}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div>Mostrando {filteredPayments.length} de {mockPayments.length} transações</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próximo</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
