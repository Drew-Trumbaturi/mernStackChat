export default function Avatar({ userId, username, online }) {
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-teal-200",
    "bg-purple-200",
    "bg-orange-200",
    "bg-blue-200",
    "bg-red-300",
    "bg-green-300",
    "bg-teal-300",
    "bg-purple-300",
    "bg-orange-300",
    "bg-blue-300",
    "bg-red-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-blue-500",
  ];

  const userIdBase10 = parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <div
      className={
        "w-8 h-8 rounded-full relative flex text-black font-bold items-center  " +
        color
      }
    >
      <div className="text-center w-full">{username[0].toUpperCase()}</div>
      {online && (
        <div className="absolute w-3 h-3 bottom-0 right-0 bg-green-400 border border-black rounded-full"></div>
      )}
      {!online && (
        <div className="absolute w-3 h-3 bottom-0 right-0 bg-gray-400 border border-black rounded-full"></div>
      )}
    </div>
  );
}
