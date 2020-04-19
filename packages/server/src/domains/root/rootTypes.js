const rootTypes = `
    directive @cost(multipliers: [String], useMultipliers: Boolean, complexity: Int) on OBJECT | FIELD_DEFINITION

    # The dummy queries and mutations are necessary because
    # graphql-js cannot have empty root types and we only extend
    # these types later on
    type Query {
        dummy: String
    }

    type Mutation {
        dummy: String
    }

    type Subscription {
        dummy: String
    }

    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`

export default rootTypes
