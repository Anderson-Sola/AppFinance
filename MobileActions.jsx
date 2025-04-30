
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, Landmark, History, PieChart as PieIcon } from "lucide-react";
import ExpenseForm from "@/components/ExpenseForm";
import IncomeForm from "@/components/IncomeForm";
import ExpenseList from "@/components/ExpenseList";
import FilterControls from "@/components/FilterControls";
import CategoryChart from "@/components/CategoryChart";
import { Button } from "@/components/ui/button";
import { categoryNames, categoryIcons } from "@/lib/categories";

const MobileActions = ({
  expenses,
  categoryChartData,
  onAddExpense,
  onDeleteExpense,
  onAddIncome,
  sortOrder,
  selectedCategory,
  selectedDate,
  availableMonths,
  onSortToggle,
  onCategoryChange,
  onDateChange,
}) => {
  const [activeAccordion, setActiveAccordion] = React.useState(null);

  const handleAddExpenseSuccess = (expense) => {
    onAddExpense(expense);
    // setActiveAccordion(null); // Option: Close accordion after adding
  };
  
  const handleAddIncomeSuccess = (income) => {
    onAddIncome(income);
    // setActiveAccordion(null); // Option: Close accordion after adding
  };
  
   const getCategoryLabel = (value) => {
     return categoryNames[value] || value;
   }

  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full space-y-4"
      value={activeAccordion}
      onValueChange={setActiveAccordion}
    >
      <AccordionItem value="add-expense" className="border bg-card rounded-lg shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-base font-semibold text-primary">
          <span className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" /> Adicionar Despesa
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-0">
          <ExpenseForm onAddExpense={handleAddExpenseSuccess} onClose={() => setActiveAccordion(null)} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="add-income" className="border bg-card rounded-lg shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-base font-semibold text-green-600">
           <span className="flex items-center gap-2">
             <Landmark className="h-5 w-5" /> Adicionar Receita
           </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-0">
          <IncomeForm onAddIncome={handleAddIncomeSuccess} onClose={() => setActiveAccordion(null)} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="history" className="border bg-card rounded-lg shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-base font-semibold">
           <span className="flex items-center gap-2">
             <History className="h-5 w-5" /> Histórico de Despesas
           </span>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="mb-4 flex flex-col sm:flex-row justify-end items-end gap-2">
             <FilterControls 
               sortOrder={sortOrder}
               selectedCategory={selectedCategory}
               selectedDate={selectedDate}
               availableMonths={availableMonths}
               onSortToggle={onSortToggle}
               onCategoryChange={onCategoryChange}
               onDateChange={onDateChange}
             />
          </div>
           {selectedCategory !== "all" && (
             <div className="mb-4">
               <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-sm">
                 <span>Filtro: {categoryIcons[selectedCategory]} {getCategoryLabel(selectedCategory)}</span>
                 <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 rounded-full"
                    onClick={() => onCategoryChange("all")}
                  >
                    ×
                  </Button>
               </div>
             </div>
           )}
          <ExpenseList expenses={expenses} onDeleteExpense={onDeleteExpense} />
        </AccordionContent>
      </AccordionItem>
      
       <AccordionItem value="chart" className="border bg-card rounded-lg shadow-sm">
         <AccordionTrigger className="px-4 py-3 text-base font-semibold">
           <span className="flex items-center gap-2">
             <PieIcon className="h-5 w-5" /> Gráfico por Categoria
           </span>
         </AccordionTrigger>
         <AccordionContent className="px-0 pb-0">
           <CategoryChart data={categoryChartData} />
         </AccordionContent>
       </AccordionItem>
    </Accordion>
  );
};

export default MobileActions;
