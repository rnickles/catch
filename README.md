# Mobile development
In order to emulate the mobile experience, a separate branch is used to develop for mobile on desktop. The `main` branch is the production branch and `dev-branch` is the development branch.

The difference between `dev-branch` and `main` is that `dev-branch` opens up a separate window that is the approximate dimensions as a phone screen.

When changes need to be merged into `main` from the `dev-branch` care must be taken to not accept any changes from `index.html` and `game.html`.