const { ApolloServer } = require('apollo-server');

const typeDefs = require('./src/types');
const resolvers = require('./src/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
