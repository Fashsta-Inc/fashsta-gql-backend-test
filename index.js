// @ts-check

const { ApolloServer, gql,} = require('apollo-server');

const { createUser, updateUser, deleteUser, getUsers } = require('./resolvers')



const typeDefs = gql`

    type User {
        name: String
        email: String
        id: String
    }

    input UserInput {
        name: String
        email: String
    }

    type Query {
        users: [User]
    }

    type DeleteUserResponse {
        message: String
    }

    type Mutation {
        createUser(email: String!, name: String!): User
        updateUser(id: String!, user: UserInput!): User
        deleteUser(id: String!): DeleteUserResponse
    }
`

const resolvers = {
    Query: {
        users: getUsers
    },
    Mutation: {
        createUser,
        updateUser,
        deleteUser
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT || 27001).then(() => {
    console.log('server started successfully n port 27001')
})


