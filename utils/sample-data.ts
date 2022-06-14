import { User, DB } from '../interfaces'

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 120304, name: 'Adrian' },
  { id: 2, name: 'Adrian' },
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
]


export const DBs: DB[] = [
  {id: 1, name: "Azure SQL", api: "otb_sample_histories"},
  {id: 2, name: "Cassandra", api: "cs_otb_sample_histories"},
  {id: 3, name: "Cosmos", api: "cm_otb_sample_histories"},
]