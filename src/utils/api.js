import { baseUrl } from "../utils/constants";

function checkResponse(res) {
  return res ? res.json() : Promise.reject("Network response failed");
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getClothingItems() {
  return request(`${baseUrl}/items`);
}

function addClothingItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function deleteClothingItem(item, token) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function likeClothingItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function dislikeClothingItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export {
  baseUrl,
  checkResponse,
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
