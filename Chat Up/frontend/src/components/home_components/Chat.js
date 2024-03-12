import React, {useContext, useEffect, useState} from 'react'
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../../context/ChatContext";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
const Chat =()=>{

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext);

    const [friendRequestStatus, setFriendRequestStatus] = useState( '');
    const [error,setError] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3001/api/friend-requests/${currentUser.uid}/${data.user.uid}`)
            .then((response) => {
                if (response.data.status === 'pending') {
                    setFriendRequestStatus('pending')
                } else if (response.data.status === 'accepted') {
                    setFriendRequestStatus('accepted')
                } else if (response.data.status === 'rejected') {
                    setFriendRequestStatus('rejected')
                }
            })
            .catch((err) => {
                console.log(err)
                setFriendRequestStatus('waiting')
            })
    }, [currentUser.uid, data])

    const sendRequestHandler = () => {
        axios.post('http://localhost:3001/api/friend-requests', {
            fromUserId: currentUser.uid,
            toUserId: data.user.uid
        })
            .then ((response) => {
            console.log(response)
            setFriendRequestStatus('pending')
        })
            .catch((err)=>{
                console.log(err)
                setError(true)
            })
        setFriendRequestStatus('')
    }

    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="addFriend">
                    {friendRequestStatus === 'waiting' && (
                        <button id="addFriendButton" onClick={sendRequestHandler}>
                            Aggiungi agli amici
                        </button>
                    )}
                    {friendRequestStatus === 'pending' && (
                        <button id="addFriendButton" disabled>
                            Richiesta inviata
                        </button>
                    )}
                    {friendRequestStatus === 'accepted' && (
                        <button id="friendButton" disabled>
                        Amico
                        </button>
                    )}
                    {friendRequestStatus.status === 'rejected' && (
                        <button id="addFriendButton" onClick={sendRequestHandler}>
                            Aggiungi agli amici
                        </button>
                    )}
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
}
export default Chat