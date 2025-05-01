import BoardCard from "./BoardCard";

const SectionBoard = ({ title, bgColor, data, setDelete, handleDrop }) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        let status;
        if (title === "TO-DO") {
          status = "todo";
        } else if (title === "IN-PROGRESS") {
          status = "inprogress";
        } else {
          status = "complete";
        }
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) {
          handleDrop(taskId, status.toLowerCase());
        }
      }}
      className="min-w-[25%] flex flex-col p-4 border shadow-sm mt-4 rounded-lg bg-slate-100 min-h-80"
    >
      <div className={`rounded-md py-1 ${bgColor} w-[50%] px-4 text-sm`}>
        {title}
      </div>

      {data?.map((dc) => (
        <BoardCard setDelete={setDelete} data={dc} key={dc?.id} />
      ))}
    </div>
  );
};

export default SectionBoard;
