function nlToSql(naturalQuery) {
    const query = naturalQuery.toLowerCase();

    if (query.includes("total revenue")) {
        return {
            sql: "SELECT SUM(revenue) AS total_revenue FROM sales;",
            explanation: "Calculates the total revenue from all sales."
        };
    } 
    
    else if (query.includes("total sales")) {
        return {
            sql: "SELECT COUNT(*) AS total_sales FROM sales;",
            explanation: "Counts the total number of sales transactions."
        };
    } 
    
    else if (query.includes("average revenue")) {
        return {
            sql: "SELECT AVG(revenue) AS average_revenue FROM sales;",
            explanation: "Finds the average revenue per sale."
        };
    } 
    
    else if (query.includes("highest revenue")) {
        return {
            sql: "SELECT MAX(revenue) AS highest_revenue FROM sales;",
            explanation: "Finds the highest single sale revenue."
        };
    } 
    
    else if (query.includes("lowest revenue")) {
        return {
            sql: "SELECT MIN(revenue) AS lowest_revenue FROM sales;",
            explanation: "Finds the lowest single sale revenue."
        };
    } else if (query.includes("total customers")) {
        return {
            sql: "SELECT COUNT(DISTINCT customer_id) AS total_customers FROM sales;",
            explanation: "Counts the number of unique customers."
        };
    } 
    
    else if (query.includes("most sold product")) {
        return {
            sql: "SELECT product, COUNT(*) AS total_sold FROM sales GROUP BY product ORDER BY total_sold DESC LIMIT 1;",
            explanation: "Finds the product with the highest sales count."
        };
    } 
    
    else if (query.includes("least sold product")) {
        return {
            sql: "SELECT product, COUNT(*) AS total_sold FROM sales GROUP BY product ORDER BY total_sold ASC LIMIT 1;",
            explanation: "Finds the product with the lowest sales count."
        };
    } 
    
    else if (query.includes("sales by category")) {
        return {
            sql: "SELECT category, COUNT(*) AS total_sales FROM sales GROUP BY category;",
            explanation: "Counts sales for each product category."
        };
    } else if (query.includes("total revenue by category")) {
        return {
            sql: "SELECT category, SUM(revenue) AS total_revenue FROM sales GROUP BY category;",
            explanation: "Calculates total revenue for each product category."
        };
    }

    throw new Error("Unsupported query format.");
}

module.exports = { nlToSql };
