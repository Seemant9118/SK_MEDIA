import React, { useEffect, useRef, useState } from 'react'
import './chat.css';
import { useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequest';
import Conversation from '../../components/Conversation/Conversation';
import { Link } from 'react-router-dom';
import { UilSetting } from '@iconscout/react-unicons';
import Noti from '../../img/noti.png';
import Home from '../../img/home.png';
import Comment from '../../img/comment.png'
import Chatbox from '../../components/Chatbox/Chatbox';
import { io } from 'socket.io-client'

const Chat = () => {
    const socket = useRef();
    const { user } = useSelector((state) => state.authReducer.authData)

    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentchat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [recieveMessage, setRecieveMessage] = useState(null);

    // Get the chat in chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data)
            } catch (err) {
                console.log(err)
            }
        }
        getChats()
    }, [user._id])

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io('http://localhost:8800');
        socket.current.emit("new-user-add", user._id);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    // send message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    // recive message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            setRecieveMessage(data);
        });
    }, []);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member)=> member !== user._id)
        const online = onlineUsers.find((user)=>user.userId === chatMember)
        return online? true : false;
    }

    return (
        <div className='Chat'>
            {/* Left Side */}
            <div className="Left-side-chat">
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div key={chat.id} onClick={() => setCurrentchat(chat)}>
                                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className="navIcons">
                        <Link to='../home'><img src={Home} alt="" /></Link>
                        <UilSetting />
                        <img src={Noti} alt="" />
                        <Link to='../chat'><img src={Comment} alt="" /></Link>
                    </div>
                </div>
                {/* Chat body */}
                <Chatbox className="chatbox" chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
            </div>
        </div>
    );
};

export default Chat;
