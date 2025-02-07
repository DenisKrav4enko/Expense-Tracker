import { View, StyleSheet } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 55.99,
        date: new Date('2025-01-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2025-01-05')
    },
    {
        id: 'e3',
        description: 'Bananas',
        amount: 5.99,
        date: new Date('2024-12-01')
    },
    {
        id: 'e4',
        description: 'Book',
        amount: 15.99,
        date: new Date('2024-11-26')
    },
    {
        id: 'e6',
        description: 'Pants',
        amount: 28.49,
        date: new Date('2024-11-18')
    },
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 55.99,
        date: new Date('2025-01-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2025-01-05')
    },
    {
        id: 'e3',
        description: 'Bananas',
        amount: 5.99,
        date: new Date('2024-12-01')
    },
    {
        id: 'e4',
        description: 'Book',
        amount: 15.99,
        date: new Date('2024-11-26')
    },
    {
        id: 'e6',
        description: 'Pants',
        amount: 28.49,
        date: new Date('2024-11-18')
    },
]

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={DUMMY_EXPENSES}
                periodName={expensesPeriod}
            />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 8,
        backgroundColor: GlobalStyles.colors.primary700,
    }
})