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

export const postNewMessage = (msgItem) => {
  return fetch(`http://localhost:8088/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msgItem),
  });
};

export const deleteMsg = (msgId) => {
  return fetch(`http://localhost:8088/messages/${msgId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const editMsg = (msgObj, msgText, msgId) => {
  return fetch(`http://localhost:8088/messages/${msgId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: msgId,
      text: msgText,
      timestamp: "",
      senderId: msgObj.senderId,
      recipientId: msgObj.recipientId,
      read: msgObj.read,
    }),
  }).then((response) => response.json());
};
