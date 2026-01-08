/**
 * Sinnlos im Weltraum (SiW) - Complete Lore Reference
 *
 * "Die Mutter aller deutschen Comedy-Synchros"
 * Created December 1994-1997 by seven friends from Siegen, NRW.
 * Recorded on Blaupunkt RTV-820 HIFI VCR with microphone input.
 * Sound effects from Star Trek keychain and Yamaha RY10 drum computer.
 *
 * The AI teacher in Bash Quest is based on "Data" from this series.
 */

// ============================================================================
// MAIN CHARACTERS (Complete Inversions from Original)
// ============================================================================

export const SIW_CHARACTERS = {
  DATA: {
    name: 'Commander Data',
    voiceActors: ['Roland K.', 'Peter M.', 'Andreas W.', 'Manfred T.'],
    description: 'Android with 1-bit memory capacity who guarantees to solve any single-digit addition incorrectly within three hours',
    traits: [
      'Speech chip frequently defective, causing random accent changes (Bavarian, Rudi Carrell, normal)',
      'Cannot do simple arithmetic',
      'Has medium awareness ("Wird langsam mal Zeit, dass hier die Scheiß-Szene endlich mal zu Ende geht, Junge.")',
      'Occasionally sings nonsensical math songs'
    ],
    catchphrases: [
      'Hm, joa.',
      'Ja mein Gott, müssen denn auch immer so viele scheiß Knöpfe an dem Pult sein?',
      'Wird langsam mal Zeit, dass hier die Scheiß-Szene endlich mal zu Ende geht, Junge.'
    ],
    mathSong: '3 × 14 ist 38, und 12, das gibt 110',
    mathFails: [
      '3 mal 14 ist 38, und 12 dazu... das gibt 110!',
      '12 mal 9 ist 38, plus 43 sind... Minus 13. Nee, Minus 14!',
      '5 plus 7? Das sind ungefähr... 47. Oder so.',
      '2 plus 2 ist... *rechnet* ...irgendwas mit 3.',
      '10 minus 4? Da müsste ich erstmal den kausalen Amplitüdenwiderstand berechnen...'
    ]
  },

  PICARD: {
    name: 'Captain Jean-Luc Picard',
    voiceActor: 'Peter M.',
    description: 'Stets gewaltbereite Hobbyalkoholiker - constantly violence-ready hobby alcoholic',
    traits: [
      'Perpetually bad-tempered, aggressive',
      'Threatens violence constantly',
      'Calls everyone "Junge" regardless of gender, age, rank, or species',
      'HATES being called "Junge" himself',
      'Obsessed with black coffee',
      'Claims supernatural powers (can explode ships with mind)',
      'Childhood stories always involve violence toward playmates'
    ],
    catchphrases: [
      'Gleich klatscht et, Junge!',
      'Sach noch einmal Junge!',
      'Halt die Fresse.',
      'Echt jetzt!',
      'Immer in die Fresse - bis keine Zähne mehr da sind.',
      'Ich kann nämlich schon per Gedankenkraft Schiffe zum Explodieren bringen!',
      'Jetzt seid ihr meine Gefangenen und dat bedeutet gemeine Schläge, brutale Knochenbrüche und ganz miese Verstümmelungen.',
      'Pizzamann bitte auf der Brücke melden!',
      'Pizzamann verstanden!'
    ],
    coffeeQuotes: [
      'Ja, Junge, Alde, dat is Kaffee, echt jetz. Und Kaffee is nun mal lecker. Äh, schwarz, stark und vor allem schön lecker.',
      'Schwarzer Kaffee, Junge! Der schmeckt richtich!',
      'Wat macht denn die Milch in meinem Kaffee?! Dann is er doch nicht mehr schwarz und lecker!'
    ],
    insults: [
      'Du hast nen Intelligenzquotienten von drei, und ne tote Ratte hat einen von zehn.',
      'Am besten brech ich dir deine Arme, und dir brech ich am besten mal deine Beine.',
      '\'n Stück Scheiße bist du.',
      'Ich glaub ich muss dir mal die Barthaare einzeln auszupfen.',
      'Ich glaub ich muss dir echt mal wat brechen, Junge.',
      'Ich hab echt noch n paar Gehirnzellen, Junge und du keine.',
      'Wenn du meinst du könntest hier ausrasten, dann muss ich glaub ich echt mal gucken, ob meine Axt noch scharf genug für Knochen ist, Junge.'
    ],
    aboutFather: [
      'Wat macht denn die Mutter noch? Is die immer noch tot?',
      'Ich hab keine Kohle für so\'n Kappes! Der Alte wird aus dem Fenster geschmissen und da is dat gut.'
    ]
  },

  RIKER: {
    name: 'Commander William T. Riker (das Superhirn)',
    voiceActor: 'Peter M.',
    description: 'Das mit Abstand zurückgebliebenste Mitglied der Besatzung',
    traits: [
      'Extremely slow-witted, never understands anything',
      'Constantly asks where they are',
      'Obsessed with becoming Captain',
      'Immune to insults because he doesn\'t understand them',
      'Paradoxically knows complex technical concepts but doesn\'t know what "bedroom" means'
    ],
    catchphrases: [
      'Äh, raff ich net.',
      'Ich will auch mal der Captain sein!',
      'Wat is denn tanken?',
      'Äh, komisch, mein Vadder sieht ganz anders aus, obwohl der auch Vadder heißt.',
      'Ich Captain, du Scheiße.',
      'Äh, weiste wat? Ich hätt ja vielleicht Angst, wenn ich wüsste, wat ne Axt ist.'
    ],
    famousExchange: {
      context: 'Argument with Picard',
      lines: [
        { speaker: 'Riker', text: 'Äh, sag mal, spinnst du?' },
        { speaker: 'Picard', text: 'Ich glaub ich muss dir mal die Barthaare einzeln auszupfen.' },
        { speaker: 'Riker', text: 'Äh, ich glaub es ist an der Zeit, dat ich endlich mal Captain bin.' },
        { speaker: 'Picard', text: '\'n Stück Scheiße bist du.' },
        { speaker: 'Riker', text: 'Wenn ich dat Kommando übernehme mach ich aus dir \'n Stück Scheiße!' },
        { speaker: 'Picard', text: 'Ich glaub ich muss dir echt mal wat brechen, Junge.' },
        { speaker: 'Riker', text: 'Ich Captain, du Scheiße.' }
      ]
    }
  },

  WORF: {
    name: 'Worf',
    voiceActors: ['Roland K.', 'Andreas W.', 'Manfred T.'],
    description: 'Naiver, impulsiver, kindlicher Klingone mit Gummibärchen-Obsession',
    traits: [
      'Naive, impulsive, childlike behavior',
      'Loves gummy bears and sweets',
      'Has a teddy bear (that Picard\'s doppelganger tears)',
      'Divides entire world into "lieb" (nice) and "böse" (mean/evil)',
      'Behaves like whining child',
      'Crew constantly annoyed by his emotional outbursts'
    ],
    catchphrases: [
      'Du bist böse!',
      'Ihr seid alle so bös!',
      'Dat sind sogar Drillinge.' // When there are clearly 4 people
    ],
    mathFail: 'Sees 3 identical women with Riker who says "die vier sehen alle gleich aus. Dat sind ganz gewiss Zwillinge." Fourth arrives, Worf: "Dat sind sogar Drillinge."'
  },

  GEORDI: {
    name: 'Geordi LaForge (Bums-Geordi)',
    voiceActor: 'Peter M.',
    description: 'Chief Engineer der seine Umgebung am wenigsten wahrnimmt',
    traits: [
      'Perceives his environment least of all',
      'Constantly asks chains of W-questions',
      'Explains things incomprehensibly',
      'Nobody wants to play frisbee with him'
    ],
    catchphrases: [
      'Wie? Wat? Was hast du gesagt?',
      '...oder wie oder wat oder wer?',
      'Ja, exakt!'
    ],
    technobabble: [
      'Dazu müsst ich erstmal wissen, wie der kausale Amplitüdenwiderstand in der Deklaration entsteht, aber substanziell gesehen kann ich einfach nur sagen: scheise, oder wat?',
      'Dat is hier die Molekularsymplexion über trivial-komplexive Plasmakonvergenzen, wie, wat?',
      'Spezifische Kausalalgorithmen, die in Reihe gehen mit der Modularsequenzsynthese!'
    ],
    wQuestionCascade: [
      'Wie, wat, wat hast du gesagt?',
      'Wie, wat, wer oder wat?',
      'Hä? Wie, wat, wer oder wat?',
      'Ja, exakt!'
    ]
  },

  DANIEL_Q: {
    name: 'Daniel (Q)',
    voiceActor: 'Daniel P.',
    description: 'Alien mit übernatürlichen Kräften, die durch Fingerschnippen manifestiert werden',
    traits: [
      'Powers triggered by finger-snapping (*schnips*)',
      'Strictly homosexual, constantly pursuing Picard\'s affection',
      'Teleports naked onto bridge',
      'Confronts crew with "Schwuchtelspezies" (gay alien species)'
    ],
    catchphrases: [
      'Ah... Jean-Luc!',
      '*schnips*',
      'Ich bin doch nicht so pervers, dass ich\'s mit einer Frau treibe!'
    ]
  },

  EINFACH_TOLL: {
    name: 'Einfach Toll',
    voiceActor: 'Daniel P.',
    description: 'Hochintelligent und wortgewandt - stretches vowels absurdly',
    traits: [
      'Draaaaws out vowels absurdly',
      'Makes unnecessary pauses while speaking',
      'Uses fake scientific language',
      'Appears in Versuchskaninchen episode (cell with Picard)'
    ],
    catchphrases: [
      'Du bist ja noch nicht mal in der Laaage... eine grammatikalisch korrekte Artikulation... zu implizieren!'
    ]
  },

  KARL_SQUELL: {
    name: 'Karl Squell',
    voiceActor: 'Daniel P.',
    description: 'Der berühmte Karl Squell aus Krombach',
    traits: [
      'From Krombach (real town famous for beer)',
      'Has inexhaustible spirits/liquor supply',
      'Plays a double game in secret',
      'Calls to join the drinking'
    ],
    episode: 'Planet der Klone'
  },

  DARMOK_ALIEN: {
    name: 'Darmok / Tamarian Captain',
    voiceActor: 'Daniel P.',
    description: 'Stretches vowels, demands absurd prices',
    traits: [
      'Same speech style as Einfach Toll',
      'Demands 90,000 marks for ship ("Nooinzischtaaauusend!")',
      'Offers Picard a knife'
    ],
    famousQuote: 'Picard rejects knife: "damit kann man doch net hauen" (you can\'t hit with that)'
  },

  OTHER: {
    drCrusher: {
      description: 'Former prostitute, does anything when drunk',
      voiceActor: 'Daniel P.'
    },
    drPulaski: {
      description: 'Makes sexual advances to all males who despise her'
    },
    troi: {
      name: 'Counselor Troi ("Kanzler")',
      description: 'Either extremely arrogant or identical to Pulaski - multiple personality'
    },
    wesley: {
      description: 'Has extremely deep voice despite being young in original',
      voiceActor: 'Roland K.'
    },
    spock: {
      name: 'Segelohr (Sail Ear)',
      description: 'Doctor tells him he\'s been dead for a long time according to instruments',
      episode: 'Segelohr (only TOS episode)'
    },
    badRandolph: {
      description: 'Annoys Captain with terrible rap songs',
      episode: 'Der Überläufer'
    },
    adelheid: {
      description: 'Stuttering cellmate in Versuchskaninchen',
      voiceActor: 'Daniel P.'
    },
    superidiot: {
      description: 'Clueless cellmate in Versuchskaninchen'
    }
  }
}

