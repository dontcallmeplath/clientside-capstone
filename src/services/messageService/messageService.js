export const getAllMessagesByUserId = (id) => {
  return fetch(`http://localhost:8088/messages?senderId=${id}`).then((res) => {
    return res.json();
  });
};
export const getMessagesByRecipient = (id) => {
  return fetch(`http://localhost:8088/messages?recipientId=${id}`).then(
    (res) => {
      return res.json();
    }
  );
};
