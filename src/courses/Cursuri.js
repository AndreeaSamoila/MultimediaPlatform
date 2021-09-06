import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';
import asyncR from '../utils/async';
import Button from '@material-ui/core/Button';
import background from '../assets/fundal-1.jpg';
import background2 from '../assets/fundal.jpg';
const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //height: '100%',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        paddingTop: '160px',
        paddingBottom: '160px',
        top: '50%',
        margin: '0px 0px 0px 0px',
        bottom: '50%',
        width: '100%',
        height: 'auto',
    },
    continutShadow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        minHeight: '300px',
        padding: '20px',
        width: '400px',
        fontSize: '20px',
        background: '#FFF',
        color: 'black',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        boxSizing: 'border-box',
        margin: '25px 50px 75px 100px',
        textAlign: 'center',
        justifyContent: 'top',
    },
    continutShadow2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '900px',
        minHeight: '400px',
         backgroundSize: 'cover',
        background: `url(${background2})`,
        padding: '20px',
        width: '1000px',
        fontSize: '20px',
        color: 'black',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        boxSizing: 'border-box',
        margin: '25px 50px 75px 100px',
        textAlign: 'center',
        justifyContent: 'bottom',

    },
    contur:{
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        boxSizing: 'border-box',
        margin: '20px 20px 20px 20px',
    }
};

