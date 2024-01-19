import React, { useEffect, useState } from 'react'
import Field from '../../components/inputfield/Field'
import CustomizedTables from '../../components/table/TableData'
import StickyHeadTable from '../../components/table/TableData'
import { getTodoList } from '../../service/Todoservice'

function TodoList() {
    const [stateValue, setstateValue] = useState({ title: '', status: false, edit: false })
    const [todoItems, setTodoItems] = useState([])
    const handleInputChange = (e, index) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstateValue((per) => {
            return {
                ...per, [index]: newValue
            }
        })
    }
    const GETApi = async () => {
        const res = await getTodoList()
        setTodoItems(res)
        console.log(res, "res")
    }
    useEffect(() => {
        GETApi()
    }, [])

    return (
        <div className='min-h-screen'>
            <div className='flex justify-center items-center'>
                <div className=''>
                    <Field
                        value={stateValue.title}
                        onChange={(e) => handleInputChange(e, 'title')}
                        type="text"
                        label={"Title"}
                    />
                    <Field
                        value={stateValue.title}
                        onChange={(e) => handleInputChange(e, 'status')}
                        type="text"
                        label={"Status"}
                    />
                    <button className='bg-green-300'>Create</button>
                </div>
                <div>
                </div>
            </div>
            <div className='p-5'>
                <StickyHeadTable rows={todoItems} />
            </div>
        </div>
    )
}

export default TodoList