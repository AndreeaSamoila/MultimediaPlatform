#SOURCE C:/Users/andreea.samoila2212/Desktop/cod/server/BD_site.sql;

DROP DATABASE siteDB;  

CREATE DATABASE siteDB;
USE siteDB;

CREATE TABLE tblUtilizator (
	IdUtilizator SMALLINT UNSIGNED PRIMARY KEY,
	NumeUtilizator VARCHAR(50) NOT NULL UNIQUE,
	Email VARCHAR(50) NOT NULL UNIQUE,
	Parola VARCHAR(66) NOT NULL,
	TipUtilizator VARCHAR(20) NOT NULL,
	Logat BOOLEAN
);
 
DESCRIBE tblUtilizator;
	
CREATE TABLE tblCurs (
	NumeProfesorCurs VARCHAR(200) PRIMARY KEY,
	NumeCurs VARCHAR(100) NOT NULL,
	CategorieCurs VARCHAR(100) NOT NULL,
	ZiuaProgramata ENUM ('1','2','3','4','5','6','7') NOT NULL,
	OraProgramata TIME NOT NULL
);
DESCRIBE tblCurs;

CREATE TABLE tblMaterialeCurs (
	IdMaterialCurs SMALLINT UNSIGNED PRIMARY KEY,
	ApartineProfesorCurs VARCHAR(100),
	CaleCatreFisier VARCHAR(200),
	TitluMaterial VARCHAR(150),
	CONSTRAINT fk_apProfCurs FOREIGN KEY(ApartineProfesorCurs) 
	REFERENCES tblCurs(NumeProfesorCurs) ON DELETE CASCADE ON UPDATE CASCADE

);
DESCRIBE tblMaterialeCurs;


CREATE TABLE tblIntalniriProgramate ( 
	Id SMALLINT PRIMARY KEY AUTO_INCREMENT,
	CodUtilizator SMALLINT UNSIGNED,
	NumeProfesorIntalnire VARCHAR(100),
	NumeConversatie VARCHAR(50),
	Activa BOOLEAN,
	Notificat BOOLEAN,
	CONSTRAINT fk_prof FOREIGN KEY(NumeProfesorIntalnire) 
	REFERENCES tblCurs(NumeProfesorCurs) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_codutilizator FOREIGN KEY(CodUtilizator) 
	REFERENCES tblUtilizator(IdUtilizator) ON DELETE CASCADE ON UPDATE CASCADE
);
DESCRIBE tblIntalniriProgramate;

CREATE TABLE tblMesaj (
	IdMesaj SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,	
	UtilizatorDestinatar INT NOT NULL, 
	DataTrimitere DATETIME NOT NULL,
	TextMesaj TEXT NOT NULL,
	TrimisDeUtilizator SMALLINT UNSIGNED NOT NULL,
	CONSTRAINT fk_trimis FOREIGN KEY(TrimisDeUtilizator) 
	REFERENCES tblUtilizator(IdUtilizator) ON DELETE CASCADE ON UPDATE CASCADE
);

DESCRIBE tblMesaj;

CREATE TABLE tblConversatii(
	IdConversatie SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
	NumeConversatie VARCHAR(50)
);

DESCRIBE tblConversatii;

CREATE TABLE tblUtilizatoriInConversatie(
	id SMALLINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, 	
	CodUtilizatorInConversatie SMALLINT UNSIGNED,  
	CodConversatie SMALLINT UNSIGNED,
	CONSTRAINT fk_codutiliz FOREIGN KEY(CodUtilizatorInConversatie) 
	REFERENCES tblUtilizator(IdUtilizator) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_codconv FOREIGN KEY(CodConversatie) 
	REFERENCES tblConversatii(IdConversatie) ON DELETE CASCADE ON UPDATE CASCADE
);

DESCRIBE tblUtilizatoriInConversatie;



CREATE TABLE tblTopic(
	IdTopic SMALLINT UNSIGNED PRIMARY KEY  AUTO_INCREMENT,
	TitluTopic VARCHAR(200) NOT NULL UNIQUE, 
	SubiectTopic TEXT NOT NULL,
	ImagineTopic VARCHAR(200)
);
	
	DESCRIBE tblTopic;
	
	
