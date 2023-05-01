const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID
        name: String
        username: String
        email: String
        password: String
        createAt: String
    }
    #Creacion de token
    type Token {
        token: String
    }

    input UserInput{
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput{
        email: String!
        password: String!
    }

    type Query {
        #User
        getUser: User
    }

    type Mutation {
        # User
        register(input: UserInput): User
        # login de usuario
        login(input: LoginInput): Token
    }
`;

module.exports = typeDefs;