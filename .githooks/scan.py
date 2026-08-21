#!/usr/bin/env python3
"""Refuse to let private identifiers into a public repository.

These repositories are public civic artefacts. Twice now, something that
belonged only on the author's machine has been committed to one of them: a
list of named people, and a session identifier in every commit message. Both
were caught by a person reading, which is not a control.

This is the control. It runs from .githooks/commit-msg on the message and
from .githooks/pre-commit on the staged content, so nothing that matches can
be committed without an explicit override.

Run over an arbitrary file or text:   python3 .githooks/scan.py FILE...
Run over staged content:              python3 .githooks/scan.py --staged
Override for one commit, deliberately: git commit --no-verify
"""

import re
import subprocess
import sys

# (name, pattern, why it must not be published)
PATTERNS = [
    ('Claude session URL',
     r'claude\.ai/code/session_[A-Za-z0-9_-]+',
     'links this repository to a private session'),
    ('Claude job or worktree path',
     r'\.claude/(jobs|worktrees|projects)/[A-Za-z0-9_-]+',
     'exposes the author machine layout'),
    ('the author machine username',
     r'(?i)\bdave\b',
     'is a local account name and belongs nowhere in a public repository'),
    ('absolute local path',
     r'(/Users/|/home/[a-z]|/private/(tmp|var)/|[path removed]|[A-Za-z]:\\Users\\)',
     'is a path on somebody machine and cannot mean anything to a reader'),
    ('temp or scratch path',
     r'/tmp/[A-Za-z0-9._-]{4,}',
     'is a scratch location that will not exist for anyone else'),
    ('unrelated private project',
     r'\b([private project]|[private project]|[private project]|[private project]|[private project])\b',
     'names private infrastructure unrelated to this project'),
    ('private repository name',
     r'[private repository]',
     'names a private repository'),
    ('API key',
     r'sk-[A-Za-z0-9\-_]{16,}',
     'is a credential'),
    ('assigned secret',
     r'(?i)\b(secret|api|access|private)[_-]?(key|token)\b\s*[:=]\s*["\']?[A-Za-z0-9/+_-]{16,}',
     'is a credential'),
]

# Deliberate exceptions, matched against the whole line. Keep this list short
# and justified; every entry is a hole in the control.
ALLOW = [
    # The AI-transparency rule of this project makes authorship a thing to
    # declare rather than hide, so the co-authorship trailer stays.
    re.compile(r'^\s*Co-Authored-By:'),
    # This file necessarily contains the patterns it forbids.
    re.compile(r'githooks/scan\.py'),
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


def staged_paths():
    r = subprocess.run(['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
                       capture_output=True, text=True)
    return [p for p in r.stdout.split('\n') if p]


def staged_text(path):
    r = subprocess.run(['git', 'show', f':{path}'], capture_output=True)
    try:
        return r.stdout.decode('utf-8')
    except UnicodeDecodeError:
        return ''


def main(argv):
    found = []
    if argv and argv[0] == '--staged':
        for p in staged_paths():
            if p.startswith('.githooks/'):
                continue
            found += offences(staged_text(p), p)
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
