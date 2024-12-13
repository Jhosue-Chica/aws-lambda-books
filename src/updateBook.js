const AWS = require("aws-sdk");

exports.updateBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;  
  const { title, author, publishedYear, genre } = JSON.parse(event.body);

  if (!title || !author || !publishedYear || !genre) {
    return {
      statusCode: 400,
      body: JSON.stringify({
      message: "Todos los campos (título, autor, año de publicación, género) son obligatorios.",
      }),
    };
  }

  try {
    const result = await dynamodb.update({
      TableName: "Books",  
      Key: { BookID }, 
      UpdateExpression: "set Title = :title, Author = :author, PublishedYear = :publishedYear, Genre = :genre",
      ExpressionAttributeValues: {
        ":title": title,
        ":author": author,
        ":publishedYear": publishedYear,
        ":genre": genre,
      },
      ReturnValues: "ALL_NEW",
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
      message: `Libro con ID ${BookID} actualizado exitosamente`,
      updatedBook: result.Attributes,
      }),
    };
    } catch (error) {
    console.error("Error actualizando el libro:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
      message: `Error actualizando el libro con ID ${BookID}`,
      error: error.message,
      }),
    };
  }
};
