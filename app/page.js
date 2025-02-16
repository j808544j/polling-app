"use client"

import { useState } from "react";
import PollList from "./components/PollList";
import CreatePoll from "./components/CreatePoll";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Live Polls</h1>
      <CreatePoll onPollCreated={() => setRefresh((prev) => !prev)} />
      <PollList key={refresh} />
    </div>
  );
}
