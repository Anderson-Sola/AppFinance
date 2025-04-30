
import React, { useState } from "react";
import { format } from "date-fns";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const IncomeForm = ({ onAddIncome, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: format(new Date(), "yyyy-MM-dd"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value.replace(/[^0-9.,]/g, "") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.date) {
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

    const newIncome = {
      id: Date.now(),
      description: formData.description,
      amount,
      date: formData.date,
    };

    onAddIncome(newIncome);
    
    toast({
      title: "Receita adicionada",
      description: "Sua receita foi registrada com sucesso!",
    });

    setFormData({
      description: "",
      amount: "",
      date: format(new Date(), "yyyy-MM-dd"),
    });

    if (onClose) {
      onClose(); // Fecha o dialog/accordion
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
            Adicionar Receita
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="income-description">Descrição</Label>
              <Input
                id="income-description"
                name="description"
                placeholder="Ex: Salário, Adiantamento, Venda"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="income-amount">Valor (R$)</Label>
                <Input
                  id="income-amount"
                  name="amount"
                  placeholder="0,00"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="income-date">Data</Label>
                <Input
                  id="income-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Adicionar Receita
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IncomeForm;
