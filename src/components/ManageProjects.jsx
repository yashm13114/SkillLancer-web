import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { MdDelete } from "react-icons/md";
import './styles.css'; 
const ManageProjects = () => {
    const [allTransactions, setallTransactions] = useState([])
    const [transactions, setTransactions] = useState([]);
    const [editable, setEditable] = useState(null);
    const [form] = Form.useForm();
    const [updateForm, setUpdateForm] = useState(null);
    const navigate = useNavigate()
    // update values
    const handleEdit = (record) => {
        setEditable(record._id);
        form.setFieldsValue({
            title: record.title,
            discription: record.discription,
            skills: record.skills,
            budget: record.budget
        });
    };

    const handleSave = async (record) => {
        try {
            const updatedTransaction = form.getFieldsValue();
            const res = await fetch(`/projects/${record._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTransaction),
            });

            if (res.status === 200) {
                
                alert("Updated successfully")
                setEditable(null);
                getAllTransactions();
            } else {
                console.log(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = () => {
        setEditable(null);
    };

    // get values
    const getAllTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const res = await fetch('/projects', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }, { userid: user._id })
            const data = await res.json();
            console.log(data)
            setallTransactions(data)


            if (res.status === 200) {
                console.log("successful")

            } else {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log("err " + err)



        }

    }
    useEffect(() => {
        getAllTransactions();

    }, [])


    // delete values
    const handleDelete = async (record) => {
        try {
            const res = await fetch(`/projects/${record._id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }, { transactionId: record._id });

            if (res.status === 200) {
                const data = await res.json();
                alert("Deleted successfully")
                navigate('/ManageExpense')
            } else {
                console.log(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
       
        {
            title: 'title',
            dataIndex: 'title'
        },
        {
            title: 'discription',
            dataIndex: 'discription',
        },
        {
            title: 'skills',
            dataIndex: 'skills',

        },
        {
            title: 'budget',
            dataIndex: 'budget',

        },
       
        {
            title: 'Actions',
            render: (text, record) => <div className='flex cursor-pointer'> <FaEdit onClick={() => handleEdit(record)} /><div className="group">
                <p className=" group-hover:text-blue-500"><MdDelete onClick={() => { handleDelete(record) }} /></p>
                <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Delete</p>
            </div>
                {editable === record._id && (
                    <div>
                        {/* Your form for editing, including input fields for each property */}
                        <button onClick={() => handleEdit(record)}>Save</button>
                        <button onClick={() => setEditable(null)}>Cancel</button>
                    </div>
                )}

            </div>,
            title: 'Actions',
            render: (text, record) => <div className='flex cursor-pointer'>
                {editable !== record._id ? (
                    <FaEdit onClick={() => handleEdit(record)} />
                ) : (
                    <Form
                        form={form}
                        initialValues={{
                            title: record.title,
                            discription: record.title,
                            skills: record.skills,
                            budget: record.budget,
                            
                        }}
                        onFinish={() => handleSave(record)}
                    >
                        {/* Your update form fields go here */}
                        <div className=''>
                            <Form.Item name="title">
                                <Input />
                            </Form.Item>
                            <Form.Item name="discription">
                                <Input />
                            </Form.Item>
                            <Form.Item name="skills">
                                <Input />
                            </Form.Item>
                            <Form.Item name="budget">
                                <Input />
                            </Form.Item>
                           
                        </div>
                      
                        <Form.Item>
                            <Button type="link" htmlType="submit">Save</Button>
                            <Popconfirm title="Sure to cancel?" onConfirm={handleCancel}>
                                <Button type="link">Cancel</Button>
                            </Popconfirm>
                        </Form.Item>
                    </Form>
                )}
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                    <MdDelete />
                </Popconfirm>
            </div>

        }
    ];




    return (
        <>
            {updateForm && (
                <div>
                   
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setUpdateForm(null)}>Cancel</button>
                </div>
            )}
           <div className='Table'>
            <Form form={form} component={false}>
                <div className='project-listing'>
                    <Table 
                        dataSource={allTransactions} 
                        columns={columns} 
                        scroll={{ x: true }} // Enable horizontal scrolling
                    />
                </div>
            </Form>
        </div>



        </>
    )
}

export default ManageProjects



