## Emoji Translator

Emoji translator is an addon for browsers that translates keywords to emoji across all URLs in the format :keyword: -> emoji, for example,\
':' + 'heart' + ':' to ❤️

### Adding To Your Browser (Temporarily)
Currently, the addon is only available for Firefox, but we are working on making it cross-browser soon.\
- Clone the repository to your local directory.\
`$ git clone https://github.com/pranjalpokharel7/emoji-translator.git`
- Open Firefox and type `about:debugging` in the URL bar which will open the debugging page.
- Click on the **'This Firefox'** tab and then on the **'Load Temporary Add-on...'** button.
- A dialog box will open. Navigate to the cloned repository and open (double-click) the `manifest.json` file in the root folder. 
The extension should now load temporarily for testing purposes.

### Adding To Your Browser (Permanently)
The link to the addon in the addon store will be available soon, after we submit it to the addon store after a few bug fixes.

### How To Use

#### Translation
Simply use 'TURN ON'/'TURN OFF' button to enable/disable the translation feature. The extension will attempt to replace any emoji name typed in a text capturing element that matches the regex pattern`:[a-z_]:` by the adequate emoji, if the emoji exists in the extension database.\
\
The ':' character is the default for capturing the emoji name group, but it can also be changed from the settings page (starting and ending character change) to any character of the user's choice. Refresh the emoji after changing the start/end character using the 'REFRESH' button.\
\
**Note:** The translations can be found on the help/settings tab 'Dictionary'.

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