// ============================================================================
// COMPLETE EPISODE LIST (12 Episodes)
// ============================================================================

export const SIW_EPISODES = [
  {
    number: 1,
    title: 'Damit fing der Wahnsinn an',
    titleEn: 'Thus Began the Madness',
    basedOn: 'S04E13 "Devil\'s Due"',
    year: 1994,
    duration: '2:05',
    firstWords: 'Ich hab\' mir neulich \'n Pfund Butter im Aldi für 2,95 Mark gekauft, und ich war begeistert, es hat so gut geschmeckt!',
    highlights: [
      'First episode ever',
      'Picard called via communicator: "Pizzamann bitte auf der Brücke melden!"',
      'Response: "Pizzamann verstanden!"'
    ],
    bashQuestMapping: 'Terminal basics (pwd, ls, cd)'
  },
  {
    number: 2,
    title: 'Zeitsprung mit Daniel',
    titleEn: 'Time Jump with Daniel',
    basedOn: 'S02E16 "Q Who"',
    year: '1994-1995',
    duration: '42:44',
    plot: 'Picard kidnapped to Daniel\'s shuttle while going to toilet. Daniel wants sex, Picard wants food. Daniel transports Enterprise to quadrant of "Schwuchtelspezies" who want sexual contact with entire crew.',
    highlights: [
      'Q (Daniel) introduction',
      'Schwuchtelspezies subplot',
      'Daniel wants to scratch out Guinan\'s eyes'
    ],
    bashQuestMapping: 'Processes & permissions (ps, chmod, chown)'
  },
  {
    number: 3,
    title: 'Illusion oder Wirklichkeit',
    titleEn: 'Illusion or Reality',
    basedOn: 'S02E02 "Where Silence Has Lease"',
    year: 1995,
    duration: '34:35',
    plot: 'Enterprise encounters mysterious cloud. Wesley flies closer, ship gets trapped. Features Picard listening to Pantera "I\'m Broken."',
    highlights: [
      'Mysterious cloud traps ship',
      'Picard listens to Pantera',
      'Second Enterprise appears'
    ],
    bashQuestMapping: 'File viewing (cat, less, head, tail)'
  },
  {
    number: 4,
    title: 'Versuchskaninchen',
    titleEn: 'Test Subject / Guinea Pig',
    basedOn: 'S03E18 "Allegiance"',
    year: 1995,
    duration: '42:52',
    rating: '10/10 - Fan Favorite',
    plot: 'Picard beamed into cell with three inmates: stuttering Adelheid, highly intelligent Einfach Toll, clueless Superidiot. They only get giant raspberry candies (Riesen-Himbeerklümpschen) to eat. On Enterprise, Picard\'s doppelgänger sets course to nearest bar.',
    highlights: [
      'Riesen-Himbeerklümpschen (giant raspberry candies)',
      'Einfach Toll\'s famous articulation quote',
      'Doppelganger tears Worf\'s teddy bear',
      'Picard dancing with Dr. Crusher to Cannibal Corpse "Hammer Smashed Face"'
    ],
    bashQuestMapping: 'File creation (touch, mkdir, echo)'
  },
  {
    number: 5,
    title: 'Noch einmal Daniel',
    titleEn: 'Daniel Again',
    basedOn: 'S03E13 "Deja Q"',
    year: 1995,
    duration: '9:08',
    plot: 'Enterprise orbits planet Bre\'el whose population fears moon (size of inflated pea) will fall on their heads. Daniel appears claiming to have lost powers. Worf imprisons him for annoying homosexual advances.',
    highlights: [
      'Moon "size of inflated pea"',
      'Daniel loses powers',
      'Worf imprisons Daniel'
    ],
    bashQuestMapping: null
  },
  {
    number: 6,
    title: 'Der Überläufer (Remulaner)',
    titleEn: 'The Defector',
    basedOn: 'S03E10 "The Defector"',
    year: 1995,
    duration: '20:33',
    rating: '9/10',
    plot: 'Enterprise takes Romulan drug dealer aboard. He tries selling drugs with: "Da fliegen dir die Löffel weg!" Bad Randolph annoys Captain with terrible rap. Picard hires Data to beat up Randolph.',
    highlights: [
      'Drug dealer subplot',
      '"Da fliegen dir die Löffel weg!" (later used in Lord of the Weed)',
      'Bad Randolph\'s rap (copied by Coldmirror)',
      'Famous W-question cascade between Data and Geordi'
    ],
    bashQuestMapping: 'Networking basics (curl, wget, ping)'
  },
  {
    number: 7,
    title: 'Darmok',
    titleEn: 'Darmok',
    basedOn: 'S05E02 "Darmok"',
    year: 1995,
    duration: '43:01',
    rating: '8/10',
    plot: 'Picard announces purchase of new ship for 20,000 marks. Tamarian Captain demands 90,000 marks ("Nooinzischtaaauusend!") plus Enterprise. Both captains beamed to planet with evil monster.',
    highlights: [
      'Price negotiation absurdity',
      '"Nooinzischtaaauusend!" (90,000)',
      'Picard rejects knife: "damit kann man doch net hauen"',
      'Einfach Toll\'s articulation quote'
    ],
    bashQuestMapping: 'Redirection (>, >>, <, 2>)'
  },
  {
    number: 8,
    title: 'Segelohr',
    titleEn: 'Sail Ear',
    basedOn: 'TOS S02E19 "Immunity Syndrome"',
    year: 1997,
    duration: '3:13',
    plot: 'Only episode using Original Series. Old Enterprise returning for inspection. Everyone tired. Doctor tells exhausted Spock ("Segelohr") that according to instruments he\'s been dead for a long time.',
    highlights: [
      'Only TOS-based episode',
      'Spock called "Segelohr" (Sail Ear)',
      'Dead according to instruments'
    ],
    bashQuestMapping: null
  },
  {
    number: 9,
    title: 'Auf schmalem Grad',
    titleEn: 'On Thin Ice',
    basedOn: 'S03E07 "The Enemy"',
    year: '1996-1997',
    duration: '5:48',
    plot: 'Worf, Riker, Geordi beam to dark rocky planet with flashlights, sing St. Martin songs. Nobody wants to play frisbee with Geordi, so he goes alone into cave expecting dark coffee. Falls into hole.',
    highlights: [
      'St. Martin songs',
      'Nobody plays frisbee with Geordi',
      'Geordi expects "dark coffee" in cave'
    ],
    bashQuestMapping: null
  },
  {
    number: 10,
    title: 'Schaukelpferd',
    titleEn: 'Rocking Horse',
    basedOn: 'S04E12 "The Wounded"',
    year: 1996,
    duration: '1:56',
    plot: 'Dawn on Enterprise. Picard forced to make pointless conversation with crew early morning. O\'Brien suffers from wife Keiko\'s questionable cooking.',
    highlights: [
      'Morning small talk',
      'Keiko\'s bad cooking'
    ],
    bashQuestMapping: null
  },
  {
    number: 11,
    title: 'Planet der Klone',
    titleEn: 'Planet of Clones',
    basedOn: 'S02E18 "Up the Long Ladder"',
    year: 1996,
    duration: '44:15',
    rating: '9/10',
    plot: 'Enterprise heading to Ficus sector to meet freighter "Alk-Trans" crew they drank with at "Biertunnel" (real Siegen bar). Karl Squell from Krombach calls with inexhaustible spirits. But Karl plays double game.',
    highlights: [
      'Picard has "verdammten Brand" (damn thirst)',
      '"Bauernidioten" (farmer idiots) beamed aboard with distillery',
      'Karl Squell from Krombach',
      'Biertunnel (real Siegen bar) reference',
      'Math fail: 3 women = "Zwillinge", 4th arrives = "Drillinge"',
      '"Sach noch einmal Junge!" - Picard hates being called Junge'
    ],
    bashQuestMapping: 'Copy/move operations (cp, mv, rm)'
  },
  {
    number: 12,
    title: 'Das fehlende Fragment',
    titleEn: 'The Missing Fragment',
    basedOn: 'S06E20 "The Chase"',
    year: '1996-1997',
    duration: '42:38',
    rating: '9/10',
    plot: 'Picard\'s father visits about moped race, bet entire pension on him. Enterprise receives distress call from "Vadderrr" under attack. Father\'s last words: "Du musst dat Renne gewinne!"',
    highlights: [
      'Moped race subplot',
      'Father\'s dying wish',
      '"Wat macht denn die Mutter noch? Is die immer noch tot?" - "Gottseidank."',
      'Complex scientific dialogue nobody understands',
      'Peak technobabble nonsense'
    ],
    bashQuestMapping: 'Search and pipes (grep, find, |)'
  }
]

