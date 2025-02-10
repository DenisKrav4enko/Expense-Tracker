import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { getFormatedDate } from '../../util/date'
import { Input } from './Input'
import { Button } from '../UI/Button'
import {GlobalStyles} from "../../constants/styles";

export const ExpenseForm = ({ onCancel, onSubmit, submitBtnLabel, defaultValues }) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormatedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    })

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((currInputValues) => {
            return {
                ...currInputValues,
                [inputIdentifier]: {
                    value: enteredValue,
                    isValid: true
                }
            }
        })
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionValid) {
            setInputs(currentInput => {
                return {
                    amount: { value: currentInput.amount.value, isValid: amountIsValid},
                    date: { value: currentInput.date.value, isValid: dateIsValid},
                    description: { value: currentInput.description.value, isValid: descriptionValid}
                }
            })
            return
        }

        onSubmit(expenseData)
    }

    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label='Amount'
                    invalid={!inputs.amount.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        placeholder: '59.99',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }}
                />
                <Input
                    label='Date'
                    invalid={!inputs.date.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <Input
                label='Description'
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    placeholder: 'Apple',
                    multiline: true,
                    autoCorrect: true,
                    autoCapitalize: 'sentences',
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    mode="flat"
                    onPress={onCancel}
                    style={styles.buttonStyle}
                >Cancel</Button>
                <Button onPress={submitHandler} style={styles.buttonStyle}>
                    {submitBtnLabel}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: '20%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: "center",
        padding: 24,
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
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
})