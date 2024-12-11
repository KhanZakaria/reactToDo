import { IoMdClose } from "react-icons/io";
const EditModel = () => {
  return (
    <div className="py-[30px]">
      <div className="relative max-w-[500px] h-[40vh] border rounded-md flex flex-col items-center justify-center">
        <input
          type="text"
          placeholder="edit text"
          className="w-[90%] border-none py-[10px] px-[12px] rounded-md outline-none"
        />
        <div className="text-white text-[14px] flex gap-2 py-[20px]">
          <button className="border border-[#ffffff52] rounded-lg py-3 px-4 capitalize">
            update
          </button>
        </div>
        <IoMdClose className="text-white absolute top-2 right-2 cursor-pointer" />
      </div>
    </div>
  );
};

export default EditModel;
