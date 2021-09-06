var express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var hash = require('sha256');
var nodemailer = require('nodemailer');

const app = express();
let transporter;
// >
const createTransport = async () => {

    transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'notification.ilearning@gmail.com',
            pass: 'asdf1234#',
        },
    });
}



const con = mysql.createConnection({

    host: 'localhost', //'localhost',
    user: 'root',
    password: '',
    port: 3306, //port mysql
    database: 'sitedb'
});
app.use(bodyParser.json());
app.use(cors());

app.post('/addCourse', (req, res) => {

    console.log('Boddy', req.body);

    let {NumeProfesorCurs, NumeCurs, CategorieCurs, CaleCatreFisier} = req.body;


    if (!NumeProfesorCurs) return res.status(400).json('NumeProfesorCurs cant be blank');
    if (!NumeCurs) return res.status(400).json('NumeCurs cant be blank');

    const data = {
        NumeProfesorCurs: NumeProfesorCurs,
        NumeCurs: NumeCurs,
        CategorieCurs: CategorieCurs,
        CaleCatreFisier: CaleCatreFisier,
    };
    con.query('INSERT INTO tblCurs set ?', data, (err, rows) => {
        if (err) {
            console.log('Err', err);
            res.status(400).json('Can t add course');
            return;
        }

        res.status(200).json('Course Added uccessfully!d!');
    });

});

app.post('/getCourses', (req, res) => {

    console.log('Boddy', req.body);


    con.query('SELECT DISTINCT NumeProfesorCurs, NumeCurs, CategorieCurs, ZiuaProgramata, OraProgramata  FROM tblCurs;', (err, rows) => {
        if (err) {
            console.log('Err', err);
            res.status(400).json('Eroare');
            return;
        }

        res.status(200).json(rows);
    });

});

app.post('/getMeetings', (req, res) => {

    console.log('Boddy', req.body);
    const {userId} = req.body;

    con.query('SELECT NumeProfesorCurs, NumeCurs, NumeConversatie, CategorieCurs, ZiuaProgramata, OraProgramata, Notificat from tblCurs,tblIntalniriProgramate WHERE tblCurs.NumeProfesorCurs=tblIntalniriProgramate.NumeProfesorIntalnire and CodUtilizator = ? and Activa = "1"', userId, (err, rows) => {
        if (err) {
            console.log('Err', err);
            res.status(400).json('Eroare');
            return;
        }
        console.log('Rows', rows)


        res.status(200).json(rows);
    });

});

app.post('/getResources', (req, res) => {

    console.log('Boddy', req.body.numeProfesor);


    con.query(`SELECT TitluMaterial, CaleCatreFisier FROM tblMaterialeCurs WHERE ApartineProfesorCurs='${req.body.numeProfesor}';`, (err, rows) => {
        if (err) {
            console.log('Err', err);
            res.status(400).json('Eroare');
            return;
        }

        res.status(200).json(rows);
    });

});

app.post('/user/create', (req, res) => {

    console.log('Boddy', req.body);

    // let fullName = req.body.fullName;
    // let email = req.body.email;
    // let password = req.body.password;
    let {fullName, email, password, tipUtilizator} = req.body;
    const hashedPass = hash(password);
    if (!fullName) return res.status(400).json('NumeUtilizator cant be blank');
    if (!email) return res.status(400).json('Email cant be blank');
    if (!password) return res.status(400).json('Parola cant be blank');
    if (!tipUtilizator) return res.status(400).json('Tip Utilizator cant be blank');
    console.log('Hashed', hashedPass);
    const data = {
        IdUtilizator: Math.random().toString().substr(2, 4),
        NumeUtilizator: fullName,
        Email: email,
        Parola: hashedPass,
        TipUtilizator: tipUtilizator,
        Logat: false,
    };
    con.query('INSERT INTO tblUtilizator set ?', data, (err, rows) => {
        if (err) {
            console.log('Err', err);
            res.status(400).json('Foloseste alte credentiale');
            return;
        }
        res.status(200).json('User Added uccessfullyd!');
    });
});


app.post('/user/login', (req, res) => {

    console.log('Login', req.body);

    let {email, password} = req.body;


    if (!email) return res.status(400).json('Email cant be blank');
    if (!password) return res.status(400).json('password cant be blank');
    const hashedPass = hash(password);
    console.log('Hashed', hashedPass);
    con.query('SELECT * FROM tblUtilizator WHERE Email = ? AND Parola = ?', [email, hashedPass], function (error, results) {
            console.log('results', results);
            if (results?.length > 0) {
                var user = results[0];
                con.query('UPDATE tblUtilizator SET Logat = "1" WHERE Email = ? AND Parola = ?', [email, hashedPass], function (error, results) {
                    res.status(200).json({fullName: user.NumeUtilizator, email: user.Email, cod: user.IdUtilizator});
                });
            } else {
                console.log('errror', error);
                res.status(400).json('Incorrect Username and/or Password!');
            }
        }
    );
});

