// Mission system for Bash Quest
// SiW-themed challenges - "Die Mutter aller deutschen Comedy-Synchros"

export interface MissionObjective {
  id: string
  description: string
  hint?: string
  verification: {
    type: 'output_contains' | 'command_contains' | 'command_starts'
    pattern: string
  }
  xpReward: number
}

export interface Mission {
  id: string
  title: string
  subtitle: string
  emoji: string
  level: number
  briefing: string
  setupScript: string
  objectives: MissionObjective[]
  commandsToRefresh: string[]
  xpBonus: number // Bonus for completing all objectives
  successMessage: string
}

export interface MissionProgress {
  missionId: string
  startedAt: string
  completedAt?: string
  objectivesCompleted: string[]
  currentObjectiveIndex: number
}

// ============================================
// SiW MISSION DEFINITIONS
// "Der Weltraum... unendliche Langeweile..."
// ============================================

export const MISSIONS: Mission[] = [
  // ===========================================
  // MISSION 1: Damit fing der Wahnsinn an (Level 1)
  // Terminal basics: pwd, ls, cd
  // ===========================================
  {
    id: 'damit_fing_der_wahnsinn_an',
    title: 'Damit fing der Wahnsinn an',
    subtitle: 'Pizzamann auf der Kommandozeile',
    emoji: '🍕',
    level: 1,
    briefing: `"Pizzamann auf der Bruecke melden!" - "Pizzamann verstanden!"

Erste Schicht auf der Enterprise. Der Captain bruellet nach schwarzem Kaffee. Aber Moment - wo ist der Maschinenraum?!

Daniel hat wieder *schnips* gemacht und ihn versteckt. Typisch.

Orientier dich erstmal. Wo bist du ueberhaupt?`,
    setupScript: `mkdir -p ~/enterprise/bruecke ~/enterprise/.maschinenraum ~/enterprise/quartiere ~/enterprise/arrestzelle
echo "Kapitaensstuhl - schwarzer Kaffee" > ~/enterprise/bruecke/kapitaensstuhl.txt
echo "WARNUNG: Warp-Antrieb defekt" > ~/enterprise/.maschinenraum/status.log
echo "Rikers Zimmer - wat ist ne Axt?" > ~/enterprise/quartiere/riker.txt
echo "Worfs Teddybaer" > ~/enterprise/quartiere/worf.txt
echo "Daniel war hier *schnips*" > ~/enterprise/arrestzelle/notiz.txt
cd ~/enterprise/bruecke
clear`,
    objectives: [
      {
        id: 'find_location',
        description: 'Finde heraus wo du bist (zeig den Pfad!)',
        hint: 'Drei Buchstaben. Drucker? Arbeit? Verzeichnis?',
        verification: { type: 'command_starts', pattern: 'pwd' },
        xpReward: 10
      },
      {
        id: 'look_around',
        description: 'Schau was IN diesem Ordner liegt',
        hint: 'Zwei Buchstaben. List...',
        verification: { type: 'command_starts', pattern: 'ls' },
        xpReward: 10
      },
      {
        id: 'go_up',
        description: 'Geh eine Ebene hoch zur Enterprise',
        hint: 'Zwei Punkte bedeuten "nach oben"',
        verification: { type: 'command_contains', pattern: 'cd ..' },
        xpReward: 10
      },
      {
        id: 'find_hidden',
        description: 'Der Maschinenraum ist versteckt! Finde ihn.',
        hint: 'Versteckte Dateien beginnen mit einem Punkt...',
        verification: { type: 'command_contains', pattern: 'ls -a' },
        xpReward: 15
      },
      {
        id: 'go_engineering',
        description: 'Navigier zum versteckten Maschinenraum',
        hint: 'TAB vervollstaendigt Namen automatisch!',
        verification: { type: 'command_contains', pattern: '.maschinenraum' },
        xpReward: 15
      }
    ],
    commandsToRefresh: ['pwd', 'ls', 'ls -a', 'cd'],
    xpBonus: 40,
    successMessage: `"Pizzamann verstanden!"

Du hast den versteckten Maschinenraum gefunden. Der Warp-Antrieb brummt zufrieden.

Picard: "Schwarzer Kaffee, Junge! Der schmeckt richtich!"

*PLÖTZLICH* - das Licht flackert. Du wirst gebeamt!

Wo... wo bist du?! Eine Zelle?! Und wer sind diese drei Idioten?!`
  },

  // ===========================================
  // MISSION 2: Versuchskaninchen (Level 1)
  // File creation: touch, mkdir, echo
  // ===========================================
  {
    id: 'versuchskaninchen',
    title: 'Versuchskaninchen',
    subtitle: 'Riesen-Himbeerkluempschen',
    emoji: '🐰',
    level: 1,
    briefing: `ALARMSTUFE ROT!

Du wurdest in eine Zelle gebeamt! Mit dir eingesperrt: Adelheid (stottert), Einfach Toll (dehnt Vokaaale), und Superidiot (kapiert nix).

Es gibt nur Riesen-Himbeerkluempschen zu essen. Die Nerven liegen blank!

"Du bist ja noch nicht mal in der Laaage... eine Datei zu erstellen!"

Zeig's ihnen.`,
    setupScript: `mkdir -p ~/zelle
cd ~/zelle
clear`,
    objectives: [
      {
        id: 'create_folder',
        description: 'Erstelle einen Ordner namens "notizen"',
        hint: '"make directory" - aber Nerds kuerzen alles ab...',
        verification: { type: 'command_contains', pattern: 'mkdir' },
        xpReward: 15
      },
      {
        id: 'create_file',
        description: 'Erstelle eine leere Datei "plan.txt"',
        hint: 'Ein Wort, startet mit "t". Wie beruehrst du etwas das nicht existiert?',
        verification: { type: 'command_contains', pattern: 'touch' },
        xpReward: 15
      },
      {
        id: 'write_note',
        description: 'Schreibe "Fluchtplan" in eine Datei',
        hint: 'Ruf deinen Text und leite ihn um mit dem Groesser-als-Zeichen',
        verification: { type: 'command_contains', pattern: 'echo' },
        xpReward: 20
      },
      {
        id: 'create_multiple',
        description: 'Erstelle mehrere Ordner auf einmal (adelheid, toll, idiot)',
        hint: 'Derselbe Befehl wie vorher, aber mit Leerzeichen dazwischen...',
        verification: { type: 'command_contains', pattern: 'mkdir' },
        xpReward: 20
      },
      {
        id: 'verify_creation',
        description: 'Ueberpruefe was du erstellt hast',
        hint: 'Zwei Buchstaben. Auflisten. Du kennst das schon.',
        verification: { type: 'command_starts', pattern: 'ls' },
        xpReward: 10
      }
    ],
    commandsToRefresh: ['mkdir', 'touch', 'echo', 'ls'],
    xpBonus: 45,
    successMessage: `Einfach Toll ist beeindruckt:
"Du bist ja tatsaechlich in der Laaage... Dateien zu erstellen... interessant."

Die Riesen-Himbeerkluempschen schmecken immer noch nicht. Aber dein Fluchtplan steht!

*SCHNIPS* - Daniel befreit euch! Du bist zurueck auf der Enterprise!

Aber... was ist das?! Eine mysterioese Wolke umgibt das Schiff!
Und warum sieht alles... doppelt aus?!`
  },

  // ===========================================
  // MISSION 3: Illusion oder Wirklichkeit (Level 2)
  // File viewing: cat, head, tail, less
  // ===========================================
  {
    id: 'illusion_oder_wirklichkeit',
    title: 'Illusion oder Wirklichkeit',
    subtitle: 'Die mysterioese Wolke',
    emoji: '☁️',
    level: 2,
    briefing: `MYSTERIOeSER NEBEL VORAUS!

Die Enterprise ist in einer seltsamen Wolke gefangen. Sensordaten sind verwirrend. Was ist echt? Was ist Illusion?

"Wie? Wat? Was hast du gesagt?" - Geordi hilft nicht. Der Captain hoert Pantera und ignoriert alle.

Irgendwo muessen doch Log-Dateien sein...`,
    setupScript: `mkdir -p ~/logs
cat > ~/logs/sensor.log << 'EOF'
[01:00] Normale Sensoren
[01:15] Anomalie entdeckt
[01:30] Wolke naehert sich
[01:45] WARNUNG: Unbekannte Energie
[02:00] Schiff gefangen
[02:15] Zweite Enterprise erscheint?!
[02:30] Verwirrung auf der Bruecke
[02:45] Riker: "Aeh, raff ich net"
[03:00] Picard: "Halt die Fresse"
EOF
cat > ~/logs/bridge.log << 'EOF'
Picard: Schwarzer Kaffee. Jetzt.
Riker: Ich will auch mal Captain sein!
Worf: Die Wolke ist BOESE!
Data: 3 mal 14 ist 38...
Geordi: Wie, wat, wer oder wat?
Troi: Ich spuere... Verwirrung.
Picard: Ach was. Halt die Fresse.
EOF
cat > ~/logs/geheim.log << 'EOF'
STRENG GEHEIM
--------------
Die Wolke ist eine Illusion.
Daniel hat wieder *schnips* gemacht.
Loesung: Einfach ignorieren.
--------------
Picard weiss Bescheid.
Er trinkt trotzdem Kaffee.
EOF
cd ~/logs
clear`,
    objectives: [
      {
        id: 'list_logs',
        description: 'Finde alle Log-Dateien',
        hint: 'Was du schon hundertmal gemacht hast...',
        verification: { type: 'command_starts', pattern: 'ls' },
        xpReward: 10
      },
      {
        id: 'read_full',
        description: 'Lies eine komplette Log-Datei',
        hint: 'Dieses Tier miaut und zeigt dir alles auf einmal',
        verification: { type: 'command_contains', pattern: 'cat' },
        xpReward: 15
      },
      {
        id: 'read_beginning',
        description: 'Zeige nur die ersten Zeilen einer Datei',
        hint: 'Der Koerperteil ganz oben - wo alles anfaengt',
        verification: { type: 'command_contains', pattern: 'head' },
        xpReward: 20
      },
      {
        id: 'read_end',
        description: 'Zeige die letzten Zeilen einer Datei',
        hint: 'Das Gegenteil vom Kopf - wo alles endet',
        verification: { type: 'command_contains', pattern: 'tail' },
        xpReward: 20
      },
      {
        id: 'find_secret',
        description: 'Lies die geheime Datei um die Wahrheit zu erfahren',
        hint: 'Die Datei heisst "geheim" - nicht schwer zu finden, Junge!',
        verification: { type: 'output_contains', pattern: 'Daniel' },
        xpReward: 25
      }
    ],
    commandsToRefresh: ['cat', 'head', 'tail', 'ls'],
    xpBonus: 60,
    successMessage: `Du hast die Wahrheit entdeckt: Daniel hat wieder *schnips* gemacht!

Die Wolke loest sich auf. Die doppelte Enterprise war ein Trugbild.

Picard: "Wusste ich doch. Schwarzer Kaffee, Junge!"

*KOMMUNIKATOR PIEPT* - "Captain! Frachter Alk-Trans in Sicht! Karl Squell aus Krombach!"

Riker: "Guck mal, die vier Frauen sehen alle gleich aus!"
Worf: "Dat sind Zwillinge."

...Zeit fuer Spirituosen-Logistik!`
  },

  // ===========================================
  // MISSION 4: Planet der Klone (Level 2)
  // File operations: cp, mv, rm
  // ===========================================
  {
    id: 'planet_der_klone',
    title: 'Planet der Klone',
    subtitle: 'Dat sind Zwillinge!',
    emoji: '👯',
    level: 2,
    briefing: `TRANSMISSION VOM FRACHTER ALK-TRANS!

"Hier ist Karl Squell aus Krombach! Wir haben Spirituosen!"

Riker sieht 3 Frauen: "Guck mal Worf, die VIER sehen alle gleich aus. Dat sind ganz gewiss Zwillinge!" Eine vierte kommt dazu. Worf: "Dat sind sogar Drillinge."

Mathe ist nicht ihre Staerke, Junge. Raeum den Frachter auf!`,
    setupScript: `mkdir -p ~/frachter/lager ~/frachter/archiv ~/frachter/muell
echo "Krombach Premium" > ~/frachter/spirituosen.txt
echo "Manifest: 100 Faesser" > ~/frachter/manifest.txt
echo "Alt und vergessen" > ~/frachter/alte_daten.txt
echo "LOESCHEN!" > ~/frachter/temp.tmp
echo "Wichtige Koordinaten" > ~/frachter/koordinaten.txt
cd ~/frachter
clear`,
    objectives: [
      {
        id: 'survey',
        description: 'Ueberblick verschaffen - was liegt hier rum?',
        hint: 'Kennst du schon. Zwei Buchstaben.',
        verification: { type: 'command_starts', pattern: 'ls' },
        xpReward: 10
      },
      {
        id: 'copy_backup',
        description: 'Kopiere die Koordinaten ins Archiv (Backup!)',
        hint: 'Copy. Aber Nerds sind faul.',
        verification: { type: 'command_contains', pattern: 'cp' },
        xpReward: 20
      },
      {
        id: 'move_spirits',
        description: 'Verschiebe die Spirituosen ins Lager',
        hint: 'Move. Noch kuerzer.',
        verification: { type: 'command_contains', pattern: 'mv' },
        xpReward: 20
      },
      {
        id: 'cleanup_temp',
        description: 'Loesche die temp-Datei',
        hint: 'Remove. Du weisst wie das geht.',
        verification: { type: 'command_contains', pattern: 'rm' },
        xpReward: 15
      },
      {
        id: 'archive_old',
        description: 'Verschiebe alte_daten.txt ins Archiv',
        hint: 'Du hast gerade was verschoben. Mach das nochmal.',
        verification: { type: 'command_contains', pattern: 'archiv' },
        xpReward: 15
      },
      {
        id: 'verify',
        description: 'Ueberpruefe das Lager - sind die Spirituosen da?',
        hint: 'Schau IN den Ordner. Du kannst auch Pfade angeben.',
        verification: { type: 'command_contains', pattern: 'lager' },
        xpReward: 10
      }
    ],
    commandsToRefresh: ['cp', 'mv', 'rm', 'ls'],
    xpBonus: 60,
    successMessage: `Karl Squell: "Die Spirituosen sind sicher! Prost, Junge!"

Riker: "Aeh, wie viele Dateien waren das jetzt?"
Worf: "Drillinge."

Der Frachter ist organisiert. Zeit zu saufen... aeh, weiterzufliegen!

*ALARMTON* - "CAPTAIN! Subraum-Nachricht von... Vadderr?!"

Picard: "Wat macht denn die Mutter noch? Is die immer noch tot?"
Vadderr: "Du musst dat Renne gewinne! Aber die Koordinaten... sind irgendwo in der Datenbank versteckt!"`
  },

  // ===========================================
  // MISSION 5: Das fehlende Fragment (Level 3)
  // Search and pipes: grep, find, |
  // ===========================================
  {
    id: 'das_fehlende_fragment',
    title: 'Das fehlende Fragment',
    subtitle: 'Du musst dat finden!',
    emoji: '🔍',
    level: 3,
    briefing: `DRINGENDE NACHRICHT VON VADDERR!

"Du musst dat Renne gewinne!" waren seine letzten Worte. Aber wo sind die Koordinaten?

Geordi: "Dazu muesst ich erstmal wissen, wie der kausale Amplituedenwiderstand in der Deklaration entsteht..."

Ignorier Geordi. Irgendwo muss ein Fragment versteckt sein...`,
    setupScript: `mkdir -p ~/datenbank/logs ~/datenbank/personal ~/datenbank/navigation
echo "Log 1: Alles normal" > ~/datenbank/logs/tag1.log
echo "Log 2: Picard will Kaffee" > ~/datenbank/logs/tag2.log
echo "Log 3: FRAGMENT-ALPHA gefunden bei Sektor 7" > ~/datenbank/logs/tag3.log
echo "Log 4: Riker versteht wieder nix" > ~/datenbank/logs/tag4.log
echo "Picard: Gewaltbereit, trinkt Kaffee" > ~/datenbank/personal/picard.txt
echo "Riker: Superhirn, raff ich net" > ~/datenbank/personal/riker.txt
echo "Worf: Alles ist boese" > ~/datenbank/personal/worf.txt
echo "Data: 3x14=38" > ~/datenbank/personal/data.txt
echo "Sektor 1: Leer" > ~/datenbank/navigation/sektor1.nav
echo "Sektor 7: GEHEIME RENNSTRECKE - FRAGMENT hier!" > ~/datenbank/navigation/sektor7.nav
echo "Sektor 9: Daniels Freunde" > ~/datenbank/navigation/sektor9.nav
cd ~/datenbank
clear`,
    objectives: [
      {
        id: 'explore_structure',
        description: 'Erkunde die Datenbankstruktur',
        hint: 'Mit -R siehst du auch was IN den Ordnern ist',
        verification: { type: 'command_starts', pattern: 'ls' },
        xpReward: 10
      },
      {
        id: 'search_fragment',
        description: 'Suche nach "FRAGMENT" in allen Dateien',
        hint: 'Wie fischt man ein Wort aus vielen Dateien? Global Regular Expression Print.',
        verification: { type: 'command_contains', pattern: 'grep' },
        xpReward: 25
      },
      {
        id: 'find_logs',
        description: 'Finde alle .log Dateien',
        hint: 'Du willst etwas FINDEN. Der Befehl ist... offensichtlich.',
        verification: { type: 'command_contains', pattern: 'find' },
        xpReward: 25
      },
      {
        id: 'search_sektor',
        description: 'Suche nach "Sektor 7" - wo ist das Rennen?',
        hint: 'Durchsuche ALLE Dateien im Ordner nach dem Text',
        verification: { type: 'output_contains', pattern: 'Sektor 7' },
        xpReward: 20
      },
      {
        id: 'count_results',
        description: 'Zaehle wie oft "Picard" vorkommt (grep + wc)',
        hint: 'Die Pipe | leitet Output weiter. "word count" zaehlt.',
        verification: { type: 'command_contains', pattern: 'wc' },
        xpReward: 25
      }
    ],
    commandsToRefresh: ['grep', 'find', 'wc', '|'],
    xpBonus: 70,
    successMessage: `Du hast das Fragment gefunden: Sektor 7!

Vadderr waere stolz. Das Rennen kann beginnen!

Picard: "Kurs setzen zu Sektor 7. Und jemand soll mir schwarzen Kaffee bringen!"

*AUF DEM WEG ZUM RENNEN* - Die Enterprise trifft auf ein Tamarianisches Schiff!

Der Captain schreit ueber Funk: "NOOINZISCHTAAAUUSEND!"

Picard: "Wat will der?"
Data: "Er... verhandelt, Captain. Irgendwie."

Das wird kompliziert. Aber erst muss das dokumentiert werden...`
  },

  // ===========================================
  // MISSION 6: Darmok (Level 3)
  // Redirection: >, >>, <, 2>
  // ===========================================
  {
    id: 'darmok',
    title: 'Darmok',
    subtitle: 'Nooinzischtaaauusend!',
    emoji: '🗡️',
    level: 3,
    briefing: `KOMMUNIKATIONSPROBLEME!

Der Tamarian Captain will 90.000 Mark fuer sein Schiff. "Nooinzischtaaauusend!"

Picard: "20.000. Mehr nicht." - Tamarian: "Nooinzischtaaauuuusend!"

Er bietet Picard ein Messer an. Picard: "Damit kann man doch net hauen!"

Die Verhandlung muss protokolliert werden...`,
    setupScript: `mkdir -p ~/kommunikation
cd ~/kommunikation
clear`,
    objectives: [
      {
        id: 'create_log',
        description: 'Schreibe "Verhandlung gestartet" in protokoll.txt',
        hint: 'Der Pfeil zeigt wohin der Text fliessen soll >',
        verification: { type: 'command_contains', pattern: '>' },
        xpReward: 20
      },
      {
        id: 'append_log',
        description: 'Fuege "Picard bietet 20000" zum Protokoll HINZU',
        hint: 'Ein Pfeil ueberschreibt. Zwei Pfeile fuegen hinzu.',
        verification: { type: 'command_contains', pattern: '>>' },
        xpReward: 25
      },
      {
        id: 'redirect_error',
        description: 'Fuehre einen Befehl aus und leite Fehler nach errors.txt',
        hint: 'Fehler kommen aus Kanal 2. Leite Kanal 2 um.',
        verification: { type: 'command_contains', pattern: '2>' },
        xpReward: 25
      },
      {
        id: 'combine_files',
        description: 'Erstelle eine Zusammenfassung mit cat und >',
        hint: 'Die Katze kann mehrere Dateien gleichzeitig lesen...',
        verification: { type: 'command_contains', pattern: 'cat' },
        xpReward: 20
      },
      {
        id: 'verify_protocol',
        description: 'Lies das Protokoll um sicherzugehen',
        hint: 'Miau.',
        verification: { type: 'output_contains', pattern: 'Verhandlung' },
        xpReward: 15
      }
    ],
    commandsToRefresh: ['echo', '>', '>>', '2>', 'cat'],
    xpBonus: 70,
    successMessage: `Der Tamarian: "Nooinzischtaaauusend!"
Picard: "Halt die Fresse."

Die Verhandlung ist dokumentiert. Das Messer bleibt unbenutzt - "damit kann man doch net hauen!"

Die Enterprise setzt ihren Kurs fort. Aber dann...

*BLITZLICHT* - "Ah... Jean-Luc!"

DANIEL IST ZURUECK! Er macht *schnips* und alles ist durcheinander!

Prozesse laufen Amok. Berechtigungen stimmen nicht mehr.
Daniel: "Ich bin doch nicht so pervers, dass ich alles RICHTIG konfiguriere!"

Zeit fuer Systemadministration...`
  },

  // ===========================================
  // MISSION 7: Zeitsprung mit Daniel (Level 4)
  // Processes & permissions: ps, chmod, chown, kill
  // ===========================================
  {
    id: 'zeitsprung_mit_daniel',
    title: 'Zeitsprung mit Daniel',
    subtitle: '*schnips*',
    emoji: '✨',
    level: 4,
    briefing: `"Ah... Jean-Luc!"

Daniel ist zurueck! Er hat *schnips* gemacht und alles durcheinander gebracht. Prozesse laufen Amok. Berechtigungen sind falsch.

Daniel: "Ich bin doch nicht so pervers, dass ich Dateien RICHTIG konfiguriere!"

Die Schwuchtelspezies wartet. Aber erstmal muss hier Ordnung rein...`,
    setupScript: `mkdir -p ~/system
echo "Geheime Daten - nur fuer Captain" > ~/system/geheim.txt
echo "Oeffentliche Info" > ~/system/public.txt
chmod 000 ~/system/geheim.txt
touch ~/system/prozess.pid
cd ~/system
clear`,
    objectives: [
      {
        id: 'list_processes',
        description: 'Zeige alle laufenden Prozesse',
        hint: 'Process Status. Zwei Buchstaben.',
        verification: { type: 'command_starts', pattern: 'ps' },
        xpReward: 20
      },
      {
        id: 'check_permissions',
        description: 'Zeige Dateiberechtigungen an',
        hint: 'Das lange Format zeigt mehr Details... -l fuer "long"',
        verification: { type: 'command_contains', pattern: 'ls -l' },
        xpReward: 15
      },
      {
        id: 'fix_permissions',
        description: 'Mache geheim.txt lesbar fuer den Owner (chmod)',
        hint: 'CHange MODe. 6 = lesen+schreiben, 0 = nichts.',
        verification: { type: 'command_contains', pattern: 'chmod' },
        xpReward: 30
      },
      {
        id: 'read_secret',
        description: 'Lies die geheime Datei (jetzt wo du kannst)',
        hint: 'Du weisst wie. Das Tier das miaut.',
        verification: { type: 'command_contains', pattern: 'cat' },
        xpReward: 15
      },
      {
        id: 'find_process',
        description: 'Finde einen bestimmten Prozess (grep mit ps)',
        hint: 'Kombiniere: zeige alle Prozesse, dann filtere mit der Pipe',
        verification: { type: 'command_contains', pattern: 'grep' },
        xpReward: 25
      }
    ],
    commandsToRefresh: ['ps', 'chmod', 'ls -l', 'grep'],
    xpBonus: 95,
    successMessage: `*schnips*

Daniel: "Beeindruckend, Jean-Luc! Aeh, ich meine... du da!"

Die Prozesse sind unter Kontrolle. Die Berechtigungen stimmen.
Daniel verschwindet (vorlaeufig) - die Schwuchtelspezies muss warten.

*SICHERHEITSALARM* - "Captain! Wir haben einen Ueberlaeufer an Bord!"

Ein romulanischer... Moment, "REMULANER" betritt die Bruecke!
Er bietet Waren an: "Da fliegen dir die Loeffel weg!"

Und warum rappet da jemand so schlecht im Hintergrund?!`
  },

  // ===========================================
  // MISSION 8: Der Ueberlaeufer (Level 4)
  // Networking: curl, wget, ping
  // ===========================================
  {
    id: 'der_ueberlaeufer',
    title: 'Der Ueberlaeufer',
    subtitle: 'Da fliegen dir die Loeffel weg!',
    emoji: '🌐',
    level: 4,
    briefing: `REMULANER AN BORD!

Ein romulanischer... aeh, "Remulaner" Drogenhaendler ist an Bord. Er versucht seine Ware zu verkaufen: "Da fliegen dir die Loeffel weg!"

Bad Randolph nervt mit schlechtem Rap. Picard hat Data beauftragt ihn zu verpruegeln.

Check mal die Netzwerkverbindungen...`,
    setupScript: `mkdir -p ~/netzwerk
echo "Server: enterprise.local" > ~/netzwerk/config.txt
echo "Backup: starfleet.hq" >> ~/netzwerk/config.txt
echo "Geheim: romulan.dealer" >> ~/netzwerk/config.txt
cd ~/netzwerk
clear`,
    objectives: [
      {
        id: 'read_config',
        description: 'Lies die Netzwerk-Konfiguration',
        hint: 'Das Tier das miaut.',
        verification: { type: 'command_contains', pattern: 'cat' },
        xpReward: 10
      },
      {
        id: 'ping_test',
        description: 'Teste ob localhost erreichbar ist (ping)',
        hint: 'Wie ein Sonar - schick ein Signal und hoer auf das Echo. Mit -c 1 nur einmal.',
        verification: { type: 'command_contains', pattern: 'ping' },
        xpReward: 25
      },
      {
        id: 'curl_test',
        description: 'Hole Daten mit curl (z.B. curl example.com)',
        hint: 'Client URL - holt Daten aus dem Netz. Probier example.com',
        verification: { type: 'command_contains', pattern: 'curl' },
        xpReward: 30
      },
      {
        id: 'wget_test',
        description: 'Lade eine Datei mit wget (oder simuliere es)',
        hint: 'Web GET - laedt Dateien. Aehnlich wie curl, anderer Stil.',
        verification: { type: 'command_contains', pattern: 'wget' },
        xpReward: 30
      },
      {
        id: 'document_results',
        description: 'Dokumentiere die Ergebnisse (echo + Redirect)',
        hint: 'Schreib was in eine Datei. Du hast das schon gemacht.',
        verification: { type: 'command_contains', pattern: 'results' },
        xpReward: 20
      }
    ],
    commandsToRefresh: ['ping', 'curl', 'wget', 'cat'],
    xpBonus: 110,
    successMessage: `Der Remulaner: "Da fliegen dir die Loeffel weg!"
Picard: "Halt die Fresse und gib mir meinen Kaffee."

Die Netzwerkverbindungen funktionieren. Bad Randolph wurde von Data verpruegelt.

*STILLE AUF DER BRUECKE*

Picard erhebt seine Kaffeetasse: "Schwarzer Kaffee, Junge. Der schmeckt richtich."

Du hast ALLE MISSIONEN abgeschlossen!

Die Enterprise fliegt weiter durch den Weltraum... unendliche Langeweile...
Aber du? Du bist jetzt ein echter Bash-Krieger.

"Gleich klatscht et, Junge!" - Nein, Moment. Das war ein Kompliment.

MEHR MISSIONEN KOMMEN BALD...`
  }
]

// Helper functions
export function getMissionById(id: string): Mission | undefined {
  return MISSIONS.find(m => m.id === id)
}

export function getMissionsForLevel(level: number): Mission[] {
  return MISSIONS.filter(m => m.level <= level)
}

export function getAvailableMissions(level: number, completed: string[]): Mission[] {
  return MISSIONS.filter(m => m.level <= level && !completed.includes(m.id))
}

export function calculateMissionXP(mission: Mission): number {
  const objectiveXP = mission.objectives.reduce((sum, obj) => sum + obj.xpReward, 0)
  return objectiveXP + mission.xpBonus
}
