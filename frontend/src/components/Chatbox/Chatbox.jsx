import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../api/UserReq';
import './Chatbox.css';
import { addMessage, getMessages } from '../../api/MessageRequest';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji'

const Chatbox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
    const scroll = useRef();
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");


    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    // fetching data for header 
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error)
            }
        };
        if (chat !== null) getUserData();
    }, [chat, currentUser])


    // fetching data for messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                console.log(data)
                setMessages(data);
            } catch (err) {
                console.log(err);
            }
        }
        if (chat != null) fetchMessages();
    }, [chat])


    useEffect(() => {
        if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
            setMessages([...messages, recieveMessage]);
        }
    }, [recieveMessage])

    // Send Message
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        // send message to socket server
        const recieverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({ ...message, recieverId });

        // send message to database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    // Always scroll to the last message
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior: "smooth"})
    },[messages]);

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt='' className='followerImage'
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                    <div className="name" style={{ fontSize: "0.8rem" }}>
                                        <span>{userData?.firstname} {userData?.lastname}</span>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: '95%', border: '0.1px solid #ececece' , marginTop:"20px"}} />
                        </div>

                        {/*  chatbox messages*/}
                        <div className="chat-body">
                            {messages.map((message) => (
                                <>
                                    <div ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
                                        <span>{message.text}</span>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* chat sender */}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji value={newMessage} onChange={handleChange} />
                            <div className="send-button button" onClick={handleSend}>Send</div>
                        </div>
                    </>
                )
                    : (
                        <span className='chatbox-empty-message'>Tap on a Chat to start Conversation...</span>
                    )
                }

            </div>
        </>
    )
}

export default Chatbox