const descriereCurs = {

    'Claudia Visan': 'Literatura Romana si Limba Romana este atestata si pastrata pentru prima data in scris, intr-o epistola scrisa de catre Neacsu de la Campulung, in 1521, catre Hans Benker, judele de la Brasov.\n' +
        'Literatura Romaneasca este foarte bogata, si trecand prin toate epocile gasim foarte multe opere si scriitori care au adaugat si au completat patrimoniul literar al tarii noastre.\n' +
        '\n' +
        'Gramatica constituie un ansamblu de reguli care descriu formele corecte de modificare a cuvintelor si a imbinarilor acestora in propozitii, iar literatura este o arta al carei mijloc este cuvantul scris.\n' +
        'Cea mai veche atestare a Limbii Romane, este facuta in „Palia de la Orastie” (1581).\n' +
        'Cea mai veche gramatica a limbii romane este „Gramatica rumaneasca” a lui Dimitrie Eustatievici (1757).',

    'Ana Meroiu': 'Literatura Romana si Limba Romana este atestata si pastrata pentru prima data in scris, intr-o epistola scrisa de catre Neacsu de la Campulung, in 1521, catre Hans Benker, judele de la Brasov.\n' +
        'Literatura Romaneasca este foarte bogata, si trecand prin toate epocile gasim foarte multe opere si scriitori care au adaugat si au completat patrimoniul literar al tarii noastre.\n' +
        '\n' +
        'Gramatica constituie un ansamblu de reguli care descriu formele corecte de modificare a cuvintelor si a imbinarilor acestora in propozitii, iar literatura este o arta al carei mijloc este cuvantul scris.\n' +
        'Cea mai veche atestare a Limbii Romane, este facuta in „Palia de la Orastie” (1581).\n' +
        'Cea mai veche gramatica a limbii romane este „Gramatica rumaneasca” a lui Dimitrie Eustatievici (1757).',

    'Anca Ina': 'Impreuna elaboram strategii pentru remedierea lipsurilor constatate în urma discutiilor din cadrul cursurilor. Prin munca independenta, in grupuri de elevi, cu o atenta indrumare si corectare din partea profesorului, matematica poate fi accesibila si chiar placuta.\n' +
        '\n' +
        'Daca vreti sa aflati mai multe puteti da click pe ACCESEAZA CURSUL.',

    'Bianca Vilsanescu': 'Engleza este o limba folosita intensiv ca limba secundara sau ca limba oficiala pe intreg globul. Este limba dominanta pe plan international in domeniile comunicatiei, stiintei, afacerilor, aviatiei, divertismentului, radioului si diplomatiei.\n' +
        '\n' +
        'Cunoasterea limbii engleze este necesara pentru angajarea in anumite domenii, profesii sau ocupatii, sau atunci cand calatoresti. De retinut este faptul ca, peste un miliard de oameni din intreaga lume vorbesc engleza macar la un nivel de baza. Engleza este de asemenea una din cele sase limbi oficiale ale Natiunilor Unite.\n' +
        '\n' +
        'Limba Engleza face parte din familia limbilor indoeuropene, si din subramura limbilor vest germanice, mai exact sectiunea de limbi anglo-saxone, care erau vorbite in nord-vestul Germaniei.',

    'Ion Popescu': 'Literatura Romana si Limba Romana este atestata si pastrata pentru prima data in scris, intr-o epistola scrisa de catre Neacsu de la Campulung, in 1521, catre Hans Benker, judele de la Brasov.\n' +
        'Literatura Romaneasca este foarte bogata, si trecand prin toate epocile gasim foarte multe opere si scriitori care au adaugat si au completat patrimoniul literar al tarii noastre.\n' +
        '\n' +
        'Gramatica constituie un ansamblu de reguli care descriu formele corecte de modificare a cuvintelor si a imbinarilor acestora in propozitii, iar literatura este o arta al carei mijloc este cuvantul scris.\n' +
        'Cea mai veche atestare a Limbii Romane, este facuta in „Palia de la Orastie” (1581).\n' +
        'Cea mai veche gramatica a limbii romane este „Gramatica rumaneasca” a lui Dimitrie Eustatievici (1757).',

    'Livia Manole':'Analiza matematică este acea ramură a matematicii care studiază funcțiile, limitele, derivatele și aplicațiile lor (cuvânt derivat din franceză analyse),' +
        ' precum și operatori de funcții, spații și categorii algebrice de spații vectoriale de funcții matematice. Mai specific dar într-o descriere totuși generală se poate spune și că analiza matematică se ocupă cu studiul entităților matematice (în special, funcții și operatori de funcții) din punct de vedere al variației lor, sau al unor proprietăți generale sau specifice de regularitate.',

    'Luca Petre':'Algebra constituie o ramură a matematicii, derivată din aritmetică, ca o generalizare sau extensie a acesteia din urmă. Are ca domeniu studiul regulilor operațiilor și relațiilor matematice, a conceptelor derivate din acestea, cum ar fi: polinoame, ecuații, structuri algebrice.' +
        'Algebra elementară este studiată începând cu învățământul gimnazial, când este introdus conceptul de variabilă matematică ce ține locul numărului. Operațiile care se efectuează cu aceste variabile au regulile asemănătoare cu cele efectuate cu numere, dar sunt mai generale. Algebra modernă o include pe cea elementară și studiază operațiile în cazul general, când în locul numerelor apar simboluri,' +
        ' urmărind câteva reguli care pot să fie diferite de cele aplicate numerelor, exemplu fiind algebra vectorială sau matriceală sau în cazul studiului structurilor algebrice',

    'Matei Popa':'Chimia joaca un rol important regasindu-se in majoritatea produselor din viata de zi cu zi, pornind de la cele alimentare, pana la produsele cosmetice, detergenti, etc. Privind planul chimiei, desi nu puteau întelege ce au realizat, oamenii preistorici descoperisera imbalsamarea mumiilor, arte ale tamaduirii, iar alchimistii se iveau cu teorii si studii noi.\n' +
        '\n' +
        'Chimia nu este doar o materie de studiu scolar, este, in primul rand, materia din jurul tau: aer, apa, sol, plante, animale.\n' +
        '\n' +
        'Chimia este stiinta care ne ajuta sa intelegem si care sunt legile care guverneaza viata si cele care au construit lumea.\n' +
        '\n' +
        'Compozitia unui parfum, a unui sapun sau crema de fata, o tesatura, combustibil sau pur si simplu pentru a ne feri de substanțele nocive…. acestea sunt doar o parte dintre raspunsurile la intrebarea: “De ce invatam chimia?”',

    'Sorin Iordan':'Fizica dezvaluie idei fascinante sub aspect filozofic. Faptul ca parte din atomii care ne constituie au fost creati in stele indepartate este greu sa nu fascineze orice pamantean. Faptul ca uriasul univers in care existam isi are originea intr-un punct de densitate infinita, de asemenea, uluieste si fascineaza. Ciudateniile mecanicii cuantice, cum ar fi faptul ca un foton este si unda, si particula, in functie de modul in care-l masuram, de asemenea, starnesc uimirea. Vrei sa nu mai fie o enigma fenomenele? Te asteptăm in centrele noastre.',

    'Vasile Ion':'Engleza este o limba folosita intensiv ca limba secundara sau ca limba oficiala pe intreg globul. Este limba dominanta pe plan international in domeniile comunicatiei, stiintei, afacerilor, aviatiei, divertismentului, radioului si diplomatiei.\n' +
        '\n' +
        'Cunoasterea limbii engleze este necesara pentru angajarea in anumite domenii, profesii sau ocupatii, sau atunci cand calatoresti. De retinut este faptul ca, peste un miliard de oameni din intreaga lume vorbesc engleza macar la un nivel de baza. Engleza este de asemenea una din cele sase limbi oficiale ale Natiunilor Unite.\n' +
        '\n' +
        'Limba Engleza face parte din familia limbilor indoeuropene, si din subramura limbilor vest germanice, mai exact sectiunea de limbi anglo-saxone, care erau vorbite in nord-vestul Germaniei.',

    'Victor Bucur':'Este o limba indoeuropeana si face parte din familia limbilor romanice, mai exact din grupul limbilor galoromanice.\n' +
        'A cunoaste limba franceza poate ajuta la obtinerea unei burse de studiu intr-una din universitatile din Franta. Aceste universitati sunt printre cele mai bune din Uniunea Europeana si din lume. De asemenea, multe alte universitati de top au ca cerinta de admitere cunoasterea a cel putin doua limbi straine.',







};

