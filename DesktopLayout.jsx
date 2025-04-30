
import React from "react";
import ExpenseForm from "@/components/ExpenseForm";
import MonthSummary from "@/components/MonthSummary";
import ExpenseList from "@/components/ExpenseList";
import FilterControls from "@/components/FilterControls";
import CategoryChart from "@/components/CategoryChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categoryNames, categoryIcons } from "@/lib/categories";

const DesktopLayout = ({
  expenses,
  selectedMonthData,
  selectedDate,
  availableMonths,
  onAddExpense,
  onDeleteExpense,
  onAddIncome,
  sortOrder,
  selectedCategory,
  onSortToggle,
  onCategoryChange,
  onDateChange,
}) => {
  
   const getCategoryLabel = (value) => {
     return categoryNames[value] || value;
   }
   
  return (
    <div className="space-y-8">
      {/* Top Section: Forms and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
           <ExpenseForm onAddExpense={onAddExpense} />
        </div>
        <div className="lg:col-span-2">
          <MonthSummary 
            selectedMonthData={selectedMonthData}
            selectedDate={selectedDate}
            availableMonths={availableMonths}
            onAddIncome={onAddIncome} 
            onDateChange={onDateChange}
          />
        </div>
      </div>

      {/* Bottom Section: History and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <h2 className="text-xl font-bold">Histórico de Despesas</h2>
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
                 <div className="mt-4">
                   <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-sm">
                     <span>Filtro Categoria:</span>
                     <span className="font-medium">
                       {categoryIcons[selectedCategory]} {getCategoryLabel(selectedCategory)}
                     </span>
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
            </div>
             <div className="p-4">
                 <ExpenseList
                   expenses={expenses}
                   onDeleteExpense={onDeleteExpense}
                 />
             </div>
          </Card>
        </div>
         <div className="lg:col-span-1">
            <CategoryChart data={selectedMonthData.categoryChartData} />
         </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
