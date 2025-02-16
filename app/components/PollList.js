"use client";

import { useEffect, useState } from "react";
import Poll from "./Poll";

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPolls = async () => {
      const res = await fetch("/api/polls");
      const data = await res.json();
      setPolls(data);
    };

    fetchPolls();
    const interval = setInterval(fetchPolls, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (optionId) => {
    setLoading(true);
    await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId }),
    });
    setLoading(false);
  };

  return (
    <div>
      {polls.map((poll) => (
        <Poll key={poll.id} poll={poll} onVote={handleVote} />
      ))}
    </div>
  );
}
