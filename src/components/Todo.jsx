import { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";
import { IoMdClose } from "react-icons/io";

const Todo = () => {
  let [uservalue, setUserValue] = useState("");
  let [userError, setuserError] = useState("");
  let [editModel, seteditModel] = useState(false);
  let [usertask, setuserTask] = useState([]);
  let [editItem, seteditItem] = useState("");
  let [deleteItem, setDeleteItem] = useState(false);
  let [taskId, setTaskId] = useState("");

  const db = getDatabase();

  let handleuserValue = (e) => {
    setUserValue(e.target.value);
    setuserError("");
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    if (!uservalue) {
      setuserError("task required ");
    } else {
      set(push(ref(db, "task/")), {
        task: uservalue,
      })
        .then(() => {
          setUserValue("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // read data

  useEffect(() => {
    const todoref = ref(db, "task/");
    onValue(todoref, (snapshot) => {
      let alltaskdata = [];
      snapshot.forEach((item) => {
        alltaskdata.push({ ...item.val(), id: item.key });
      });
      setuserTask(alltaskdata);
    });
  }, []);

  let handleEdit = (id, item) => {
    seteditModel(true);
    seteditItem(item.task);
    setTaskId(id);
  };

  let handleDelete = (id, item) => {
    setDeleteItem(true);
    seteditItem(item.task);
    setTaskId(id);
  };

  let removeData = () => {
    remove(ref(db, "task/" + taskId));
    setDeleteItem(false);
  };

  let backHome = () => {
    setDeleteItem(false);
  };

  let handleUpdate = () => {
    seteditModel(false);
    update(ref(db, "task/" + taskId), {
      task: editItem,
    });
  };

  return (
    <section className="h-[100vh] bg-todo-bg2 bg-cover bg-no-repeat opacity-90 ">
      <div className="container m-auto">
        <div className="flex items-center justify-center h-[100vh]">
          <div className="flex flex-col  h-[90vh] max-w-[550px] m-auto border rounded-md shadow-lg px-[20px] backdrop-saturate-150 backdrop-blur-md">
            <h1 className="text-[45px] uppercase font-bold text-white text-center">
              To Do
            </h1>
            <div className="w-[500px] mt-8">
              <form
                action=""
                className="flex gap-3"
              >
                <input
                  type="text"
                  placeholder="enter your task"
                  onChange={handleuserValue}
                  value={uservalue}
                  className=" rounded-md py-3 px-2 bg-gray-300 outline-none text-[#000000] w-full"
                />
                <input
                  type="submit"
                  onClick={handleSubmit}
                  value="Add"
                  className="bg-[#12838b] text-white py-3 px-4 rounded-md cursor-pointer hover:text-green-200 shadow-lg"
                />
              </form>
              {userError && <div className="text-red-600">{userError}</div>}
            </div>
            {!editModel && !deleteItem && (
              <div className="py-3 overflow-y-auto scroll mt-[10px]">
                <ul className="[&>div>li]:text-blue-400 [&>div>li]:text-[20px] px-[10px]">
                  {usertask.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 justify-between items-center border-b-[1px] border-[#ffffff52] py-2 text-justify "
                      >
                        <li className="capitalize">
                          <span className="mr-3">{index + 1}.</span>
                          {item.task}
                        </li>
                        <div className="text-white text-[14px] flex gap-2">
                          <button
                            className="border border-[#ffffff52] rounded-lg py-3 px-4 capitalize"
                            onClick={() => handleEdit(item.id, item)}
                          >
                            edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item)}
                            className="border border-[#ffffff52] rounded-lg py-3 px-4 capitalize"
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* when user click on edit the below item will be visible  */}

            {editModel && (
              <div className="py-[30px]">
                <div className="relative max-w-[500px] h-[40vh] border rounded-md flex flex-col items-center justify-center">
                  <input
                    type="text"
                    placeholder="edit text"
                    value={editItem}
                    onChange={(e) => {
                      seteditItem(e.target.value);
                    }}
                    className="w-[90%] border-none py-[10px] px-[12px] rounded-md outline-none"
                  />
                  <div className="text-white text-[14px] flex gap-2 py-[20px]">
                    <button
                      className="border border-[#ffffff52] rounded-lg py-3 px-4 capitalize"
                      onClick={handleUpdate}
                    >
                      update
                    </button>
                  </div>
                  <IoMdClose
                    className="text-white absolute top-2 right-2 cursor-pointer"
                    onClick={() => seteditModel(false)}
                  />
                </div>
              </div>
            )}

            {deleteItem && (
              <div className="py-[30px]">
                <div className="relative max-w-[500px] h-[40vh] border rounded-md flex flex-col items-center justify-center">
                  <h2 className="text-red-500 text-[25px] py-5 px-5">
                    Are You Sure to delete task ?
                  </h2>
                  <p className="text-white text-[20px] capitalize">
                    {editItem}
                  </p>
                  <div className="text-white text-[14px] flex gap-2 py-[20px]">
                    <button
                      className="border border-[#ffffff52] rounded-lg py-3 px-4 capitalize text-red-600"
                      onClick={removeData}
                    >
                      yes
                    </button>
                    <button
                      className="border border-[#ffffff52] rounded-lg py-3 px-4 capitalize text-green-500"
                      onClick={backHome}
                    >
                      no
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* end of edit model  */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todo;