CREATE TABLE tblComentarii(
	IdComentariu SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	CodTopic SMALLINT UNSIGNED NOT NULL,
	CodUtilizatorComent SMALLINT UNSIGNED NOT NULL,
	TextComent TEXT,
	CONSTRAINT fk_codtopic FOREIGN KEY(CodTopic) 
	REFERENCES tblTopic(IdTopic) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_codutil FOREIGN KEY(CodUtilizatorComent) 
	REFERENCES tblUtilizator(IdUtilizator) ON DELETE CASCADE ON UPDATE CASCADE
);
DESCRIBE tblComentarii;

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO tblTopic VALUES
	(1,'Limba Romana - Scoala Primara', 'Probleme intampinate la aceasta materie','caleimag'),
	(2,'Limba Engleza - Scoala Primara', 'Cum putem invata mai eficient limba engleza?','caleimag'),
	(3,'Matematica - Scoala Primara', 'Neclaritati legate de lucrurile elementare predate','caleimag'),
	(4,'Limba Romana - Scoala Gimnaziala', 'Discutie deschisa despre pregatirea pentru evaluarea nationala','caleimag'),
	(5,'Algebra - Scoala Gimnaziala', 'Neclaritati legate de notiunile de algebra','caleimag'),
	(6,'Fizica - Scoala Gimnaziala', 'Probleme intampinate in rezolvarea problemelor de Fizica','caleimag'),
	(7,'Chimie - Scoala Gimnaziala', 'Neclaritati legate de notiunile de Chimie','caleimag'),
	(8,'Limba Romana - Liceu', 'Discutii de interes in ceea ce priveste bacalaureatul la Limba Romana','caleimag'),
	(9,'Limba Engleza - Liceu', 'Cum putem ajunge sa vorbim fluent aceasta limba?','caleimag'),
	(10,'Limba Franceza - Liceu', 'Neclaritati legate de citire, vorbire, scriere','caleimag'),
	(11,'Analiza Matematica - Liceu', 'Probleme intampinate pentru pregatirea bacalaureatului','caleimag');
	
SELECT * FROM tblTopic;
	 
INSERT INTO tblComentarii VALUES
	(1, 1, 18, 'Nu am inteles cum se analizeaza o parte e vorbire. As dori o explicatie pe un exemplu concret'),
	(2, 1, 17, 'As dori o explicatie pe un exemplu concret de compunere'),
	(3, 2, 16, 'A inteles cineva cum se conjuga verbul A FI?'),
	(4, 3, 5, 'Nu am inteles cum se fac problemele cu ecuatii simple. Are cineva un exemplu?');

SELECT * FROM tblComentarii;
	
SET FOREIGN_KEY_CHECKS=1;
	
INSERT INTO tblCurs VALUES 

	('Claudia Visan', 'Limba Romana', 'Scoala Primara','1','12:00:00'),
	('Vasile Ion', 'Limba Engleza', 'Scoala Primara','3','23:00:00'),
	('Anca Ina', 'Matematica', 'Scoala Primara','4','12:00:00'),
	('Ion Popescu', 'Limba Romana', 'Scoala Gimnaziala','5','11:00:00'),
	('Luca Petre', 'Algebra', 'Scoala Gimnaziala','5','16:00:00'),
	('Sorin Iordan', 'Fizica', 'Scoala Gimnaziala','2','14:00:00'),
	('Matei Popa', 'Chimie', 'Scoala Gimnaziala','3','11:00:00'),
	('Ana Meroiu', 'Limba Romana', 'Liceu','7','15:00:00'),
	('Bianca Vilsanescu', 'Limba Engleza', 'Liceu','6','10:00:00'),
	('Victor Bucur', 'Limba Franceza','Liceu','7','12:00:00'),
	('Livia Manole', 'Analiza Matematica', 'Liceu','6','16:00:00');
	

	
SELECT * FROM tblCurs;
#adfsksgf$
INSERT INTO tblUtilizator VALUES

	(1, 'Claudia Visan', 'claudia.v@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor', '0'),
	(2, 'Vasile Ion ', 'vasileion@yahoo.com', 'b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor','0'),
	(3, 'Anca Ina', 'a.anca@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor', '0'),
	(4, 'Ion Popescu', 'pop.ion@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor','0'),
	(5, 'Luca Petre', 'petreluca@gmail.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor', '0'),
	(6, 'Sorin Iordan', 'sorin.i@gmail.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor', '0'),
	(7, 'Matei Popa', 'matei_popa83@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor','0'),
	(8, 'Ana Meroiu', 'ana_meroiu23@gmail.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor','0'),
	(9, 'Bianca Vilsanescu', 'bianca.vilsanescu@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor','0'),
	(10, 'Victor Bucur', 'victor.b@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor','0'),
	(11, 'Livia Manole', 'm.livia@gmail.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','profesor','0'),
	(12, 'Viorel Popa', 'popa.viorel@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev', '0'),
	(13, 'Cosmin State', 'state.cosmin@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev', '0'),
	(14, 'Luiza Dinu', 'dinu.luis@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev', '0'),
	(15, 'Claudia Cernat', 'cernatc@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev', '0'),
	(16, 'George Neagu', 'george117@gmail.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev','0'),
	(17, 'Andrei Pop', 'pop.andrei@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev', '0'),
	(18, 'Samoila Andreea', 'a.samoilaa@yahoo.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev', '0'),
	(19, 'Stefan Ion', 'stefan_ion@gmail.com','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev', '0'),
	(20, 'A Tor', 'filip.badea@cnmv.ro','b8a2a9d9fd0fe68314aa8e0699313d4166a8571e970c073fda317ae319efd8c2','elev', '0');
	
SELECT * FROM tblUtilizator;	

