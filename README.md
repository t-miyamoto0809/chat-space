
# **開発環境**
- Ruby 2.3.1
- Rails 5.0.7.2

# **DB設計**
***
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index|


### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members

***
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :users, through: :members
- has_many :messages
- has_many :members

***
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

***
## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
