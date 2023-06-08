const {db} = require('./config/db')

// 1. Список усіх користувачів із їхніми каналами з вказаними полями,
// відсортований за датою створення каналу (новіші вгорі): user id, user name,
// user avatar, channel photo, channel description, channel creation date.
async function queryTask1() {
    const query = `select users.id             as "user id",
                          users.name           as "user name",
                          users.avatar_url     as "user avatar",
                          channels.photo_url   as "channel photo",
                          channels.description as "channel description",
                          channels.created_at  as "channel creation date"
                   from users
                            left join channels on users.id = channels.user_id
                   order by channels.created_at desc nulls last;`;
    const result = await db.query(query);
    return result.rows;
}

async function queryTask2() {
    const query = `select videos.*,
                          count(*) as positive_likes
                   from videos
                            left join likes on videos.id = likes.video_id
                   where likes.positive = true
                   group by videos.id
                   order by positive_likes desc
                   limit 5;`;
    const result = await db.query(query);
    return result.rows;
}

async function queryTask3() {
    const query = `select videos.id           as "video id",
                          videos.title        as "video title",
                          videos.preview_url  as "video preview",
                          videos.duration     as "video duration",
                          videos.published_at as "video publish date"
                   from subscriptions
                            join users on subscriptions.user_id = users.id
                            join channels on subscriptions.channel_id = channels.id
                            join videos on channels.id = videos.channel_id
                   where users.name = 'Stephanie Bulger'
                   order by videos.published_at desc;`;
    const result = await db.query(query);
    return result.rows;
}

async function queryTask4() {
    const query = `select channels.*,
                          COUNT(subscriptions.id) as subscribers_number
                   from channels
                            left join subscriptions on channels.id = subscriptions.channel_id
                   where channels.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76'
                   group by channels.id;`;
    const result = await db.query(query);
    return result.rows;
}

async function queryTask5() {
    const query = `select videos.*,
                          COUNT(likes) as likes_count
                   from videos
                            inner join likes on videos.id = likes.video_id
                   where likes.positive = true
                     and likes.created_at >= '2021-09-01'
                   group by videos.id
                   having count(likes) > 4
                   order by likes_count desc
                   limit 10;`;
    const result = await db.query(query);
    return result.rows;
}

async function queryTask6() {
    const query = `select users.name                  as "channel (user) name",
                          users.avatar_url            as "channel (user) avatar",
                          channels.photo_url          as "channel photo",
                          channels.description        as "channel description",
                          subscriptions.level         as "subscription level",
                          subscriptions.subscribed_at as "subscription date"
                   from subscriptions
                            JOIN channels ON subscriptions.channel_id = channels.id
                            JOIN users ON channels.user_id = users.id
                   WHERE subscriptions.user_id = (SELECT id
                                                  FROM users
                                                  WHERE name = 'Ennis Haestier')
                     AND subscriptions.level IN ('vip', 'follower', 'fan', 'standard')
                   ORDER BY CASE subscriptions.level
                                WHEN 'vip' THEN 1
                                WHEN 'follower' THEN 2
                                WHEN 'fan' THEN 3
                                WHEN 'standard' THEN 4
                                ELSE 5 -- для будь-якого іншого рівня підписки
                                END,
                            subscriptions.subscribed_at DESC;`;
    const result = await db.query(query);
    return result.rows;
}

module.exports = {
    queryTask1,
    queryTask2,
    queryTask3,
    queryTask4,
    queryTask5,
    queryTask6
};
