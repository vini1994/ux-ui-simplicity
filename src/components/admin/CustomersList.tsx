
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
import { Search, Eye, Mail, Phone } from "lucide-react";

const mockCustomers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "(11) 98765-4321",
    orders: 3,
    total: "R$ 240,00",
    lastPurchase: "13/06/2023"
  },
  {
    id: "2",
    name: "Maria Souza",
    email: "maria.souza@example.com",
    phone: "(11) 91234-5678",
    orders: 1,
    total: "R$ 80,00",
    lastPurchase: "13/06/2023"
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "pedro.santos@example.com",
    phone: "(21) 99876-5432",
    orders: 2,
    total: "R$ 160,00",
    lastPurchase: "12/06/2023"
  },
  {
    id: "4",
    name: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    phone: "(21) 98765-1234",
    orders: 1,
    total: "R$ 80,00",
    lastPurchase: "12/06/2023"
  },
  {
    id: "5",
    name: "Carlos Mendes",
    email: "carlos.mendes@example.com",
    phone: "(31) 99999-8888",
    orders: 2,
    total: "R$ 160,00",
    lastPurchase: "11/06/2023"
  }
];

const CustomersList = () => {
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    
    if (searchTerm === "") {
      setFilteredCustomers(mockCustomers);
    } else {
      const filtered = mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) || 
        customer.email.toLowerCase().includes(searchTerm)
      );
      setFilteredCustomers(filtered);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Lista de Clientes</h2>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar cliente..."
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
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-center">Pedidos</TableHead>
              <TableHead>Total Gasto</TableHead>
              <TableHead>Última Compra</TableHead>
              <TableHead className="w-[120px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="text-center">{customer.orders}</TableCell>
                <TableCell>{customer.total}</TableCell>
                <TableCell>{customer.lastPurchase}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Mail className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Mostrando {filteredCustomers.length} de {mockCustomers.length} clientes</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Anterior</Button>
          <Button variant="outline" size="sm" disabled>Próximo</Button>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
