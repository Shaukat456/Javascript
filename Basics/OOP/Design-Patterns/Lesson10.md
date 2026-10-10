# Lesson 11: The Template Method Pattern in JavaScript

## 1. What Is the Template Method Pattern?

The **Template Method Pattern** is a behavioral design pattern that defines the overall steps of an algorithm in a base class while allowing subclasses to customize specific steps.

In simple words:

> The Template Method Pattern defines the structure of an algorithm once and lets subclasses customize parts of that algorithm without changing its overall sequence.

Imagine generating reports for different departments.

Every report follows the same general process:

1. Load data.
2. Process data.
3. Format the report.
4. Export the result.

However, each department might process and format its data differently.

Instead of rewriting the entire workflow for every department, you define the workflow once and let subclasses customize selected steps.

### Common use cases

- Generating reports.
- Data import and export.
- Document processing.
- File conversion.
- Authentication workflows.
- Automated testing frameworks.
- ETL pipelines.
- Application initialization.

---

## 2. The Problem: Repeated Algorithm Steps

Imagine creating reports for two departments: sales and finance.

Both reports need to follow the same general workflow.

Without the Template Method Pattern, you might write:

```js
class SalesReport {
  generate() {
    console.log("Loading sales data...");
    console.log("Processing sales data...");
    console.log("Formatting sales report...");
    console.log("Exporting sales report...");
  }
}

class FinanceReport {
  generate() {
    console.log("Loading finance data...");
    console.log("Processing finance data...");
    console.log("Formatting finance report...");
    console.log("Exporting finance report...");
  }
}
```

The classes repeat the same general sequence.

As the application grows, this creates problems:

- The same workflow is duplicated.
- One report might accidentally skip a step.
- Changing the workflow requires modifying multiple classes.
- The implementations can become inconsistent.

We want to define the workflow once while allowing individual steps to differ.

That's where the Template Method Pattern helps.

---

## 3. Understand the Structure

The pattern has two main participants.

| Participant | Responsibility |
|---|---|
| Abstract or base class | Defines the overall algorithm and its sequence. |
| Concrete subclass | Implements or customizes selected steps. |

In JavaScript, you can use a normal base class to define the workflow.

JavaScript does not have a built-in `abstract class` keyword, so the base class can throw errors for methods that subclasses are expected to implement.

The base class's workflow method is called the **template method**.

For example:

```js
generateReport() {
  this.loadData();
  this.processData();
  this.formatReport();
  this.exportReport();
}
```

This method defines the sequence of steps.

Subclasses customize the individual operations, but they don't need to rewrite the entire workflow.

---

## 4. Implement the Template Method Pattern Step by Step

Let's build a report-generation system.

### Step 1: Create the base class

```js
class ReportGenerator {
  generateReport() {
    this.loadData();
    this.processData();
    this.formatReport();
    this.exportReport();
  }

  loadData() {
    throw new Error("loadData() must be implemented.");
  }

  processData() {
    throw new Error("processData() must be implemented.");
  }

  formatReport() {
    throw new Error("formatReport() must be implemented.");
  }

  exportReport() {
    console.log("Exporting report...");
  }
}
```

The `generateReport()` method is the template method.

It determines the order of operations.

Notice that `exportReport()` has a default implementation, while the other methods require subclasses to provide their own implementations.

This is an important feature of the pattern: some steps can be shared, while others can be customized.

### Step 2: Create the sales report

```js
class SalesReport extends ReportGenerator {
  loadData() {
    console.log("Loading sales data...");
  }

  processData() {
    console.log("Processing sales data...");
  }

  formatReport() {
    console.log("Formatting sales report...");
  }
}
```

`SalesReport` provides the steps specific to sales.

It inherits `generateReport()` from the base class.

It doesn't need to define the workflow again.

### Step 3: Create the finance report

```js
class FinanceReport extends ReportGenerator {
  loadData() {
    console.log("Loading finance data...");
  }

  processData() {
    console.log("Processing finance data...");
  }

  formatReport() {
    console.log("Formatting finance report...");
  }
}
```

