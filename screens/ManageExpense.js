import { View, StyleSheet } from 'react-native'
import {useContext, useLayoutEffect} from 'react'
import { ExpensesContext } from '../store/expenses-context'
import { Button } from '../components/UI/Button'
import IconBtn from '../components/UI/IconBtn'
import { GlobalStyles } from '../constants/styles'

function ManageExpense ({ route, navigation }) {
    const expenseCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

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

    function confirmHandler() {
        if (isEditing) {
            expenseCtx.updateExpense(
                editedExpenseId,
                {
                    description: 'Test!!!',
                    amount: 89.19,
                    date: new Date('2025-02-9'),
                }
            )
        } else {
            expenseCtx.addExpense({
                description: 'Test',
                amount: 99.19,
                date: new Date('2025-02-10'),
            })
        }
        cancelHandler()
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    mode="flat"
                    onPress={cancelHandler}
                    style={styles.buttonStyle}
                >Cancel</Button>
                <Button onPress={confirmHandler} style={styles.buttonStyle}>
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
})