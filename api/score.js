import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, score } = req.body;
    await redis.zadd("leaderboard", { score: parseInt(score), member: username });
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    const topScores = await redis.zrevrange("leaderboard", 0, 9, { withScores: true });
    return res.status(200).json(topScores);
  }
}
