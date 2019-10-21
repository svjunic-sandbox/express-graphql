let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');

let axios = require('axios');

// https://qiita.com/api/v2/docs#get-apiv2users

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    server_time: String!
    qiita(page: Int, per_page: Int,query:String): [Qiita]
  }

  type Qiita {
    rendered_body    : String
    body             : String
    coediting        : Boolean
    comments_count   : Int
    created_at       : String
    id               : String
    likes_count      : Int
    private          : Boolean
    reactions_count  : Int
    title            : String
    updated_at       : String
    url              : String
    user             : UserObject
    page_views_count : Int
    tags             : [Tag]
    group            : Group
  }

  type Group {
    created_at : String
    id         : Int
    name       : String
    private    : Boolean
    updated_at : String
    url_name   : String
  }

  type Tag {
    name     : String
    versions : [ String ]
  }

  type UserObject {
    description         : String
    facebook_id         : String
    followees_count     : Int
    followers_count     : Int
    github_login_name   : String
    id                  : String
    items_count         : Int
    linkedin_id         : String
    location            : String
    name                : String
    organization        : String
    permanent_id        : Int
    profile_image_url   : String
    team_only           : Boolean
    twitter_screen_name : String
    website_url         : String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
  server_time: () => {
    const mogeta = new Date().toGMTString();
    return mogeta;
  },
  server_time: () => {
    const server_time = new Date().toGMTString();
    return server_time;
  },
  qiita: async ({ page = 1, per_page = 30, query = 'svjunic' }) => {
    // qiitaのAPI使わせてもらう
    // https://qiita.com/api/v2/docs#get-apiv2items
    // 'https://qiita.com/api/v2/items',
    let response = await axios.get(`https://qiita.com/api/v2/items?page=${page}&per_page=${per_page}&query=${query}`);

    return response.data;
  }
};

let app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
