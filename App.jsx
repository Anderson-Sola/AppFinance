
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import MonthSummary from "@/components/MonthSummary";
import MobileActions from "@/components/MobileActions";
import DesktopLayout from "@/components/DesktopLayout";
import useFinanceManager from "@/hooks/useFinanceManager";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // Assuming a simple hook

const App = () => {
  const {
    // state & data
    expenses,
    income,
    sortOrder,
    selectedCategory,
    selectedDate,
    filteredAndSortedExpenses,
    selectedMonthData,
    availableMonths,
    // handlers
    handleAddExpense,
    handleDeleteExpense,
    handleAddIncome,
    handleDeleteIncome,
    toggleSortOrder,
    setSelectedCategory,
    handleDateChange,
  } = useFinanceManager();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6 md:py-8"
      >
        <Header />

        {isDesktop ? (
          <DesktopLayout
            expenses={filteredAndSortedExpenses}
            selectedMonthData={selectedMonthData}
            selectedDate={selectedDate}
            availableMonths={availableMonths}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            onAddIncome={handleAddIncome}
            sortOrder={sortOrder}
            selectedCategory={selectedCategory}
            onSortToggle={toggleSortOrder}
            onCategoryChange={setSelectedCategory}
            onDateChange={handleDateChange}
          />
        ) : (
          <div className="space-y-6">
             <MonthSummary 
               selectedMonthData={selectedMonthData} 
               selectedDate={selectedDate}
               availableMonths={availableMonths}
               onAddIncome={handleAddIncome} 
               onDateChange={handleDateChange}
             />
             <MobileActions
               expenses={filteredAndSortedExpenses}
               categoryChartData={selectedMonthData.categoryChartData}
               onAddExpense={handleAddExpense}
               onDeleteExpense={handleDeleteExpense}
               onAddIncome={handleAddIncome}
               sortOrder={sortOrder}
               selectedCategory={selectedCategory}
               selectedDate={selectedDate}
               availableMonths={availableMonths}
               onSortToggle={toggleSortOrder}
               onCategoryChange={setSelectedCategory}
               onDateChange={handleDateChange}
             />
          </div>
        )}

        <Toaster />
      </motion.div>
    </div>
  );
};

export default App;
