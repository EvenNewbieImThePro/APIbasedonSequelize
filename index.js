
const Sequelize = require('sequelize');
var url = require('url');
const http = require('http');

  /*
    sequelize란?
    Node.js 에서 MySQL을 간편하게 사용할 수 있도록 도와줄 수 있는 라이브러리. (ORM)
    
  */

// Option 1: Passing parameters separately
const sequelize = new Sequelize('db', 'id', 'password', {
    host: 'ip', //port: 3306을 쓰지 않는 경우
    dialect: 'db'
});

const User = sequelize.define("users2", {
    identity: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
    name: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
});


const Book = sequelize.define("books2", {
    title: Sequelize.DataTypes.STRING,
    content: Sequelize.DataTypes.STRING,
});

    //user.addBooks2(book);
Book.belongsTo(User);
User.hasMany(Book);
 
sequelize.sync().then(async () => {
    const user = await User.create({
        identity: "id",
        password: "pw",
        name:  "name",
        email: "mail@xxx.com"
    });    

});



http.createServer(async (req, res) => {
    var _url = req.url;
    
if(_url === '/') {
    res.writeHead(200,{'Content-Type':'text/json; charset=utf-8'});
    res.end("되나?");
}
    

if(_url === '/api/users') {
    res.writeHead(200,{'Content-Type':'text/json; charset=utf-8'});
    const users = await User.findAll();
    res.end(JSON.stringify(users));
}

else if(_url === '/api/books') {
    res.writeHead(200,{'Content-Type':'text/json; charset=utf-8'});
    const books = await Book.findAll();
    res.end(JSON.stringify(books));
}

else {
    res.writeHead(404);
    res.end("Page Not Found");
}

}).listen(8080);


    

  /*  const users = await User.findAll({
        include: [Book]
    }); */
    

    
 /*   console.log(
        users.map((user) => {
            const books = user.bookslls.map((book)=>{
                return book.dataValues;
            });
            user.dataValues.books=books;
            return user.dataValues;
        })
    );
});*/


/*
const routes = {
        '/api/users': async () => {
            return JSON.stringify(await User.findAll());
        },
        '/api/books' : async () => {
            return JSOn.stringify(await Book,findAll());
        }
}
*/