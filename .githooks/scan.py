#!/usr/bin/env python3
"""Refuse to let private identifiers into a public repository.

These repositories are public civic artefacts. Things that belonged only on
the author's machine reached them more than once: a file naming living people
with contact details, local paths in review records, and a session identifier
in every commit message. Each was caught by a person reading, which is not a
control.

This is the control. It runs from .githooks/commit-msg on the message and from
.githooks/pre-commit on the staged content, so nothing matching can be
committed without an explicit override.

    python3 .githooks/scan.py FILE...     check a file
    python3 .githooks/scan.py --staged    check what is staged
    python3 .githooks/scan.py --all       check every tracked file
    git commit --no-verify                bypass, deliberately

Note on the odd-looking string joins below: this file is public, so it must
not itself spell out the private names it defends against. A scanner that
lists them teaches a reader exactly what to look for, and would be rewritten
by any history scrub that removes them. The fragments are assembled at import.
"""

import re
import subprocess
import sys

# Private names, assembled rather than written out, for the reason in the
# docstring. Keep the halves meaningless on their own.
_PRIVATE = [a + b for a, b in (
    ('No', 'va'), ('Nov', 'aAgents'), ('Hive', 'ras'),
    ('My', 'DJ'), ('ai', 'mind'),
)]
_USER = 'da' + 've'
_PRIVATE_REPO = 'the-horse-is' + '-here-to-stay'

PATTERNS = [
    ('session identifier',
     r'claude\.ai/code/session_[A-Za-z0-9_-]+',
     'ties this repository to a private session'),
    ('agent job or worktree path',
     r'\.claude/(?:jobs|worktrees|projects)/[A-Za-z0-9_-]+',
     'exposes the author machine layout'),
    ('local account name',
     r'(?i)\b' + _USER + r'\b',
     'is a local account name and belongs nowhere in a public repository'),
    ('absolute local path',
     r'(?:/Users/|/home/[a-z]|/private/(?:tmp|var)/|/var/folders/|[A-Za-z]:\\Users\\)',
     'is a path on one machine and means nothing to any reader'),
    ('scratch path',
     r'/tmp/[A-Za-z0-9._-]{4,}',
     'is a scratch location that will not exist for anyone else'),
    ('unrelated private project',
     r'\b(?:' + '|'.join(_PRIVATE) + r')\b',
     'names private infrastructure unrelated to this project'),
    ('private repository name',
     re.escape(_PRIVATE_REPO),
     'names a private repository'),
    ('credential',
     r'sk-[A-Za-z0-9\-_]{16,}',
     'is a credential'),
    ('assigned secret',
     r'(?i)\b(?:secret|api|access|private)[_-]?(?:key|token)\b'
     r'\s*[:=]\s*["\']?[A-Za-z0-9/+_-]{16,}',
     'is a credential'),
]

# Deliberate exceptions, matched against the whole line. Every entry here is a
# hole in the control, so keep the list short and give each one a reason.
ALLOW = [
    # This project's rule is that authorship is a feature when declared and a
    # liability when discovered. That applies to machine authorship too, so the
    # co-authorship trailer stays while the session identifier does not.
    re.compile(r'^\s*Co-Authored-By:'),
]


def offences(text, where):
    out = []
    for i, line in enumerate(text.splitlines(), 1):
        if any(a.search(line) for a in ALLOW):
            continue
        for name, pat, why in PATTERNS:
            m = re.search(pat, line)
            if m:
                out.append((where, i, name, why, m.group(0)[:60]))
    return out


def _git(*args):
    return subprocess.run(['git', *args], capture_output=True, text=True).stdout


def _paths(mode):
    if mode == '--staged':
        out = _git('diff', '--cached', '--name-only', '--diff-filter=ACM')
    else:
        out = _git('ls-files')
    return [p for p in out.split('\n') if p and not p.startswith('.githooks/')]


def _content(path, mode):
    if mode == '--staged':
        raw = subprocess.run(['git', 'show', f':{path}'], capture_output=True).stdout
    else:
        try:
            raw = open(path, 'rb').read()
        except OSError:
            return ''
    try:
        return raw.decode('utf-8')
    except UnicodeDecodeError:
        return ''


def main(argv):
    found = []
    if argv and argv[0] in ('--staged', '--all'):
        for p in _paths(argv[0]):
            found += offences(_content(p, argv[0]), p)
    else:
        for p in argv:
            with open(p, encoding='utf-8', errors='replace') as fh:
                found += offences(fh.read(), p)

    if not found:
        return 0

    print('\nBLOCKED: content that must not reach a public repository\n',
          file=sys.stderr)
    for where, line, name, why, sample in found:
        print(f'  {where}:{line}', file=sys.stderr)
        print(f'    {name}, which {why}', file=sys.stderr)
        print(f'    found: {sample}\n', file=sys.stderr)
    print('Remove it, or commit with --no-verify if you are certain.\n',
          file=sys.stderr)
    return 1


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
