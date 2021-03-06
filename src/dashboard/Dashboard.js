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
                    <p>??nva???? eficient ??i ??ntr-un mod interactiv.</p>

                </div>
                <div >
                    <p>??mbun??t????e??te-??i cuno??tin??ele cu ajutorul nostru!</p>
                    <p>Ia parte la cursuri ??n domeniul de interes ??i afl?? tot ceea ce p??n?? ??n prezent ??i s-a
                        p??rut
                        complicat ??i greu de ??n??eles.</p>

                </div>
                {!props.isLogged && <Button onClick={switchToCreateAccount} variant='contained'>
                    <div>??nscrie-te acum</div>
                </Button>}

            </div>
            <br />
            <div className={classes.cont}>
                <div className={classes.descriere}>
                    <div className={classes.textCenter}>
                    <h1>Informa??ii despre cursuri</h1>
                    </div>
                    <br/>
                    <p>Site-ul nostru are ca si scop antrenarea elevilor in obtinerea excelentei la materiile scolare.</p>
                    <br/>
                    <p>Este lasat la libera alegere cursurile la care doriti sa participati pentru a interactiona direct
                        cu un cadru didactic ce preda materia de interes.
                        Cursurile sunt create pe principiul meditatie, insa acestea sunt gratuite si facute de profesori voluntari foarte priceputi in domeniul lor de actvitate.</p>
                    <br/>
                    <p>Grupurile sunt conduse de mentori care ajut??
                    direct in dezvoltarea cunostintelor fiec??rui elev ??i adapteaz?? continuu curriculumul ??n interesul lor
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
                       <p> Cursurile noastre ??ncep in zilele stabilite.
                    Elevii lucreaz?? pentru o ??nv????are practic?? alaturi de echipa formata din colegi, dar ??i independent??.
                    Educa??ia se desf????oar?? conform unei metodologii de "??nv????are bazat?? pe cunoa??tere", care
                    garanteaz?? calitatea cuno??tin??elor dob??ndite de dumneavoastr??.</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="container">
                <div className={classes.descriere}>
                    <div className={classes.textCenter}>
                        <p>Ve??i fi, de asemenea, familiariza??i cu o varietate de limbaje de
                    programare ??i tehnologii, dar cel mai important lucru pe care dorim s??-l transmitem
                    tuturor studen??ilor no??tri este abordarea autonom?? a programatorului de rezolvare a problemelor.
                    Aceast?? industrie evolueaz?? ??ntr-un ritm foarte rapid,
                    deci este foarte important s?? te po??i instrui mai t??rziu ??n cariera ta.
                    Apoi, petrecem 6 luni ??n companiile partenere, timp ??n care v?? putem oferi un stagiu de tip traineeship.</p>
                        <p>Pentru a finaliza cursul, ve??i primi toate materialele ??i programele software necesare,
                    iar taxa de ??colarizare va putea fi rambursat?? numai dup?? ce a??i ob??inut primul loc de munc?? - deci
                    nu exist?? nimic ??n calea ob??inerii acestuia. </p>

                        <p>Deoarece aceasta nu este o scoal?? tradi??ional?? de formare, nu ve??i avea un
                    statut oficial de student ??i nu ve??i primi o diplom?? obi??nuit??. Cu toate acestea,
                    ??n timpul studiilor noastre, vom construi o pagin?? electronic?? a profilului care arat??
                    cu exactitate viitorilor angajatori ce aptitudini ave??i ??i la ce proiecte a??i lucrat.
                    ??i, mai important, p??n?? la sf??r??itul programului ve??i ob??ine cuno??tin??e pe care le
                    pute??i folosi cu ??ncredere la orice loc de munc?? pe pozi??ie de junior. Ve??i avea experien????
                    ca ??i cum a??i lucra cu o astfel de companie timp de un an ??i jum??tate!</p>
                    </div>
                </div>

            </div>
            <br />
            <div className={classes.descriere}>
                <div className={classes.textCenter}>
                <div className={classes.row} >
                    <div className={classes.column}>
                        <h3>Cursuri online</h3>
                        <p>Folose??te platforma pentru a te programa o ??edin???? de curs.</p>
                        <p>Interactioneaz?? direct cu un profesor pentru a stii exact ce nu faci bine
                            ??n procesul t??u de
                            ??nv????are.</p>
                    </div>
                    <div className={classes.column}>
                        <h3>Exerci??ii</h3>
                        <p>Ai o varietate de probleme la dispozi??ie pentru a-??i exersa no??iunile.</p>
                        <p>Dac?? nu e??ti sigur de un anumit r??spuns, forumul i??i st?? la dispozi??ie.</p>
                    </div>
                    <div className={classes.column}>
                        <h3>Tutoriale</h3>
                        <p>Pentru a-??i u??ura procesul de ??nv????are ai acces la numeroase tutoriale care s?? te ajute s??
                            ??n??elegi
                            c??t mai bine ceea ce ai nevoie</p>
                    </div>
                </div>
                </div>
            </div>

            <br />
            <br />

            <div className="container2">

                <div className={classes.row}>
                        <div className={classes.column}>
                            <h3>Beneficii pentru studen??i</h3>
                            <p>Folose??te platforma pentru a te programa la o ??edin???? de curs.</p>
                            <p>Interactioneaz?? direct cu un profesor pentru a stii exact ce nu faci bine ??n procesul t??u
                            de
                            ??nv????are. </p>
                            <p>Te poti inscrie la orice cursuri doresti</p>
                        </div>
                   
                    
                         <div className={classes.column}>
                            <h3>Interactiuni directe intre elevi si profesori</h3>
                            <p>Ai o varietate de probleme la dispozi??ie pentru a-??i exersa no??iunile.</p>
                            <p>La fiecare curs se vor discuta neclaritatile tuturor, deoarece un mod bun de
                            a invata este invatarea prin exemplu</p>
                        </div>
                </div>
            </div>
                <div>
                    <button className={classes.buton} onClick={addCourse}>
                        <div>Programeaza o ??nt??lnire</div>
                    </button>
                </div>
            <br/>

                <div className={classes.section}>
                    <div className={classes.titlu}>
                        <h1>Opiniile elevilor</h1>
                    </div>
                    <div className={classes.continutShadow}>
                   <p>'Pe l??ng?? faptul c?? mi-a oferit un mediu de sus??inere,
                       platforma a fost mai practica dec??t meditatiile clasice facute face to face. Am ??nv????at
                       foarte multe cunostinte care imi lipseau
                       prin exemple pe care acum le folosesc mai departe'</p>
                    </div>
                </div>

            <Footer/>

        </div>




    );

}

export default Dashboard;
