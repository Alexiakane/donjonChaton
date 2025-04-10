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
        [1, 'Bouger son popotin', 'Le talent des Chatons athlétiques et acrobates, pour grimper dans les arbres, courir vite et longtemps, sauter loin et haut et même nager (si, si!)']
        [2, 'Bricoler des trucs et des machins', 'Le talent des Chatons débrouillards, habiles de leurs pattes, capables de fabriquer, réparer, trifouiller, modifier, inventer des tas de choses.']
        [3, 'Connaître les lois et les légendes', 'Le talent des Chatons qui ont bien écouté les anciens pendant les veillées et qui savent plein de choses sur plein de sujets.']
        [4, 'Convaincre et baratiner', 'Le talent des Chatons hâbleurs et bavards, qui n\'ont pas leur langue dans la poche et ne manquent jamais de mots savants et de formules bien troussées.']
        [5, 'Cueillir et chasser', 'Le talent des Chatons à l\'aise dans la nature, qui connaissent les fruits et les baies, les insectes commestibles, les champignons dangereux et les mousses délicates.']
        [6, 'Cuisiner', 'Le talent des Chatons gastronomes, qui peuvent faire de n\importe quels ingrédients un plat de roi, roboratif et délicieux, qui régale tous leurs amis']
        [7, 'Déssiner et peindre', 'Le talent des Chatons observateurs et artistes qui n\'oublients jamais d\emporter crayons, aquarelles et papier pour dessiner tout ce qu\'il voient.']
        
};

insertData().catch(err => console.error(err))
    .then(() => console.log('Database initialized'))
    .catch(err => console.error('Error initializing database', err));
