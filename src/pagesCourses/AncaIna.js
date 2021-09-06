import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import asyncR from '../utils/async';
import logo1 from "../assets/1.PNG";
import logo2 from "../assets/2.PNG";
import logo3 from "../assets/3.PNG";
import logo4 from "../assets/4.PNG";
import logo5 from "../assets/5.PNG";
import background from "../assets/fundal.jpg";

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        width: 400,
        padding: 30,
    },
    continut: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        padding: '20px',
        width: '70%',
        fontSize: '20px',
        //background: 'white',
        color: 'black',
        margin: '25px 50px 75px 100px',


    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        fontSize: '24px',
        margin: '5px',
        textAlign: 'center',

    },
    row: {
        display: 'flex',
        fontSize: '23px',
    },
    column: {
        flexGrow: 1,
        boxShadow: '0 4px 8px 0 rgba(0.2, 0.2, 0.2, 0.2), 0 6px 20px 0 rgba(0.19, 0, 0, 0.19)',
        display: 'inline',
        padding: '40px',
        textAlign: 'center',
    },
    descriere: {
        textIndent: '50px',
        textAlign: 'justify',
        letterSpacing: '2px',
        border: '1px 1px solid gray',
        marginBlockStart: '0em',
        marginBlockEnd: '0em',
        marginInlineStart: '2px',
        marginInlineEnd: '2px',
        boxShadow: '0 4px 8px 0 rgba(0.2, 0.2, 0.2, 0.2), 0 6px 20px 0 rgba(0.19, 0, 0, 0.19)',
        display: 'block',
        fontSize: '17px',
        padding: '40px 40px 40px 40px',
    },

}


