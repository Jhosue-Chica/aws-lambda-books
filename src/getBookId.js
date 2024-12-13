import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getBook = async (event) => {
  const { BookID } = event.pathParameters;

  const params = {
    TableName: "Books",
    Key: { BookID }
  };

  try {
    const result = await dynamodb.get(params).promise();
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Libro no encontrado" })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo recuperar el libro" })
    };
  }
};