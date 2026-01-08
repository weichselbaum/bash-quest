# Bash Quest: Progress Log

```
   ____                                      _
  |  _ \ _ __ ___   __ _ _ __ ___  ___ ___  | |    ___   __ _
  | |_) | '__/ _ \ / _` | '__/ _ \/ __/ __| | |   / _ \ / _` |
  |  __/| | | (_) | (_| | | |  __/\__ \__ \ | |__| (_) | (_| |
  |_|   |_|  \___/ \__, |_|  \___||___/___/ |_____\___/ \__, |
                   |___/                                |___/
```

## How to Start a Session
Tell Claude: "Let's play Bash Quest" or "Continue SLM-bash"
Claude will read the game files and pick up where you left off!

---

## Session 1 - 2026-01-08 (with Claude Opus 4.5)

### Session Summary
Started as a bash learning session, evolved into building a full game project.
Lukas suggested the Socratic method, then expanded scope to include:
- Spaced repetition & active recall
- A leveling system
- Building a deployable web app
- Eventually giving this to his son

### Concepts Covered

1. **The Prompt** (`username@hostname:~$`)
   - `~` = home directory
   - `$` = regular user (vs `#` for root)
   - Visual indicator of privilege level

2. **`ls` - list directory contents**
   - `ls -l` = long format (detailed info)
   - `ls -a` = all files (including hidden)
   - `ls -la` and `ls -l -a` are equivalent (flags can be combined)

3. **`cd` - change directory**
   - Relative path: `cd projects` (from current location)
   - Absolute path: `cd /home/lukas/work/projects` (full path from root)

4. **`man` - manual pages**
   - Already knew this! Use `man <command>` to learn about any command

5. **`mkdir` - make directory**
   - `mkdir -p` for nested/parent directories

6. **`touch` - create empty file / update timestamp**
   - Originally for updating timestamps, creating files is a side effect

7. **File viewing**
   - `cat` = concatenate, dumps whole file
   - `less` = pager, scroll up/down, search with `/`, quit with `q`
   - `more` = older pager, forward-only ("less is more" joke)
   - `head -n 20` = first 20 lines
   - `tail -n 20` = last 20 lines
   - `tail -f` = follow file in real-time (for logs)

8. **Redirection**
   - `>` = overwrite file
   - `>>` = append to file
   - `echo "text" > file.txt` example

### Key Insight
User instinctively reaches for `man` to learn - this is the right approach.
Asks good "why" questions (why is it -n? does more still exist?)

---

## Next Topics to Cover
- Moving/copying/removing (`mv`, `cp`, `rm`)
- Pipes (`|`) - chaining commands
- grep and finding things
- Permissions basics
- Environment variables

---

## Notes
- Learning style: practical, asks good clarifying questions
- Prefers understanding *why* commands are named what they are