The finance report uses the same overall workflow but customizes the individual steps.

### Step 4: Execute the template method

```js
const salesReport = new SalesReport();

salesReport.generateReport();

console.log("---");

const financeReport = new FinanceReport();

financeReport.generateReport();
```

Output:

```text
Loading sales data...
Processing sales data...
Formatting sales report...
Exporting report...
---
Loading finance data...
Processing finance data...
Formatting finance report...
Exporting report...
```

The workflow remains consistent, but the details differ.

This is the central idea of the Template Method Pattern.

---

## 5. The Complete Implementation

Here is the complete example in one place.

```js
class ReportGenerator {
  generateReport() {
    this.loadData();
    this.processData();
    this.formatReport();
    this.exportReport();
  }

  loadData() {
    throw new Error("loadData() must be implemented.");
  }

  processData() {
    throw new Error("processData() must be implemented.");
  }

  formatReport() {
    throw new Error("formatReport() must be implemented.");
  }

  exportReport() {
    console.log("Exporting report...");
  }
}

class SalesReport extends ReportGenerator {
  loadData() {
    console.log("Loading sales data...");
  }

  processData() {
    console.log("Processing sales data...");
  }

  formatReport() {
    console.log("Formatting sales report...");
  }
}

class FinanceReport extends ReportGenerator {
  loadData() {
    console.log("Loading finance data...");
  }

  processData() {
    console.log("Processing finance data...");
  }

  formatReport() {
    console.log("Formatting finance report...");
  }
}

const sales = new SalesReport();
sales.generateReport();

console.log("---");

const finance = new FinanceReport();
finance.generateReport();
```

The key design decision is that the base class controls the algorithm's sequence.

Subclasses customize the steps rather than replacing the overall workflow.

---

## 6. Understanding the Hook Method

Not every step needs to be implemented by a subclass.

Sometimes the base class provides an optional method that subclasses can override if necessary.

This is often called a **hook method**.

For example, a report generator might optionally validate the data before exporting.

```js
class ReportGenerator {
  generateReport() {
    this.loadData();
    this.processData();
    this.formatReport();

    if (this.shouldExport()) {
      this.exportReport();
    }
  }

  loadData() {
    throw new Error("loadData() must be implemented.");
  }

  processData() {
    throw new Error("processData() must be implemented.");
  }

  formatReport() {
    throw new Error("formatReport() must be implemented.");
  }

  shouldExport() {
    return true;
  }

  exportReport() {
    console.log("Exporting report...");
  }
}
```

The `shouldExport()` method is a hook.

By default, it returns `true`.

A subclass can override it:

```js
class PreviewReport extends ReportGenerator {
  loadData() {
    console.log("Loading preview data...");
  }

  processData() {
    console.log("Processing preview data...");
  }

  formatReport() {
    console.log("Formatting preview...");
  }

  shouldExport() {
    return false;
  }
}
```

Now:

```js
const preview = new PreviewReport();

preview.generateReport();
```

Output:

```text
Loading preview data...
Processing preview data...
Formatting preview...
```

The report is generated, but the export step is skipped.

The base class still controls the sequence. The subclass only customizes a specific decision.

---

## 7. A Practical Example: Data Importing

Imagine an application that imports files in different formats.

It supports:

- CSV files.
- JSON files.

Both formats follow a common workflow:

1. Read the file.
2. Parse its contents.
3. Validate the data.
4. Save the result.

However, CSV and JSON require different parsing logic.

### Step 1: Create the base importer

```js
class DataImporter {
  importData(fileContents) {
    const rawData = this.readFile(fileContents);
    const parsedData = this.parseData(rawData);

    this.validateData(parsedData);
    this.saveData(parsedData);
  }

  readFile(fileContents) {
    console.log("Reading file...");
    return fileContents;
  }

  parseData() {
    throw new Error("parseData() must be implemented.");
  }

  validateData(data) {
    if (data == null) {
      throw new Error("Imported data is required.");
    }

    console.log("Data validated.");
  }

  saveData(data) {
    console.log("Saving imported data...");
    return data;
  }
}
```

