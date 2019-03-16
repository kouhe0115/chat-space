# ChatSpace

* 実装機能（予定）
    - 新規登録機能
    - 1対1チャット機能
    - グループチャット機能
    - メンバー招待機能
    - 画像投稿機能


* Ruby version
    - ruby 2.3.1
    - rails 5.0.1

## DB設計

### users

| column   | type          | option      |
|----------|---------------|-------------|
| user_id  | refference    |             |
| name     | string        | not null    |
| mail     | string        | primary key |
| password | string        | not null    |


* association
    - has_many messages,
    - has_many groups, through: groups_users
    - has_many group_users

### massages

| column     | type   | option   |
|------------|--------|----------|
| message_id | int    |          |
| body       | text   |          |
| image      | string |          |
| user_id    | int    | not null |
| group_id   | int    | not null |

* association
    - belongs_to users
    - belongs_to groups

### groups

| column     | type          | option   |
|------------|---------------|----------|
| group_id   | refference    |          |
| group_name | string        | not null |

* association
    - has_many messages,
    - has_many users, through: groups_users
    - has_many group_users

### groups_users

| column   | type            | option   |
|----------|-----------------|----------|
| id       | int             |          |
| user_id  | refference      | not null |
| group_id | refference      | not null |

* association
    - belomgs_to groups
    - belomgs_to users

