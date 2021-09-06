import React from 'react';
import {HubConnectionBuilder} from '@microsoft/signalr';
import './chat.css';
import AddConversationModal from './add-conversation-modal/add-conversation-modal';
import VideoModal from './video-modal/video-modal';
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import {URL, URL_DOTNET} from "../utils/CONSTANTS";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations: [],
            selectedConversationId: '',
            messages: [],
            messageText: '',
            showConversationModal: false,
            showVideoModal: false
        };
    }

    componentDidMount() {
        let user = this.props.fullName;
        if (!user)
            user = 'Anca Ina';

        console.log(user);

        this.reloadConversations(user);

        const chatHubUrl = 'https://localhost:5001/hub/';

        const newConnection = new HubConnectionBuilder()
            .withUrl(chatHubUrl)
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(() => {
                newConnection.on('messageReceived', message => {
                    let user = this.props.fullName;
                    if (!user)
                        user = 'Anca Ina';

                    if (message.sender === user || message.conversationId !== this.state.selectedConversationId)
                        return;

                    const messages = this.state.messages;
                    messages.push(message);

                    this.setState({messages: messages});
                });
            });

    }

    render() {
        let user = this.props.fullName;
        if (!user)
            user = 'Anca Ina';

        console.log(user);

        const {selectedConversationId} = this.state;
        const convs = this.state.conversations;
        const convItems = [];

        if (convs && convs.length > 0)
            for (const conv of convs) {
                let clsName = 'btn';

                if (selectedConversationId === conv.id)
                    clsName += ' btn-primary';
                else
                    clsName += ' btn-outline-primary'

                const item =
                    (
                        <button type="button" className={clsName}
                                onClick={() => this.openChat(conv.id)}
                                key={conv.id}>
                            <p>{conv.name}</p>
                            <p>{conv.text}</p>
                        </button>
                    );
                convItems.push(item);
            }

        const msgs = this.state.messages;
        const msgItems = [];

        if (msgs && msgs.length > 0) {
            for (const msg of msgs) {
                let cls = 'message col-md-12 ';

                cls += msg.isMine ? 'mine ' : '';

                const item =
                    (<div className="msgWrap row">
                        <div key={msg.id} className={cls}>
                            <div className="bubble">
                                <p className="name">{msg.sender}: </p>
                                <p className="text">{msg.text}</p>
                            </div>
                        </div>
                    </div>);

                msgItems.push(item);
            }
        }

        let clsMessages = 'messages container-fluent ';
        const selConv = selectedConversationId && convs.find(c => c.id === selectedConversationId);

        clsMessages += selConv && selConv.participants.length <= 2
            ? '' //'hide-sender'
            : '';

        return (
            <div className="back">
                {this.state.showConversationModal &&
                <AddConversationModal close={refresh => this.toggleConversationModal(refresh)} user={user}/>}

                {this.state.showVideoModal && selectedConversationId &&
                <VideoModal close={this.toggleVideo} user={user} conversationId={selectedConversationId}/>}

                <div className="chats">
                    <button type="button" className="btn btn-primary add"
                            onClick={() => this.toggleConversationModal()}> +
                    </button>
                    <h3><b>Conversații: {convs.length}</b></h3>
                    <div className="btn-group-vertical list" role="group">
                        {convItems}
                    </div>
                </div>
                <div className={clsMessages}>
                    <div className="row">
                        <div className="col-md-10">
                            <h3><b>{selConv && selConv.name}</b></h3>
                        </div>
                        <div className="">

                            <button type="button"
                                    className="btn btn-outline-info video-call-button"
                                    aria-label="Call"
                                    disabled={!selectedConversationId}
                                    onClick={this.toggleVideo}>
                                <b>Apeleaza</b>
                            </button>
                        </div>
                    </div>

                    <div className="fndal">

                        {!!selectedConversationId &&
                        <IconButton onClick={this.deleteConversation} className="delConv">
                            <Delete/>
                        </IconButton>}

                        <div className="row">
                            <div className="col-md-12">
                                <div className="container-fluid message-items">
                                    {msgItems}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" value={this.state.messageText}
                                       onChange={e => this.setState({messageText: e.target.value})}/>
                                <button onClick={() => this.sendMessage()}> Trimite</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }

    openChat(conversationId) {
        this.setState({selectedConversationId: conversationId, messages: []});

        let user = this.props.fullName;
        if (!user)
            user = 'Anca Ina';

        const chatUrl = URL_DOTNET;

        fetch(chatUrl + 'messages/' + conversationId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorisation': user
            }
        }).then(response => response.json())
            .then(result => this.setState({messages: result}));
    }

    sendMessage() {
        if (!this.state.messageText)
            return;

        const msg = {
            text: this.state.messageText
        };

        const chatUrl = URL_DOTNET;

        let user = this.props.fullName;
        if (!user)
            user = 'Anca Ina';

        fetch(chatUrl + 'messages/' + this.state.selectedConversationId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorisation': user
            },
            body: JSON.stringify(msg)
        })
            .then(() => {
                const messages = this.state.messages;

                messages.push({
                    isMine: true,
                    conversationId: this.state.selectedConversationId,
                    text: this.state.messageText,
                    sender: user
                });

                this.setState({messageText: '', messages: messages});
            });
    }

    reloadConversations(user) {
        const chatUrl = URL_DOTNET;

        fetch(chatUrl + 'conversation', {
            headers: {
                'Content-Type': 'application/json',
                'Authorisation': user
            }
        }).then(response => response.json())
            .then(result => this.setState({conversations: result}));
    }

    toggleConversationModal(refresh) {
        if (refresh) {
            let user = this.props.fullName;
            if (!user)
                user = 'Anca Ina';

            this.reloadConversations(user);
        }

        this.setState({showConversationModal: !this.state.showConversationModal});
    }

    toggleVideo = () => {
        if (!this.state.selectedConversationId)
            return;

        this.setState({showVideoModal: !this.state.showVideoModal});
    }

    deleteConversation = () => {
        const {selectedConversationId} = this.state;
        if (!selectedConversationId) {
            return;
        }
        const currentConv = this.state.conversations.find(c => c.id === selectedConversationId)

        fetch(URL + '/leaveConversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.props.userId,
                conversationId: selectedConversationId,
                conversationName: currentConv.name,
            })
        })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('Err', res);

                } else {
                    const conversations = [...this.state.conversations];
                    const newConversations = conversations.filter(c => c.id !== selectedConversationId);

                    this.setState({
                        conversations: newConversations,
                        messageText: '', messages: [],
                        selectedConversationId: '',
                    });
                }
            })
            .catch((err) => {
                console.log('Error', err)
            })
    }
}

export default Chat;
