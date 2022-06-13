

var database = {
  id: 'ShroodTest'
}

var container = {
  id: 'Items'
}


var otbHistories = {
  container: {
    id: "OTBHistory"
  },
  database: {
    id: "ToDoList"
  }
}

var items = {
  Andersen: {
    id: 'Anderson.1',
    Country: 'USA',
    partitionKey: 'USA',
    lastName: 'Andersen',
    parents: [
      {
        firstName: 'Thomas'
      },
      {
        firstName: 'Mary Kay'
      }
    ],
    children: [
      {
        firstName: 'Henriette Thaulow',
        gender: 'female',
        grade: 5,
        pets: [
          {
            givenName: 'Fluffy'
          }
        ]
      }
    ],
    address: {
      state: 'WA',
      county: 'King',
      city: 'Seattle'
    }
  },
  Wakefield: {
    id: 'Wakefield.7',
    partitionKey: 'Italy',
    Country: 'Italy',
    parents: [
      {
        familyName: 'Wakefield',
        firstName: 'Robin'
      },
      {
        familyName: 'Miller',
        firstName: 'Ben'
      }
    ],
    children: [
      {
        familyName: 'Merriam',
        firstName: 'Jesse',
        gender: 'female',
        grade: 8,
        pets: [
          {
            givenName: 'Goofy'
          },
          {
            givenName: 'Shadow'
          }
        ]
      },
      {
        familyName: 'Miller',
        firstName: 'Lisa',
        gender: 'female',
        grade: 1
      }
    ],
    address: {
      state: 'NY',
      county: 'Manhattan',
      city: 'NY'
    },
    isRegistered: false
  }
}


export default {
  env: process.env.NODE_ENV,
  mode: process.env.MODE,
  endpoint: process.env.ENDPOINT,
  key: process.env.KEY,
  items: items,
  container: container,
  database: database,
  otbHistories: otbHistories,
  pgHost: process.env.PG_HOST,
  pgUser: process.env.PG_USER,
  pgPW: process.env.PG_PW,
  pgDB: process.env.PG_DB,
  pgPort: process.env.PG_PORT
}
