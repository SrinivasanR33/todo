export const getTodoList = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = res.json();
    return data;
  } catch (error) {
    return error;
  }
};
