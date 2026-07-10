#!/bin/bash
# Push homepage restructure changes to GitHub

cd "$(dirname "$0")"

echo "Pushing homepage restructure to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Push successful! Netlify will deploy automatically."
else
    echo "❌ Push failed. Check your GitHub credentials and network connection."
fi
