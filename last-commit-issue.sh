#!/bin/bash

GIT_ISSUE_REGEX='(\(#[0-9]+\)) .+'
if [[ $(git log --oneline -1 --format=%B) =~ $GIT_ISSUE_REGEX ]]; then
  echo ${BASH_REMATCH[1]}
  exit 0
else
  echo "??"
  exit 1
fi