The `importData()` method defines the algorithm.

The base class implements the steps that can be shared, while `parseData()` is customized by subclasses.

### Step 2: Create the JSON importer

```js
class JSONImporter extends DataImporter {
  parseData(rawData) {
    console.log("Parsing JSON...");
    return JSON.parse(rawData);
  }
}
```

The JSON importer uses JavaScript's built-in JSON parser.

### Step 3: Create the CSV importer

For this exercise, we'll support a simple CSV format with a header row and ordinary comma-separated values. This is not a complete CSV parser because real CSV files can contain quoted commas, escaped quotes, and newlines inside fields.

```js
class CSVImporter extends DataImporter {
  parseData(rawData) {
    console.log("Parsing CSV...");

    const lines = rawData.trim().split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map(line => {
      const values = line.split(",");

      return Object.fromEntries(
        headers.map((header, index) => [
          header.trim(),
          values[index]?.trim()
        ])
      );
    });
  }
}
```

The parsing step differs, but the workflow remains the same.

### Step 4: Use the importers

```js
const jsonImporter = new JSONImporter();

jsonImporter.importData(
  '{"name":"Alex","role":"Developer"}'
);

console.log("---");

const csvImporter = new CSVImporter();

csvImporter.importData(
  "name,role\nSam,Designer"
);
```

Output:

```text
Reading file...
Parsing JSON...
Data validated.
Saving imported data...
---
Reading file...
Parsing CSV...
Data validated.
Saving imported data...
```

Both importers follow the same sequence, but each has its own parsing implementation.

**Important:** A production importer should also handle malformed files, encoding issues, field validation, and format-specific edge cases.

---

## 8. Template Method Pattern vs. Strategy Pattern

You have already learned the Strategy Pattern.

Both patterns allow different implementations of behavior, but they achieve this differently.

| Feature | Template Method | Strategy |
|---|---|---|
| Category | Behavioral | Behavioral |
| Main technique | Inheritance | Composition |
| Who defines the overall workflow? | Base class | Context or calling code |
| How does behavior vary? | Subclasses override selected steps. | A different strategy is supplied. |
| Can algorithms be swapped at runtime? | Not usually by swapping the subclass itself. | Yes, the context can receive a different strategy. |
| Typical example | Report generation workflow | Shipping cost calculation |

### Template Method example

```js
const report = new SalesReport();

report.generateReport();
```

The inherited method defines the workflow, and the subclass provides particular steps.

### Strategy example

```js
const calculator = new ShippingCalculator();

calculator.calculate(order, expressShipping);
```

The caller supplies the algorithm to use.

### The main difference

**Template Method:** Define the algorithm's structure in a base class and let subclasses customize its steps.

**Strategy:** Encapsulate a complete interchangeable algorithm and pass it to the context.

Use Template Method when subclasses should follow the same overall sequence.

Use Strategy when you need to select between independent algorithms, potentially at runtime.

---

## 9. Template Method Pattern vs. Factory Method Pattern

The Template Method Pattern can be confused with the Factory Method Pattern because both often use inheritance.

However, they solve different problems.

| Feature | Template Method | Factory Method |
|---|---|---|
| Main purpose | Define an algorithm's sequence. | Delegate the creation of an object to a method or subclass. |
| Focus | Workflow steps | Object creation |
| Example | A report is loaded, processed, formatted, and exported. | A subclass chooses which notification object to create. |
| Main benefit | Consistent algorithm structure | Flexible object creation |

A Template Method might call a factory method as one step of its workflow, so the two patterns can be used together.

---

## 10. Advantages of the Template Method Pattern

### 1. Reduces duplicated workflow code

The common sequence exists in one place.

### 2. Keeps the algorithm consistent

Subclasses can customize steps without needing to reproduce the entire workflow.

### 3. Supports controlled customization

The base class can decide which steps are customizable and which remain shared.

### 4. Encourages code reuse

Shared steps can be implemented once and inherited by multiple subclasses.

### 5. Makes workflows easier to understand

