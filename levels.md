# Bash Quest: Leveling System

```
  _                   _   _   _
 | |    _____   _____| | | | | |_ __
 | |   / _ \ \ / / _ \ | | | | | '_ \
 | |__|  __/\ V /  __/ | | |_| | |_) |
 |_____\___| \_/ \___|_|  \___/| .__/
                               |_|
```

## Current Status

**Player**: Lukas
**Level**: 1 - Terminal Tadpole
**XP**: 50 / 100
**Skills Unlocked**: 2

---

## The Skill Tree

```
                            ┌─────────────────┐
                            │  LEVEL 10       │
                            │  Shell Sage     │
                            │  ◇ Scripting    │
                            └────────┬────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
     ┌────────┴────────┐   ┌────────┴────────┐   ┌────────┴────────┐
     │    LEVEL 7-9    │   │    LEVEL 7-9    │   │    LEVEL 7-9    │
     │   Process Pro   │   │  Network Ninja  │   │  System Shaman  │
     │  ◇ ps, kill,    │   │  ◇ curl, ssh,   │   │  ◇ cron, env,   │
     │    jobs, &      │   │    scp, wget    │   │    chmod deep   │
     └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
              │                      │                      │
              └──────────────────────┼──────────────────────┘
                                     │
                            ┌────────┴────────┐
                            │    LEVEL 6      │
                            │ Permission Paladin
                            │ ◇ chmod, chown  │
                            │ ◇ users/groups  │
                            └────────┬────────┘
                                     │
                            ┌────────┴────────┐
                            │    LEVEL 5      │
                            │   Regex Ranger  │
                            │ ◇ grep patterns │
                            │ ◇ sed basics    │
                            └────────┬────────┘
                                     │
                            ┌────────┴────────┐
                            │    LEVEL 4      │
                            │  Stream Sorcerer│
                            │ ◇ Pipes mastery │
                            │ ◇ xargs, tee    │
                            └────────┬────────┘
                                     │
                            ┌────────┴────────┐
                            │    LEVEL 3      │
                            │    Plumber      │
                            │ ◇ Pipes |       │
                            │ ◇ grep basics   │
                            └────────┬────────┘
                                     │
                            ┌────────┴────────┐
                            │    LEVEL 2      │
                            │  File Wrangler  │
                            │ ◇ mv, cp, rm    │
                            │ ◇ find          │
                            └────────┬────────┘
                                     │
                            ┌────────┴────────┐
                            │    LEVEL 1      │◀── YOU ARE HERE
                            │ Terminal Tadpole│
                            │ ◇ Navigation    │
                            │ ◇ File Viewing  │
                            └─────────────────┘
```

---

## Level Details

### Level 1: Terminal Tadpole 🐸
**XP Required**: 0-100
**Theme**: "Every journey begins with a single `cd`"

| Skill | Commands | Status |
|-------|----------|--------|
| Navigation | `cd`, `pwd`, `ls` | ✅ UNLOCKED |
| File Viewing | `cat`, `less`, `head`, `tail` | ✅ UNLOCKED |
| File Creation | `touch`, `mkdir` | ⬜ IN PROGRESS |
| Redirection | `>`, `>>`, `echo` | ⬜ IN PROGRESS |

**Level Up Requirement**: Complete all skills + pass the Tadpole Trial

**Tadpole Trial** (Boss Challenge):
> Create a folder structure `myproject/logs/`, create an empty `app.log` inside it,
> then append "Server started" to the log file. Do it in 3 commands or less.

---

### Level 2: File Wrangler 🤠
**XP Required**: 100-250
**Theme**: "A file's gotta go where a file's gotta go"

| Skill | Commands | Status |
|-------|----------|--------|
| Moving & Copying | `mv`, `cp` | ⬜ LOCKED |
| Destruction | `rm`, `rm -r`, `rmdir` | ⬜ LOCKED |
| Finding Things | `find`, `locate` | ⬜ LOCKED |
| Wildcards | `*`, `?`, `[]` | ⬜ LOCKED |

**Special Ability Unlocked**: UNDO REFLEX
> You learn to always use `rm -i` (interactive) first.
> "Measure twice, `rm` once."

**Wrangler Trial**:
> Find all `.txt` files in a directory tree, copy them to a backup folder.

---

### Level 3: Plumber 🔧
**XP Required**: 250-450
**Theme**: "Data flows like water through pipes"

| Skill | Commands | Status |
|-------|----------|--------|
| Basic Pipes | `|` (pipe operator) | ⬜ LOCKED |
| Grep Basics | `grep`, `grep -i`, `grep -r` | ⬜ LOCKED |
| Counting | `wc` (word count) | ⬜ LOCKED |
| Sorting | `sort`, `uniq` | ⬜ LOCKED |

