export const getClassmatesList = () => {
  return fetch(`http://localhost:8088/users`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("Res bad");
    }
  });
};
