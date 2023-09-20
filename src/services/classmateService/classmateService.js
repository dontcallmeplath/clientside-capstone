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
  return fetch(`http://localhost:8088/users/${id}?_expand=superlative`).then(
    (res) => {
      return res.json();
    }
  );
};

export const getMessagesByRecipient = (id) => {
  return fetch(`http://localhost:8088/messages?recipientId=${id}`).then(
    (res) => {
      return res.json();
    }
  );
};
