import React from "react";
import { useState } from "react";

const AlertMsg = (response) => {
  const [serverMsg, setServerMsg] = useState();
  const [status, setStatus] = useState();

  setServerMsg(response.message);
  setStatus(response.status);
  return (
  <div>
    {serverMsg && (
      <div
        className={`fixed top-[10%] p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 ${
          status === "success" ? "bg-green-500" : "bg-rose-500"
        }`}
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        {serverMsg}
      </div>
    )}
  </div>
);
};

export default AlertMsg;
