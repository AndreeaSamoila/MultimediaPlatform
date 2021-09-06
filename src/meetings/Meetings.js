import React from 'react';
import asyncR from '../utils/async';


class Meetings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            meetings: []
        }
        asyncR('/getMeetings', {userId: Number(props.userId)}, (error, res) => {

            if (!error) {
                console.log(res);

                // The response from server is of type string
                // We need to parse it as javascript array
                this.setState({meetings: JSON.parse(res)});

            } else {
                // setError('Eroare')
            }
        });
    }

    render() {
        const {meetings} = this.state;
        const cast = {
            1: 'Luni',
            2: 'Marti',
            3: 'Miercuri',
            4: 'Joi',
            5: 'Vineri',
            6: 'Sambata',
            7: 'Duminica',
        };
        return <div>
            {meetings?.length ? <>
                    <h1>
                        Intalniri:
                    </h1>
                    <ul>
                        {meetings.map(m => {
                            return <li>
                                <div>NumeProfesorCurs: {m.NumeProfesorCurs}</div>
                                <br/>

                                <div>NumeCurs: {m.NumeCurs}</div>
                                <br/>

                                <div>CategorieCurs: {m.CategorieCurs}</div>
                                <br/>
                                <div>Ziua: {cast[m.ZiuaProgramata]}</div>
                                <div>Ora: {m.OraProgramata}</div>
                                <br/>
                                <br/>
                            </li>
                        })}
                    </ul>
                </> :
                <h3>
                    Nu exista intalniri active
                </h3>}
        </div>
    }

}

export default Meetings;
