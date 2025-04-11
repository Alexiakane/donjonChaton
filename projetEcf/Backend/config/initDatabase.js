import db from './database.js';


const insertData = async () => {
    const qualities = [
        [1, 'Costaud', 'Costaud est la qualité des Chatons physique et téméraires. Ils sont plus rapides, plus forts, plus agiles. Les Chatons possédant cette qualité sont souvent un peu bourrins et tête-dure, mais aussi pleins de bravoure et d\'abnégation.'],
        [2, 'Malin', 'Malin est la qualité des Chatons débrouillards et savants. Ils sont vigilants, concentrés, inventifs et réfléchis. Ces Chatons là semblent toujours savoir tout sur tout. C\'est insupportable ! Mais ils ont des nerfs d\'acier et trouvent des solutions à presque tous les problèmes.'],
        [3, 'Mignon', 'Mignon est la qualité des Chatons adorables et charmeurs. Ils sont subtils et attentifs, diplomates et rusés. Ils sont souvent sans vergogne, ronronnant et roulant des yeux pour séduite et convaincre, mais ce sont d\'habiles négociateurs qsui obtiennent ce qu\'ils désirent.']
    ];

    qualities.forEach(async (quality) => {
        await db.query(`INSERT INTO "Quality" (ID_Quality, Name, Description) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, quality),
            function logError(err) {
                if (err) {
                    console.error('Error inserting quality:', err);
                } else {
                    console.log('Quality inserted successfully');
                }
            }
    });

    const talents = [
        [1, 'Bouger son popotin', 'Le talent des Chatons athlétiques et acrobates, pour grimper dans les arbres, courir vite et longtemps, sauter loin et haut et même nager (si, si!)'],
        [2, 'Bricoler des trucs et des machins', 'Le talent des Chatons débrouillards, habiles de leurs pattes, capables de fabriquer, réparer, trifouiller, modifier, inventer des tas de choses.'],
        [3, 'Connaître les lois et les légendes', 'Le talent des Chatons qui ont bien écouté les anciens pendant les veillées et qui savent plein de choses sur plein de sujets.'],
        [4, 'Convaincre et baratiner', 'Le talent des Chatons hâbleurs et bavards, qui n\'ont pas leur langue dans la poche et ne manquent jamais de mots savants et de formules bien troussées.'],
        [5, 'Cueillir et chasser', 'Le talent des Chatons à l\'aise dans la nature, qui connaissent les fruits et les baies, les insectes commestibles, les champignons dangereux et les mousses délicates.'],
        [6, 'Cuisiner', 'Le talent des Chatons gastronomes, qui peuvent faire de n\importe quels ingrédients un plat de roi, roboratif et délicieux, qui régale tous leurs amis'],
        [7, 'Déssiner et peindre', 'Le talent des Chatons observateurs et artistes qui n\'oublients jamais d\emporter crayons, aquarelles et papier pour dessiner tout ce qu\'il voient.'],
        [8, 'Faire de la musique', 'Le talent des Chatons chateurs et musiciens, qui connaissent tous les airs populaires, les danses et les complaintes, les musiques pour la guerres et celles pour la fête.'],
        [9, 'Faire les poches', 'Le talent des Chatons prestidigitateurs, qu\'ils soient seulement espiègles ou de fieffés coquins, coquins, toujours capables de faire disparaître des petits objets entre leurs doigts.'],
        [10, 'Feuler et menacer', 'Le talent des Chatons bagarreurs, qui gérissent le poil, montrent les crocs, grognent et insultent pour intimider leurs adversaires sans jamais les toucher.'],
        [11, 'Griffer', 'Le talent des Chatons batailleurs qui n\'hésitent pas à sortir les griffes et les armes, à faire couler le sang mêm à blesser et à tuer (quelle violence !)'],
        [12, 'Herboriser', 'Le talent des Chatons un peu sorciers, un peu alchimistes, qui connaissent les plantes étranges, les cailloux bizarres et toutes sortes de manières de les utiliser.'],
        [13, 'Lire, écrire et compter', 'Le talent des Chatons érudits qui ont appris à lire, à écrire et à compter couramment - pas seulement signer leur nom d\'une partoune incertaine'],
        [14, 'Lire le ciel et les étoiles', 'Le talent des Chatons la truffe en l\'air, qui savent s\'orienter, prévoir le temps à venir et même trouver les réponses à quelques questions sibyllines.'],
        [15, 'Observer et fouiller', 'Le talent des Chatons toujours en eveil, toujhours attentifs, les yeux, les oreilles et la truffe grands ouverts. Ils sont capables de repérer les détails, de fouiller les lieux et de trouver des indices.'],
        [16, 'Rester calme et impassible', 'Le talent des Chatons courageux, volontaires, patients et endurants, qui savent resister à la douleur et aux pressions sans rien montrer.'],
        [17, 'S\'occuper des bêtes', 'Le talent des Chatons qui aiment les bêtes, savent les soigner et les dresser et leur trouver toute sorte d\'utilités et d\'intérêt.'],
        [18, 'Se cacher dans les ombres', 'Le talent des Chatons invisibles et discrets, qui savent rester immobiles, avancer très lentement d\'une ombre à une autre ou patienter sans fin.'],
        [19, 'Se déplacer en silence', 'Le talent des Chatons matois et sournois, qui se déplacent entre les herbes et les cailloux sans faire de bruit et sans attirer l\'attention sur eux'],
        [20, 'Séduire et charmer', 'Le talent des Chatons plein de mignonitude, qui arrivent à leurs fins par les ronrons et les caresses plutôt qu\'en grognant et en feulant'],
        [21, 'Soigner blessures et maladies', 'Le talent des Chatons médecins et guérisseurs, qui savent préparer des brouets simple et recoudre des plaies vives'],
        [22, 'Trouver son chemin', 'Le talent des Chatons aventuriers qui se frayent un chemin dans la nature sauvage, trouvent passages et raccourcis et même savent suivre les pistes laissées par d\'autres.'],
        [23, 'Trouver une information', 'Le talent des Chatons urbains qui trouvent leur chemin en ville, dénichent les bonnes affaires et obtiennent les renseignements dont ils ont besoin.']
    ];

    talents.forEach(async (talent) => {
        await db.query(`INSERT INTO "Talent" (ID_Talent, Name, Description) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, talent),
            function logError(err) {
                if (err) {
                    console.error('Error inserting talent:', err);
                } else {
                    console.log('Talent inserted successfully');
                }
            }
    });

    const roles = [
        [1, 'Member', 'Utilisateur'],
        [2, 'Admin', 'Administrateur'],
    ];

    roles.forEach(async (role) => {
        await db.query(`INSERT INTO "Role" (ID_Role, Name, Description) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, role),
            function logError(err) {
                if (err) {
                    console.error('Error inserting role:', err);
                } else {
                    console.log('Role inserted successfully');
                }
            }
    });

    const traits = [
        [1, 'Amoureux', 'Des Chatons qui aiment les autres, qui sont affectueux et câlins. Ils sont souvent très sociables et ont besoin de la compagnie de leurs amis.'],
        [2, 'Bruyant', 'Des Chatons qui adorent faire du bruit, qui miaulent, feulent et ronronnent sans arrêt. Ils sont souvent très expressifs et aiment attirer l\'attention.'],
        [3, 'Colérique', 'Des Chatons qui s\'énerve facilement, qui sont souvent de mauvaise humeur et qui n\'hésitent pas à se battre pour défendre leur territoire.'],
        [4, 'Frileux', 'Des Chatons qui ont peur du froid, qui aiment se blottir dans des endroits chauds et confortables. Ils sont souvent très sensibles aux changements de température.'],
        [5, 'Gourmand', 'Des Chatons qui adorent manger, qui sont toujours à la recherche de nourriture et qui n\'hésitent pas à voler la nourriture des autres.'],
        [6, 'Hautain', 'Des Chatons qui se croient supérieurs aux autres, qui sont souvent très fiers et qui n\'hésitent pas à mépriser ceux qu\'ils considèrent comme inférieurs.'],
        [7, 'Incertain', 'Des Chatons qui manquent de confiance en eux, qui sont souvent hésitants et qui ont besoin d\'être rassurés par leurs amis.'],
        [8, 'Mal élevé', 'Des Chatons qui n\'ont pas été bien éduqués, qui sont souvent malpolis et qui n\'hésitent pas à faire des bêtises.'],
        [9, 'Mélancolique', 'Des Chatons qui sont souvent tristes, qui ont tendance à se renfermer sur eux-mêmes et qui ont besoin d\'être réconfortés par leurs amis.'],
        [10, 'Naïf', 'Des Chatons qui croient tout ce qu\'on leur dit, qui sont souvent trop confiants et qui n\'hésitent pas à se faire avoir par les autres.'],
        [11, 'Orgueilleux', 'Des Chatons qui sont très fiers de leur apparence, qui aiment se montrer et qui n\'hésitent pas à se vanter de leurs exploits.'],
        [12, 'Paresseux', 'Des Chatons qui aiment dormir, qui sont souvent très fainéants et qui n\'hésitent pas à se prélasser au soleil toute la journée.'],
        [13, 'Péremptoire', 'Des Chatons qui sont souvent très sûrs d\'eux, qui n\'hésitent pas à donner des ordres aux autres et qui aiment être au centre de l\'attention.'],
        [14, 'Peureux', 'Des Chatons qui ont peur de tout, qui sont souvent très craintifs et qui n\'hésitent pas à se cacher dès qu\'ils entendent un bruit.'],
        [15, 'Téméraire', 'Des Chatons qui sont très courageux, qui n\'ont pas peur de prendre des risques et qui n\'hésitent pas à se battre pour défendre leurs amis.'],
        [16, 'Tête en l\'air', 'Des Chatons qui sont souvent distraits, qui ont tendance à oublier les choses et qui n\'hésitent pas à se perdre dans leurs pensées.'],
        [17, 'Têtu', 'Des Chatons qui sont souvent très obstinés, qui n\'hésitent pas à s\'accrocher à leurs idées et qui ont du mal à changer d\'avis.'],
        [18, 'Timide', 'Des Chatons qui sont souvent très réservés, qui n\'osent pas parler aux autres et qui ont besoin d\'être encouragés pour s\'exprimer.']
    ];

    traits.forEach(async (trait) => {
        await db.query(`INSERT INTO "Trait" (ID_Trait, Name, Description) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, trait),
            function logError(err) {
                if (err) {
                    console.error('Error inserting trait:', err);
                } else {
                    console.log('Trait inserted successfully');
                }
            }
    });

    const childhoods = [
        [1, 'Jeune noble', 'Le Chaton est né avec une croquette en argent dans la bouche. Dès sa naissance, il a appris tous les codes de l\'étiquette et de l\'éloquence. Malgrè son jeune âge, il possède une assurance que seule accorde une haute naissance. Mais cela ne l\'a pas protégé de la loi de Walter et il doit quitter le Royaume.', 'Viatique familial', 'Au débue de chaque séance de jeu, une bête (pigeon voyageur, taupe tunnelière ou tortue migratrice) apporte au Chaton une pièce d\'or frappée à l\'éffigie de Walter - une véritable fortune sur la route et la preuve que ses parents ne l\'ont pas oublié'],
        [2, 'Chaton de la campagne', ' Véritable Chaton de ferme, robyste et débrouillard, le Chaton est sans doute le mieux préparé au long voyage qui l\'attend. Il connaît les saisons et les arbres, ce qui se mange et ce qui est poison. Et même s\'il ne possède aucune des bonne manières de la ville, dormir à la belle étoile ne lui fait pas peur.', 'Petit compagnon', 'Le Chaton est accompagné par une bête de son choix qui lui est loyale et amicale. Elle est un peu plus intelligente que les autres bêtes ; elle peut aider le Chaton, répondre à quelques ordres simples et même prendre des initiatives - attention, c\'est un ami, pas un servant. C\'est peut-être une araignée aux doux yeux, un dindon géant ou un gros lézard coloré.'],
        [3, 'Chaton marchand', 'Le Chaton a grandi au milieu des caravannes et des souks, les narines emplies de l\'odeur des épices et les yeux pleins des merveilles venues du monde entier. Il a appris la valeur des marchandises, comment les choisir et les négocier. En le chassant, Walter lui a interdit de rester auprès de ses parents, mais il fera fortune autrement!', 'Contact facile', 'Quand il arrive quelque part, le Chaton apprend rapidement à qui il doit s\'adresser pour faire des affaires, de qui il doit se méfier, qui exercer le véritable pouvoir et où il pourra trouver ce qu\'il cherche. Il suffit de quelques questions, d\'un s\'il-vous-plaît, d\'un merci et d\'un sourire amical'],
        [4, 'Enfant de soldat', 'Les soldats de Walter sont trop souvent des brutes, attentives au moindre mouvement dans les ombres de la ville. Le Chaton a grandi au seun d\'une caserne, apprenant le maniement des armes et copiant l\'attitude belliqueuse de ses aînés. Mais c\'est sans pitié qu\'il a été rejeté et banni par ses propres parents sur ordre de Walter.', 'Graîne de héros', 'Le Chaton est l\'enfant de héros du Royaume. Les ennemis de ses parents ont peur d\'eux ; leurs amis leur doivent bien souvent la vie et la fortune. Pas toujours facile de rester à la hauteur d\'une telle réputation familiale, mais ça peut avoir ses avantages, pour trouver des alliés ou intimider des adversaires.'],
        [5, 'Chapprenti', 'Le Chaton a appris la rigueur et la précision. Passionné par les objets, les matériaux et les machines, il commençait tout juste à maîtriser les nombreuses techniques nécessaires à un artisan quand il a été banni. Sur la route, sans atelier, il paraît bien démuni. Mais c\'est sans compter sa créativité et ses folles idées.', 'As de la bricole', 'Le Chaton semble pouvoir tout fabriquer ou réparer, même les objets les plus étranges ou les plus farfelus. Le plus souvent, il faut surtout beaucoup de temmps, des outils appropriés et des matériaux adéquats.'],
        [6, 'Chaton abandonné', 'Tous les Chatons ne sont pas nés avec un collier plaqué or autour du cou. Beaucoup sont simplement abandonnés par leurs parents. Ils bont rejoindre les orphelins qui hantent les rues du Royaume et qui apprennent à se débrouiller pour survuvre - en recourant parfois à des expédients plus ou moins criminels', 'Vivre caché', 'Il suffit d\'un instant d\'inattention pour que le Chaton échappe aux perceptions de ceux qui le cherchent. Il se glisse d\'ombre en ombre, se pelotonne derrière une plante ou une roche, hérisse sa fourrure pour en changer la couleur, grimpe en hauteur, se trouve un terrier où se dissimuler rapidement.'],
        [7, 'Miage', 'Les Chatons qui possèdent le don de miagie suivent de longues études au sein de la plus prestigieuse des écoles de miagie ( même si c\'est la seule du Royaume). Ils y vivent à l\'écart du monde, entre eux, sans jamais vraiment sortir - sauf quand Walter décide d\'en bannir un ou une, pour l\'exemple.', 'Mentor avisé', 'Le fantôme d\'un ancien professeur de l\'académie de miaigie a décidé d\'accompagner le Chaton - un aussi jeune élève ne peut pas partir sur les routes sans un adulte. Le fantôme est certes de bon conseil et plein d\'érudition, mais il ne peut jamais intervenir physiquement - et puis il a des idées très arrêtées sur les bonnes manières, la prudence de rigueur et les heures d\'étude.'],
        [8, 'Chaton-Huant', 'Malgré leur très grand âge, les Chatons-Huants sont atteints d\'une étrange affliction qui les empêche de grandir et de vieillir. Ils vivent à la campagne, dans de grands manoirs isolés, et inspirent toutes sortes de rumeurs et d\'angoisses. Pourtant, il n\'y a pas plus gentils et aimables qu\'eux même s\'ils ne sortent que la nuit le plus souvent.', ' Mystérieux', 'Le Chaton-Huant posséde de nombreux pouvoirs, mais ils ne fonctionnent que la nuit : il peut se transformer en Chouette ; il reflète la lumière de la lune et peut éclairer autour de lui comme s\'il portait une lampe ; il peut marcher sur l\eau ; et quand il tire le tarot, il obtient parfois des réponses surprenantes.'],
        [9, 'Loup-miaou', 'Les Loups-miaous sont des Chatons appartenant à une très ancienne lignée de chats - on raconte que ce sont les premiers de tous les animaux à avoir reçu le don de la parole. Apparemment, ça ne s\'est pas très bien passé : ces Chatons font d\'étranges rêves et possèdent un sale caractère, bougon et colérique, qui les tiennent à l\'écart des villes et de leurs habitants.', 'Surexcité', 'Les Loups-miaous sont toujours très rapides : ils se déplacent aussi vite que le vent, il leur faut moitié moins de temps pour accomplir une tâche ou un travail et il peuvent agir même quand ça n\'est pas normalement leur tour. Quand ils sont effrayés, en colère ou très excités, ils se transforment en une sorte d\'étrange créature un peu canine, un peu féline, qui peut faire très peur.'],
        [10, 'Miaoumie', 'Dans l\'antiquité des humains, les Chatons étaient vénérés comme des dieux et ensevelis aux côtés de leurs rois. Quand les humains ont disparu, les Miaoumies se sont réveillées. Ces Chatons sans poil ont une étrange apparence et ont tendance à se prendre pour de grands seigneurs, mais ils sont aussi mignons qu\'à l\'époque de leur règne divin.', 'Enfant du soleil', 'Les Miaoumies n\'ont pas besoin de manger, de boire ou de dormir. Elles ne craignent ni le chaud, ni le froid. Nul travail ne les fatigue namais. Le soleil les met de bonne humeur et les rend plus belles et plus admirable. Par contre, elles détestent se mouiller et, quand ça arrive, à cause de la pluie ou parce qu\'elles tombent à l\'eau, elles n\arrivent plus à parler et se sentent plus à parler et se sentent bien misérables.'],
        [11, 'Chat-teigne', 'Certains Chatons naissent avec des marques ou des difformités qui effraient terriblement Walter. Aussi sont-ils exilés dès leur sevrage. Ils apprennent à se débrouiller par eux-mêmes, errant parfois jusqu\'aux frontières du Royaume pour observer les autres Chatons et jouer à leur ressembler un peu.', 'Déguisement', 'Les Chats-teignes développent un curieux don du déguisement à force d\'observer les chats de loin. Ils deviennent capables de prendre presque n\'importe quelle apparence, avec des chiffons de couleur, des vieux vêtements, un peu de boue collée dans les poils. Il deviennent Chaton, Chiens de la Casse, cochons débonnaires ou même le grand monstre gluant du marais.'],
        [12, 'Chaton du futur', 'Certains Chatons disent venir du futur. Ils sont revenus dans le temps pour changer le passé et partager un peu de la sagesse de l\'époque d\'où ils viennent. Mais leurs machines ne sont pas très au point et ils souffrent souvent de problèmes de mémoire, de confusion et de grands vides. Ils pourraient mentir sans doute, mais qu\'en est-il de leur étrange équipement ?', 'Anticipation', 'Le Chaton du futur semble parfois anticiper les événements ou prévoir les catastrophes. Il ne peut jamais être surpris. Ses poches sont bourrées de micro-gadgets dont il ne se rappelle pas toujours le fonctionnemement exact, mais qui pourraient bien se révéler fort utiles dans de nombreuses circonstances (la joueuse est invitée à inventer tout le charabia techno-futuriste dont elle est capable pour décrire ces gadgets à la Conteuse).'],
        [13, 'Chiot', 'Beaucoup plus joueur et actif que les Chatons, toujours en mouvement, toujours joyeux, incapable de s\'arrêter, le Chiot est un compagnon fatigant, mais il ,\'y a pas plus loyal et amical que lui, ni plus protecteur. Ses aboiements puissants portent beaucoup plus loin que les miaulements des Chatons et tiennent ses adversaires à l\'écart.', 'Gardien', 'En grandissant et en jouant avec les Chatons, le Chiot s\'est toujours un peu considéré comme le grand frère protecteur ou le bon copain toujour présent. À chaque fois que l\'un de ses compagnons se met en danger ou dans une situation impossible, le Chiot peut prendre sa place en le mettant à l\abri et en subissant les conséquences de problèmes.'],
        [14, 'Moinillon', 'Les petits Moineaux sont à peine sortis du nid et commencent tout juste à maîtriser leurs ailes. Discrets et curieux, ce sont des compagnons de route agréables, mais un peu bavards. Ils font d\'excellents éclaireurs, même si voler les fatigue vite et qu\'ils apprécient qu\'on les porte le reste du temps', 'Imitation', 'Le Moinillon a un don certain pour l\'imitation des voix et des bruits. Il peut parler avec n\'importe quel accent ou intonation, de la plus caverneuse à la plus aigüe, imiter une personne qu\'il a pu entendre parler quelques instant et effectuer tous les bruitages naturels ou artificiels auxquels il peut penser.'],
        [15, 'Raton', 'Les Chatons appellent comme cela - avec un peu de dérision - tous les enfants des rats, souris, campagnols, loirs lérots et autres petits animaux des champs et des haies que leurs ancêtres chassaient. Aujourd\'hui, tous ces animaux s\'entendent beaucoup mieux et il n\'est pas rare qu\'un Raton accompagne un groupe de Chatons partant en exil.', 'Petit', 'Les Ratons sont tellement petits et tellement rapides qu\'ils peuvent se glisser n\'importe où, à travers n\'importe quel trou, dans la végétation la plus épaisse. Il est presque impossible de les attraper, de les saisir ou de les immobiliser. Cette rapidité ne les rend pas plus discrets, mais certainement plus mobiles.'],
        [16, 'Ourson', 'Les plus grands et les plus imposants des animaux qui accompagnent parfois les Chatons en exil, les Oursons proviennent presque tous de familles de saltimbanques ou de bûcherons, selon qu\'ils viennent de la ville ou des campagnes. Déjà massifs et puissants, les Oursons sont courageux et infatigables, et ils ont le coeur gros comme ça !', 'Fort des halles', 'L\'Ourson emporte deux objets importants de plus !'],
        [17, 'Poisson-Chaton', 'Bien qu\'ils aient besoin de passer une partie de la journée dans l\'eau (surtout quand ils dorment), les Poissons-Chatons peuveut vivre sur la terre ferme grâce à la miagie et se déplacent sur de solides nageoires. Calmes, patients et silencieux, ils rappellent volontiers aux Chatons qu\'il faut être prudent en toutes circonstances. Pourtant, rien ne les excite plus que de grimper au arbres.', 'Même pas peur', 'Naturellement, les Poissons-Chatons respirent sous l\'eau et nagent comme des loutres. Surtout, ils n\'ont jamais peur de rien ni de personne. Chercher à les intimider ne marche jamais et ils ne reculent devant aucun danger (ce qui est dangereux parfois).'],
        [18, 'Choupisson', 'Un peu myopes, un peu têtes en l\'air, toujours affamés, les petits des hérissons sont habituellement de bonne composition, d\'humeur égale et pleins de bonne volonté. Mais qui s\'y frotte s\'y pisque ! Il ne faut pas leur chercher noises, car il n\'y a pas plus bagarreurs et hargneux - et rancuniers avec ça. On raconte qu\'ils gardent un gran\'livre avec les noms de tous ceux qui les ont jamais embêtés.', 'Copain parfait', 'À force de faire atteintion à ne pas mettre ses piquants n\'importe où, le Choupisson a appris à aider ses camarades de la plus efficace des manières. Il se rend aisément utile, anticipe les besoins de ses copains et, d\'une manière génrale, se trouve toujours là où il doit être pour que les choses se fassent.']
    ];

    childhoods.forEach(async (childhood) => {
        await db.query(`INSERT INTO "Childhood" (ID_Childhood, Name, Description, Gift, Gift_Description) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`, childhood),
        function logError(err) {
            if (err) {
                console.error('Error inserting childhood:', err);
            } else {
                console.log('Childhood inserted successfully');
            }
        }
    });

    const meowgics = [
        [1, 'Patrouille en chaussons', 'Miagie des tours (Costaud)', 'Jusqu\'au prochain crépuscule, le Chaton et ses compagnons peuvent marcher et courir sans avoir mal aux pattes, se blesser les coussinets ou se tordre la cheville.', 1],
        [2, 'Motte de terre', 'Miagie des tours (Costaud)', 'En quelques coups de patte, le Chaton creuse un terrier pour se cacher ou dresse une butte de terre pour se protéger du vent, de la pluie ou de ses ennemis.', 1],
        [3, 'Porte-voix', 'Miagie des tours (Costaud)', 'La voix du Chaton devient énorme, terriblement forte, et elle peut être entendue à plusieurs centaines de mètres (et au-delà), sans beaucoup d\'effort de sa part.', 1],
        [4, 'Pattenrond', 'Miagie des tours (Costaud)', 'Le Chaton trouve un endroit protégé, caché, confortable, abrité et chaud où il peut passer la nuit et roupiller tranquillement sans que rien ne le dérange.',2],
        [5, 'Premier secours', 'Miagie des tours (Costaud)', 'En plein conflit, le Chaton rend un point de coeur à l\'un de ses camarades.', 2],
        [6, 'Longue nuit', 'Miagie des tours (Costaud)', 'Alerte et vigilant, le Chaton ne dort pas de toute la nuit, à part quelques minutes un peu après l\'aube, mais il est parfaitement reposé le lendemain.', 3],
        [7, 'Bénédiction d\'honneur', 'Miagie des grand\'salles (Costaud)', 'Jusqu\'à la prochaine aube, le Chaton ne peut pas être surpris ou attaqué par derrière ou en traître. L\'effet du sort s\'interrompt s\'il agit lui-même de manière déloyale.', 1],
        [8, 'Hardiesse', 'Miagie des grand\'salles (Costaud)', 'Jusqu\'à la prochaine aube, le Chaton n\'a peur de rien ni de personne. S\'il dépense un point d\'amitié, son sort affecte tous ses alliés en vue.', 1],
        [9, 'Talisman de coeur', 'Miagie des grand\'salles (Costaud)', 'Le Chaton confectionne un petit talisman qu\'il peut garder u offrir et qui accorde un point de coeur à son porteur jusqu\'à la prochaine aube.', 1],
        [10, 'Parole de sagesse', 'Miagie des grand\'salles (Costaud)', 'En posant une question à la Conteuse, le Chaton sait instinctivement ce qu\'il faut dire ou faire dans une situation compliquée et qu\'il ne comprend pas très bien.', 2],
        [11, 'Gosier sans fond', 'Miagie des grand\'salles (Costaud)', 'Jusqu\'à la prochaine aube, le Chaton peut manger absolument n\'importe quoi et en toutes quantités sans risquer de s\'empoisonner ou de se rendre malade', 2],
        [12, 'Sentir la malveillance', 'Miagie des grand\'salles (Costaud)', 'Le Chaton sait si un interlocuteur lui ment, lui veut du mal ou lui dissimule des intentions malveillantes et il comprend les motivations de cette attitude.', 3],
        [13, 'Tablier de cuir', 'Miagie des ateliers (Malin)', 'Jusqu\'à la prochaine aube, les vêtements du Chaton le protègent complètement du chaud et du froid, du feu et des substances dangereuses comme les acides.', 1],
        [14, 'Tranche et pique', 'Miagie des ateliers (Malin)', 'Jusqu\'à la prochaine aube, tous les outils d\'un atelier ou d\'un sac fonctionnent parfaitement. Ils sont huilés, affutés, propres et sùrs, prêts à l\'emploi.', 1],
        [15, 'Travail sans danger', 'Miagie des ateliers (Malin)', 'Jusqu\'à la prochaine aube, le Chaton protège un lieu de tout danger de blessure, occasionnée par des outils, des manoeuvres ou du travail en équilibre précaire.', 1],
        [16, 'Invocation d\'outils', 'Miagie des ateliers (Malin)', 'Le Chaton fait apparaître un sac plein d\'outils utiles pour la tâche à venir et qu\il peut utiliser jusqu\'à complétion du travail. Ils disparaissent ensuite.', 2],
        [17, 'Réparations rapides', 'Miagie des ateliers (Malin)', 'Le Chaton répare un petit objet cassé (de la taille d\'une chaise). Chaque succès supplémentaire permet de réparer un objet plus gros (armoire puis chariot).', 2],
        [18, 'Objets vivants', 'Miagie des ateliers (Malin)', 'Jusqu\'à la prochaine aube, le Chaton anime un objet (de la taille d\'une table au maximum) qui peut alors se déplacer, obéir à des ordres simples et même le défendre.', 3],
        [19, 'Couleur des herbes', 'Miagie des champs (Malin)', 'Jusqu\'à la prochaine aube ou le prochain crépuscule, la fourrure du Chaton s\'adapte lentement à la couleur de son environnement et le cache de ses ennemis.', 1],
        [20, 'Soin des bêtes', 'Miagie des champs (Malin)', 'Le Chaton soigne complètement une bête malade ou blessée, la débarrasse de ses parasites et lui rend le poil, les plumes ou les écailles brillantes.', 1],
        [21, 'Passage sans trace','Miagie des champs (Malin)', 'Jusqu\'à la prochaine aube, le Chaton brouille sa piste et efface ses empreintes. Il devient très difficile à pister et à suivre, sauf par miagie.', 1],
        [22, 'Vif comme le vent', 'Miagie des champs (Malin)', 'Jusqu\'à la prochaine aube ou au prochain crépuscule, le Chaton peut courir deux fois plus vite et trois fois plus longtemps, sans se fatiguer outre mesure.', 2],
        [23, 'Nuée d\'insectes', 'Miagie des champs (Malin)', 'Jusqu\'à la prochaine aube, le Chaton contrôle les insectes proches, pour les éloigner de lui ou encore pour les envoyer embêter quelqu\'un en vue.', 2],
        [24, 'Parler avec les arbres', 'Miagie des champs (Malin)', 'En posant sa main sur son écorce, le Chaton peut engager un dialogue avec un arbre. Plus celui-ci est vieux, plus il est intelligent et sa mémoire est importante.', 3],
        [25, 'Propre et rangé', 'Miagie des villes (Mignon)', 'Le Chaton range et nettoie une pièce (grande ou petite) - le temps que cela prend dépend du désordre et de la salissure, mais ça va habituellement assez vite.', 1],
        [26, 'Mille yeux', 'Miagie des villes (Mignon)', 'Jusqu\'à la prochaine aube, le Chaton a les yeux partout et remarque les détails. Il devient très difficile de lui faire les poches ou de le prendre en filature.', 1],
        [27, 'Son et lumière', 'Miagie des villes (Mignon)', 'Le Chaton crée des sons, de la musique et des lumières autrour de lui pour se mettre en scène et se donner en spectacle.', 1],
        [28, 'Voix enchanteresse', 'Miagie des villes (Mignon)','La voix du Chaton devient incroyablement douce et profonde, capable de calmer et d\'endormir ou d\'éveiller de vives émotions quand il raconte une histoire.', 2],
        [29, 'chat de gouttière', 'Miagie des villes (Mignon)', 'Jusqu\'à la prochaine aube, le Chaton ne peut pas perdre l\'équilibre, glisser dans la boue ou sur la neige, tomber d\'un toit ou d\'un arbre.', 2],
        [30, 'Soins', 'Miagie des villes (Mignon)', 'Pendant une pause, le Chaton dépense un point d\'amitié et rend un point de coeur à chacun de ses camarades présents.', 3],
        [31, 'Conservation des ressources', 'Miagie des caravanes (Mignon)', 'Jusqu\à la prochaine aube, le Chaton protège la nourriture, les herbes ou le matériel de tout risque de détérioration ou de pourriture.', 1],
        [32, 'Respirer sous l\'eau', 'Miagie des caravanes (Mignon)', 'Jusqu\'à la prochaine aube ou le prochain crépuscule, le Chaton respire aussi bien sous l\'eau que sur la terre ferme.', 1],
        [33, 'Parler aux bêtes', 'Miagie des caravanes (Mignon)', 'Jusqu\'à la prochaine aube, le Chaton peut échanger quelques paroles avec les bêtes et leur donner des ordres simples (auxquels elles obéissent ou pas).', 1],
        [34, 'Voir au loin', 'Miagie des caravanes (Mignon)', 'Jusqu\à la prochaine aube, le Chaton voit parfaitement au loin comme s\'il utilisait des jumellless ou une longue-vue', 2],
        [35, 'Dissimulation d\'objets', 'Miagie des caravanes (Mignon)', 'Le Chaton cache de menus objets (de la taille de son poing) dans les replis de ses poils, les rendant très difficiles à trouver, même en le fouillant soigneusement.', 2],
        [36, 'Sentir la route', 'Miagie des caravanes (Mignon)', 'En posant sa main sur le chemin, le Chaton sait si des créatures y voyagent ou se cachent dans ses abords. Il en connaît le nombre, mais pas la nature exacte.',3]
    ];

    meowgics.forEach(async (meowgic) => {
        await db.query(`INSERT INTO "Meowgic" (ID_Meowgic, Name, Type, Description, Difficulty) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`, meowgic),
        function logError(err) {
            if (err) {
                console.error('Error inserting meowgic:', err);
            } else {
                console.log('Meowgic inserted successfully');
            }
        }
    });

    const equipments = [
        [1, 'Gourde', 'une gourde en cuir pour transporter de l\'eau'],
        [2, 'Rations', 'des rations de nourriture pour un voyage de 3 jours'],
        [3, 'Corde', 'une corde de 10 mètres'],
        [4, 'Couverture', 'une couverture en laine ou en fourrure, pour se protéger du froid'],
    ];

    equipments.forEach(async (equipment) => {
        await db.query(`INSERT INTO "Equipment" (ID_Equipment, Name, Description) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, equipment),
            function logError(err) {
                if (err) {
                    console.error('Error inserting equipment:', err);
                } else {
                    console.log('Equipment inserted successfully');
                }
            }
    });

};

insertData().catch(err => console.error(err))
    .then(() => console.log('Database initialized'))
    .catch(err => console.error('Error initializing database', err));
