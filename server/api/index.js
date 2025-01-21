import todoRoutes from './routes/todoRoutes';

export default defineEventHandler(async (event) => {
  const route = event.node.req.url; // Extract the request URL
  const method = event.node.req.method; // Extract the HTTP method

  console.log('Request:', { route, method });

  // Delegate to Todo routes
  if (route.startsWith('/todo')) {
    console.log("step: 1");
    return await todoRoutes(event);
  }

  // Default response for unmatched routes
  return { error: 'API route not found', statusCode: 404 };
});
