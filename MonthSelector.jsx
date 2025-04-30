
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

const MonthSelector = ({ selectedDate, availableMonths, onDateChange }) => {

  const handleMonthChange = (value) => {
    if (value) {
      const newDate = parse(value, 'yyyy-MM', new Date());
      onDateChange(newDate);
    }
  };
  
  const formattedSelectedDate = format(selectedDate, 'yyyy-MM');

  return (
    <Select value={formattedSelectedDate} onValueChange={handleMonthChange}>
      <SelectTrigger className="w-full sm:w-[180px] text-sm">
        <SelectValue placeholder="Selecione o mês" />
      </SelectTrigger>
      <SelectContent>
        {availableMonths.length === 0 ? (
           <SelectItem value={formattedSelectedDate} disabled>
             {format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })}
           </SelectItem>
        ) : (
          availableMonths.map((monthYear) => {
            const date = parse(monthYear, 'yyyy-MM', new Date());
            return (
              <SelectItem key={monthYear} value={monthYear}>
                {format(date, "MMMM 'de' yyyy", { locale: ptBR })}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
};

export default MonthSelector;