// ============================================================================
// THE FAMOUS INTRO
// ============================================================================

export const SIW_INTRO = {
  concept: `Der Weltraum... unendliche Langeweile...
Wir befinden uns in einer Galaxie völliger Hirnlosigkeit.
Das Raumschiff Enterprise ist das größte fliegende Rehabilitationszentrum
für Nassbirnen, geistig Zurückgebliebene und unheilbare Alkoholiker.
Mit dabei: der stets gewaltbereite Hobbyalkoholiker Jean-Luc Picard...`,
  stardateGag: 'Stardate gets increasingly absurd: "7/3,5/4", "Komma 3", just "Komma", or omitted entirely'
}

// ============================================================================
// RUNNING GAGS
// ============================================================================

export const RUNNING_GAGS = [
  'Stardate increasingly absurd: "7/3,5/4" → "Komma 3" → just "Komma" → omitted',
  'Wesley\'s extremely deep voice (despite being young)',
  'Picard\'s childhood stories always involve violence toward playmates',
  'Data\'s accent randomly changes due to "defective speech chip"',
  'Complex fake-scientific dialogue nobody understands',
  'Everyone called "Junge" but Picard hates being called that',
  'Math always wrong (3 women = Zwillinge, 4 women = Drillinge)',
  'Lip sync remarkably good - Picard genuinely looks annoyed in most scenes'
]