app.post('/user/logout', (req, res) => {
    console.log('apelare');

    //let {email} = req.body;
    let email = req.body.email;

    if (!email) return res.status(400).json('Email cant be blank');


    con.query('SELECT * FROM tblUtilizator WHERE Email = ? ', email, function (error, results, fields) {
            if (results?.length > 0) {
                con.query('UPDATE tblUtilizator SET Logat = "0" WHERE Email = ? ', email, function (error, results) {
                    console.log('Delogat cu succes', error, results);
                    res.status(200).json('Delogat cu succes');
                });
            } else {
                res.status(400).json('Esti deja delogat');
            }
        }
    );
});

app.post('/addMeet', (req, res) => {

    console.log('Boddy', req.body);

    let {numeConversatie, idUtilizator, numeProfesor} = req.body;

    con.query('SELECT IdConversatie FROM tblConversatii WHERE NumeConversatie = ? ', numeConversatie, (err, results) => {
        // const rez=rows[0];
        console.log('rezultat', err, results);
        if (err) {
            console.log('Err', err);
            res.status(400).json('Can t add meeting');
            return;
        }

        const codConversatie = results[0].IdConversatie; //result este array cu un obiect cu cheia idconversatie

        con.query('INSERT INTO tblUtilizatoriInConversatie set ?', {
            CodUtilizatorInConversatie: idUtilizator,
            CodConversatie: codConversatie
        }, (err, rows) => {
            if (err) {
                console.log('Err', err);
                res.status(400).json('Can t add meeting');
            }

        });



        con.query('SELECT * FROM tblIntalniriProgramate WHERE CodUtilizator = ? and NumeProfesorIntalnire = ?', [idUtilizator, numeProfesor], (err, results) => {
            const rez = results ? results[0] : null;
            console.log('rezultat', err, results);
            if (rez) {
                con.query('UPDATE tblIntalniriProgramate set Activa = "1" WHERE CodUtilizator = ? and NumeProfesorIntalnire = ?', [idUtilizator, numeProfesor], (err, results) => {
                    if (err) {
                        console.log('Err', err);
                        res.status(400).json('Can t add meeting');
                        return;
                    }
                    res.status(200).json('Intalnire programata cu succes!');
                });
            } else {
                con.query('INSERT INTO tblIntalniriProgramate set ?', {
                    NumeProfesorIntalnire: numeProfesor,
                    NumeConversatie: numeConversatie,
                    CodUtilizator: idUtilizator,
                    Activa: true,
                    Notificat: false,
                }, (err, results) => {
                    if (err) {
                        console.log('Err', err);
                        res.status(400).json('Can t add meeting');
                        return;
                    }
                    res.status(200).json('Intalnire programata cu succes!');
                });
            }
        });


    });
});

app.post('/leaveConversation', (req, res) => {

    console.log('Boddy', req.body);

    let {conversationId, userId, conversationName} = req.body;

    con.query(
        'UPDATE tblIntalniriProgramate SET Activa = "0", Notificat = "0" WHERE CodUtilizator = ? and NumeConversatie = ?',
        [userId, conversationName],
        (err, results) => {
        if (err) {
            console.log('Err', err);
            res.status(400).json('Can t exit meeting');
            return;
        }
        con.query('DELETE from tblUtilizatoriInConversatie where CodUtilizatorInConversatie = ? and CodConversatie = ?', [userId, conversationId], (err, rows) => {
            if (err) {
                console.log('Err', err);
                res.status(400).json('Can t add course');
                return;
            }
            res.status(200).json('Ai iesit cu succes din conversatie!');
        });

    });
});

app.post('/sendMeetingEmail', async (req, res) => {
    let toEmail = req.body.email;
    const {day, hour, userId, conversationName} = req.body;
    console.log('Body', req.body);

    if (!toEmail) return res.status(400).json('Email cant be blank');
    await createTransport();

    const mailOptions = {
        from: 'notification.ilearning@gmail.com', // sender address
        to: toEmail,
        subject: 'Notificare Meeting',
        text: `Aveti programata o intalnire pentru cursul ${conversationName} in ziua de ${day} la ora ${hour} `
        // text: `Aveti programata o intalnire pentru cursul ... `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(400).json( error + 'Eroare trimitere email');
        } else {
            con.query(
                'UPDATE tblIntalniriProgramate set Notificat = "1" WHERE CodUtilizator = ? and NumeConversatie = ?',
                [Number(userId), conversationName],
                (err, results) => {
                    if (err) {
                        console.log('Err', err);
                        res.status(400).json('Nu s a facut update la notificat');
                    }
                    res.status(200).json('Notificat prin Email');
                });


        }
    });
});

app.listen(3002, () => {
    console.log(`app is running on port 3002`);
});