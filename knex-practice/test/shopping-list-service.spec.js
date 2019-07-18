const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`Shopping List service object`, function() {
    let db;
    let testItems = [
        {
            id: 1,
            name: 'Cheese crackers',
            price: '3.99',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: 'Snack'
        },
        {
            id: 2,
            name: 'Hot dog',
            price: '10.50',
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            checked: true,
            category: 'Lunch'
        },
        {
            id: 3,
            name: 'Frozen huevos rancheros',
            price: '8.00',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            checked: false,
            category: 'Breakfast'
        },
    ];
        

    // Setting up test parameters
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => db('shopping_list').truncate())
    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())


    // First block of tests (with data existing)
    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
            ;
        })    

        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems);
                })
            ;
        })

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3;
            const thirdTestItem = testItems[thirdId - 1];
            return ShoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        date_added: thirdTestItem.date_added,
                        checked: thirdTestItem.checked,
                        category: thirdTestItem.category,
                    })
                })
            ;
        })

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3;
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    // copy the test articles array without the "deleted" article
                    const expected = testItems.filter(item => item.id !== itemId);
                    expect(allItems).to.eql(expected);
                })
        })

        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const updateItemId = 3;
            const origItem = testItems[updateItemId - 1];
            const newItemData = {
                name: 'Thawed huevos rancheros',
                checked: true,
            };

            return ShoppingListService.updateItem(db, updateItemId, newItemData)
                .then(() => ShoppingListService.getById(db, updateItemId))
                .then(item => {
                    expect(item).to.eql({
                        id: updateItemId,
                        name: newItemData.name,
                        price: origItem.price,
                        date_added: origItem.date_added,
                        checked: newItemData.checked,
                        category: origItem.category,
                    })
                })
            ;      
        })
    })  
    
    // Second block of tests (starting from empty table)
    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
            ;
        })

        it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: 'Chicken pot pie',
                price: '17.99',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: false,
                category: 'Main',
            };
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: newItem.checked,
                        category: newItem.category,        
                    })
                })
            ;
        })
    })
})