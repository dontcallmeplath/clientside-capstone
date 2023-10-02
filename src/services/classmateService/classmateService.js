export const getClassmatesList = () => {
  return fetch(`http://localhost:8088/users`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("Res bad");
    }
  });
};

export const getSpecificClassmate = (id) => {
  return fetch(`http://localhost:8088/users/${id}`).then((res) => {
    return res.json();
  });
};

export const getListOfSuperlatives = () => {
  return fetch(`http://localhost:8088/superlatives`).then((res) => {
    return res.json();
  });
};

export const editMate = (mate) => {
  return fetch(`http://localhost:8088/users/${mate.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mate),
  });
};
