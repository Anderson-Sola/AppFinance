
import React, { useState } from "react";
import { format } from "date-fns";
import { PlusCircle, CreditCard, DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categoryNames, categoryIcons } from "@/lib/categories"; // Use category names/icons

const ExpenseForm = ({ onAddExpense, onClose }) => {
  const { toast } = useToast();
  const defaultCategory = Object.keys(categoryNames)[Object.keys(categoryNames).length -1] || "outros"; // default to last category or 'outros'
  
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: format(new Date(), "yyyy-MM-dd"),
    category: defaultCategory,
    paymentMethod: "cartao",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value.replace(/[^0-9.,]/g, "") : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.date || !formData.paymentMethod) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(formData.amount.replace(",", "."));
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor válido",
        variant: "destructive",
      });
      return;
    }

    const newExpense = {
      id: Date.now(),
      description: formData.description,
      amount,
      date: formData.date,
      category: formData.category,
      paymentMethod: formData.paymentMethod,
    };

    onAddExpense(newExpense);
    
    toast({
      title: "Despesa adicionada",
      description: "Sua despesa foi registrada com sucesso!",
    });

    setFormData({
      description: "",
      amount: "",
      date: format(new Date(), "yyyy-MM-dd"),
      category: defaultCategory,
      paymentMethod: "cartao",
    });

    if (onClose) {
      onClose(); // Fecha o dialog/accordion se a função for passada
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-none">
        <CardHeader className="gradient-bg text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-lg">
            <PlusCircle className="h-5 w-5" />
            Adicionar Despesa
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                name="description"
                placeholder="Ex: Supermercado, Aluguel, etc."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  name="amount"
                  placeholder="0,00"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                     {Object.entries(categoryNames).map(([key, name]) => (
                       <SelectItem key={key} value={key}>
                         <span className="flex items-center gap-2">
                           {categoryIcons[key]} {name}
                         </span>
                       </SelectItem>
                     ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cartao">
                      <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Cartão de Crédito</span>
                    </SelectItem>
                    <SelectItem value="pix">
                      <span className="flex items-center gap-2"><Zap className="h-4 w-4" /> Pix</span>
                    </SelectItem>
                    <SelectItem value="dinheiro">
                      <span className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Dinheiro</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Adicionar Despesa
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExpenseForm;
