# BreakBread
For college roommates who share grocery shopping amongst themselves, the BreakBread app is an inventory management tool that allows users to document their grocery purchases and divvy up payments. 
Unlike any app before, BreakBread provides roommates with the best way to document, share, and enjoy grocery shopping.

Figma UI prototype:
https://www.figma.com/file/0ncbdJk0rEqyZHln6A6Y5R/Erik-McCutchen's-team-library?node-id=414%3A3
Last Edited 02/28/2022

Use-Case Diagram:
https://app.diagrams.net/#G1e9jcAisj4jJb03Ss7P-V9nysNpddWrfx available on Wiki page and the source file is in the repo.
Last Edited 02/04/2022

Class Diagram:
Available on Wiki page and the source file is in the repo. Can be opened using the free yED graph editing software.
Last Edited 02/09/2022

GitHub Actions, CI Builds:
https://github.com/MohamedCheour98/BreakBread/actions

Download Instructions:
git clone https://github.com/MohamedCheour98/BreakBread.git
navigate to bbbbackend,
npm i,
navigate to bbfrontend,
npm i,
in bbbackend,
npm run dev (starts up backend),
in bbfrontend,
npm start (starts up frontend),
A new user trying to use our code won't be able to access the database we are using so they'll need to use their own cluster of MongoDB.

LINTER/CODE STYLER:
(using the JavaScript default style guidlines: https://google.github.io/styleguide/jsguide.html)
-We used the Prettier ESLint combination plugin on VS Code which is available by looking up "Prettier ESLint" on the VS Code plugin page.
(The download instructions loosly follow the instructions on the Prettier ESLinter documentation underneath the download on VS Code, see this page for extra troubleshooting)
-Download that plugin, you may need to restart VS Code for it to take effect. Then type CTRL+ALT+P(windows) or CMD+SHIFT+P(mac) to show all commands in VS Code, type format document wtih, and set Prettier ESLint to be the default format
-Three dependencies need to be downloaded: eslint@6.8.0, prettier@1.9.1, & prettier-eslint@10.1.0, to download these, run npm install and the name of the dependecy in the directory you want to be affected by the style checker
-Then the style checker should be set up, to format a file, run SHIFT+ALT+F(windows) or SHIFT+OPTION+F(mac)
-There is also an option to set up auto format on save in Settings on VS Code

TESTING:
Uncovered Lines:
Line 23 in user.js is covered by a test, however, Jest doesn't know how to deal with this particular case, as it is testing for an error throw while the database is running the code, so the code gets stuck in mongoose. Approved by BJK.

Line 24 in userServices.js does not need to be covered, as it is a database connection fail, rather than a function fail. Approved by BJK.

![backend.js](https://github.com/MohamedCheour98/BreakBread/actions/workflows/backend.js.yml/badge.svg)
