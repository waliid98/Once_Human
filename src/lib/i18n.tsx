import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export type Locale = "en" | "fr" | "de" | "nl" | "no";

const STORAGE_KEY = "locale";

const TRANSLATIONS = {
  en: {
    "meta.title": "Once Human",
    "meta.description": "Official Once Human landing page: trailer, scenario, FAQ, restrictions, and community links.",
    "alt.logo": "Once Human logo",
    "alt.aboutBackground": "Once Human world background",
    "alt.contactBg1": "Contact background 1",
    "alt.contactBg2": "Contact background 2",
    "alt.swordmanPartial": "Character close-up",
    "alt.swordman": "Character",
    "nav.trailer": "TRAILER",
    "nav.about": "About",
    "nav.deviation": "Scenario",
    "nav.qa": "FAQ",
    "nav.restrictions": "Restrictions",
    "nav.contact": "Join",
    "nav.audio": "Play Audio",
    "nav.language": "Change language",
    "nav.enableSound": "Enable sound",

    "hero.title": "Are you ready to survive?",
    "hero.tagline": "Download Once Human today and join the fight against mutated foes!",
    "hero.cta": "Survive together!",
    "hero.bottomTitle": "G<b>a</b>ming",

    "about.kicker": "Welcome to Once Human",
    "about.title": "Disc<b>o</b>ver the world's l<b>a</b>rgest <br /> shared adventure",
    "about.p1": "Begin your adventure as a powerful monster!",
    "about.p2": "New Season, New Identity, New Environment, New Challenge",

    "features.kicker": "SCENARIO",
    "features.subtitle": "",
    "features.Endless Dream.title": "Endless <b>D</b>ream",
    "features.Endless Dream.desc":
      "As the nightmare mist gradually spreads and erodes the Nalcott, Metas, all you can do is maintain your sanity, purify the fog, and eliminate the source of the nightmares. Break free from the layers of fear and restore the world to its former glory.",
    "features.prismversesClash.title": "PRISMVERSE'S <b>C</b>LASH",
    "features.prismversesClash.desc":
      "The Mayflies and Rosetta are locked in a ghastly rivalry, and you are compelled to align with one. Their interests collide as they both seek to harness the powers of a unique breed of deviations known as Prism Deviations to avert the imminent catastrophe looming over the world.",
    "features.deviation.title": "Deviation: Survive, Capture,<br /><b>P</b>reserve",
    "features.deviation.desc":
      "A gamified social hub, adding a new dimension of play to social interaction for Web3 communities.",
    "features.theWayOfWinter.title": "THE WAY OF <b>W</b>INTER",
    "features.theWayOfWinter.desc":
      "The relentless march of time continues. From the desolate Eastern wilderness to the frigid Northern mountains, new adversaries, allies, and even more abhorrent deviants await! Your next harrowing journey is about to begin.",
    "features.more.title": "M<b>o</b>re co<b>m</b>ing so<b>o</b>n!",

    "story.kicker": "Resources & Support",
    "story.title": "<b>F</b>AQ",
    "story.footer":
      "Can't find what you're looking for? Join the community for direct support from the team and other players.",
    "story.cta": "Join the community",
    "story.faq.q1": "What are the recommended system specifications?",
    "story.faq.a1":
      "For the most immersive experience, we recommend an Intel Core i7-7700 or equivalent, 16GB of RAM, and an NVIDIA GTX 1060 (6GB) or higher. An SSD with at least 55GB of available space is essential for optimal performance.",
    "story.faq.q2": "How does the Seasonal Progression system work?",
    "story.faq.a2":
      "Our seasonal structure ensures a dynamic world with fresh challenges. While certain environmental progress resets each season, core assets such as blueprints, cosmetic unlocks, and personal territory developments are permanently preserved.",
    "story.faq.q3": "Is cross-platform synchronization supported?",
    "story.faq.a3":
      "Yes, the experience is fully unified across PC and mobile platforms. Players can seamlessly transition between NetEase, Steam, and Epic Games accounts with full progression persistence.",
    "story.faq.q4": "Are collaborative building features available?",
    "story.faq.a4":
      "Collaboration is at the heart of the experience. Players can form Hive squads or larger Warbands to establish shared territories, manage complex resource networks, and coordinate large-scale defensive operations.",

    "restrictions.kicker": "Compliance & Usage",
    "restrictions.title": "Access <b>R</b>estrictions",
    "restrictions.item.windowsOnly": "Windows Only",
    "restrictions.item.noVpn": "No VPN",
    "restrictions.item.noDatacenterIsp": "No data center ISP",
    "restrictions.item.noBotTraffic": "No Bot Traffic",
    "restrictions.item.noEmailTraffic": "No Email Traffic",
    "restrictions.item.noIncentTraffic": "No Incent Traffic",
    "restrictions.item.noBrandBidding": "No Brand Bidding",
    "restrictions.item.noIllegalWebsites": "No Illegal Websites",

    "restrictions.note":
      "Please ensure all traffic and access patterns strictly comply with these rules. Non-compliance may result in permanent account suspension and forfeiture of earned rewards.",
    "contact.title": "Let's b<b>u</b>ild the<br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether",
    "contact.kicker": "Join Once Human",
    
    "contact.cta": "Contact Us",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
  },
  fr: {
    "meta.title": "Once Human",
    "meta.description":
      "Page officielle Once Human : bande-annonce, scénario, FAQ, restrictions et liens de communauté.",
    "alt.logo": "Logo Once Human",
    "alt.aboutBackground": "Arrière-plan du monde Once Human",
    "alt.contactBg1": "Arrière-plan contact 1",
    "alt.contactBg2": "Arrière-plan contact 2",
    "alt.swordmanPartial": "Gros plan du personnage",
    "alt.swordman": "Personnage",
    "nav.trailer": "BANDE-ANNONCE",
    "nav.about": "À propos",
    "nav.deviation": "SCENARIO",
    "nav.qa": "FAQ",
    "nav.restrictions": "Restrictions",
    "nav.contact": "Rejoindre",
    "nav.audio": "Jouer l’audio",
    "nav.language": "Changer la langue",
    "nav.enableSound": "Activer le son",

    "hero.title": "Prêt à survivre ?",
    "hero.tagline": "Télécharge Once Human dès aujourd’hui et combats des ennemis mutés !",
    "hero.cta": "Survivre ensemble !",
    "hero.bottomTitle": "G<b>a</b>ming",

    "about.kicker": "Bienvenue sur Once Human",
    "about.title": "Déc<b>o</b>uvrez la plus gr<b>a</b>nde <br /> aventure partagée au monde",
    "about.p1": "Le Game of Games commence — votre vie, désormais un MMORPG épique",
    "about.p2": "Once Human réunit tous les joueurs, tous jeux et plateformes confondus",

    "features.kicker": "Scénario",
    "features.subtitle":
      "Plongez dans un univers riche et en constante expansion, où une variété de contenus se rejoint pour créer une expérience superposée et interconnectée dans votre monde.",
    "features.Endless Dream.title": "Rêve sans f<b>i</b>n",
    "features.Endless Dream.desc":
      "À mesure que la brume des cauchemars se propage et ronge Nalcott, Metas, tout ce que vous pouvez faire est de garder votre sang-froid, purifier le brouillard et éliminer la source des cauchemars. Brisez les couches de peur et rendez au monde sa gloire d’antan.",
    "features.prismversesClash.title": "CHOC DU PRISMVERSE <b>C</b>",
    "features.prismversesClash.desc":
      "Une collection NFT inspirée par l’anime et le gaming — un IP prêt à s’étendre.",
    "features.deviation.title": "Déviation : Survivre, Capturer,<br /><b>P</b>réserver",
    "features.deviation.desc":
      "Un hub social gamifié, ajoutant une nouvelle dimension à l’interaction sociale pour les communautés Web3.",
    "features.theWayOfWinter.title": "LA VOIE DE L’<b>H</b>IVER",
    "features.theWayOfWinter.desc":
      "Un agent IA cross-world — pour un gameplay plus fun et plus efficace.",
    "features.more.title": "Pl<b>u</b>s b<b>i</b>ent<b>ô</b>t !",

    "story.kicker": "Ressources & Support",
    "story.title": "<b>F</b>AQ",
    "story.footer":
      "Vous ne trouvez pas ce que vous cherchez ? Rejoignez la communauté pour obtenir de l’aide directe de l’équipe et des autres joueurs.",
    "story.cta": "Rejoindre la communauté",
    "story.faq.q1": "Quelles sont les spécifications système recommandées ?",
    "story.faq.a1":
      "Pour une expérience optimale, nous recommandons un Intel Core i7-7700 ou équivalent, 16 Go de RAM et une NVIDIA GTX 1060 (6 Go) ou supérieure. Un SSD avec au moins 55 Go d’espace libre est essentiel pour les meilleures performances.",
    "story.faq.q2": "Comment fonctionne la progression saisonnière ?",
    "story.faq.a2":
      "Notre structure saisonnière maintient un monde dynamique et de nouveaux défis. Certains progrès liés à l’environnement sont réinitialisés chaque saison, mais les éléments clés comme les blueprints, cosmétiques et développements de territoire personnel sont conservés.",
    "story.faq.q3": "La synchronisation cross-platform est-elle supportée ?",
    "story.faq.a3":
      "Oui, l’expérience est unifiée sur PC et mobile. Vous pouvez passer d’un compte NetEase, Steam ou Epic Games à l’autre avec une progression persistante.",
    "story.faq.q4": "Y a-t-il des fonctionnalités de construction en collaboration ?",
    "story.faq.a4":
      "La collaboration est au cœur de l’expérience. Les joueurs peuvent former des Hive squads ou des Warbands pour établir des territoires partagés, gérer des réseaux de ressources et coordonner des défenses à grande échelle.",

    "restrictions.kicker": "Conformité & Usage",
    "restrictions.title": "R<b>e</b>strictions d’accès",
    "restrictions.item.windowsOnly": "Windows uniquement",
    "restrictions.item.noVpn": "VPN interdit",
    "restrictions.item.noDatacenterIsp": "ISP data center interdit",
    "restrictions.item.noBotTraffic": "Trafic bot interdit",
    "restrictions.item.noEmailTraffic": "Trafic email interdit",
    "restrictions.item.noIncentTraffic": "Trafic incentivé interdit",
    "restrictions.item.noBrandBidding": "Enchères sur marque interdites",
    "restrictions.item.noIllegalWebsites": "Sites illégaux interdits",
    "restrictions.note":
      "Veuillez vous assurer que tout le trafic et les schémas d’accès respectent strictement ces règles. Le non-respect peut entraîner une suspension permanente du compte et la perte des récompenses obtenues.",

    "contact.kicker": "Rejoindre Once Human",
    "contact.title": "Construis<b>o</b>ns<br /> la nouvelle ère <br /> du j<b>e</b>u ensemble",
    "contact.cta": "Nous contacter",

    "footer.rights": "Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions générales",
  },
  de: {
    "meta.title": "Once Human",
    "meta.description":
      "Offizielle Once-Human-Seite: Trailer, Szenario, FAQ, Einschränkungen und Community-Links.",
    "alt.logo": "Once-Human-Logo",
    "alt.aboutBackground": "Once-Human-Welthintergrund",
    "alt.contactBg1": "Kontakt-Hintergrund 1",
    "alt.contactBg2": "Kontakt-Hintergrund 2",
    "alt.swordmanPartial": "Charakter-Nahaufnahme",
    "alt.swordman": "Charakter",
    "nav.trailer": "TRAILER",
    "nav.about": "Über",
    "nav.deviation": "Szenario",
    "nav.qa": "FAQ",
    "nav.restrictions": "Einschränkungen",
    "nav.contact": "Beitreten",
    "nav.audio": "Audio abspielen",
    "nav.language": "Sprache wechseln",
    "nav.enableSound": "Ton aktivieren",

    "hero.title": "Bist du bereit zu überleben?",
    "hero.tagline": "Lade Once Human heute herunter und kämpfe gegen mutierte Gegner!",
    "hero.cta": "Überlebt zusammen!",
    "hero.bottomTitle": "G<b>a</b>ming",

    "about.kicker": "Willkommen bei Once Human",
    "about.title": "Entd<b>e</b>cke das gr<b>ö</b>ßte <br /> gemeinsame Abenteuer der Welt",
    "about.p1": "Das Game of Games beginnt – dein Leben, jetzt ein episches MMORPG",
    "about.p2": "Once Human vereint alle Spieler über unzählige Spiele und Plattformen hinweg",

    "features.kicker": "Szenario",
    "features.subtitle":
      "Tauche ein in ein reiches und stetig wachsendes Universum, in dem vielfältige Inhalte zu einer vernetzten Overlay-Erfahrung in deiner Welt zusammenlaufen.",
    "features.Endless Dream.title": "Endloser <b>T</b>raum",
    "features.Endless Dream.desc":
      "Während sich der Albtraumnebel allmählich ausbreitet und Nalcott zersetzt, Metas, bleibt dir nur, deinen Verstand zu bewahren, den Nebel zu reinigen und die Quelle der Albträume auszuschalten. Befreie dich aus den Schichten der Angst und stelle die frühere Pracht der Welt wieder her.",
    "features.prismversesClash.title": "PRISMVERSE <b>K</b>AMPF",
    "features.prismversesClash.desc":
      "Eine von Anime und Gaming inspirierte NFT-Kollektion – die IP ist bereit für Expansion.",
    "features.deviation.title": "Abweichung: Überleben, Erobern,<br /><b>B</b>ewahren",
    "features.deviation.desc":
      "Ein gamifizierter Social Hub, der Web3-Communities eine neue Dimension der Interaktion bietet.",
    "features.theWayOfWinter.title": "DER WEG DES <b>W</b>INTERS",
    "features.theWayOfWinter.desc":
      "Ein KI-Agent über Welten hinweg – macht dein Gameplay unterhaltsamer und produktiver.",
    "features.more.title": "M<b>e</b>hr k<b>o</b>mmt b<b>a</b>ld!",

    "story.kicker": "Ressourcen & Support",
    "story.title": "<b>F</b>AQ",
    "story.footer":
      "Du findest nicht, was du suchst? Tritt unserer Community bei, um direkten Support vom Team und anderen Spielern zu erhalten.",
    "story.cta": "Community beitreten",
    "story.faq.q1": "Welche Systemanforderungen werden empfohlen?",
    "story.faq.a1":
      "Für das beste Erlebnis empfehlen wir einen Intel Core i7-7700 oder gleichwertig, 16 GB RAM und eine NVIDIA GTX 1060 (6 GB) oder besser. Eine SSD mit mindestens 55 GB freiem Speicher ist für optimale Leistung wichtig.",
    "story.faq.q2": "Wie funktioniert das saisonale Fortschrittssystem?",
    "story.faq.a2":
      "Unsere saisonale Struktur sorgt für eine dynamische Welt mit neuen Herausforderungen. Bestimmter umgebungsbezogener Fortschritt wird jede Saison zurückgesetzt, aber wichtige Dinge wie Blueprints, kosmetische Freischaltungen und persönliche Gebietsentwicklungen bleiben erhalten.",
    "story.faq.q3": "Wird plattformübergreifende Synchronisierung unterstützt?",
    "story.faq.a3":
      "Ja, das Erlebnis ist auf PC und Mobile einheitlich. Du kannst nahtlos zwischen NetEase-, Steam- und Epic-Games-Konten wechseln – mit persistenter Progression.",
    "story.faq.q4": "Gibt es kollaborative Bau-Features?",
    "story.faq.a4":
      "Zusammenarbeit steht im Mittelpunkt. Spieler können Hive-Squads oder größere Warbands bilden, gemeinsame Gebiete aufbauen, Ressourcennetze verwalten und groß angelegte Verteidigungen koordinieren.",

    "restrictions.kicker": "Compliance & Nutzung",
    "restrictions.title": "Zugangs<b>b</b>eschränkungen",
    "restrictions.item.windowsOnly": "Nur Windows",
    "restrictions.item.noVpn": "Kein VPN",
    "restrictions.item.noDatacenterIsp": "Kein Rechenzentrum-ISP",
    "restrictions.item.noBotTraffic": "Kein Bot-Traffic",
    "restrictions.item.noEmailTraffic": "Kein E-Mail-Traffic",
    "restrictions.item.noIncentTraffic": "Kein Incent-Traffic",
    "restrictions.item.noBrandBidding": "Kein Brand-Bidding",
    "restrictions.item.noIllegalWebsites": "Keine illegalen Websites",
    "restrictions.note":
      "Bitte stelle sicher, dass sämtlicher Traffic und Zugriffsmuster diese Richtlinien strikt einhalten. Verstöße können zu einer permanenten Kontosperre und dem Verlust verdienter Belohnungen führen.",

    "contact.kicker": "Once Human beitreten",
    "contact.title": "Lass uns die<br /> neue Ära des <br /> G<b>a</b>mings b<b>a</b>uen",
    "contact.cta": "Kontakt",

    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.privacy": "Datenschutz",
    "footer.terms": "AGB",
  },
  nl: {
    "meta.title": "Once Human",
    "meta.description":
      "Officiële Once Human-pagina: trailer, scenario, FAQ, beperkingen en communitylinks.",
    "alt.logo": "Once Human-logo",
    "alt.aboutBackground": "Once Human-wereldachtergrond",
    "alt.contactBg1": "Contactachtergrond 1",
    "alt.contactBg2": "Contactachtergrond 2",
    "alt.swordmanPartial": "Close-up van personage",
    "alt.swordman": "Personage",
    "nav.trailer": "TRAILER",
    "nav.about": "Over",
    "nav.deviation": "Scenario",
    "nav.qa": "FAQ",
    "nav.restrictions": "Beperkingen",
    "nav.contact": "Meedoen",
    "nav.audio": "Audio afspelen",
    "nav.language": "Taal wijzigen",
    "nav.enableSound": "Geluid aanzetten",

    "hero.title": "Ben je klaar om te overleven?",
    "hero.tagline": "Download Once Human vandaag en vecht tegen gemuteerde vijanden!",
    "hero.cta": "Overleef samen!",
    "hero.bottomTitle": "G<b>a</b>ming",

    "about.kicker": "Welkom bij Once Human",
    "about.title": "Ontd<b>e</b>k 's werelds gr<b>o</b>otste <br /> gedeelde avontuur",
    "about.p1": "The Game of Games begint—jouw leven, nu een epische MMORPG",
    "about.p2": "Once Human verenigt elke speler van talloze games en platformen",

    "features.kicker": "Scenario",
    "features.subtitle":
      "Dompel je onder in een rijk en steeds groeiend universum, waar een breed aanbod samenkomt in een verbonden overlay-ervaring in jouw wereld.",
    "features.Endless Dream.title": "Eindeloze <b>D</b>room",
    "features.Endless Dream.desc":
      "Terwijl de nachtmerriemist zich geleidelijk verspreidt en Nalcott aantast, Metas, kun je alleen je verstand bewaren, de nevel zuiveren en de bron van de nachtmerries uitschakelen. Breek door de lagen van angst heen en herstel de wereld in haar oude glorie.",
    "features.prismversesClash.title": "PRISMVERSE <b>C</b>LASH",
    "features.prismversesClash.desc":
      "Een NFT-collectie geïnspireerd op anime en gaming—een IP klaar om uit te breiden.",
    "features.deviation.title": "Afwijking: Overleven, Vangen,<br /><b>B</b>ewaren",
    "features.deviation.desc":
      "Een gamified social hub die een nieuwe dimensie toevoegt aan sociale interactie voor Web3-community’s.",
    "features.theWayOfWinter.title": "DE WEG VAN DE <b>W</b>INTER",
    "features.theWayOfWinter.desc":
      "Een cross-world AI-agent—maakt je gameplay leuker en productiever.",
    "features.more.title": "M<b>e</b>er k<b>o</b>mt s<b>n</b>el!",

    "story.kicker": "Resources & Support",
    "story.title": "<b>F</b>AQ",
    "story.footer":
      "Niet gevonden wat je zoekt? Word lid van onze community voor directe support van het team en andere spelers.",
    "story.cta": "Word lid van de community",
    "story.faq.q1": "Wat zijn de aanbevolen systeemspecificaties?",
    "story.faq.a1":
      "Voor de beste ervaring raden we een Intel Core i7-7700 of vergelijkbaar aan, 16 GB RAM en een NVIDIA GTX 1060 (6 GB) of hoger. Een SSD met minstens 55 GB vrije ruimte is essentieel voor optimale prestaties.",
    "story.faq.q2": "Hoe werkt het seizoensprogressiesysteem?",
    "story.faq.a2":
      "Onze seizoensstructuur zorgt voor een dynamische wereld met nieuwe uitdagingen. Sommige omgevingsprogressie wordt elk seizoen gereset, maar kernassets zoals blueprints, cosmetische unlocks en persoonlijke territoriumontwikkeling blijven behouden.",
    "story.faq.q3": "Wordt cross-platform synchronisatie ondersteund?",
    "story.faq.a3":
      "Ja, de ervaring is volledig verenigd op pc en mobiel. Spelers kunnen naadloos wisselen tussen NetEase-, Steam- en Epic Games-accounts met volledige voortgangsbehoud.",
    "story.faq.q4": "Zijn er collaboratieve bouwfuncties beschikbaar?",
    "story.faq.a4":
      "Samenwerking staat centraal. Spelers kunnen Hive-squads of grotere Warbands vormen om gedeelde territoria op te bouwen, complexe resourcenetwerken te beheren en grootschalige verdedigingen te coördineren.",

    "restrictions.kicker": "Compliance & Gebruik",
    "restrictions.title": "Toegangs<b>b</b>eperkingen",
    "restrictions.item.windowsOnly": "Alleen Windows",
    "restrictions.item.noVpn": "Geen VPN",
    "restrictions.item.noDatacenterIsp": "Geen datacenter-ISP",
    "restrictions.item.noBotTraffic": "Geen botverkeer",
    "restrictions.item.noEmailTraffic": "Geen e-mailverkeer",
    "restrictions.item.noIncentTraffic": "Geen incentive-verkeer",
    "restrictions.item.noBrandBidding": "Geen merkbieden",
    "restrictions.item.noIllegalWebsites": "Geen illegale websites",
    "restrictions.note":
      "Zorg ervoor dat al het verkeer en alle toegangspatronen strikt aan deze richtlijnen voldoen. Overtreding kan leiden tot een permanente accountschorsing en verlies van verdiende beloningen.",

    "contact.kicker": "Word lid van Once Human",
    "contact.title": "Laten we<br /> een nieuw tijdperk <br /> van g<b>a</b>ming b<b>o</b>uwen",
    "contact.cta": "Neem contact op",

    "footer.rights": "Alle rechten voorbehouden.",
    "footer.privacy": "Privacybeleid",
    "footer.terms": "Algemene voorwaarden",
  },
  no: {
    "meta.title": "Once Human",
    "meta.description":
      "Offisiell Once Human-side: trailer, scenario, FAQ, begrensninger og community-lenker.",
    "alt.logo": "Once Human-logo",
    "alt.aboutBackground": "Once Human-verdenbakgrunn",
    "alt.contactBg1": "Kontaktbakgrunn 1",
    "alt.contactBg2": "Kontaktbakgrunn 2",
    "alt.swordmanPartial": "Nærbilde av figur",
    "alt.swordman": "Figur",
    "nav.trailer": "TRAILER",
    "nav.about": "Om",
    "nav.deviation": "Scenario",
    "nav.qa": "FAQ",
    "nav.restrictions": "Begrensninger",
    "nav.contact": "Bli med",
    "nav.audio": "Spill av lyd",
    "nav.language": "Bytt språk",
    "nav.enableSound": "Slå på lyd",

    "hero.title": "Er du klar til å overleve?",
    "hero.tagline": "Last ned Once Human i dag og bli med i kampen mot muterte fiender!",
    "hero.cta": "Overlev sammen!",
    "hero.bottomTitle": "G<b>a</b>ming",

    "about.kicker": "Velkommen til Once Human",
    "about.title": "Oppd<b>a</b>g verdens st<b>ø</b>rste <br /> delte eventyr",
    "about.p1": "Game of Games starter—livet ditt, nå et episk MMORPG",
    "about.p2": "Once Human samler alle spillere på tvers av utallige spill og plattformer",

    "features.kicker": "Scenario",
    "features.subtitle":
      "Fordyp deg i et rikt og stadig voksende univers, der et bredt spekter av innhold møtes i en sammenkoblet overlay-opplevelse i din verden.",
    "features.Endless Dream.title": "Endeløs <b>D</b>røm",
    "features.Endless Dream.desc":
      "Når mareritt-tåken gradvis sprer seg og tærer på Nalcott, Metas, kan du bare holde forstanden, rense tåken og eliminere kilden til marerittene. Bryt deg fri fra lagene av frykt og gjenopprett verden til sin tidligere storhet.",
    "features.prismversesClash.title": "PRISMVERSE <b>K</b>AMP",
    "features.prismversesClash.desc":
      "En NFT-kolleksjon inspirert av anime og gaming – en IP klar for vekst.",
    "features.deviation.title": "Avvik: Overlev, Fang,<br /><b>B</b>evar",
    "features.deviation.desc":
      "Et gamifisert sosialt knutepunkt som gir en ny dimensjon til sosial interaksjon for Web3-fellesskap.",
    "features.theWayOfWinter.title": "VINTERENS <b>V</b>EI",
    "features.theWayOfWinter.desc":
      "En AI-agent på tvers av verdener – gjør spillopplevelsen morsommere og mer produktiv.",
    "features.more.title": "M<b>e</b>r k<b>o</b>mmer s<b>n</b>art!",

    "story.kicker": "Ressurser & Support",
    "story.title": "<b>F</b>AQ",
    "story.footer":
      "Finner du ikke det du leter etter? Bli med i fellesskapet for direkte støtte fra teamet og andre spillere.",
    "story.cta": "Bli med i fellesskapet",
    "story.faq.q1": "Hva er anbefalte systemspesifikasjoner?",
    "story.faq.a1":
      "For best mulig opplevelse anbefaler vi Intel Core i7-7700 eller tilsvarende, 16 GB RAM og NVIDIA GTX 1060 (6 GB) eller bedre. En SSD med minst 55 GB ledig plass er viktig for optimal ytelse.",
    "story.faq.q2": "Hvordan fungerer sesongbasert progresjon?",
    "story.faq.a2":
      "Sesongstrukturen gir en dynamisk verden med nye utfordringer. Noe miljøprogresjon tilbakestilles hver sesong, men kjerneverdier som blueprints, kosmetiske opplåsinger og personlig territoriumutvikling bevares.",
    "story.faq.q3": "Støttes synkronisering på tvers av plattformer?",
    "story.faq.a3":
      "Ja, opplevelsen er samlet på PC og mobil. Spillere kan sømløst bytte mellom NetEase-, Steam- og Epic Games-kontoer med vedvarende progresjon.",
    "story.faq.q4": "Finnes samarbeidende byggefunksjoner?",
    "story.faq.a4":
      "Samarbeid er kjernen i opplevelsen. Spillere kan danne Hive squads eller større Warbands for å etablere delte territorier, styre ressursnettverk og koordinere forsvar i stor skala.",

    "restrictions.kicker": "Regler & Bruk",
    "restrictions.title": "Tilgangs<b>b</b>egrensninger",
    "restrictions.item.windowsOnly": "Kun Windows",
    "restrictions.item.noVpn": "Ingen VPN",
    "restrictions.item.noDatacenterIsp": "Ingen datasenter-ISP",
    "restrictions.item.noBotTraffic": "Ingen bot-trafikk",
    "restrictions.item.noEmailTraffic": "Ingen e-post-trafikk",
    "restrictions.item.noIncentTraffic": "Ingen incentiv-trafikk",
    "restrictions.item.noBrandBidding": "Ingen brand-bidding",
    "restrictions.item.noIllegalWebsites": "Ingen ulovlige nettsider",
    "restrictions.note":
      "Sørg for at all trafikk og tilgangsmønstre følger disse retningslinjene strengt. Brudd kan føre til permanent suspensjon av konto og tap av opptjente belønninger.",

    "contact.kicker": "Bli med i Once Human",
    "contact.title": "La oss b<b>y</b>gge<br /> en ny æra <br /> for g<b>a</b>ming sammen",
    "contact.cta": "Kontakt oss",

    "footer.rights": "Alle rettigheter forbeholdt.",
    "footer.privacy": "Personvern",
    "footer.terms": "Vilkår",
  },
} as const;

export type TranslationKey = keyof (typeof TRANSLATIONS)["en"];

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const normalizeLocale = (value: string | null | undefined): Locale => {
  if (!value) return "en";
  const v = value.toLowerCase();
  if (v.startsWith("fr")) return "fr";
  if (v.startsWith("de")) return "de";
  if (v.startsWith("nl")) return "nl";
  if (v.startsWith("no") || v.startsWith("nb") || v.startsWith("nn")) return "no";
  return "en";
};

const getInitialLocale = (): Locale => {
  const stored = typeof window === "undefined" ? null : window.localStorage.getItem(STORAGE_KEY);
  if (stored) return normalizeLocale(stored);
  const browser =
    typeof navigator === "undefined" ? undefined : navigator.language ?? navigator.languages?.[0];
  return normalizeLocale(browser);
};

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.lang = locale;

    const title = TRANSLATIONS[locale]?.["meta.title"] ?? TRANSLATIONS.en["meta.title"];
    document.title = title;

    const description =
      TRANSLATIONS[locale]?.["meta.description"] ?? TRANSLATIONS.en["meta.description"];
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      setLocale,
      t: (key) => TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS.en[key] ?? key,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