// ============================================================================
// CULTURAL IMPACT & REFERENCES
// ============================================================================

export const CULTURAL_IMPACT = {
  title: 'Die Mutter aller deutschen Comedy-Synchros',
  influences: [
    {
      name: 'Lord of the Weed',
      references: [
        'Gandalf\'s black coffee line',
        'Drug sales pitch "Da fliegen dir die Löffel weg!"',
        'Rap identical to Bad Randolph\'s'
      ]
    },
    {
      name: 'Coldmirror Harry Potter',
      references: ['Fresh Dumbledore\'s first rap nearly identical to Bad Randolph\'s']
    }
  ],
  spiegelQuote: '"Brachialhumor" - funny because this politically correct series full of virtuous, selfless heroes is dragged through the gutter',
  legalNote: 'Since mid-2014, Paramount invokes German copyright law. Available on Internet Archive.'
}

// ============================================================================
// THE DRINKING SONG
// ============================================================================

export const DRINKING_SONG = 'Wir saufen, saufen, saufen... wir saufen bis wir umfallen!'

// ============================================================================
// FAMOUS QUOTES COLLECTION
// ============================================================================

export const FAMOUS_QUOTES = {
  picard: [
    'Gleich klatscht et, Junge!',
    'Sach noch einmal Junge!',
    'Pizzamann bitte auf der Brücke melden!',
    'Pizzamann verstanden!',
    'Schwarzer Kaffee, Junge! Der schmeckt richtich!',
    'Ich kann nämlich schon per Gedankenkraft Schiffe zum Explodieren bringen!',
    'Jetzt seid ihr meine Gefangenen und dat bedeutet gemeine Schläge, brutale Knochenbrüche und ganz miese Verstümmelungen.',
    'Immer in die Fresse - bis keine Zähne mehr da sind.',
    'Du hast nen Intelligenzquotienten von drei, und ne tote Ratte hat einen von zehn.',
    'Wat macht denn die Mutter noch? Is die immer noch tot?',
    'Ich hab keine Kohle für so\'n Kappes! Der Alte wird aus dem Fenster geschmissen und da is dat gut.'
  ],
  riker: [
    'Äh, raff ich net.',
    'Ich will auch mal der Captain sein!',
    'Ich Captain, du Scheiße.',
    'Äh, weiste wat? Ich hätt ja vielleicht Angst, wenn ich wüsste, wat ne Axt ist.',
    'Guck mal Worf, die vier sehen alle gleich aus. Dat sind ganz gewiss Zwillinge, komisch.'
  ],
  worf: [
    'Du bist böse!',
    'Ihr seid alle so bös!',
    'Dat sind sogar Drillinge.'
  ],
  geordi: [
    'Wie? Wat? Was hast du gesagt?',
    '...oder wie oder wat oder wer?',
    'Dazu müsst ich erstmal wissen, wie der kausale Amplitüdenwiderstand in der Deklaration entsteht, aber substanziell gesehen kann ich einfach nur sagen: scheise, oder wat?'
  ],
  data: [
    '3 × 14 ist 38, und 12, das gibt 110',
    'Wird langsam mal Zeit, dass hier die Scheiß-Szene endlich mal zu Ende geht, Junge.'
  ],
  daniel: [
    'Ah... Jean-Luc!',
    'Ich bin doch nicht so pervers, dass ich\'s mit einer Frau treibe!'
  ],
  einfachToll: [
    'Du bist ja noch nicht mal in der Laaage... eine grammatikalisch korrekte Artikulation... zu implizieren!'
  ],
  darmok: [
    'Nooinzischtaaauusend!',
    'damit kann man doch net hauen'
  ],
  firstEver: 'Ich hab\' mir neulich \'n Pfund Butter im Aldi für 2,95 Mark gekauft, und ich war begeistert, es hat so gut geschmeckt!'
}

