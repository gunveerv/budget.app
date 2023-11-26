// modules / category

// Define Constant Categories

function Categories() {
    const MISCELLANEOUS = 'Miscellaneous';
    const ENTERTAINMENT = 'Entertainment';
    const GROCERIES = 'Groceries';
    const HOUSING = 'Housing';
    const TRANSPORTATION = 'Transportation';
    const INVESTMENT = 'INVESTMENT';
    const ONE_TIME = 'One Time';

    const allCatergories = {
        MISCELLANEOUS,
        ENTERTAINMENT,
        GROCERIES,
        HOUSING,
        TRANSPORTATION,
        INVESTMENT,
        ONE_TIME,
    };

    const serializeCategories = JSON.stringify(allCatergories);

    return {
        categories: allCatergories,
        serializeCategories
    };
}

module.exports = Categories;