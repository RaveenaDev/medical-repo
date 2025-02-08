import React from "react";

const OngoingRequests = () => {
  const ongoingRequests = [
    { id: 1, text: "Reviewing submitted designs" },
    { id: 2, text: "Implementing feature request" },
  ];

  return (
    <div>
      {ongoingRequests.map((req) => (
        <div key={req.id} className="p-4 border rounded-lg mb-2">
          <p>{req.text}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Progress
          </button>
        </div>
      ))}
    </div>
  );
};

export default OngoingRequests;
