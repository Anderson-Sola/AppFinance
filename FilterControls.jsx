
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ListFilter, ArrowDownUp } from "lucide-react";
import MonthSelector from "@/components/MonthSelector"; // Import MonthSelector
import { categoryNames, categoryIcons } from "@/lib/categories"; // Use category names/icons

const FilterControls = ({ 
  sortOrder, 
  selectedCategory, 
  selectedDate,
  availableMonths,
  onSortToggle, 
  onCategoryChange,
  onDateChange,
}) => {
  const [filterOpen, setFilterOpen] = React.useState(false);

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setFilterOpen(false);
  };

  const categories = Object.entries(categoryNames).map(([value, label]) => ({
     value,
     label,
     icon: categoryIcons[value] || "📦"
  }));
  
  const allCategoryOption = { value: "all", label: "Todas", icon: "🏷️" };

  return (
    <div className="flex flex-wrap gap-2">
       {/* Month Selector */}
      <MonthSelector 
        selectedDate={selectedDate}
        availableMonths={availableMonths}
        onDateChange={onDateChange}
      />
      
      {/* Category Filter */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ListFilter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtrar Cat.</span>
            {selectedCategory !== 'all' && <span className="inline sm:hidden">({categoryIcons[selectedCategory]})</span>}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtrar por categoria</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {[allCategoryOption, ...categories].map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  onClick={() => handleCategorySelect(cat.value)}
                  className="justify-start gap-2"
                >
                  {cat.icon} {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Sort Button */}
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={onSortToggle}
      >
        <ArrowDownUp className="h-4 w-4" />
        <span className="hidden sm:inline">
          {sortOrder === "desc" ? "Mais recentes" : "Mais antigas"}
        </span>
      </Button>
    </div>
  );
};

export default FilterControls;
