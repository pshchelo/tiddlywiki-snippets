==================
TiddlyWiki Plugins
==================
Various pieces I collected for my TiddlyWiki usage.

Show Only Last Journal Entry on Startup
=======================================
Create a tiddler named SetDefaultTiddlers, copy-paste the code from 
``ShowLastJournalOnStartup.js``, tag it with ``systemConfig`` tag and then, just 
*delete* the existing DefaultTiddlers.  When you save-and-reload, the above code
will automatically re-write the *shadow* definition of DefaultTiddlers so that 
it will then open the most recently modified 'journal' tiddler.

Thanks to Eric Shulman of TiddlyTools.com for giving the answer to this problem.

Backup Options Plugin
=====================
From the very start with TiddlyWiki I was annoyed by the amount of generated backups, 
especially with AutoSave on. Since right now I host my tiddlies on servers that anyway 
are backed up at very regular basis, I decide that one backup is enough for me. 
After searching the net I've found only one plugin with similar functionality - 
BackupOptionsPlugin(http://rumkin.com/tools/tiddlywiki/#BackupOptionsPlugin) 
by Tyler Akins. I gave it a try and found a small bug - it appears that in JavaScript 
the result of ``date.getUTCMonth()`` is 0-based, so January is 0 and December is 11. 
This was not accounted for in the code, so here is corrected version, 
with all credits going to the original author.

To use this plugin, create a new tiddler named BackupOptionsPlugin, paste the code from ``BackupOptionsPlugin.js``, give this tiddler a ``systemConfig`` tag and refresh your TW page. After this you will find a field in AdvancedOptions to name your backup files. For more instructions go to the original plugin website.

Single Backup Plugin
====================
Although BackupOptionsPlugin is great, it has one small drawback for me - 
it uses cookies to store its options, and I'm opening my TW from one location 
but on different computers/browsers, including more or less "public" ones, 
where cookies might disappear against my will :) So I decided to create a plugin 
that will overwrite the default backup saving function with slightly modified one. 
Now the backup will create only one file named ``YourTiddlyName.backup.html`` 
instead of multiple backups, and this does not depend on any options stored 
in cookies of your browser (although the path where to save it does still 
depend on cookies). The code is in ``SingleBackupPlugin.js``.

As usual with TW, to use this plugin create a new tiddler named SingleBackupPlugin and tagged systemConfig, paste the code there, save and reload your TW.