class Cursuri extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };

        asyncR('/getCourses', {}, (error, res) => {

            if (!error) {
                console.log(res);

                // The response from server is of type string
                // We need to parse it as javascript array
                this.setState({list: JSON.parse(res)});

            } else {
                // setError('Eroare')
            }
        });

    }

    enroll = (curs) => () => {
        //CodUtilizator, NumeProfesorIntalnire, CodConversatie
        const idUtilizator = this.props.idUtilizator;
        const numeConversatie = curs.NumeCurs + ' - ' + curs.CategorieCurs;
        const numeProfesor = curs.NumeProfesorCurs;
        asyncR('/addMeet', {numeConversatie, idUtilizator, numeProfesor}, (error, res) => {

            if (!error) {
                console.log(res);
                this.props.openSnackbar('Te-ai inregistrat cu succes la cursul: ' + numeConversatie);
                this.props.changePage('account')
                // The response from server is of type string
                // We need to parse it as javascript array

            } else {
                // setError('Eroare')
            }
        });
    };

    render() {
        const {list} = this.state;
        const {classes, idUtilizator} = this.props;

        const switchToPage = (pagina) => () => { //primeste un parametru si returneaZA o alta functie care poate fi flosita pe onclick
            this.props.changePage(pagina);
        };
        const cast = {
            1: 'Luni',
            2: 'Marti',
            3: 'Miercuri',
            4: 'Joi',
            5: 'Vineri',
            6: 'Sambata',
            7: 'Duminica',
        };

        return (
            <div className={classes.contur}>
            <div className={classes.container}>
                {list.map(curs => (
                    <div>
                        <div className={classes.continutShadow2}>
                        <div className={classes.continutShadow}>
                            <div>Nume Profesor Curs: {curs.NumeProfesorCurs}</div>
                            <br/>

                            <div>Nume Curs: {curs.NumeCurs}</div>
                            <br/>

                            <div>Categorie Curs: {curs.CategorieCurs}</div>
                            <br/>
                            <div>Ziua: {cast[curs.ZiuaProgramata]}</div>
                            <div>Ora: {curs.OraProgramata}</div>
                            <br/>
                            <Button
                                onClick={switchToPage(curs.NumeProfesorCurs.replace(' ', '').toLowerCase())}
                                variant="contained"
                            >
                                <div>Accesează cursul</div>
                            </Button>
                            <br/>
                            {idUtilizator && <Button
                                onClick={this.enroll(curs)} //aici trebuie sa se trimita o referinta la o functie, nu apelul functiei
                                variant="contained"
                            >
                                <div>Inregistreaza-te la curs</div>
                            </Button>}
                        </div>
                            {descriereCurs[curs.NumeProfesorCurs]}
                        </div>

                    </div>
                ))}

            </div>
            </div>


        );
    }
}

export default withStyles(style)(Cursuri);


