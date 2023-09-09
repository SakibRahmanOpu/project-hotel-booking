export const postData = async (url = "", data = {}) => {
  const auth = JSON.parse(localStorage.getItem("authHotelBooking"));
  const token = auth?.token;
  console.log(token);
  const response = await fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify({ ...data }),
  });
  return response.json();
};

export const getData = async (url = "") => {
  const auth = JSON.parse(localStorage.getItem("authHotelBooking"));
  const token = auth?.token;
  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
  });
  return response;
};
