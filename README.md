# Figma Tokens Sync with GitHub

This enables syncing design tokens from Figma to GitHub, so you can easily use them in your web projects. The project consists of two main components: a Figma plugin and a GitHub Action.

## Figma Plugin

The Figma plugin allows you to export your design tokens as JSON files and push them to your GitHub repository. To use the plugin, follow these steps:

1. Install the [Figma Tokens Sync plugin](https://www.figma.com/community/plugin/966843824256207404/Figma-Tokens-Sync) from the Figma Community.
2. Open Figma file and navigate to the page containing your design tokens.
3. Open the Figma Tokens Sync plugin and authenticate with your GitHub account.
4. Select the GitHub repository you want to sync tokens with.
5. Choose a directory within the repository to store tokens.
6. Push JSON files from plugin to GitHub.

## GitHub Action

The GitHub Action automatically pulls the latest design tokens from your GitHub repository and generates CSS variables that can be used in a web projects. By pushing new design tokens to GitHub repository, the GitHub Action will automatically generate CSS variables that can be use in your web projects.
