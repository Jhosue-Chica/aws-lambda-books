const AWS = require("aws-sdk");

exports.deleteBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;  

  await dynamodb.delete({
    TableName: "Books",  
    Key: { BookID },  
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Libro con ID ${BookID} eliminado exitosamente`, 
    }),
  };
};
