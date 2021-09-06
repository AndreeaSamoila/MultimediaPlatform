import React from 'react';
import './video-modal.css';
import { connect, createLocalTracks } from 'twilio-video';
import { jwt } from 'twilio'

class VideoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            conversationId: props.conversationId,
            conversationName: ''
        };

        this.closeModal = props.close;
        this.room = undefined;
    }

    componentDidMount() {
        let user = this.props.user;
        if (!user)
            user = 'Anca Ina';

        const chatUrl = 'https://localhost:5001/api/';

        fetch(chatUrl + 'conversation', {
            headers: {
                'Content-Type': 'application/json',
                'Authorisation': user
            }
        }).then(response => response.json())
        .then(result => { 
            let convName = this.state.conversationId;
            const conv = result.find(c => c.id === this.state.conversationId);
            
            if(conv)
                convName = conv.name;

            this.setState({conversationName: convName});
        });

        const twilioAccountSid = 'AC08724bac874aa1bf24b109485b277ed3';
        const twilioApiKey = 'SKe14bc4bfb18d6971e126c55eaea64f3b';
        const twilioApiSecret = 'u7vFuAsMXoKO7TBzbwYdbKbtdLCWO926';

        // Create an access token which we will sign and return to the client,
        // containing the grant we just created
        const token = new jwt.AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);
        token.identity = user;

        const roomName = '__room_' + this.state.conversationId;

        // Create a Video grant which enables a client to use Video 
        // and limits access to the specified Room (roomName)
        const videoGrant = new jwt.AccessToken.VideoGrant({
            room: roomName
        });

        // Add the grant to the token
        token.addGrant(videoGrant);

        const tokenJwt = token.toJwt();

        createLocalTracks({
            audio: true,
            video: { width: 640 }
          }).then(localTracks => {
            const localMediaContainer = document.getElementById('local-videos');
            localMediaContainer.appendChild(localTracks[1].attach());

            return connect(tokenJwt, {
              name: roomName,
              tracks: localTracks
            });
          }).then(room => {
            console.log(`Connected to Room: ${room.name}`);

            this.room = room;

            if(room.participants.tracks) {
                room.participants.tracks.forEach(publication => {
                    if (publication.isSubscribed) {
                    const track = publication.track;
                    document.getElementById('remote-videos').appendChild(track.attach());
                    }
                });
            }

            room.on('participantConnected', participant => {
                console.log(`Participant "${participant.identity}" connected`);
              
                participant.tracks.forEach(publication => {
                  if (publication.isSubscribed) {
                    const track = publication.track;
                    document.getElementById('remote-videos').appendChild(track.attach());
                  }
                });
              
                participant.on('trackSubscribed', track => {
                  document.getElementById('remote-videos').appendChild(track.attach());
                });
              });

            room.on('participantDisconnected', participant => {
                // Detach the local media elements
                participant.tracks.forEach(publication => {
                    if(publication.track) {
                        const attachedElements = publication.track.detach();
                        attachedElements.forEach(element => element.remove());
                    }
                });
              });
          });
    }

    render() {
        return (
            <div className="main-video-modal container-fluent">
                <div className="row">
                    <div className="col-md-11">
                        <h5>{this.state.conversationName}</h5>
                    </div>
                    <div className="col-md-1">
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => this.closeCall()}></button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12" id="local-videos"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" id="remote-videos">
                    </div>
                </div>
            </div>
        );
    }

    saveConversation() {

        const participants = this.state.users.filter(u => u.name && u.selected)
                        .map(u => u.name);

        participants.push(this.props.user);

        const conversation = {
            name: this.state.conversationName,
            participants: participants
        };

        const chatUrl = 'https://localhost:5001/api/';

        let user = this.props.fullName;
        if (!user)
            user = 'Anca Ina';

        fetch(chatUrl + 'conversation' , { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorisation': user
            },
            body: JSON.stringify(conversation)
        })
        .then(() => this.closeModal(true));
    }

    closeCall() {

        this.room.disconnect();

        this.closeModal();
    }
  }

export default VideoModal;
