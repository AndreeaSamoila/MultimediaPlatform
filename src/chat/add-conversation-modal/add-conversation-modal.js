import React from 'react';
import './add-conversation-modal.css'

class AddConversationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            conversationName: ''
        };

        this.closeModal = props.close;
    }

    componentDidMount() {
        let user = this.props.fullName;
        if (!user)
            user = 'Anca Ina';

        const chatUrl = 'https://localhost:5001/api/';

        fetch(chatUrl + 'users', {headers: {
            'Content-Type': 'application/json',
            'Authorisation': user
        }}).then(response => response.json())
        .then(result => this.setState({users: result}));
    }

    render() {
        const usersSelect = [];
        const users = this.state.users || [];

        users.forEach(user => {
            usersSelect.push(
                <option value={user.email} onClick={(e) => {
                    user.selected = e.target.selected;
                    this.setState({users: [...users]});
                }}>
                    {user.name}
                </option>
            )
        });
        console.log('Selected', users.filter(u => u.selected));
        return (
            <div class="modal" tabindex="1">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Creaza o noua conversatie</h5>
                        <button type="button" class="btn-close" aria-label="Close" onClick={() => this.closeModal()}></button>
                    </div>
                    <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="conversationName" class="form-label">Nume</label>
                            <input type="text" class="form-control" id="conversationName" aria-describedby="conversationNameDesc" value={this.state.conversationName}  onChange={e => this.setState({ conversationName: e.target.value })}/>
                            <div id="conversationNameDesc" class="form-text">Daca campul este lasat gol, numele converatiei va fi completat automat cu numele participantilor concatenati</div>
                        </div>
                        <div class="mb-6">
                            <label for="conversationUsers" class="form-label">Participanti</label>
                            <select
                                class="form-select"
                                multiple
                                aria-label="Selecatere participanti"
                                id="conversationUsers"
                            >
                                {usersSelect}
                            </select>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={() => this.closeModal()}>Inchide fereastra</button>
                        <button type="button" class="btn btn-primary" onClick={() => this.saveConversation()}>Salevaza modificarile</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    saveConversation() {

        const participants = this.state.users.filter(u => u.name && u.selected)
                        .map(u => u.name);
        console.log('Participants0', participants);
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
  }

export default AddConversationModal;
