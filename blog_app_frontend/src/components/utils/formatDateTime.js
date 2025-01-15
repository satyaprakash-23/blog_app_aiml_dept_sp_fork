const formatDateTime = (mongodbTimeStamp) => {
    const date = new Date(mongodbTimeStamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    return `${day}-${month}-${year} | ${hours}:${minutes} ${ampm}`;
  };
// Output: "31-10-2024 | 4:53 PM"
export default formatDateTime;