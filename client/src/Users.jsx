import Avatar from "./Avatar";

export default function Users({ id, username, onClick, selected, online }) {
  return (
    <div
      key={id}
      onClick={() => {
        onClick(id);
      }}
      className={
        "border-b flex gap-2 items-center border-gray-700 cursor-pointer " +
        (selected ? "bg-gray-500" : "")
      }
    >
      {selected && <div className="w-1 bg-blue-500 h-12"></div>}
      <div className="flex gap-2 items-center py-2 pl-1">
        <Avatar
          online={online}
          username={username}
          userId={id}
        />
        <span>{username}</span>
      </div>
    </div>
  );
}
