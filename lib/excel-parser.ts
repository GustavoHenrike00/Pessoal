/**
 * Parser para importar dados de planilhas Excel
 * Processa tanto a planilha de Gastos/Ganhos quanto a de Rotina
 */

export interface Transaction {
  date: string;
  value: number;
  category: string;
  description: string;
  type: "income" | "expense";
}

export interface RoutineTask {
  day: string;
  timeStart: string;
  timeEnd: string;
  activity: string;
}

export interface ParsedExcelData {
  transactions: Transaction[];
  routineTasks: RoutineTask[];
  monthlyExpenses: Record<string, number>;
  monthlyIncome: Record<string, number>;
}

/**
 * Processa dados de gastos e ganhos
 */
export function parseFinancialData(rawData: any[]): Transaction[] {
  const transactions: Transaction[] = [];

  // Filtra linhas com dados válidos
  const validRows = rawData.filter(
    (row) => row.DATA && row.VALOR && row.CATEGORIA
  );

  validRows.forEach((row) => {
    const transaction: Transaction = {
      date: row.DATA,
      value: parseFloat(row.VALOR),
      category: row.CATEGORIA,
      description: row["POR QUE COMPROU"] || "",
      type: isIncomeCategory(row.CATEGORIA) ? "income" : "expense",
    };
    transactions.push(transaction);
  });

  return transactions;
}

/**
 * Processa dados de rotina semanal
 */
export function parseRoutineData(rawData: any[]): RoutineTask[] {
  const routineTasks: RoutineTask[] = [];
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];

  // Filtra linhas com horários
  const validRows = rawData.filter((row) => row.HORA && row.HORA.includes("h"));

  validRows.forEach((row) => {
    const timeStart = row.HORA;
    const timeEnd = row["Unnamed: 1"] || "";

    days.forEach((day) => {
      const activity = row[day];
      if (activity && activity.trim()) {
        routineTasks.push({
          day,
          timeStart,
          timeEnd,
          activity,
        });
      }
    });
  });

  return routineTasks;
}

/**
 * Determina se uma categoria é de renda ou despesa
 */
function isIncomeCategory(category: string): boolean {
  const incomeCategories = [
    "Salario",
    "Pé De Meia",
    "Trabalho Extra",
    "Receber Presente",
    "Rendimento Invs.",
  ];
  return incomeCategories.includes(category);
}

/**
 * Calcula totais mensais por categoria
 */
export function calculateMonthlySummary(
  transactions: Transaction[]
): { expenses: Record<string, number>; income: Record<string, number> } {
  const expenses: Record<string, number> = {};
  const income: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      expenses[t.category] = (expenses[t.category] || 0) + t.value;
    } else {
      income[t.category] = (income[t.category] || 0) + t.value;
    }
  });

  return { expenses, income };
}

/**
 * Calcula saldo total
 */
export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => {
    return t.type === "income" ? sum + t.value : sum - t.value;
  }, 0);
}

/**
 * Formata valor em moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Formata data para o padrão brasileiro
 */
export function formatDate(date: string): string {
  try {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  } catch {
    return date;
  }
}