The template method provides a clear overview of the algorithm.

---

## 11. Disadvantages of the Template Method Pattern

### 1. Relies on inheritance

The pattern commonly uses a base class and subclasses, which may be restrictive when you need to change behavior dynamically.

### 2. Can make subclasses difficult to understand

A subclass may inherit behavior from multiple base methods, so understanding the full workflow requires reading both the subclass and the base class.

### 3. Changes to the base class affect subclasses

Modifying the shared algorithm may change how all subclasses behave.

### 4. Can encourage excessive inheritance

Creating a subclass for every minor variation can make the application unnecessarily complicated.

### 5. The workflow can be too rigid

If different implementations need entirely different sequences of operations, a single template method may not be the right abstraction.

In that case, composition or the Strategy Pattern may be a better fit.

---

## 12. Common Mistakes

### Mistake 1: Duplicating the template method in every subclass

The point is to define the common workflow once.

Avoid rewriting `generateReport()` in every subclass unless a particular implementation genuinely needs a different workflow.

### Mistake 2: Allowing required steps to silently do nothing

If a step must be implemented, consider throwing an error in the base class:

```js
parseData() {
  throw new Error("parseData() must be implemented.");
}
```

This helps detect missing implementations.

### Mistake 3: Making every method customizable

If subclasses can replace every step and the entire workflow, the base class may no longer provide meaningful structure.

Keep the shared algorithm focused on the steps that genuinely need to remain consistent.

### Mistake 4: Using inheritance when composition is more appropriate

If the application needs to swap algorithms dynamically, a Strategy Pattern may be more flexible.

### Mistake 5: Assuming JavaScript has abstract classes

JavaScript classes don't have a built-in `abstract` modifier.

You can simulate abstract-method behavior with errors, or use TypeScript if you need compile-time enforcement.

---

## 13. Practice Exercises

Try these exercises before opening the solutions.

### Exercise 1: Beverage Preparation

Create a base class called `BeverageMaker` with a template method:

```js
prepareBeverage()
```

It should execute these steps in order:

1. Boil water.
2. Brew the beverage.
3. Pour into a cup.
4. Add optional extras.

Create two subclasses:

- `TeaMaker`
- `CoffeeMaker`

Each subclass should implement its own brewing and extras steps.

Expected output for tea:

```text
Boiling water...
Steeping tea...
Pouring into cup...
Adding lemon...
```

<details>
  <summary>Show solution</summary>

  ```js
  class BeverageMaker {
    prepareBeverage() {
      this.boilWater();
      this.brew();
      this.pourIntoCup();
      this.addExtras();
    }

    boilWater() {
      console.log("Boiling water...");
    }

    brew() {
      throw new Error("brew() must be implemented.");
    }

    pourIntoCup() {
      console.log("Pouring into cup...");
    }

    addExtras() {
      throw new Error("addExtras() must be implemented.");
    }
  }

  class TeaMaker extends BeverageMaker {
    brew() {
      console.log("Steeping tea...");
    }

    addExtras() {
      console.log("Adding lemon...");
    }
  }

  class CoffeeMaker extends BeverageMaker {
    brew() {
      console.log("Brewing coffee...");
    }

    addExtras() {
      console.log("Adding milk and sugar...");
    }
  }

  const tea = new TeaMaker();
  tea.prepareBeverage();

  console.log("---");

  const coffee = new CoffeeMaker();
  coffee.prepareBeverage();
  ```

</details>

### Exercise 2: Notification Workflow

Create a base class called `NotificationWorkflow`.

Its template method should:

1. Validate the message.
2. Format the message.
3. Send the notification.

Create subclasses for email and SMS notifications.

The validation and workflow sequence should be shared, but formatting and sending should differ.

