export const getTodoList = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos")
    const data = res.json()
    console.log(data, "data123")
    return data
}