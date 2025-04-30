
import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="mb-6 md:mb-8 text-center">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
      >
        Controle Financeiro
      </motion.h1>
      <motion.p 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="text-muted-foreground mt-2 text-sm md:text-base"
      >
        Gerencie suas finanças de forma simples e eficiente
      </motion.p>
    </header>
  );
};

export default Header;