INSERT INTO tblMaterialeCurs VALUES
	(1, 'Claudia Visan', '/resurse/Clasele-II-IV.pdf','Exercitii de gramatica'),
	(2, 'Claudia Visan', 'http://educatieonline.md/Files/Manuals/4/IV_Limba%20romama%20(a.%202017).pdf','Manual de limba romana recomandat'),
	(3,'Vasile Ion', 'https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(4, 'Anca Ina','https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(5,'Ion Popescu','https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(6,'Luca Petre','https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(7,'Sorin Iordan','https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(8,'Matei Popa','https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(9, 'Livia Manole','https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(10,'Bianca Vilsanescu','https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(11,'Victor Bucur','https://www.youtube.com/watch?v=3RK-OxvooUM', 'Teorie'),
	(12,'Ana Meroiu','/pdff.pdf', 'Teorie'),
	(13,'Vasile Ion', 'https://www.youtube.com/watch?v=3RK-OxvooUM', 'Exercitii Propuse'),
	(14, 'Claudia Visan', 'https://www.youtube.com/embed/1OYqcQnYuVE','Tutorial'),
	(15, 'Claudia Visan', 'https://www.youtube.com/embed/Ak_nRVn8U4k','Tutorial'),
	(16,'Ana Meroiu','/resurse/22518591-Gramatica-limbii-romane.pdf', 'Teorie introductiva'),
	(17,'Ana Meroiu','/resurse/299631540-Modele-de-Analiza-Sintactica-Si-Morfologica.pdf', 'Analiza Sintactica si Morfologica'),
	(18,'Ana Meroiu','/resurse/fisrom.doc', 'Exercitii de verificare a cunostintelor'),
	(19,'Ana Meroiu','/resurse/fisrom.doc', 'Exercitii de verificare a cunostintelor');
	
	SELECT * FROM tblMaterialeCurs;	

	

	SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO tblConversatii VALUES (1, 'Limba Romana - Scoala Primara');
INSERT INTO tblConversatii VALUES (2, 'Limba Engleza - Scoala Primara');
INSERT INTO tblConversatii VALUES (3, 'Matematica - Scoala Primara');
INSERT INTO tblConversatii VALUES (4, 'Limba Romana - Scoala Gimnaziala');
INSERT INTO tblConversatii VALUES (5, 'Algebra - Scoala Gimnaziala');
INSERT INTO tblConversatii VALUES (6, 'Fizica - Scoala Gimnaziala');
INSERT INTO tblConversatii VALUES (7, 'Chimie - Scoala Gimnaziala');
INSERT INTO tblConversatii VALUES (8, 'Limba Romana - Liceu');
INSERT INTO tblConversatii VALUES (9, 'Limba Engleza - Liceu');
INSERT INTO tblConversatii VALUES (10, 'Limba Franceza - Liceu');
INSERT INTO tblConversatii VALUES (11, 'Analiza Matematica - Liceu');


SELECT * FROM tblConversatii;	

INSERT INTO tblMesaj VALUES (1, 1, '2021-06-16 23:08:49', 'Salut', 4);
INSERT INTO tblMesaj VALUES (2, 1, '2021-06-16 23:10:52', 'Buna', 4);
INSERT INTO tblMesaj VALUES (3, 2, '2021-06-15 23:11:15', 'Tess', 5);
INSERT INTO tblMesaj VALUES (4, 2, '2021-06-16 20:44:38', 'Sal', 4);
INSERT INTO tblMesaj VALUES (5, 1, '2021-06-16 21:01:16', 'Tesst', 4);
INSERT INTO tblMesaj VALUES (6, 1, '2021-06-16 21:01:57', 'asd', 4);
INSERT INTO tblMesaj VALUES (7, 2, '2021-06-17 06:18:58', 'Buna', 4);
INSERT INTO tblMesaj VALUES (8, 2, '2021-06-17 06:19:18', 'Salut', 5);
INSERT INTO tblMesaj VALUES (9, 2, '2021-06-17 07:19:18', 'hei', 5);

SELECT * FROM tblMesaj;	

INSERT INTO tblUtilizatoriInConversatie VALUES (1, 1, 1);
INSERT INTO tblUtilizatoriInConversatie VALUES (2, 2, 2);
INSERT INTO tblUtilizatoriInConversatie VALUES (3, 3, 3);
INSERT INTO tblUtilizatoriInConversatie VALUES (4, 4, 4);
INSERT INTO tblUtilizatoriInConversatie VALUES (5, 5, 5);
INSERT INTO tblUtilizatoriInConversatie VALUES (6, 6, 6);
INSERT INTO tblUtilizatoriInConversatie VALUES (7, 7, 7);
INSERT INTO tblUtilizatoriInConversatie VALUES (8, 8, 8);
INSERT INTO tblUtilizatoriInConversatie VALUES (9, 9, 9);
INSERT INTO tblUtilizatoriInConversatie VALUES (10, 10, 10);
INSERT INTO tblUtilizatoriInConversatie VALUES (11, 11, 11);


SELECT * FROM tblUtilizatoriInConversatie;	
SET FOREIGN_KEY_CHECKS = 1;
	
	
