import axios from 'axios'

const URL = 'https://react-native-course-268a4-default-rtdb.europe-west1.firebasedatabase.app'

export const storeExpense = expenseData => {
    axios.post(
        URL + '/expenses.json',
        expenseData
    )
}

export const fetchExpenses = async () => {
    const response = await axios.get(URL + '/expenses.json')

    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj)
    }

    return expenses
}