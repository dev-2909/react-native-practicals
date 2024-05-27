#!/bin/bash

read -p "Enter the new repository URL: " NEW_REPO_URL

# Initialize Git repository
git init

# Add all files to staging
git add --all

# Commit changes
git commit -m "Initial commit"

# Rename default branch to 'main'
git branch -M main

# Add remote origin
git remote add origin "$NEW_REPO_URL"

# Push to remote repository
git push -u origin main

echo "Git repository initialized and initial commit done."
