require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});
  

// 1: Get all items that contain text

function findItem(searchTerm) {
    knexInstance
        .select('name', 'category')
        .from('shopping_list')
        .where('name', 'ilike', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
    ;
}


// 2: Get all items paginated

function paginateItems(pageNumber) {
    const pageSize = 6
    const startItem = pageSize * (pageNumber - 1)
    knexInstance
        .select('name', 'price', 'category', 'checked')
        .from('shopping_list')
        .limit(pageSize)
        .offset(startItem)
        .then(result => {
            console.log(result)
        })
    ;
}


// 3: Get all items added after date

function itemsAddedDaysAgo(daysAgo) {
    knexInstance
        .select('name', 'price', 'category', 'checked')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .from('shopping_list')
        .then(result => {
            console.log(result)
        })
    ;
}


// 4: Get the total cost for each category

function totalCategoryCost() {
    knexInstance
        .select('category')
        .groupBy('category')
        .sum('price as total')
        .from('shopping_list')
        .then(result => {
            console.log(result)
        })
    ;
}