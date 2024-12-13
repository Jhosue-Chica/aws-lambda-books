const AWS = require("aws-sdk");

exports.getBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
  // Obtener el BookID de los parámetros de la ruta
  const { BookID } = event.pathParameters;

  try {
    const params = {
      TableName: "Books",
      Key: {
        BookID: BookID
      }
    };

    // Usar get() en lugar de scan() para buscar por ID específico
    const result = await dynamodb.get(params).promise();

    // Verificar si se encontró el libro
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Libro no encontrado" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: "Error al obtener el libro", 
        error: error.message 
      })
    };
  }
};