import { View, StyleSheet } from 'react-native'
import {useContext, useLayoutEffect} from 'react'
import { ExpensesContext } from '../store/expenses-context'
import { storeExpense } from '../util/http'
import IconBtn from '../components/UI/IconBtn'
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm'
import { GlobalStyles } from '../constants/styles'

function ManageExpense ({ route, navigation }) {
    const expenseCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(editedExpenseId)
        cancelHandler()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    function confirmHandler(expenseData) {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData)
        } else {
            storeExpense(expenseData)
            expenseCtx.addExpense(expenseData)
        }
        cancelHandler()
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                submitBtnLabel={isEditing ? 'Update' : 'Add'}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconBtn icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
                </View>
            }
        </View>
    )
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
})