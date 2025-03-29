// function nlToSql(nlQuery) {
//     const lowerQuery = nlQuery.toLowerCase();

//     if (lowerQuery.includes("total rev")) {
//         return "SELECT SUM(revenue) AS total_revenue FROM sales;";
//     }
//     if(lowerQuery.includes("list prods")) {
//         return "SELECT product FROM sales;"
//     }
//     return null;
// }

function nlToSql(naturalQuery) {
    const query = naturalQuery.toLowerCase();

    if (query.includes("total revenue")) {
        return "SELECT SUM(revenue) AS total_revenue FROM sales;";
    } else if (query.includes("total sales")) {
        return "SELECT COUNT(*) AS total_sales FROM sales;";
    } else if (query.match(/sales in (\w+ \d{4})/)) {
        const match = query.match(/sales in (\w+ \d{4})/);
        return `SELECT COUNT(*) AS total_sales FROM sales WHERE date LIKE '%${match[1]}%';`;
    } else if (query.match(/total revenue for (\w+)/)) {
        const match = query.match(/total revenue for (\w+)/);
        return `SELECT SUM(revenue) AS total_revenue FROM sales WHERE product = '${match[1]}';`;
    }

    throw new Error("Unsupported query format.");
}



module.exports = { nlToSql };