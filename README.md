# Los Pollos Hermanos Database Management System

## Project Overview
This project implements an enterprise-level database management system for Los Pollos Hermanos, a fast-food restaurant chain. The system is designed to streamline operations, enhance customer experiences, and support the company's business goals.

## Database Schema
Our database schema has been meticulously designed and normalized to the 4th Normal Form (4NF), ensuring optimal data integrity, minimizing redundancy, and improving overall database performance. The schema includes the following main entities: CUSTOMERS, ORDERS, ORDER DETAILS, MENU ITEMS, EMPLOYEES, DELIVERY, etc.

**Key Features of Our 4NF Schema:**
- **Elimination of Multi-Valued Dependencies:** Our schema ensures no non-trivial multi-valued dependencies between attributes.
- **Reduced Data Redundancy:** By achieving 4NF, we've minimized data duplication across tables.
- **Improved Data Integrity:** The normalized structure helps maintain data consistency and accuracy.
- **Efficient Data Retrieval:** The schema allows more efficient queries and data manipulation.

## Key Relationships
- Customers can make orders and reservations.
- Orders contain menu items and are associated with payments.
- Employees work at specific locations.
- Ingredients are stored in warehouses and supplied by suppliers.
- Promotions and events can be applied to orders.

## SQL Queries
Our database system supports a wide range of complex queries to extract valuable insights and manage data effectively. Here are some key examples of the queries we've implemented:
1. **Employee Salary Statistics:** Provides salary statistics for each job title category, including average, maximum, and minimum salaries, as well as employee count and salary rank.
2. **High-Value Customer Identification:** Identifies customers who have placed orders with a total value exceeding $50 and have also provided feedback with a rating of above 4.5.
3. **Delivery Analysis by Day of Week:** Provides a summary of deliveries based on the day of the week, including the number of deliveries and the total value of orders for each day.

### Triggers & Procedures
- A **Trigger** to automatically update the noOfItems count in the CATEGORIES table whenever a menu item is added to or removed from a category, ensuring that category item counts are always accurate.
- A **Procedure** to calculate total sales for each menu item within a specified date range, demonstrating our system's capability to perform complex data analysis efficiently.

### CRUD Operations
Our database system supports full CRUD (Create, Read, Update, Delete) operations for all tables in the schema. This ensures comprehensive data management capabilities across the entire Los Pollos Hermanos database system.

### Project Report
For a comprehensive overview of the Los Pollos Hermanos Database Management System, including detailed explanations of our design decisions, implementation process, and in-depth analysis, refer to the [Project Report](https://github.com/phanidhirajpadimiti/Enterprise-Data-Management-LPH/blob/main/Project%20Report.pdf).

## Technology Stack
- **Design:** MS Visio
- **Database:** Oracle
- **Backend:** Python
- **Frontend:** React
- **API:** Django
