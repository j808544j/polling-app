"use client";

export default function Poll({ poll, onVote }) {
  return (
    <div className="border p-4 my-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{poll.question}</h2>
      <ul className="list-disc pl-5">
        {poll.options.map((option) => (
          <li key={option.id} className="my-2 flex items-center gap-2">
            {option.text} - {option.votes} votes
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => onVote(option.id)}
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
