import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";
import MonthYearSelect from "../components/MonthYearSelect";
import { useEffect, useState, type ChangeEvent } from "react";
import Input from "../components/Input";
import Card from "../components/Card";
import { TransactionType, type Transaction } from "../types/transactions";
import {
  deleteTransactions,
  getTransactions,
} from "../services/transactionService";
import Button from "../components/Button";
import { formatCurrency, formatDate } from "../utils/formatter";
import { toast } from "react-toastify";

const Transactions = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [deletingId, setDeletingId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const data = await getTransactions({ month, year });
      setTransactions(data);
      setFilteredTransactions(data)
    } catch (err) {
      setError("Não foi possível carregar as transações, tente novamente");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>):void => {
    setSearchText(event.target.value)
    setFilteredTransactions(transactions.filter( transaction => transaction.description.toUpperCase().includes(event.target.value.toUpperCase())))
  }

  const confirmDelete = (id: string): void => {
    if (window.confirm("Tem certeza que deseja deletar essa transação?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setDeletingId(id);
      await deleteTransactions(id);
      setFilteredTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transação deletada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Falha ao deletar a transação.");
    } finally {
      setDeletingId("");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, year]);

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
        <Link
          to="/transacoes/nova"
          className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Link>
      </div>
      <Card className="mb-6">
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        ></MonthYearSelect>
      </Card>

      <div className="mb-6">
        <Input
          placeholder="Buscar Transações"
          icon={<Search className="w-4 h-4" />}
          fullWidth
          onChange={handleSearchChange}
          value={searchText}
        />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-700 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 m-auto mb-4" />
            <p>{error}</p>
            <Button onClick={fetchTransactions} className="mx-auto mt-6">
              Tentar Novamente
            </Button>
          </div>
        ) : transactions?.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">Nenhuma Transação encontrada.</p>
            <Link
              to="/transacoes/nova"
              className="bg-primary-500 w-fit mx-auto mt-6 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-700 in-h-full w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Valor
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-800">
                    <td className="px-3 py-4 text-sm text-gray-400 whitespace-nowrap ">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {transaction.type === TransactionType.INCOME ? (
                            <ArrowUp className="w-4 h-4 text-primary-500" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-50">
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-400 whitespace-nowrap ">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap ">
                      <div className="flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-2 flex items-center"
                          style={{
                            backgroundColor: transaction.category.color,
                          }}
                        >
                          <span className="text-sm text-gray-400 p-6">
                            {transaction.category.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-400 whitespace-nowrap ">
                      <span
                        className={`${
                          transaction.type === TransactionType.INCOME
                            ? "text-primary-500"
                            : "text-red-500"
                        }`}
                      >
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-400 whitespace-nowrap cursor-pointer">
                      <button
                        type="button"
                        onClick={() => confirmDelete(transaction.id)}
                        className="text-red-500 hover:text-red-400 rounded-full cursor-pointer"
                        disabled={deletingId === transaction.id}
                      >
                        {deletingId === transaction.id ? (
                          <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
