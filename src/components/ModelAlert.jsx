import { useState } from "react";

const ModelAlert = () => {
  let [confirmation, setConfiramtion] = useState(false);
  return (
    <div>
      <h2>Are You Sure To Delete the Task</h2>
      <div>
        <button
          onClick={() => {
            setConfiramtion(true);
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setConfiramtion(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ModelAlert;
