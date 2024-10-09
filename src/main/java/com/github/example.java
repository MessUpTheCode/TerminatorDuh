mport java.util.ArrayList;
import java.util.List;
public class Example {
    private List<String> items;
    public Example() {
        // No initialization of 'items', which can cause NullPointerException
    }
    // No Javadoc comments for public method
    public void addItem(String item) {
        // Bad practice: No null check for 'item'
        items.add(item); // NullPointerException if 'items' is not initialized
    }
    public void printItems() {
        for (String item : items) { // Potential NullPointerException if 'items' is null
            System.out.println(item);
        }
    }
    public void badFormatting (){System.out.println("Poorly formatted method");}
    public void unusedMethod() {
        // This method is never used anywhere in the code
    }
}