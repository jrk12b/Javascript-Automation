#!/bin/bash
# Shell script which executes the following: 
# 1. Navigate to root of the git repo
# 2. Run git status
# 3. Prompts user to enter a commit message
# 4. Commits code changes with provided commit message
# 5. Pushes commit to git

# navigate to root of git repo
cd "$(git rev-parse --show-toplevel)"

npm run format-write

git status

read -p "Enter your commit message: " commitMessage
# Check if the user entered a message
if [[ -z "$commitMessage" ]]; then
  echo "Error: Please enter a commit message."
  exit 1
fi

git add .

git commit -m "$commitMessage"

git push

echo "Committed and Pushed to Git"