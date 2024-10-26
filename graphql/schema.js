const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Dancer {
        id: ID!
        firstName: String!
        lastName: String!
        age: Int!
    }

    type DanceClass {
        id: ID!
        name: String!
        semester: String!
        teacher: String!
        classLength: Int  # Made this optional by removing !
        classType: String!
        location: String!
        daysOfWeek: [String!]!
        dancers: [Dancer]
    }

    type Query {
        dancers: [Dancer]
        dancer(id: ID!): Dancer
        danceClasses: [DanceClass]
        danceClass(id: ID!): DanceClass
    }

    input DancerInput {
        firstName: String!
        lastName: String!
        age: Int!
    }

    input DanceClassInput {
        name: String!
        semester: String!
        teacher: String!
        classLength: Int  # Made this optional by removing !
        classType: String!
        location: String!
        daysOfWeek: [String!]!
        dancers: [DancerInput]
    }

    type Mutation {
        addDancer(dancer: DancerInput): Dancer
        updateDancer(id: ID!, dancer: DancerInput): Dancer
        deleteDancer(id: ID!): Boolean

        addDanceClass(danceClass: DanceClassInput): DanceClass
        updateDanceClass(id: ID!, danceClass: DanceClassInput): DanceClass
        deleteDanceClass(id: ID!): Boolean
    }
`;

module.exports = typeDefs;

