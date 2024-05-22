def calculator():
    while True:
        # Get first number
        first_number = float(input("Enter the first number: "))
        
        # Get the operator
        operator = input("Enter the operator (+, -, *, /): ")
        
        # Get the second number
        second_number = float(input("Enter the second number: "))
        
        # Perform the calculation
        if operator == '+':
            result = first_number + second_number
        elif operator == '-':
            result = first_number - second_number
        elif operator == '*':
            result = first_number * second_number
        elif operator == '/':
            if second_number != 0:
                result = first_number / second_number
            else:
                print("Error: Division by zero is not allowed.")
                continue
        else:
            print("Invalid operator. Please use one of +, -, *, /.")
            continue
        
        # Print the result
        print(f"The result is: {result}")
        
        # Ask if the user wants to perform another calculation
        another_calculation = input("Do you want to perform another calculation? (yes/no): ")
        if another_calculation.lower() != 'yes':
            break

if __name__ == "__main__":
    calculator()