class AncaIna extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }

        const afisResources = () => {
            asyncR('/getResources', {numeProfesor: 'Anca Ina'}, (error, res) => {

                if (res) {
                    //   console.log(res);

                    // The response from server is of type string
                    // We need to parse it as javascript array
                    this.setState({ list: JSON.parse(res) })

                } else {
                    // setError('Eroare')
                }
            })
        }

        afisResources();
    }
    render() {
        const { list } = this.state;
        console.log('List', list);
        const { classes, changePage } = this.props;

        const switchToDashboard = () => {
            changePage('dashboard');
        }

        return (

            <div className={classes.container}>
                <div className="container">
                    <div className={classes.descriere}>
                        <div className={classes.titlu}>
                            <h1>Informații despre cursul de Limba si Literatura Romana</h1>
                            <br/>
                        </div>
                        <p>Cursul de Limba Romana se adreseaza elevilor de gimnaziu si este structurat pe doua paliere:
                            Modulul de Gramatica si Modulul de Literatura</p>
                        <h1>Gramatica</h1>
                        <br/>

                        <p>Modulul de gramatica este conceput in functie de nevoile fiecaruia;
                            elevii vor primi atat exercitii comune, cat si personalizate.
                            Este vorba de un curs practic, in cadrul caruia vom lucra multe exercitii,
                            bineinteles nu inainte de a ne asigura ca toti cursantii stapanesc capitolele
                            teoretice necesare. Pentru dinamica, cursul va fi presarat cu jocuri specifice,
                            ne vor ajuta sa asimilam si sa progresam, fara sa ignoram capitolul distractie  </p>
                        <h1>Cum va decurge cursul?</h1>
                        <br/>
                        <p>La inceputul fiecarei sesiuni, in functie de tema zilei,
                            profesorul explica notiunile teoretice necesare. Copiii primesc apoi
                            o fisa de lucru, pe care trebuie sa o rezolve intr-un anumit timp, dupa care analizeaza impreuna cu profesorul raspunsurile, acesta intervenind cu informatii suplimentare la nevoie.
                            In functie de nevoi, ne vom ocupa si de temele elevilor.</p>
                        <h1>Literatura</h1>
                        <br/>
                        <p>In cadrul Modulului de Literatura ne propunem sa ii cunoastem impreuna pe cei
                            mai importanti scriitori romani. Vom calatori in timp si vom descoperi lumi
                            fascinante. Satul lui Creanga, infatisat ca centru sacru al universului,
                            mirifica a lume a miturilor, ritualurilor și simbolurilor pusa pe hartie
                            de Mircea Eliade, revolutiile limbajului poetic conduse de Eminescu,
                            Arghezi, Nichita Stanescu … sunt cateva exemple din universul infinit al literaturii.
                            Copiii nu vor cunoaste numai niste carti, ci și oameni si viziuni diferite.</p>
                        <p>Pentru a finaliza cursul, veți primi toate materialele și programele software necesare,
                            iar taxa de școlarizare va putea fi rambursată numai după ce ați obținut primul loc de muncă - deci
                            nu există nimic în calea obținerii acestuia. </p>
                        <br/>
                        <h1>Ce ne propunem sa facem in cadrul cursului?</h1>

                        <br/>
                        <p>Citim impreuna fragmente dintr-o opera literara, prezentam contextul
                            in care a fost scrisa opera, detalii despre autor, apoi lucram exercitii
                            pe baza textului. Cea mai mare parte a exercitiilor se va baza pe intelegerea
                            textului. Explicam structuri si expresii, lucram cu regionalisme si arhaisme
                            si verificam prin
                            exercitii asimilarea textului si a structurilor de limba.</p>
                        <p>Va exista si o zona de creatie. Pornind de la diverse teme pe care le studiem,
                            elevii vor scrie propiile texte, pe care le vom citi si discuta impreuna.</p>
                    </div>

                </div>


                <div className={classes.content}>

                    <div className={classes.column}>
                        <h1>Ce îți oferim?</h1>
                        <br/>
                        <div className={classes.row}>
                            <img src={logo1} alt="Logo" />
                            <br/>
                            <h>Folosește platforma pentru a participa la o ședință de curs.</h>
                            <p>In cadrul cursului ti se vor explica notiuni generale ce ar trebui cunoscute
                                de orice elev la aceasta materie. </p>
                            <p>Vei afla noutati in materie de concursuri si alte activitati educative in scopul
                                dezvoltarii tale.</p>



                        </div>

                        <div className={classes.row}>
                            <img src={logo2} alt="Logo" />
                            <p>In timpul cursurilor ti se vor da diverse teme pentru a-ți exersa noțiunile.</p>
                            <p>Te poti alatura clubului de lectura daca iubesti sa citesti. </p>
                            <p>Intra in comunitatea noastra si interactioneaza direct cu ceilalti elevi
                                pentru a va impartasi cunostintele.</p>

                        </div>

                        <div className={classes.row}>
                            <img src={logo3} alt="Logo" />
                            <p>Pentru a-ți ușura procesul de învățare
                                ai acces la tutorialele pe care profesorii
                                din cadrul platformei le-au verificat si considera ca sunt
                                exact ceea ce iti trebuie
                                pentru a înțelege cat mai multe lucruri folositoare.</p>
                        </div>
                    </div>
                    <br/>
                    <div className={classes.column}>
                        <h1>Ce vei învăța?</h1>
                        <br/>

                        <img src={logo4} alt="Logo" />
                        <p>Organizam cursuri interactive tocmai cu scopul existentei unei
                            comunicari directe intre elev si profesor. </p>
                        <p>Astfel, vei aprofunda notiuni pe care pana in prezent nu le-ai inteles
                            la scoala sau iti sunt neclare</p>
                        <p>Vei putea evolua in ceea ce priveste intelegerea materiei</p>
                        <p>Vei intelege notiuni atat simple, cat si mai complicate de gramatica</p>
                        <p>Tot ce trebuie sa stii despre redactarea unui text</p>

                        <br/>
                    </div>
                    <br/>
                    <div className={classes.column}>
                        <div className={classes.row}>
                            <img src={logo5} alt="Logo" />
                            <p>Ai posibilitatea de a putea sa renunta pentru moment la participarea la curs prin parasirea canalului cursului,
                                iar peste un timp te poti inregistra din nou daca doresti</p>
                            <p>In cadrul acestei platforme beneficiezi de flexibilitate</p>
                            <p>Te poti inscrie la orice curs doresti</p>
                            <p>Pentru a fi siguri ca nu uiti de participarea la curs, te vom notifica pe email inainte ca acesta sa aiba loc.</p>
                        </div>
                    </div>



                    <br/>
                    <div className={classes.column}>
                        <h1>Stiai ca...</h1>
                        <br/>
                        <p>Limba Romana este o limba indo-europeana, care face parte din grupul de limbi italice si care apartine subgrupului oriental al limbilor romanice;</p>
                        <p>Este a 5-a limba in grupul limbilor romanice, ca si numar de vorbitori (dupa spaniola, portugheza, franceza si italiana);</p>
                        <p>Mai este numita si dialectul dacoroman;</p>
                        <p>Este limba oficiala, de stat, in Romania si Rep. Moldova;</p>
                        <p>Este vorbita in total de aproximativ 28 de milioane de persoane, din care 24 de milioane o au ca si limba materna;</p>
                        <p>Exista 7 Graiuri recunoscute (Ardelenesc, Banatean, Crisean, Bucovinean, Moldovenesc, Maramuresean si Muntenesc);</p>
                        <p>Limba Romana este una din 6 limbi oficiale ale Provinciei Autonome Voivodina, Serbia;</p>
                    </div>
                    <br/>
                    <div className={classes.column}>
                        <h4>Pentru mai materiale suplimentare, puteti sa cititi de aici.</h4>
                        <h4>Va invitam sa invatati Limba si Literatura Romana alaturi de profesorii si cursantii nostri.</h4>
                    </div>
                    <br/>
                    <div className={classes.column}>
                        <h1>Dupa cateva sedinte de curs vei putea sa:</h1>
                        <br/>

                        <p>Fi capabil sa explici fara probleme cunostinte de gramatica sau
                            literatura celor de varsta ta.</p>
                        <p>Redactezi compuneri, texte expresive in urma participarii
                            la cursurile unde se vorbeste despre literatura romana.</p>
                        <p>Sa participi la concursuri de creatie literara.</p>

                    </div>

                </div>

                {list.map(resursa => (
                    <div>
                        <div className={classes.continut}>
                            <div>{resursa.TitluMaterial}</div>
                            <iframe src={resursa.CaleCatreFisier} width="800px" height="800px"> </iframe>


                        </div>

                    </div>
                ))}

                <div>
                    <Button onClick={switchToDashboard} variant='contained'>
                        <div>Mergi la pagina principala</div>
                    </Button>

                </div>
                <br/>
            </div>

        );
    }
}
export default withStyles(style)(AncaIna);
