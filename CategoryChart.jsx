
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as PieIcon } from "lucide-react";
import { categoryNames } from "@/lib/categories"; // Assuming categories data is externalized

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
  '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57'
]; // Add more colors if needed

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.03) return null; // Don't render label for very small slices

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px" fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const name = categoryNames[data.name] || data.name;
    const value = data.value.toFixed(2).replace('.', ',');
    const percent = (payload[0].percent * 100).toFixed(1);

    return (
      <div className="bg-background border p-2 rounded shadow-lg text-sm">
        <p className="font-medium">{name}</p>
        <p>Valor: R$ {value}</p>
        <p>Percentual: {percent}%</p>
      </div>
    );
  }
  return null;
};


const CategoryChart = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PieIcon className="h-5 w-5" /> Distribuição por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Sem dados de despesas para este mês.</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(item => ({
      name: categoryNames[item.name] || item.name, // Use readable names
      value: item.value
  }));


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <PieIcon className="h-5 w-5" /> Distribuição por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              innerRadius={40} // Make it a donut chart
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
             <Legend 
               layout="horizontal" 
               verticalAlign="bottom" 
               align="center" 
               iconSize={10}
               wrapperStyle={{ fontSize: '12px', marginTop: '10px' }}
             />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
