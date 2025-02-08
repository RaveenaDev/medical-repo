export default function NewRequests() {
  const requests = [
    { id: 1, text: "Request for design review" },
    { id: 2, text: "Feature request for dark mode" },
  ];

  return (
    <div>
      {requests.map((req) => (
        <div key={req.id} className="p-4 border rounded-lg mb-2">
          <p>{req.text}</p>
          <input
            type="text"
            placeholder="Enter your response"
            className="border p-2 rounded w-full my-2"
          />
          <div className="flex gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Accept
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
              Remind me later
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
