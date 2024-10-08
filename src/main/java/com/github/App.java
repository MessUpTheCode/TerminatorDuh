package com.github;

/**
 * Hello again
 * Hello world!
 * Hello
 */
public class App 
{
    public static void main( String[] args )
    {
        // Create a new Calculator object
        Calculator calculator = new Calculator();

        // Declare two numbers
        int num1 = 5;
        int num2 = 3;

        // Multiply the numbers using the Calculator class
        int result = calculator.multiply(num1, num2);

        // Print the result
        System.out.println("Hello World!");
        System.out.println("The result of multiplying " + num1 + " and " + num2 + " is: " + result);

        // Adding the numbers using the Calculator class
        int result = calculator.testing(num1, num2);

                // Print the result
        System.out.println("Hello World!");
        System.out.println("The result of addition " + num1 + " and " + num2 + " is: " + result);

        // Unused variable
        int unusedVariable = 10;

        // Magic number 
        int magicNumber = 10;

        // Variable name does not follow camelCase
        int MY_VARIABLE = 10;
    }
}

/**
 * A simple Calculator class that performs multiplication.
 */
class Calculator 
{
    /**
     * Multiplies two numbers.
     * 
     * @param num1 The first number.
     * @param num2 The second number.
     * @return The result of multiplying num1 and num2.
     */
    public int multiply(int num1, int num2) 
    {
        // Dead code (will never be executed)
        if (false) {
            System.out.println("This will never be printed");
        }

        return num1 * num2;
    }

    // Unused method
    private void unusedMethod() {
        System.out.println("This method is never called");
    }

    /**
     * Adds two numbers.
     * 
     * @param num1 The first number.
     * @param num2 The second number.
     * @return The result of addition num1 and num2.
     */
    public int testing(int num1, int num2) 
    {

        return num1 + num2;
    }

}