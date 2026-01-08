# Bash Quest: Exercise Challenges

```
     _____ _           _ _
    / ____| |         | | |
   | |    | |__   __ _| | | ___ _ __   __ _  ___
   | |    | '_ \ / _` | | |/ _ \ '_ \ / _` |/ _ \
   | |____| | | | (_| | | |  __/ | | | (_| |  __/
    \_____|_| |_|\__,_|_|_|\___|_| |_|\__, |\___|
                                       __/ |
                                      |___/
```

## How Exercises Work
- Each exercise tests real application of learned commands
- Player types the command they would use
- Claude validates and explains if needed
- Difficulty: ⭐ (basic) to ⭐⭐⭐⭐⭐ (advanced)

---

## Exercise Bank

### Navigation & Listing

#### Exercise N1 ⭐ [NOT COMPLETED]
**Scenario**: You're lost. You want to know what folder you're in and what files are here.
**Expected**: Use `pwd` (print working directory) and `ls`
**Hint if stuck**: One command tells you WHERE, one tells you WHAT

#### Exercise N2 ⭐ [NOT COMPLETED]
**Scenario**: You want to see ALL files (including hidden ones) with their sizes and dates.
**Expected**: `ls -la` or `ls -al`

#### Exercise N3 ⭐⭐ [NOT COMPLETED]
**Scenario**: Create the folder structure: `projects/2026/january/notes`
**Expected**: `mkdir -p projects/2026/january/notes`

---

### File Creation & Viewing

#### Exercise F1 ⭐ [NOT COMPLETED]
**Scenario**: Create an empty file called `todo.txt`
**Expected**: `touch todo.txt`

#### Exercise F2 ⭐ [NOT COMPLETED]
**Scenario**: You want to read a long README file and be able to scroll up and down.
**Expected**: `less README.md` (not cat!)

#### Exercise F3 ⭐⭐ [NOT COMPLETED]
**Scenario**: A log file is huge. You only want to see the last 50 lines.
**Expected**: `tail -n 50 logfile.log`

#### Exercise F4 ⭐⭐ [NOT COMPLETED]
**Scenario**: You're debugging and want to watch a log file update in real-time.
**Expected**: `tail -f logfile.log`

---

### Redirection

#### Exercise R1 ⭐⭐ [NOT COMPLETED]
**Scenario**: Save the text "Hello World" to a file called `greeting.txt`
**Expected**: `echo "Hello World" > greeting.txt`

#### Exercise R2 ⭐⭐ [NOT COMPLETED]
**Scenario**: Add "Goodbye World" to the same file WITHOUT erasing "Hello World"
**Expected**: `echo "Goodbye World" >> greeting.txt`

#### Exercise R3 ⭐⭐⭐ [NOT COMPLETED]
**Scenario**: List all files and save that list to a file called `inventory.txt`
**Expected**: `ls > inventory.txt` or `ls -la > inventory.txt`

---

### Combo Challenges (Unlocked after basics)

#### Exercise C1 ⭐⭐⭐ [LOCKED]
**Scenario**: Create a project structure AND an empty README in it, in two commands.
**Prereq**: Complete N3 and F1

#### Exercise C2 ⭐⭐⭐⭐ [LOCKED]
**Scenario**: Find all lines containing "ERROR" in a log file and save them to errors.txt
**Prereq**: Learn grep and pipes first

---

## Completed Exercises

| Exercise | Completed On | Notes |
|----------|--------------|-------|
| (none yet) | | |

---

## Player Stats

- Total completed: 0
- Current streak: 0 days
- Favorite command: TBD
