
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Calendar, CreditCard, DollarSign, Zap, Wallet, Landmark, Minus, Plus, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import IncomeForm from "@/components/IncomeForm";
import MonthSelector from "@/components/MonthSelector"; // Import MonthSelector
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const MonthSummary = ({ selectedMonthData, selectedDate, availableMonths, onAddIncome, onDateChange }) => {
  const {
    totalExpenses,
    totalIncome,
    balance,
    biggestExpense,
    paymentMethodTotals,
    monthExpenses, // Renamed from currentMonthExpenses for clarity
  } = selectedMonthData;

  const [incomeDialogOpen, setIncomeDialogOpen] = React.useState(false);

  const paymentMethodNames = {
    cartao: "Cartão de Crédito",
    pix: "Pix",
    dinheiro: "Dinheiro",
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-2 border-primary/20">
        <CardHeader className="gradient-bg text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Calendar className="h-5 w-5" />
              Resumo Mensal
            </CardTitle>
            {/* Month Selector */}
            <MonthSelector 
              selectedDate={selectedDate} 
              availableMonths={availableMonths}
              onDateChange={onDateChange}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            
            {/* Saldo */}
            <div className="text-center border-b pb-4 mb-4">
              <span className="text-sm text-muted-foreground">Saldo ({format(selectedDate, "MMMM", { locale: ptBR })})</span>
              <motion.span 
                key={balance} // Use balance as key to trigger animation on change
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "block text-3xl md:text-4xl font-bold mt-1",
                  balance >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                R$ {balance.toFixed(2).replace(".", ",")}
              </motion.span>
            </div>

            {/* Receitas vs Despesas */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-green-100/50 dark:bg-green-900/30 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 mb-1 text-green-700 dark:text-green-400">
                  <Plus className="h-4 w-4" />
                  <span className="text-xs font-medium">Receitas</span>
                </div>
                <span className="text-lg md:text-xl font-semibold text-green-800 dark:text-green-300">
                  R$ {totalIncome.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="bg-red-100/50 dark:bg-red-900/30 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 mb-1 text-red-700 dark:text-red-400">
                  <Minus className="h-4 w-4" />
                  <span className="text-xs font-medium">Despesas</span>
                </div>
                <span className="text-lg md:text-xl font-semibold text-red-800 dark:text-red-300">
                  R$ {totalExpenses.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            {/* Botão Adicionar Receita */}
             <Dialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen}>
              <DialogTrigger asChild>
                 <Button variant="outline" className="w-full">
                   <Landmark className="mr-2 h-4 w-4" /> Adicionar Receita (Mês Atual)
                 </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Receita</DialogTitle>
                </DialogHeader>
                <IncomeForm 
                  onAddIncome={onAddIncome} 
                  onClose={() => setIncomeDialogOpen(false)} 
                />
              </DialogContent>
            </Dialog>

            {/* Detalhes Despesas */}
            <div className="space-y-3 pt-4 border-t">
               <div className="flex items-center gap-2 mb-2">
                 <Scale className="h-4 w-4 text-primary" />
                 <h4 className="text-sm font-medium">Detalhes das Despesas ({format(selectedDate, "MMMM", { locale: ptBR })})</h4>
               </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">Maior despesa</span>
                  </div>
                  {biggestExpense ? (
                    <div>
                      <p className="text-sm font-medium truncate">{biggestExpense.description}</p>
                      <p className="text-base font-bold">
                        R$ {biggestExpense.amount.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-xs">Nenhuma despesa</p>
                  )}
                </div>
                
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">Quantidade</span>
                  </div>
                  <p className="text-base font-bold">
                    {monthExpenses.length} {monthExpenses.length === 1 ? "despesa" : "despesas"}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 my-2">
                  <Wallet className="h-4 w-4 text-primary" />
                  <h4 className="text-xs font-medium">Gastos por Pagamento</h4>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1 bg-muted/50 p-2 rounded-md text-xs">
                    <CreditCard className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-muted-foreground">{paymentMethodNames.cartao}</p>
                      <p className="font-medium">R${(paymentMethodTotals.cartao || 0).toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-muted/50 p-2 rounded-md text-xs">
                    <Zap className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                     <div className="truncate">
                      <p className="text-muted-foreground">{paymentMethodNames.pix}</p>
                      <p className="font-medium">R${(paymentMethodTotals.pix || 0).toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-muted/50 p-2 rounded-md text-xs">
                    <DollarSign className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                     <div className="truncate">
                      <p className="text-muted-foreground">{paymentMethodNames.dinheiro}</p>
                      <p className="font-medium">R${(paymentMethodTotals.dinheiro || 0).toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MonthSummary;
