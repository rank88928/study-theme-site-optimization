function get_local_shopping_records(key) {
  let data = JSON.parse(localStorage.getItem(key));

  if (data) {
    return data;
  } else {
    return [];
  }
}

function store_local_shopping_records(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export { get_local_shopping_records, store_local_shopping_records };