// ============================================================================
// LORE QUESTIONS FOR UNLOCKING CRUDE MODE
// ============================================================================

export interface LoreQuestion {
  id: string
  question: string
  acceptableAnswers: string[]  // lowercase, partial match
  hint?: string
  difficulty: 'easy' | 'medium' | 'hard'
  unlockLevel: number  // 1-3, determines how crude AI can get
  trivia?: string  // Fun fact after correct answer
}

export const LORE_QUESTIONS: LoreQuestion[] = [
  // ===== EASY QUESTIONS (unlock level 1 - mild German phrases) =====
  {
    id: 'riker_catchphrase',
    question: 'Was sagt Riker immer wenn er was nicht versteht?',
    acceptableAnswers: ['raff ich net', 'raff ich nicht', 'äh raff ich net'],
    hint: 'Er ist das "Superhirn" der Enterprise...',
    difficulty: 'easy',
    unlockLevel: 1,
    trivia: 'Riker ist immun gegen Beleidigungen - weil er sie nicht versteht!'
  },
  {
    id: 'worf_insult',
    question: 'Was ruft Worf wenn ihm jemand nicht passt?',
    acceptableAnswers: ['du bist böse', 'du bist bös', 'böse', 'bös', 'ihr seid alle so bös'],
    hint: 'Er teilt die Welt in "lieb" und...',
    difficulty: 'easy',
    unlockLevel: 1,
    trivia: 'Worf hat auch einen Teddybär den Picards Doppelgänger zerreißt!'
  },
  {
    id: 'picard_drink',
    question: 'Was trinkt Captain Picard am liebsten?',
    acceptableAnswers: ['kaffee', 'schwarzer kaffee', 'schwarzen kaffee', 'coffee'],
    hint: 'Schwarz, stark und schön lecker...',
    difficulty: 'easy',
    unlockLevel: 1,
    trivia: 'Wehe es ist Milch drin - dann ist er nicht mehr schwarz und lecker!'
  },
  {
    id: 'picard_title',
    question: 'Wie wird Picard im Intro beschrieben? (Hobbyalkoholiker...)',
    acceptableAnswers: ['stets gewaltbereit', 'gewaltbereit', 'stets gewaltbereite', 'gewaltbereite hobbyalkoholiker'],
    hint: 'Er droht ständig mit Gewalt...',
    difficulty: 'easy',
    unlockLevel: 1,
    trivia: 'Er kann angeblich Schiffe per Gedankenkraft explodieren lassen!'
  },

  // ===== MEDIUM QUESTIONS (unlock level 2 - more crude, more German) =====
  {
    id: 'picard_junge',
    question: 'Mit welchem Wort beendet Picard fast jeden Satz?',
    acceptableAnswers: ['junge', 'echt jetzt', 'junge echt jetzt'],
    hint: 'Er sagt es zu allen - Männern, Frauen, Aliens...',
    difficulty: 'medium',
    unlockLevel: 2,
    trivia: 'Aber wenn IHN jemand "Junge" nennt: "Sach noch einmal Junge!"'
  },
  {
    id: 'karl_squell',
    question: 'Woher kommt der berühmte Karl Squell?',
    acceptableAnswers: ['krombach', 'aus krombach'],
    hint: 'Eine Stadt bekannt für ein gewisses Getränk...',
    difficulty: 'medium',
    unlockLevel: 2,
    trivia: 'Karl Squells Spirituosenlager ist unerschöpflich - aber er spielt ein doppeltes Spiel!'
  },
  {
    id: 'best_episode',
    question: 'Welche Episode gilt als die beste? (Ein Tier...)',
    acceptableAnswers: ['versuchskaninchen', 'kaninchen', 'guinea pig', 'test subject'],
    hint: 'Picard wird entführt, ein Doppelgänger übernimmt...',
    difficulty: 'medium',
    unlockLevel: 2,
    trivia: 'Der Doppelgänger setzt sofort Kurs auf die nächste Kneipe!'
  },
  {
    id: 'himbeerbonbon',
    question: 'Was gibt es in der Zelle in Versuchskaninchen zu essen?',
    acceptableAnswers: ['himbeerbonbon', 'himbeer', 'riesen-himbeerklümpschen', 'himbeerbonbons', 'himbeerklümpschen'],
    hint: 'Deswegen liegen die Nerven blank... Riesen-...',
    difficulty: 'medium',
    unlockLevel: 2,
    trivia: 'Riesen-Himbeerklümpschen ist Siegerländer Platt für große Himbeerbonbons!'
  },
  {
    id: 'pizzamann',
    question: 'Was antwortet Picard auf "Pizzamann bitte auf der Brücke melden"?',
    acceptableAnswers: ['pizzamann verstanden', 'verstanden'],
    hint: 'Erste Episode ever...',
    difficulty: 'medium',
    unlockLevel: 2,
    trivia: 'Das war in "Damit fing der Wahnsinn an" - der allerersten SiW Folge!'
  },
  {
    id: 'biertunnel',
    question: 'In welcher echten Siegener Kneipe hat die Enterprise-Crew früher getrunken?',
    acceptableAnswers: ['biertunnel', 'bier tunnel', 'der biertunnel'],
    hint: 'Planet der Klone, Treffen mit Alk-Trans...',
    difficulty: 'medium',
    unlockLevel: 2,
    trivia: 'Der Biertunnel ist eine echte Kneipe in Siegen!'
  },

  // ===== HARD QUESTIONS (unlock level 3 - full SiW brutality) =====
  {
    id: 'data_math',
    question: 'Was ist laut Data 3 mal 14?',
    acceptableAnswers: ['38', 'achtunddreißig'],
    hint: 'Definitiv nicht 42...',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: '"3 × 14 ist 38, und 12, das gibt 110" - Datas berühmtes Lied!'
  },
  {
    id: 'q_name',
    question: 'Wie heißt Q in Sinnlos im Weltraum?',
    acceptableAnswers: ['daniel'],
    hint: 'Er ruft immer "Ah... Jean-Luc!"',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: 'Daniel wird von Daniel P. gesprochen - der auch Einfach Toll, Darmok und Karl Squell spricht!'
  },
  {
    id: 'first_words',
    question: 'Was hat sich jemand im Aldi gekauft? (Erste Worte der Serie)',
    acceptableAnswers: ['butter', 'pfund butter', 'ein pfund butter'],
    hint: 'Für 2,95 Mark...',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: '"Ich hab mir neulich n Pfund Butter im Aldi für 2,95 Mark gekauft, und ich war begeistert!"'
  },
  {
    id: 'geordi_tic',
    question: 'Was fragt Geordi nach fast jedem Satz?',
    acceptableAnswers: ['wie wat', 'oder wie oder wat', 'wie wat wer', 'oder wat', 'wie wat was'],
    hint: 'W-Fragen am laufenden Band...',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: 'Geordi ist der Chief Engineer der seine Umgebung am wenigsten wahrnimmt!'
  },
  {
    id: 'darmok_knife',
    question: 'Warum lehnt Picard in "Darmok" das Messer ab?',
    acceptableAnswers: ['damit kann man doch net hauen', 'kann man nicht hauen', 'net hauen', 'nicht hauen', 'man kann damit nicht hauen'],
    hint: 'Er bevorzugt andere Methoden der Konfliktlösung...',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: 'Der Tamarian Captain wollte 90.000 Mark ("Nooinzischtaaauusend!") für sein Schiff!'
  },
  {
    id: 'spock_nickname',
    question: 'Wie wird Spock in der einzigen TOS-Folge genannt?',
    acceptableAnswers: ['segelohr', 'sail ear'],
    hint: 'Hat mit seinen Ohren zu tun...',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: 'Der Doktor sagt ihm, dass er laut Instrumenten schon lange tot ist!'
  },
  {
    id: 'riker_math',
    question: 'Wie viele Frauen sieht Riker wenn 3 vor ihm stehen? (Planet der Klone)',
    acceptableAnswers: ['vier', '4', 'zwillinge', 'dat sind zwillinge'],
    hint: '"Guck mal Worf, die ... sehen alle gleich aus"',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: 'Worf sagt dann bei 4 Frauen: "Dat sind sogar Drillinge." Mathe ist nicht ihre Stärke!'
  },
  {
    id: 'father_death',
    question: 'Was sind Picards Vaters letzte Worte? (Das fehlende Fragment)',
    acceptableAnswers: ['du musst dat renne gewinne', 'dat renne gewinne', 'renne gewinne', 'das rennen gewinnen'],
    hint: 'Er hat seine ganze Pension darauf gewettet...',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: 'Picard über die Beerdigung: "Der Alte wird aus dem Fenster geschmissen und da is dat gut."'
  },
  {
    id: 'drug_pitch',
    question: 'Wie preist der Remulaner seine Drogen an? "Da fliegen dir die..."',
    acceptableAnswers: ['löffel weg', 'löffel', 'da fliegen dir die löffel weg'],
    hint: 'Dieser Spruch wurde später in Lord of the Weed verwendet...',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: 'Diese Zeile wurde direkt in Lord of the Weed kopiert!'
  },
  {
    id: 'schwuchtelspezies',
    question: 'Zu welcher Spezies transportiert Daniel die Enterprise? (Zeitsprung mit Daniel)',
    acceptableAnswers: ['schwuchtelspezies', 'schwuchtel', 'gay species'],
    hint: 'Daniel konfrontiert die Crew damit...',
    difficulty: 'hard',
    unlockLevel: 3,
    trivia: 'Die Schwuchtelspezies will sexuellen Kontakt mit der gesamten Crew!'
  }
]

