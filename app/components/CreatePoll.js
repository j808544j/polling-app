"use client";

import { useState } from "react";

export default function CreatePoll({ onPollCreated }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || options.some((opt) => !opt.trim())) return;

    setLoading(true);
    const res = await fetch("/api/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, options }),
    });

    if (res.ok) {
      setQuestion("");
      setOptions(["", ""]);
      onPollCreated();
    }
    setLoading(false);
  };

  return (
    <div className="border p-4 mb-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Create a Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-grow border p-2 rounded"
            />
            {options.length > 2 && (
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => removeOption(index)}
              >
                ✖
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addOption} className="text-blue-500">
          ➕ Add Option
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-3 block w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Poll"}
        </button>
      </form>
    </div>
  );
}
