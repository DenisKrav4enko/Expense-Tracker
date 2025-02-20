import { View, StyleSheet } from 'react-native'
import {useContext, useLayoutEffect, useState} from 'react'
import { ExpensesContext } from '../store/expenses-context'
import {deleteExpense, storeExpense, updateExpense} from '../util/http'
import IconBtn from '../components/UI/IconBtn'
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm'
import { GlobalStyles } from '../constants/styles'
import { LoadingOverlay } from '../components/UI/LoadingOverlay'
import {ErrorOverlay} from "../components/UI/ErrorOverlay";

function ManageExpense ({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const expenseCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            await deleteExpense(editedExpenseId)
            expenseCtx.deleteExpense(editedExpenseId)
            cancelHandler()
        } catch (error) {
            setError('Could not delete Expense')
        }
        setIsSubmitting(false)
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true)
        try {

            if (isEditing) {
                expenseCtx.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData)
                expenseCtx.addExpense({...expenseData, id: id})
            }

            cancelHandler()
        } catch (error) {
            setError('Could not save data')
            setIsSubmitting(false)
        }

    }

    if(error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if(isSubmitting) {
        return <LoadingOverlay />
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