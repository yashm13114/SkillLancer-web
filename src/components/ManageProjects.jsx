import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaComments, FaWhatsapp } from "react-icons/fa";
import { Table, Input, Button, Popconfirm, Form, Modal, List } from 'antd';
import { MdDelete } from "react-icons/md";
import './styles.css';

const ManageProjects = () => {
    const [allTransactions, setallTransactions] = useState([]);
    const [editable, setEditable] = useState(null);
    const [form] = Form.useForm();
    const [chatVisible, setChatVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [chatMessages, setChatMessages] = useState();
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate();

    const handleEdit = (record) => {
        setEditable(record._id);
        form.setFieldsValue({
            title: record.title,
            description: record.description,
            phonenumber: record.phonenumber,
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
                alert("Updated successfully");
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

    const getAllTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await fetch('/projects', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setallTransactions(data);

            if (res.status === 200) {
                console.log("successful");
            } else {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log("err " + err);
        }
    };

    useEffect(() => {
        getAllTransactions();
    }, []);

    const handleDelete = async (record) => {
        try {
            const res = await fetch(`/projects/${record._id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                await res.json();
                alert("Deleted successfully");
                navigate('/ManageExpense');
            } else {
                console.log(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChat = (record) => {
        setSelectedProject(record);
        setChatVisible(true);
        fetchChatMessages(record._id);
    };
    const handleSendMessage = () => {
        sendMessage();
    };
    const fetchChatMessages = async (projectId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !projectId) return;
            const res = await fetch(`/messages?senderId=${user._id}&receiverId=${projectId}`);
            const data = await res.json();
            setChatMessages(data);
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !selectedProject?._id || !newMessage) return;
            const body = {
                senderId: user._id,
                receiverId: selectedProject._id,
                message: newMessage
            };
            console.log('Sending message:', body);
            const res = await fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                console.log('Message sent successfully');
                setNewMessage('');
                await fetchChatMessages(selectedProject._id);
            } else {
                console.error('Failed to send message');
            }
        } catch (err) {
            console.error('Error sending message:', err);
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
            title: 'phonenumber',
            dataIndex: 'phonenumber'
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
            render: (text, record) => (
                <div className='flex cursor-pointer'>
                    <FaEdit onClick={() => handleEdit(record)} />

                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        <MdDelete />
                    </Popconfirm>
                    <a href={`https://api.whatsapp.com/send?phone=${record.phonenumber}&text=Hi,%20I'm%20interested%20in%20your%20project`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp />
                    </a>
                </div>
            )
        }
    ];

    return (
        <>
            <Modal
                title={`Chat with ${selectedProject ? selectedProject.userId : ''}`}
                open={chatVisible} // Use open instead of visible
                onClose={() => setChatVisible(false)} // Use onClose instead of onCancel
                footer={null}
            >
                <List
                    dataSource={Array.isArray(chatMessages) ? chatMessages : []}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta title={item.senderId} description={item.message} />
                        </List.Item>
                    )}
                />

                <Input.Search
                    placeholder="Type your message..."
                    enterButton="Send"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onSearch={handleSendMessage}
                />
            </Modal>


            <div className='Table'>
                <Form form={form} component={false}>
                    <div className='project-listing'>
                        <Table
                            dataSource={allTransactions}
                            columns={columns}
                            scroll={{ x: true }}
                        />
                    </div>
                </Form>
            </div>
        </>
    );
};

export default ManageProjects;
