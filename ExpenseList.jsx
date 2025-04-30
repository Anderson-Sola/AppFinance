
import React from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Calendar, Tag, CreditCard, DollarSign, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button"; // Importação adicionada
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { categoryIcons, categoryNames } from "@/lib/categories"; // Corrigido para importar de categories.jsx

// paymentMethodIcons e paymentMethodNames agora são importados de categories.jsx
import { paymentMethodIcons, paymentMethodNames } from "@/lib/categories";

const ExpenseListItem = ({ expense, onDelete }) => {
  return (
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      layout
      className="expense-card"
    >
      <Card className="overflow-hidden border border-primary/10 hover:border-primary/30 transition-all">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center p-3 md:p-4 flex-1 min-w-0"> {/* Added min-w-0 for better wrapping */}
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xl mr-3 md:mr-4 flex-shrink-0">
                {categoryIcons[expense.category] || "📦"}
              </div>
              <div className="flex-1 min-w-0"> {/* Added min-w-0 */}
                <h3 className="font-medium truncate">{expense.description}</h3> {/* Added truncate */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(parseISO(expense.date), "dd/MM/yy", { locale: ptBR })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {categoryNames[expense.category] || "Outros"}
                  </span>
                   <span className="flex items-center gap-1">
                     {paymentMethodIcons[expense.paymentMethod] || <CreditCard className="h-3 w-3" />}
                     <span className="hidden sm:inline">{paymentMethodNames[expense.paymentMethod] || "N/A"}</span>
                   </span>
                </div>
              </div>
            </div>
            <div className="text-right ml-2 md:ml-4 px-2 flex-shrink-0">
              <p className="font-bold text-sm md:text-lg">
                R$ {expense.amount.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full text-destructive hover:text-destructive/90 hover:bg-destructive/10 mr-2 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir a despesa "{expense.description}" no valor de R$ {expense.amount.toFixed(2).replace(".", ",")}? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(expense.id)} className={buttonVariants({ variant: "destructive" })}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const { toast } = useToast();

  const handleDelete = (id) => {
    onDeleteExpense(id);
    toast({
      title: "Despesa removida",
      description: "A despesa foi removida com sucesso",
    });
  };

  if (expenses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 bg-muted/50 rounded-lg"
      >
        <p className="text-muted-foreground">Nenhuma despesa encontrada para este período/filtro.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <AnimatePresence>
        {expenses.map((expense) => (
          <ExpenseListItem key={expense.id} expense={expense} onDelete={handleDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseList;
