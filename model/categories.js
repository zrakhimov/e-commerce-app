const categories =
{
    fakeDB:[],

    init()
    {

            this.fakeDB.push(
            {
                category_id: 0,
                title:'Women\'s Fashion',
                thumb:`/img/cat_fashion.svg`,
                link:`#`
            });
    
            this.fakeDB.push(
            {
                category_id: 1,
                title:'Beauty',
                thumb:`/img/cat_beauty.svg`,
                link:`#`
            });
            this.fakeDB.push(
            {
                category_id: 2,
                title:'Jewellery',
                thumb:`/img/cat_jewelry.svg`,
                link:`#`
            });
            this.fakeDB.push(
            {
                category_id: 3,
                title:'Watches',
                thumb:`/img/cat_watches.svg`,
                link:`#`
            });

    },

    getAllCategories()
    {

        return this.fakeDB;
    }

}

categories.init();
module.exports = categories;