# sandbox-express-graphql
GraphQLのサイトに書いてあるexpress-graphqlを使ったソースからの確認用
共有用。

## エンドポイント
http://127.0.0.1:4000/graphql

## 確認用クエリ
```
{
  server_time
  qiita (page:1,per_page:1,query:"svjunic"),{
    #rendered_body
    #body
    coediting
    comments_count
    created_at
    id
    likes_count
    private
    reactions_count
    title
    updated_at
    url
    user {
      description
      facebook_id
      followees_count
      followers_count
      github_login_name
      id
      items_count
      linkedin_id
      location
      name
      organization
      permanent_id
      profile_image_url
      team_only
      twitter_screen_name
      website_url
    }
    page_views_count
    tags {
      name
      versions
    }
    group {
      created_at
      id
      name
      private
      updated_at
      url_name
    }
  }
}
```

