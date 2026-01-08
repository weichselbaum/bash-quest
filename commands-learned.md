# Commands Learned

Quick reference for commands covered in sessions.

| Command | Stands For | What It Does |
|---------|-----------|--------------|
| `ls` | list | List directory contents |
| `ls -l` | list long | Detailed listing with permissions, size, date |
| `ls -a` | list all | Include hidden files (starting with `.`) |
| `cd` | change directory | Move to a different directory |
| `man` | manual | Show manual page for a command |
| `mkdir` | make directory | Create a directory |
| `mkdir -p` | make directory (parents) | Create nested directories |
| `touch` | touch | Create empty file / update timestamp |
| `cat` | concatenate | Output file contents (or join files) |
| `less` | "less is more" | Scroll through file (q to quit, / to search) |
| `more` | more | Older pager, forward-only |
| `head` | head | Show first lines of file |
| `tail` | tail | Show last lines of file |
| `tail -f` | tail follow | Watch file for new lines in real-time |
| `head -n 20` | head number | Show first 20 lines |
| `echo` | echo | Print text to stdout |

## Concepts

- **`$` vs `#`**: Regular user vs root prompt
- **`~`**: Shortcut for home directory
- **Relative path**: Path from current location (`cd folder`)
- **Absolute path**: Full path from root (`cd /full/path/to/folder`)
- **Flags**: Options like `-l`, `-a` that modify command behavior (can combine: `-la`)
- **`>`**: Redirect output, overwrites file
- **`>>`**: Redirect output, appends to file
