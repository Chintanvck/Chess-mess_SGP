import bcrypt from 'bcryptjs'

const data = {
    users:[
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin:false,
        },
        {
            name: 'Chintan',
            email: 'chintan@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
    ],
    products: [
        {
            //id: 1,
            rname: "Massala Theoryy",
            imgdata: "https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp",
            address: "North Indian, Biryani, Mughlai",
            description: " 1175 + order placed from here recently",
            price: 350,
            rating: 3.8,
            numReviews: 10,
        },
        {
            //id: 2,
            rname: "Jugaadi Adda",
            imgdata: "https://b.zmtcdn.com/data/pictures/chains/5/19295245/089cbcf1d3307542c72f77272556b28b_o2_featured_v2.jpg?output-format=webp",
            address: "Street Food",
            description: " 2525 + order placed from here recently",
            price: 25,
            rating: 3.9,
            numReviews:11,
        },
        {
            //id: 3,
            rname: "La Milano Pizzeria",
            imgdata: "https://b.zmtcdn.com/data/pictures/chains/1/19708611/10f90d4a69678d98662514d173b29665_o2_featured_v2.jpg",
            address: "Pizza, Fast Food, Pasta",
            description: " 650 + order placed from here recently",
            price: 70,
            rating: 4.2,
            numReviews: 10,
        },
        {
            //id: 4,
            rname: "Momoman",
            imgdata: "https://b.zmtcdn.com/data/pictures/chains/1/113401/59f29399060caefcc575d59dc9402ce8_o2_featured_v2.jpg",
            address: "Momos",
            description: " 300 + order placed from here recently",
            price: 70,
            rating: 3.8,
            numReviews: 5,
          },
    ],
};
 
export default data;