const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.addBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { title, author, publishedYear, genre } = JSON.parse(event.body);
  const createdAt = new Date();
  const BookID = v4();  

  const newBook = {
    BookID,             
    Title: title,
    Author: author,
    PublishedYear: publishedYear,
    Genre: genre,
  };

  await dynamodb
    .put({
      TableName: "Books",  
      Item: newBook,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "El libro ha sido creado exitosamente",
      book: newBook
    }),
  };
};