**Special Ability Unlocked**: CHAIN COMBO
> You can combine 3+ commands in one line.
> `cat file | grep "error" | wc -l` feels natural.

**Plumber Trial**:
> Count how many lines in a log file contain the word "ERROR" (case-insensitive).

---

### Level 4: Stream Sorcerer 🧙
**XP Required**: 450-700
**Theme**: "Master of stdin, stdout, and stderr"

| Skill | Commands | Status |
|-------|----------|--------|
| Advanced Pipes | `xargs`, `tee` | ⬜ LOCKED |
| Stream Control | `2>`, `2>&1`, `/dev/null` | ⬜ LOCKED |
| Here Documents | `<<EOF` | ⬜ LOCKED |
| Process Substitution | `<()` | ⬜ LOCKED |

**Special Ability Unlocked**: SILENCE THE NOISE
> You can suppress errors or redirect them separately.
> Debug output no longer scares you.

---

### Level 5: Regex Ranger 🎯
**XP Required**: 700-1000
**Theme**: "Patterns within patterns within patterns"

| Skill | Commands | Status |
|-------|----------|--------|
| Regex Basics | `grep -E`, character classes | ⬜ LOCKED |
| Sed Basics | `sed 's/old/new/'` | ⬜ LOCKED |
| Awk Intro | `awk '{print $1}'` | ⬜ LOCKED |

**Special Ability Unlocked**: PATTERN VISION
> You start seeing patterns everywhere.
> Email validation? Phone numbers? You've got a regex for that.

---

### Level 6: Permission Paladin 🛡️
**XP Required**: 1000-1400
**Theme**: "Who goes there? Friend or foe?"

| Skill | Commands | Status |
|-------|----------|--------|
| Read Permissions | `ls -l` output decoded | ⬜ LOCKED |
| Change Permissions | `chmod` numeric & symbolic | ⬜ LOCKED |
| Ownership | `chown`, `chgrp` | ⬜ LOCKED |
| Sudo & Root | `sudo`, when to use it | ⬜ LOCKED |

**Special Ability Unlocked**: GUARDIAN MODE
> You understand why `chmod 777` is usually wrong.
> You protect files with appropriate permissions.

---

### Level 7-9: Choose Your Path

**Process Pro** 🔄 - Master of background jobs
- `ps`, `top`, `kill`, `jobs`, `fg`, `bg`, `&`, `nohup`
- Special: MULTITASK MASTERY - Run multiple things without fear

**Network Ninja** 🌐 - Master of remote connections
- `curl`, `wget`, `ssh`, `scp`, `rsync`, `ping`, `netstat`
- Special: REMOTE CONTROL - Servers obey your commands from afar

**System Shaman** ⚙️ - Master of system configuration
- `cron`, `env`, `export`, `.bashrc`, `alias`, `source`
- Special: AUTOMATION RITUAL - Things happen while you sleep

---

### Level 10: Shell Sage 📜
**XP Required**: 2000+
**Theme**: "Write once, run forever"

| Skill | Topics | Status |
|-------|--------|--------|
| Scripting Basics | Variables, if/else, loops | ⬜ LOCKED |
| Functions | Reusable code blocks | ⬜ LOCKED |
| Script Safety | `set -e`, `set -u`, shellcheck | ⬜ LOCKED |
| Real Projects | Backup scripts, deployment | ⬜ LOCKED |

**Final Ability**: CREATE YOUR OWN COMMANDS
> You write scripts that others can use.
> You ARE the tool now.

---

## XP System

| Action | XP Earned |
|--------|-----------|
| Learn a new command | +10 |
| Pass a skill quiz | +25 |
| Complete an exercise | +15 |
| Perfect recall (spaced rep) | +5 |
| Complete a Trial | +50 |
| Help someone else learn | +30 |

---

## Achievements (Unlockable)

| Badge | Requirement | Status |
|-------|-------------|--------|
| 🌱 First Steps | Complete Level 1 | ⬜ |
| 📚 Man Reader | Use `man` 10 times | 🔓 1/10 |
| 🔥 Hot Streak | 7-day learning streak | ⬜ |
| 🧠 Total Recall | 10 perfect spaced rep reviews | ⬜ |
| 💀 Danger Zone | Successfully use `rm -rf` (safely) | ⬜ |
| 🔗 Pipe Dream | Chain 5 commands in one line | ⬜ |
| 🎯 Pattern Master | Write a working regex first try | ⬜ |
| 👨‍👦 Teacher | Share Bash Quest with someone | ⬜ |
