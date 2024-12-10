import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";

const Todo = () => {
  let [uservalue, setUserValue] = useState("");
  let [userError, setuserError] = useState("");

  let handleuserValue = (e) => {
    setUserValue(e.target.value);
    setuserError("");
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    if (!uservalue) {
      setuserError("task required ");
    } else {
      const db = getDatabase();
      set(push(ref(db, "task/")), {
        task: uservalue,
      })
        .then(() => {
          alert("data send successfully");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <section className="h-[100vh]">
      <div className="container m-auto ">
        <div className="flex flex-col items-center h-full">
          <h1 className="text-[45px] uppercase font-bold">To Do</h1>
          <div className="w-[500px] mt-8">
            <form
              action=""
              className="flex gap-3"
            >
              <input
                type="text"
                placeholder="enter your task"
                onChange={handleuserValue}
                className="border-none rounded-md py-3 px-2 bg-gray-300 outline-none text-black w-full"
              />
              <input
                type="submit"
                onClick={handleSubmit}
                className="bg-black text-white py-3 px-4 rounded-md cursor-pointer hover:text-green-200"
              />
            </form>
            {userError && <div className="text-red-600">{userError}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todo;
