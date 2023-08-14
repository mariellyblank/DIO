#include <stdio.h>

// Function to perform addition
float add(float a, float b) {
    return a + b;
}

// Function to perform subtraction
float subtract(float a, float b) {
    return a - b;
}

// Function to perform multiplication
float multiply(float a, float b) {
    return a * b;
}

// Function to perform division
float divide(float a, float b) {
    if (b != 0) {
        return a / b;
    } else {
        printf("Error: Division by zero\n");
        return 0;
    }
}

int main() {
    float num1, num2;
    int choice;
    printf("Choose the operation:\n");
    printf("1. Addition\n");
    printf("2. Subtraction\n");
    printf("3. Multiplication\n");
    printf("4. Division\n");
    printf("Enter your choice (1-4): ");
    scanf("%d", &choice);
    
    printf("Enter the first number: ");
    scanf("%f", &num1);
    
    printf("Enter the second number: ");
    scanf("%f", &num2);
    
    switch (choice) {
        case 1:
            printf("Sum: %.2f\n", add(num1, num2));
            break;
        case 2:
            printf("Difference: %.2f\n", subtract(num1, num2));
            break;
        case 3:
            printf("Product: %.2f\n", multiply(num1, num2));
            break;
        case 4:
            printf("Quotient: %.2f\n", divide(num1, num2));
            break;
        default:
            printf("Invalid choice\n");
            break;
    }
    
    return 0;
}
