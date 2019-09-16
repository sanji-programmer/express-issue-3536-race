const { connectDb, Item } = require('./models');

connectDb().then(async () => {

    for (let i = 1; i <= 10; i++) {
        const item = new Item({
            iid: i,
            name: 'Item ' + i
        });            
        await item.save();
    }

    Item.find().then((doc) => {
        console.log(doc);
    });
});
