/* 

THIS IS THE VERSUS BATTLES WIKI SCRAPER. ALL I WANT TO DO IS FIND PEOPLE AND STORE THEM AS OBJECTS.

===================================================================================================================================================================================================================================================

OBJECTS HAVE A FEW THINGS: URL, NAME, IMAGE, AND TIER(S).
- URL: 
    - where they're from on the site
- NAME:
    - where their name is
- IMAGE:
    - their main image from the site
- TIER(S):
    - ALL of their tiers stored in an array from weakest to strongest

===================================================================================================================================================================================================================================================

Example Object:

{
    url: "https://vsbattles.fandom.com/wiki/Saitama",
    name: "Saitama",
    image: "https://static.wikia.nocookie.net/vsbattles/images/2/22/Casual_Saitama.png/revision/latest?cb=20250602063806",
    tiers: ["9-B", "6-C", "4-A", "3-C"]
}

===================================================================================================================================================================================================================================================

VSBATTLES WIKI CHARACTER LIST: https://vsbattles.fandom.com/wiki/Category:Characters

this is a list of all characters in the vs battles wiki. we want to randomly select one or select by name. 
some have unconventional names, some are pages that are difficult to parse.
so we'll want to be prepared to either serve or reject "broken" pages. 
Since our parsing wont be perfect, sometimes we'll miss things. If we really miss things, then we can just discard the object.
But sometimes we dont want to discard the object since ideally we want most of them to work. let the user choose. 

===================================================================================================================================================================================================================================================

TIERING SYSTEM: https://vsbattles.fandom.com/wiki/Tiering_System

Tiers are easy. Characters have multiple tiers because they change over their respective series. 
Lower Numbers = Stronger. Higher Letters = Stronger. 
So 1-A is stronger than 1-B, which is stronger than 2-C, which is stronger than 3-A, etc.
When we parse for these, we'll be sure to properly format and sort them- often we'll only want the weakest or strongest tier though. 
By default we should want the strongest tier. 

===================================================================================================================================================================================================================================================

End Goal:

I want this to be usable for other files. I dont want people to have to download the whole vsbw site just to use their data. 
Things on this site change often and new characters are added all the time. So ideally this scraper can be used on demand to get the latest data. 
We can cache data locally if we want to reduce load times, but we should always have the option to re-scrape for the latest data.

My personal end goal is for this file to have a few functions that can be imported and used elsewhere:

1. getCharacterByName(name: string, serveAll: false): Character | null
    - searches the vsbw wiki for a character by name and returns their object or null if not found.

2. getRandomCharacter(serveAll: false): Character
    - selects a random character from the vsbw wiki and returns their object.


note: serveAll means whether to serve incomplete objects or not. if false, only complete objects are served.

===================================================================================================================================================================================================================================================
*/