
import React from "react";
import MonthSummary from "@/components/MonthSummary";
import MobileActions from "@/components/MobileActions";
import DesktopLayout from "@/components/DesktopLayout";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const LayoutManager = ({
  expenses,
  income, // Pass income if needed by layouts, though currently not directly used
  sortOrder,
  selectedCategory,
  selectedDate,
  filteredAndSortedExpenses,
  selectedMonthData,
  availableMonths,
  handleAddExpense,
  handleDeleteExpense,
  handleAddIncome,
  handleDeleteIncome, // Pass if needed
  toggleSortOrder,
  setSelectedCategory,
  handleDateChange,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
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
    );
  } else {
    return (
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
    );
  }
};

export default LayoutManager;
