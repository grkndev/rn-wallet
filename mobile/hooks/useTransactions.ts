import * as React from "react";
import { Alert } from "react-native";

const BASE_API_URL = "https://rn-wallet-0qho.onrender.com/api"

export default function useTransactions({ userId }: { userId: string }) {
    const [transactions, setTransactions] = React.useState([])
    const [summary, setSummary] = React.useState({ balance: 0, income: 0, expense: 0 })
    const [isLoading, setIsLoading] = React.useState(false)

    const fetchTransactions = React.useCallback(async () => {
        try {
            const response = await fetch(`${BASE_API_URL}/transactions/${userId}`)
            const data = await response.json()
            setTransactions(data.data)
        } catch (error) {
            console.log("Error fetching transactions", error)
        }
    }, [userId])

    const fetchSummary = React.useCallback(async () => {
        try {
            const response = await fetch(`${BASE_API_URL}/transactions/summary/${userId}`)
            const data = await response.json()
            setSummary(data.data)
        } catch (error) {
            console.log("Error fetching summary", error)
        }
    }, [userId])

    const loadData = React.useCallback(async () => {
        if (!userId) return

        try {
            await Promise.all([fetchSummary(), fetchTransactions()])
        } catch (error) {
            console.log("Error loading data", error)
        } finally {
            setIsLoading(false)
        }
    }, [fetchSummary, fetchTransactions, userId])

    const deleteTransaction = async (id: string) => {
        try {
            const response = await fetch(`${BASE_API_URL}/transactions/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete transaction");

            loadData();
            Alert.alert("Success", "Transaction deleted successfully");
        }
        catch (error: any) {
            console.log("Error deleting transaction", error)
            Alert.alert("Error", error.message);
        }
    }

    return {
        transactions,
        summary,
        isLoading,
        loadData,
        deleteTransaction,
    }
}
