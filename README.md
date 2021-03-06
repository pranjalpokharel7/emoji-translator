## Emoji Translator

Emoji translator is an addon for browsers that translates keywords to emoji across all URLs in the format :keyword: -> emoji, for example,\
':' + 'heart' + ':' to ❤️

### Adding To Your Browser
The link to the addon is available now!\
**Add to your Firefox from this link - [addons/emoji-tanslator](https://addons.mozilla.org/en-US/firefox/addon/emoji-translator)**

### What's New (v1.1)
- Shortcut to open popup (Ctrl+Period key combo by default, can be changed from the addon menu - refer ['Managing Extension Shortcuts'](https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox))
- Search button focus when popup is opened
- Bug fixes for Facebook and Twitter
- Stylistic changes

### Adding To Your Browser (Temporarily, For Development)
Currently, the addon is only available for Firefox, but we are working on making it cross-browser soon.
- Clone the repository to your local directory.\
`$ git clone https://github.com/pranjalpokharel7/emoji-translator.git`
- Open Firefox and type `about:debugging` in the URL bar which will open the debugging page.
- Click on the **'This Firefox'** tab and then on the **'Load Temporary Add-on...'** button.
- A dialog box will open. Navigate to the cloned repository and open (double-click) the `manifest.json` file in the root folder. 
The extension should now load temporarily for testing purposes.\
\
**Note:** You can refer to this short clip that demonstrates the process - [Loading Temporary Addon in Firefox](https://www.youtube.com/watch?v=J7el77F1ckg)

### How To Use

#### Translation
Simply use 'TURN ON'/'TURN OFF' button to enable/disable the translation feature. The extension will attempt to replace any emoji name typed in a text capturing element that matches the regex pattern`:[a-z_]:` by the adequate emoji, if the emoji exists in the extension database.\
\
The ':' character is the default for capturing the emoji name group, but it can also be changed from the settings page (starting and ending character change) to any character of the user's choice. Reload any page you were previously working on for the new translation pattern change to be noticeable.\
\
**Note:** The translations can be found on the help/settings tab 'Dictionary'.\
\
![translation_gif](https://raw.githubusercontent.com/pranjalpokharel7/emoji-translator/main/screenshots/translation.gif?token=AK2KZE2SCCY6QJ7OEESC5Y3AFVPZ2)

#### Emoji/Emote Copy 
The user can press on individual emoji/emote from the tabs to copy the content to clipboard. Paste from the clipboard when convenient.\
\
Additionally, you can use the **'Search...'** bar to quickly search for an emoji/emote. By default, the search bar searches for an emoji of related search query, however this too can be changed using the settings page.\
\
![emoji_page.png](https://raw.githubusercontent.com/pranjalpokharel7/emoji-translator/main/screenshots/emoji_page.png?token=AK2KZE24FOUF5KJEW7AA2ADAFVHZY)
![emote_page.png](https://raw.githubusercontent.com/pranjalpokharel7/emoji-translator/main/screenshots/emote_page.png?token=AK2KZEY6F2D5UMTP3INP2VLAFVH2I)

#### Recents/Favorites
Any emoji button pressed will be added to the **Recent** tab. Users can add any emoji to the **Favorites** tab for quick access by right-click on an emoji button.
Note that the current limit on the total number of emojis on these tabs is 60 for now, but we will make it changeable to users in the next update. Currently emotes are not supported in the recent/favorites tab.\
\
![recents_page.png](https://raw.githubusercontent.com/pranjalpokharel7/emoji-translator/main/screenshots/recents_page.png?token=AK2KZE2H5Q6RECOUXCG7EFTAFVH2I)

### How you can contribute
While the translator works for most websites, we have found it diffult to configure the function for websites that have complex elements to capture texts such as Facebook or Twitter. We realize that these are probably the sites for which users may want the functionality to be available the most. You can contribute to improving functionalities for these sites. The translation script is available in the file `/translate-script.js`.

### Icon Attribution
[@Sandace11](https://github.com/Sandace11/) - Sandesh Ghimire, Lime Color
