const formatTime = (time) => {
  const date = new Date(time * 1000);

  const end = date.getHours() >= 12 ? "PM" : "AM";
  const hours = (date.getHours() % 12).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes} ${end}`;
};

export default formatTime;
