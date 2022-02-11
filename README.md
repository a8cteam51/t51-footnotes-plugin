# Team 51 Footnotes plugin

## What's this?
This is a plugin that Team51 is using on a few sites.

The initial version of this plugin already existed on these two repositories:
 - https://github.com/a8cteam51/scholarsstage/tree/trunk/mu-plugins/scholars-footnotes
 - https://github.com/a8cteam51/perell/tree/trunk/mu-plugins/perell-footnotes

However, these two repos have re-usability issues:
 - Their name is used in several places across the plugin's code
 - The CSS/JS for the frontend experience was left in the themes directory (the mu-plugin code was only creating the Gutenberg block)

 This standalone plugin solves these two problems by creating a generic `Team 51 Footnotes` plugin that includes the styles and functionality for the end user, and that can be easily re-used on other sites.

 ## How to use?
 Download the repo and place it inside a `mu-plugin`
 Install the node JS dependencies using `npm install`
 SCSS can be compiled using `sass` installed on your local machine.