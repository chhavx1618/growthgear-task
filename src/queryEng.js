function nlToSql(nlQuery) {
    const lowerQuery = nlQuery.toLowerCase();

    if (lowerQuery.includes("total rev")) {
        return "SELECT SUM(revenue) AS total_revenue FROM sales;";
    }
    if(lowerQuery.includes("list prods")) {
        return "SELECT product FROM sales;"
    }
    return null;
}


module.exports = { nlToSql };