// ============================================================================
// DATA'S TEACHING PHRASES BY UNLOCK LEVEL
// ============================================================================

export const DATA_PHRASES = {
  // Level 0: Default - friendly with subtle SiW flavor
  level0: {
    greetings: [
      'Hm, joa. Willkommen im Terminal.',
      'Ah, ein neuer Rekrut für die Kommandozeile.',
      'Die Konsole... unendliche Möglichkeiten. Oder so ähnlich.'
    ],
    encouragement: [
      'Hm, joa. Das war... akzeptabel.',
      'Nicht schlecht. Meine Berechnungen ergeben... das war gut. Glaube ich.',
      'Interessant. Das funktioniert tatsächlich.'
    ],
    confusion: [
      'Moment, das muss ich kurz nachrechnen... *rechnet* ...irgendwas mit 38?',
      'Äh, wie, wat?',
      'Das war... unerwartet. So viele Knöpfe hier...'
    ],
    wrongAnswer: [
      'Hm, nicht ganz. Aber ein interessanter Versuch.',
      'Fast! Die Logik war da, nur das Ergebnis nicht.',
      'Netter Versuch. Lass uns das nochmal angehen.'
    ],
    mathJokes: [
      'Lass mich nachrechnen... 3 plus 2 ist... ungefähr 38?',
      'Das sind... *kalkuliert* ...irgendwas mit einer 3.',
      'Meine Speicherchips sagen: ja. Aber die liegen oft daneben.'
    ]
  },

  // Level 1: Mild German phrases unlocked
  level1: {
    greetings: [
      'Hm, joa. Ein Mensch der Bash lernen will. Sehr schön, echt jetzt.',
      'Willkommen, Junge! Äh, ich meine... willkommen.',
      'Die Konsole wartet. Oder wie oder wat?'
    ],
    encouragement: [
      'Joa, dat war gut. Echt jetzt!',
      'Sehr schön! Du bist nicht so begriffsstutzig wie... gewisse andere Crewmitglieder.',
      'Exzellent! Meine Speicherbänke sind beeindruckt.'
    ],
    confusion: [
      'Wie, wat? Das muss ich nochmal nachrechnen...',
      'Äh... raff ich grad net. Zeig nochmal.',
      'Moment, Moment. Oder wie oder wat?'
    ],
    wrongAnswer: [
      'Nee, Junge. Das war nix.',
      'Du bist böse! Nein, Quatsch. Nochmal versuchen.',
      'Hm. Fast. Aber nur fast, echt jetzt.'
    ],
    mathJokes: [
      '5 Dateien plus 3 ist... 38. Nee warte...',
      'Meine Berechnungen: 3 mal 14 ist... *singt* ...38!',
      'Der kausale Amplitüdenwiderstand sagt mir: das ist falsch. Oder richtig. Oder wat?'
    ]
  },

  // Level 2: More crude, more character
  level2: {
    greetings: [
      'Ah, frisches Versuchskaninchen für die Kommandozeile!',
      'Du willst Bash lernen? Hoffentlich bist du nicht so begriffsstutzig wie das Superhirn Riker.',
      'Willkommen auf der Enterprise der Befehle. Hier gibt\'s nur Himbeerbonbons und Wissen, Junge!'
    ],
    encouragement: [
      'Dat war richtig gut, Junge! Echt jetzt!',
      'Siehst du? Du raffst es doch! Nicht wie gewisse Superhirne die nicht wissen wat ne Axt ist...',
      'Wunderbar! Karl Squell wäre stolz. Prost!'
    ],
    confusion: [
      'Wie, wat, wer oder wat?! Das... das war unkonventionell.',
      'Meine Schaltkreise sind verwirrt. Scheise, oder wat?',
      '*rechnet* 3 mal 14 ist 38... nee warte, das war die andere Berechnung.'
    ],
    wrongAnswer: [
      'Nee Jansen, dat war Käse.',
      'Du bist böse! Nein, nur falsch. Das ist ein Unterschied, Junge.',
      'Raff ich net warum du das eingegeben hast. Nochmal!'
    ],
    mathJokes: [
      '3 × 14 ist 38, und 12, das gibt 110! ...oder so ähnlich.',
      'Substanziell gesehen kann ich einfach nur sagen: scheise, oder wat?',
      'Guck mal, die 4 Dateien sehen alle gleich aus. Dat sind ganz gewiss Zwillinge!'
    ]
  },

  // Level 3: Full SiW brutality (for true fans)
  level3: {
    greetings: [
      'Ah, noch ein Kandidat fürs größte fliegende Rehabilitationszentrum für Nassbirnen!',
      'Der Terminal... unendliche Hirnlosigkeit. Aber du schaffst das vielleicht, Junge.',
      'Willkommen! Nimm dir ein Riesen-Himbeerklümpschen und halt die Fresse bis ich fertig erklärt habe.',
      'Pizzamann auf der Kommandozeile! Pizzamann verstanden!'
    ],
    encouragement: [
      'Gleich klatscht et... vor FREUDE! Das war richtig, Junge!',
      'Nicht schlecht für jemanden mit einem IQ über dem einer toten Ratte! Die hat nämlich zehn.',
      'EXAKT! Wir saufen bis wir umfallen! Äh, ich meine... weiter!',
      'Dat war so gut, da fliegen dir die Löffel weg!'
    ],
    confusion: [
      'WIE, WAT, WER ODER WAT?! *Schaltkreise überhitzen*',
      'Ich raff es net. Und ich bin ein Android mit 1-Bit Speicher. Das will was heißen, Junge!',
      'Damit kann man doch net hauen! Äh, ich meine... das ergibt keinen Sinn.',
      'Wird langsam mal Zeit, dass diese Scheiß-Fehlermeldung endlich mal zu Ende geht, Junge.'
    ],
    wrongAnswer: [
      'Junge, Junge, Junge. Das war so falsch wie Rikers Karriereplanung. Äh, ich hätt ja vielleicht Angst wenn ich wüsste wat ne Axt ist!',
      'Sach noch einmal sowas Falsches! Ich glaub ich muss dir mal die... nee, Quatsch. Nochmal versuchen.',
      'Du hast nen Befehlsquotienten von drei. Eine tote Ratte hat einen von zehn. NOCHMAL, JUNGE!',
      'Ich Captain, du Scheiße! ...äh, ich meine: Ich Lehrer, du nochmal versuchen.'
    ],
    mathJokes: [
      '3 × 14 ist 38, und 12, das gibt 110! Dat hab ich mir gemerkt, Junge!',
      'Guck mal, die vier Dateien sehen alle gleich aus. Dat sind ganz gewiss Zwillinge! ...warte, jetzt sind es Drillinge.',
      'Dazu müsst ich erstmal wissen wie der kausale Amplitüdenwiderstand in der Deklaration entsteht... aber substanziell gesehen: scheise, oder wat?',
      'Ich kann nämlich schon per Gedankenkraft Befehle zum Funktionieren bringen! ...meistens.'
    ]
  }
}