<details>
  <summary>Show solution</summary>

  ```js
  class NotificationWorkflow {
    sendNotification(message) {
      this.validate(message);

      const formatted = this.format(message);

      this.send(formatted);
    }

    validate(message) {
      if (typeof message !== "string" || message.trim() === "") {
        throw new Error("A message is required.");
      }
    }

    format() {
      throw new Error("format() must be implemented.");
    }

    send() {
      throw new Error("send() must be implemented.");
    }
  }

  class EmailNotification extends NotificationWorkflow {
    format(message) {
      return `[EMAIL] ${message}`;
    }

    send(message) {
      console.log(`Sending email: ${message}`);
    }
  }

  class SMSNotification extends NotificationWorkflow {
    format(message) {
      return `[SMS] ${message}`;
    }

    send(message) {
      console.log(`Sending SMS: ${message}`);
    }
  }

  const email = new EmailNotification();
  email.sendNotification("Your order is ready.");

  const sms = new SMSNotification();
  sms.sendNotification("Your order is ready.");
  ```

</details>

### Exercise 3: Data Exporter

Create a base class called `DataExporter`.

The template method should:

1. Retrieve data.
2. Transform the data.
3. Export the result.

Create two subclasses:

- `JSONExporter`
- `TextExporter`

Both should follow the same workflow but format the result differently.

<details>
  <summary>Show solution</summary>

  ```js
  class DataExporter {
    exportData(data) {
      const retrieved = this.retrieveData(data);
      const transformed = this.transformData(retrieved);

      this.exportResult(transformed);
    }

    retrieveData(data) {
      console.log("Retrieving data...");
      return data;
    }

    transformData() {
      throw new Error("transformData() must be implemented.");
    }

    exportResult() {
      throw new Error("exportResult() must be implemented.");
    }
  }

  class JSONExporter extends DataExporter {
    transformData(data) {
      return JSON.stringify(data);
    }

    exportResult(result) {
      console.log("Exporting JSON:", result);
    }
  }

  class TextExporter extends DataExporter {
    transformData(data) {
      return Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
    }

    exportResult(result) {
      console.log("Exporting text:\n" + result);
    }
  }

  const data = {
    name: "Alex",
    role: "Developer"
  };

  new JSONExporter().exportData(data);

  console.log("---");

  new TextExporter().exportData(data);
  ```

</details>

---

## 14. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Template Method? | Behavioral. |
| What is its main purpose? | Define an algorithm's structure while allowing selected steps to vary. |
| What is the template method? | The method that controls the sequence of operations. |
| How do subclasses customize behavior? | By overriding selected methods. |
| What is a hook method? | An optional method that subclasses can override to influence the workflow. |
| How is it different from Strategy? | Template Method commonly uses inheritance; Strategy uses interchangeable behavior through composition. |
| Does JavaScript support abstract classes natively? | No, but abstract-like behavior can be simulated with base classes and errors. |
| When should you use it? | When several implementations share the same workflow but need different steps. |

---

## 15. Design Patterns Learned So Far

You have now learned eleven design patterns.

| Pattern | Category | Main purpose |
|---|---|---|
| Factory | Creational | Encapsulate object creation. |
| Singleton | Creational | Provide one shared instance. |
| Builder | Creational | Construct complex objects step by step. |
| Adapter | Structural | Make incompatible interfaces work together. |
| Decorator | Structural | Add behavior by wrapping objects. |
| Facade | Structural | Simplify access to a complicated subsystem. |
| Observer | Behavioral | Notify multiple observers about events. |
| Strategy | Behavioral | Make algorithms interchangeable. |
| Command | Behavioral | Encapsulate requests as commands. |
| State | Behavioral | Change behavior according to an object's state. |
| Template Method | Behavioral | Define an algorithm's sequence and customize selected steps. |

### Remember these four

- **Strategy:** Choose an algorithm.
- **State:** Change behavior according to state.
- **Command:** Represent an action.
- **Template Method:** Keep the workflow fixed while customizing individual steps.

---

## 16. What's Next?

### Lesson 12: The Iterator Pattern

The Iterator Pattern provides a consistent way to traverse a collection without exposing the details of how that collection stores its elements.

For example, you might want to iterate through:

- An array of users.
- A collection of products.
- A custom linked list.
- A collection that generates values on demand.

JavaScript already supports iteration through features such as `for...of`, iterators, and generators.

