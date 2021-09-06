import Dashboard from './dashboard/Dashboard';
import Cursuri from './courses/Cursuri';
import AppBar from './dashboard/AppBar';
import React from 'react';
import Drawerr from './Drawer';
import Create from './account/Create';
import Login from './account/Login';
import MyAccount from './account/MyAccount';
import ClaudiaVisan from './pagesCourses/ClaudiaVisan';
import Chat from './chat/Chat';
import VasileIon from './pagesCourses/VasileIon';
import AncaIna from './pagesCourses/AncaIna';
import IonPopescu from './pagesCourses/IonPopescu';
import LucaPetre from './pagesCourses/LucaPetre';
import SorinIordan from './pagesCourses/SorinIordan';
import MateiPopa from './pagesCourses/MateiPopa';
import LiviaManole from './pagesCourses/LiviaManole';
import BiancaVilsanescu from './pagesCourses/BiancaVilsanescu';
import VictorBucur from './pagesCourses/VictorBucur';
import AnaMeroiu from './pagesCourses/AnaMeroiu';
import SnackbarW from './utils/SnackbarW';
import asyncR from "./utils/async";


const cast = {
    1: 'Luni',
    2: 'Marti',
    3: 'Miercuri',
    4: 'Joi',
    5: 'Vineri',
    6: 'Sambata',
    7: 'Duminica',
};
class App extends React.Component {

    // const [isLoggedIn, setLogged] = useState(false);

    // const [page, setPage] = useState('dashboard');
    constructor(props) {
        super(props);

        this.state = {
            page: 'dashboard',
            isDrawerOpen: false,
            email: '',
            fullName: '',
            idUtilizator: '',
            tip: '',
            snackbarMessage: '',
        };
        const storedId = localStorage.getItem('idUtilizator');
        const storedEmail = localStorage.getItem('email');
        const storedFullName = localStorage.getItem('fullName');
        if (storedEmail) {
            this.state.email = storedEmail;
        }
        if (storedFullName) {
            this.state.fullName = storedFullName;
        }
        if (storedId) {
            this.state.idUtilizator = storedId;
            // setInterval(this.checkAndSendMeetingNotification, 3000)
        }

    }

    render() {

        const {page, isDrawerOpen, email, fullName, idUtilizator, snackbarMessage} = this.state;

        // destructurare, presupune asignarea variabilelor
        // care au acelasi nume ca si cheie
        //din state si au valoarea de la acea cheie din state

        return <div>
            <AppBar
                openDrawer={this.openDrawer}
                changePage={this.changePage}
                email={this.state.email}
                page={page}
            />

            <Drawerr
                isOpen={isDrawerOpen}
                closeDrawer={this.closeDrawer}
                changePage={this.changePage} //numele parametrului ce va fi pasat in props catre copil ( drawer)
                //acestui parametru ii atribui valoarea this.changePage, care este
                //o referinta la functia din interiorul clasei
            />



            <SnackbarW variant="success" onClose={this.handleCloseSnackbar} open={snackbarMessage} message={snackbarMessage} />



            {page === 'dashboard' && <Dashboard changePage={this.changePage} isLogged={Boolean(email)}/>}
            {page === 'courses' &&
            <Cursuri changePage={this.changePage} idUtilizator={idUtilizator} openSnackbar={this.openSnackbar}/>}
            {page === 'createaccount' && <Create changePage={this.changePage}/>}
            {page === 'login' && <Login changePage={this.changePage} setUserInfo={this.setUserInfo}/>}
            {page === 'account' && <MyAccount email={email} idUtilizator={idUtilizator} fullName={fullName}/>}
            {page === 'chat' && <Chat fullName={fullName} userId={idUtilizator}/>}
            {page === 'claudiavisan' && <ClaudiaVisan changePage={this.changePage}/>}
            {page === 'vasileion' && <VasileIon changePage={this.changePage}/>}
            {page === 'ancaina' && <AncaIna changePage={this.changePage}/>}
            {page === 'ionpopescu' && <IonPopescu changePage={this.changePage}/>}
            {page === 'lucapetre' && <LucaPetre changePage={this.changePage}/>}
            {page === 'soriniordan' && <SorinIordan changePage={this.changePage}/>}
            {page === 'mateipopa' && <MateiPopa changePage={this.changePage}/>}
            {page === 'liviamanole' && <LiviaManole changePage={this.changePage}/>}
            {page === 'biancavilsanescu' && <BiancaVilsanescu changePage={this.changePage}/>}
            {page === 'victorbucur' && <VictorBucur changePage={this.changePage}/>}
            {page === 'anameroiu' && <AnaMeroiu changePage={this.changePage}/>}

        </div>

    }

    changePage = (page) => {
        this.setState({
            page
        });
    };

    openDrawer = () => {
        this.setState({isDrawerOpen: true});
    };

    closeDrawer = () => {
        this.setState({isDrawerOpen: false});
    };

    setUserInfo = (email, fullName, idUtilizator) => {
        this.setState({email, fullName, idUtilizator});
        localStorage.setItem('email', email);
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('idUtilizator', idUtilizator);
    };

    openSnackbar = (message) => {
        this.setState({snackbarMessage: message});
    };

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({snackbarMessage: ''});
    };



    checkAndSendMeetingNotification = () => {
        asyncR('/getMeetings', {userId: this.state.idUtilizator}, (error, res) => {

            if (!error) {

                // The response from server is of type string
                // We need to parse it as javascript array
                const meetings = JSON.parse(res);

                for (const meeting of meetings) {
                    const currentDate = new Date();
                    const meetDay = Number(meeting.ZiuaProgramata);
                    const currentHour = Number(currentDate.getHours());
                    const hour = Number(meeting.OraProgramata.split(':')[0]);
                    const isNotified = meeting.Notificat;
                    // console.log('Hour', hour, currentHour, currentHour >= hour - 1);

                    if (meetDay === Number(currentDate.getDay()) && currentHour >= hour - 1 && !isNotified) {
                        asyncR('/sendMeetingEmail', {
                            email: this.state.email,
                            userId: this.state.idUtilizator,
                            conversationName: meeting.NumeConversatie,
                            day: cast[meetDay],
                            hour
                        }, (error, res) => {

                            if (!error) {
                                console.log(res);

                            } else {
                                console.log(res);
                            }
                        });
                    }
                }

            } else {
                // setError('Eroare')
            }
        });
    }

}

export default App;