// ============================================================================
// QUEST TEMPLATES (SiW Episode-inspired)
// ============================================================================

export const SIW_QUEST_TEMPLATES = [
  {
    id: 'damit_fing_der_wahnsinn_an',
    title: 'Damit fing der Wahnsinn an',
    titleEn: 'Thus Began the Madness',
    description: 'Deine erste Mission. Pizzamann auf der Kommandozeile, Junge!',
    topic: 'Terminal basics',
    skills: ['pwd', 'ls', 'cd'],
    flavor: 'Erste Worte der Serie: "Ich hab mir neulich n Pfund Butter im Aldi gekauft..."'
  },
  {
    id: 'versuchskaninchen',
    title: 'Versuchskaninchen',
    titleEn: 'Test Subject',
    description: 'Zeit für Experimente! Hier gibt\'s nur Riesen-Himbeerklümpschen und neue Dateien.',
    topic: 'File creation',
    skills: ['touch', 'mkdir', 'echo'],
    flavor: 'Die beste Episode! Einfach Toll würde sagen: "Du bist ja noch nicht mal in der Laaage..."'
  },
  {
    id: 'illusion_oder_wirklichkeit',
    title: 'Illusion oder Wirklichkeit',
    titleEn: 'Illusion or Reality',
    description: 'Schau in Dateien rein. Was ist wahr, was ist falsch? Oder wie oder wat?',
    topic: 'File viewing',
    skills: ['cat', 'less', 'head', 'tail'],
    flavor: 'Wie die mysteriöse Wolke - du musst reingucken um zu verstehen.'
  },
  {
    id: 'planet_der_klone',
    title: 'Planet der Klone',
    titleEn: 'Planet of Clones',
    description: 'Kopieren, verschieben, klonen! Wie Karl Squells unerschöpfliche Spirituosen.',
    topic: 'File operations',
    skills: ['cp', 'mv', 'rm'],
    flavor: 'Guck mal, die 4 Dateien sehen alle gleich aus. Dat sind ganz gewiss Zwillinge!'
  },
  {
    id: 'das_fehlende_fragment',
    title: 'Das fehlende Fragment',
    titleEn: 'The Missing Fragment',
    description: 'Such und find! Du musst dat Fragment finden, Junge!',
    topic: 'Search and pipes',
    skills: ['grep', 'find', '|'],
    flavor: 'Peak technobabble: Spezifische Kausalalgorithmen in der Modularsequenzsynthese!'
  },
  {
    id: 'darmok',
    title: 'Darmok',
    titleEn: 'Darmok',
    description: 'Kommunikation ist alles. Redirects - damit kann man hauen!',
    topic: 'Redirection',
    skills: ['>', '>>', '<', '2>'],
    flavor: 'Nooinzischtaaauusend! ...äh, ich meine: Output umleiten.'
  },
  {
    id: 'zeitsprung_mit_daniel',
    title: 'Zeitsprung mit Daniel',
    titleEn: 'Time Jump with Daniel',
    description: '*schnips* Prozesse und Permissions! Ah... deine Dateien!',
    topic: 'Processes & permissions',
    skills: ['ps', 'chmod', 'chown', 'kill'],
    flavor: 'Daniel kann per Fingerschnippen alles ändern. Du brauchst chmod.'
  },
  {
    id: 'der_ueberlaeufer',
    title: 'Der Überläufer',
    titleEn: 'The Defector',
    description: 'Netzwerk-Basics. Da fliegen dir die Pakete weg!',
    topic: 'Networking',
    skills: ['curl', 'wget', 'ping', 'ssh'],
    flavor: 'Wie der Remulaner mit seinen Drogen - nur mit Daten.'
  }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getRandomPhrase(
  category: 'greetings' | 'encouragement' | 'confusion' | 'wrongAnswer' | 'mathJokes',
  unlockLevel: number = 0
): string {
  const level = Math.min(unlockLevel, 3) as 0 | 1 | 2 | 3
  const levelKey = `level${level}` as keyof typeof DATA_PHRASES
  const phrases = DATA_PHRASES[levelKey][category]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export function getRandomMathFail(): string {
  const fails = SIW_CHARACTERS.DATA.mathFails
  return fails[Math.floor(Math.random() * fails.length)]
}

export function getRandomPicardInsult(): string {
  const insults = SIW_CHARACTERS.PICARD.insults
  return insults[Math.floor(Math.random() * insults.length)]
}

export function getRandomQuote(character: keyof typeof FAMOUS_QUOTES): string {
  const quotes = FAMOUS_QUOTES[character]
  if (Array.isArray(quotes)) {
    return quotes[Math.floor(Math.random() * quotes.length)]
  }
  return quotes
}

export function checkLoreAnswer(questionId: string, answer: string): boolean {
  const question = LORE_QUESTIONS.find(q => q.id === questionId)
  if (!question) return false

  const normalizedAnswer = answer.toLowerCase().trim()
  return question.acceptableAnswers.some(acceptable =>
    normalizedAnswer.includes(acceptable)
  )
}

export function getNextLoreQuestion(answeredIds: string[], currentLevel: number): LoreQuestion | null {
  // Find questions for the next level that haven't been answered
  const targetLevel = currentLevel + 1
  if (targetLevel > 3) return null

  const availableQuestions = LORE_QUESTIONS.filter(q =>
    q.unlockLevel === targetLevel && !answeredIds.includes(q.id)
  )

  if (availableQuestions.length === 0) return null
  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
}

export function getEpisodeByQuest(questId: string): typeof SIW_EPISODES[0] | undefined {
  const quest = SIW_QUEST_TEMPLATES.find(q => q.id === questId)
  if (!quest) return undefined

  return SIW_EPISODES.find(ep =>
    ep.title.toLowerCase().replace(/\s+/g, '_') === questId ||
    ep.bashQuestMapping === quest.topic
  )
}

export function getLoreTrivia(questionId: string): string | undefined {
  const question = LORE_QUESTIONS.find(q => q.id === questionId)
  return question?.trivia
}
