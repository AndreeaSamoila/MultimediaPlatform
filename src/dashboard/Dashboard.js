import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from '@material-ui/core/Button';
import background from "../assets/coverr.jpg";
import background1 from "../assets/fundal.jpg";
import background3 from "../assets/vector.jpg";
import background4 from "../assets/devops1-1.jpg";
import background5 from "../assets/foter.jpg";
import Footer from "../footer/Footer";
import React from "react";


const useStyles = makeStyles((theme) => ({
    cover1: {
        minHeight: '300px',
        backgroundSize: 'cover',
        backgroundImage: `url(${background})`,
        color: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '160px',
        paddingBottom: '160px',
        position: 'relative',
        top: '50%',
        bottom: '50%',
        fontSize: '20px',
        content: "",
        background: 'linear-gradient(0deg,rgba(0,0,0,.85),rgba(0,0,0,.4) 60%)',
    },

    textCover: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        letterSpacing: '2px',
    },
    row: {
        display: 'flex',
        fontSize: '17px',
        letterSpacing: '2px',
    },
    flexColumn: {
        display: 'flex',
        //flexDirection: 'column',
        //alignItems: 'center',
    },
    
    column: {
        flexGrow: 1,
    },
    textCenter: {
        textAlign: 'center',
        fontSize: '18px',

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

    buton: {
        backgroundColor: '#FFFFF', /* Green background */
        border: '1px solid green', /* Green border */
        color: 'white',
        padding: '10px 28px', /* Some padding */
        cursor: 'pointer', /* Pointer/hand icon */
        float: 'center', /* Float the buttons side by side */
        fontSize: '14px',
        textDecoration: 'blink',
    },
    section: {
        backgroundImage: `url(${background1})`,
        // padding: '40px 0',
        minHeight: '550px',
        backgroundSize: 'cover',
        color: '#fff',
        // textAlign: 'center',
        // paddingTop: '160px',
        // paddingBottom: '160px',
        position: 'relative',
        // top: '50%',
        // bottom: '50%',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    titlu: {
        position: 'absolute',
        top: '8px',
        color: '#130e0a',
        textAlign: 'center',
    },
    continutShadow: {

        /*maxWidth: '100%', */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        minHeight: '300px',
        padding: '20px',
        width: '70%',
        maxWidth: 500,
        fontSize: '20px',
        background: 'white',
        color: 'black',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        boxSizing: 'border-box',
    },

    Coverr: {

        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
        backgroundColor: 'rgba(247,247,247,1)',
        marginTop: '-40px',
        padding: '30px 0',
        position: 'relative',
        minHeight: '200px',
        color: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '160px',
        paddingBottom: '160px',
        top: '50%',
        bottom: '50%',
        fontSize: '20px',
        background: `url(${background4})`,
    },

    Coverrr: {
        backgroundImage: `url(${background3})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
        backgroundColor: 'rgba(247,247,247,1)',
        marginTop: '-40px',
        padding: '30px 0',
        position: 'relative',
        minHeight: '200px',
        backgroundSize: 'cover',
        color: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '160px',
        paddingBottom: '160px',
        top: '50%',
        bottom: '50%',
        fontSize: '20px',

    },
    footerr: {
        position: 'relative',
        display: 'flex',
        minHheight: '350px',
        marginBottom: '50px',
        padding: '120px 0 100px',
        color: '#fff',
        background: 'url(../assets/dark.svg) : 50%/cover',
        alignItems: 'center',
    },
    Coverrrr: {
        backgroundImage: `url(${background5})`,
        // padding: '40px 0',
        marginBottom: '0px',
        minHeight: '550px',
        backgroundSize: 'cover',
        color: '#fff',
        // textAlign: 'center',
        // paddingTop: '160px',
        // paddingBottom: '160px',
        position: 'relative',
        // top: '50%',
        // bottom: '50%',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
cont: {
    backgroundImage:`url(${background1})`,
},

}));



function Dashboard(props) {

    const addCourse = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://127.0.0.1:3002/add_course', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // Request finished. Do processing here.
            }
        }
        xhr.send(JSON.stringify({ NumeProfesorCurs: 'Ionn', NumeCurs: 'LimbaRomana', CategorieCurs: 'Liceu' }));

    }

    const classes = useStyles();

    const switchToCreateAccount = () => {
        props.changePage('createaccount');
    }


    return (
            <div>
            <div className={classes.cover1}>
                <div className={classes.textCenter}>
                    {!props.isLogged && <p>Ai deja cont? </p>}
                    {!props.isLogged && <Button onClick={() => { props.changePage('login') }} variant='contained'>
                        <div>Autentificare</div>
                    </Button>}
                </div>
                <div className={classes.textCenter}>
                    <h1>Cursuri pentru elevi</h1>
                    <p>Învață eficient și într-un mod interactiv.</p>

                </div>
                <div >
                    <p>Îmbunătățește-ți cunoștințele cu ajutorul nostru!</p>
                    <p>Ia parte la cursuri în domeniul de interes și află tot ceea ce până în prezent ți s-a
                        părut
                        complicat și greu de înțeles.</p>

                </div>
                {!props.isLogged && <Button onClick={switchToCreateAccount} variant='contained'>
                    <div>Înscrie-te acum</div>
                </Button>}

            </div>
            <br />
            <div className={classes.cont}>
                <div className={classes.descriere}>
                    <div className={classes.textCenter}>
                    <h1>Informații despre cursuri</h1>
                    </div>
                    <br/>
                    <p>Site-ul nostru are ca si scop antrenarea elevilor in obtinerea excelentei la materiile scolare.</p>
                    <br/>
                    <p>Este lasat la libera alegere cursurile la care doriti sa participati pentru a interactiona direct
                        cu un cadru didactic ce preda materia de interes.
                        Cursurile sunt create pe principiul meditatie, insa acestea sunt gratuite si facute de profesori voluntari foarte priceputi in domeniul lor de actvitate.</p>
                    <br/>
                    <p>Grupurile sunt conduse de mentori care ajută
                    direct in dezvoltarea cunostintelor fiecărui elev și adaptează continuu curriculumul în interesul lor
                    </p>

                </div>
            </div>
            <br />
            <div className="container">
                    <div className={classes.descriere}>
                        <div className={classes.textCenter}>
                            <h1>Cand te poti inscrie la un curs? </h1>
                            <p><b>Oricand doresti</b></p>
                        </div>
                    </div>
            </div>
            <br />
            <div className="container">
                <div className={classes.descriere}>
                    <div className={classes.textCenter}>
                       <p> Cursurile noastre încep in zilele stabilite.
                    Elevii lucrează pentru o învățare practică alaturi de echipa formata din colegi, dar și independentă.
                    Educația se desfășoară conform unei metodologii de "Învățare bazată pe cunoaștere", care
                    garantează calitatea cunoștințelor dobândite de dumneavoastră.</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="container">
                <div className={classes.descriere}>
                    <div className={classes.textCenter}>
                        <p>Veți fi, de asemenea, familiarizați cu o varietate de limbaje de
                    programare și tehnologii, dar cel mai important lucru pe care dorim să-l transmitem
                    tuturor studenților noștri este abordarea autonomă a programatorului de rezolvare a problemelor.
                    Această industrie evoluează într-un ritm foarte rapid,
                    deci este foarte important să te poți instrui mai târziu în cariera ta.
                    Apoi, petrecem 6 luni în companiile partenere, timp în care vă putem oferi un stagiu de tip traineeship.</p>
                        <p>Pentru a finaliza cursul, veți primi toate materialele și programele software necesare,
                    iar taxa de școlarizare va putea fi rambursată numai după ce ați obținut primul loc de muncă - deci
                    nu există nimic în calea obținerii acestuia. </p>

                        <p>Deoarece aceasta nu este o scoală tradițională de formare, nu veți avea un
                    statut oficial de student și nu veți primi o diplomă obișnuită. Cu toate acestea,
                    în timpul studiilor noastre, vom construi o pagină electronică a profilului care arată
                    cu exactitate viitorilor angajatori ce aptitudini aveți și la ce proiecte ați lucrat.
                    Și, mai important, până la sfârșitul programului veți obține cunoștințe pe care le
                    puteți folosi cu încredere la orice loc de muncă pe poziție de junior. Veți avea experiență
                    ca și cum ați lucra cu o astfel de companie timp de un an și jumătate!</p>
                    </div>
                </div>

            </div>
            <br />
            <div className={classes.descriere}>
                <div className={classes.textCenter}>
                <div className={classes.row} >
                    <div className={classes.column}>
                        <h3>Cursuri online</h3>
                        <p>Folosește platforma pentru a te programa o ședință de curs.</p>
                        <p>Interactionează direct cu un profesor pentru a stii exact ce nu faci bine
                            în procesul tău de
                            învățare.</p>
                    </div>
                    <div className={classes.column}>
                        <h3>Exerciții</h3>
                        <p>Ai o varietate de probleme la dispoziție pentru a-ți exersa noțiunile.</p>
                        <p>Dacă nu ești sigur de un anumit răspuns, forumul iți stă la dispoziție.</p>
                    </div>
                    <div className={classes.column}>
                        <h3>Tutoriale</h3>
                        <p>Pentru a-ți ușura procesul de învățare ai acces la numeroase tutoriale care să te ajute să
                            înțelegi
                            cât mai bine ceea ce ai nevoie</p>
                    </div>
                </div>
                </div>
            </div>

            <br />
            <br />

            <div className="container2">

                <div className={classes.row}>
                        <div className={classes.column}>
                            <h3>Beneficii pentru studenți</h3>
                            <p>Folosește platforma pentru a te programa la o ședință de curs.</p>
                            <p>Interactionează direct cu un profesor pentru a stii exact ce nu faci bine în procesul tău
                            de
                            învățare. </p>
                            <p>Te poti inscrie la orice cursuri doresti</p>
                        </div>
                   
                    
                         <div className={classes.column}>
                            <h3>Interactiuni directe intre elevi si profesori</h3>
                            <p>Ai o varietate de probleme la dispoziție pentru a-ți exersa noțiunile.</p>
                            <p>La fiecare curs se vor discuta neclaritatile tuturor, deoarece un mod bun de
                            a invata este invatarea prin exemplu</p>
                        </div>
                </div>
            </div>
                <div>
                    <button className={classes.buton} onClick={addCourse}>
                        <div>Programeaza o întâlnire</div>
                    </button>
                </div>
            <br/>

                <div className={classes.section}>
                    <div className={classes.titlu}>
                        <h1>Opiniile elevilor</h1>
                    </div>
                    <div className={classes.continutShadow}>
                   <p>'Pe lângă faptul că mi-a oferit un mediu de susținere,
                       platforma a fost mai practica decât meditatiile clasice facute face to face. Am învățat
                       foarte multe cunostinte care imi lipseau
                       prin exemple pe care acum le folosesc mai departe'</p>
                    </div>
                </div>

            <Footer/>

        </div>




    );

}

export default Dashboard;
