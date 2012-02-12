//============================================================================
//                           BackupOptionsPlugin

// Ensure that the BackupOptionsPlugin is only installed once.
//

if (!version.extensions.BackupOptionsPlugin) {

setStylesheet(".wideInput input { width:30em; }","BackupOptionsStylesheet");

version.extensions.BackupOptionsPlugin = {
    major: 1, minor: 0, revision: 0,
    date: new Date(2007, 9, 11), 
    type: 'plugin',
    source: "http://rumkin.com/tools/tiddlywiki/#BackupOptionsPlugin"
};


if (!config.options.txtBackupOptionsFormat)
 config.options.txtBackupOptionsFormat = "%N.%Y%M%D.%h%m%s%n.html"; // Same as default format
if (config.optionsDesc)
 config.optionsDesc.txtBackupOptionsFormat = "Filename format for backups."

if (version.major < 2) alertAndThrow("BackupOptionsPlugin requires TiddlyWiki 2.0 or newer.");

//============================================================================
// Overwrite the built-in functions

getBackupPath = function(localPath) {
 var formatString = config.options['txtBackupOptionsFormat'];
 if (formatString == undefined || ! formatString || formatString == '')
 formatString = '%N.%Y%M%D.%h%m%s%n.html';
 var backSlash = true;
 var dirPathPos = localPath.lastIndexOf("\\");
 if (dirPathPos == -1)
 {
 dirPathPos = localPath.lastIndexOf("/");
 backSlash = false;
 }
 var backupFolder = config.options.txtBackupFolder;
 if (! backupFolder || backupFolder == '')
 backupFolder = '.';
 backupFolder += (backSlash ? "\\" : '/');
 var backupPath = localPath.substr(0, dirPathPos) + (backSlash ? "\\" : '/') + backupFolder;
 var backupBase = localPath.substr(dirPathPos)
 backupBase = backupBase.substr(0, backupBase.lastIndexOf('.'));
 var d = new Date()
 while (formatString.length > 0)
 {
 var formatHandled = 0;
 if (formatString.length > 1 && formatString.charAt(0) == '%')
 {
 formatHandled = 1;
 switch (formatString.charAt(1))
 {
 case 'D':
 backupPath += String.zeroPad(d.getUTCDate(), 2);
 break;
 case 'h':
 backupPath += String.zeroPad(d.getUTCHours(), 2);
 break;
 case 'M':
 backupPath += String.zeroPad(d.getUTCMonth()+1, 2);
 break;
 case 'm':
 backupPath += String.zeroPad(d.getUTCMinutes(), 2);
 break;
 case 'N':
 backupPath += backupBase;
 break;
 case 'n':
 backupPath += String.zeroPad(d.getUTCMilliseconds(), 4);
 break;
 case 's':
 backupPath += String.zeroPad(d.getUTCSeconds(), 4);
 break;
 case 'Y':
 backupPath += String.zeroPad(d.getUTCFullYear(), 4);
 break;
 case 'y':
 backupPath += String.zeroPad(d.getUTCFullYear() % 100, 4);
 break;
 case '%':
 backupPath += '%';
 break;
 default:
 formatHandled = 0;
 }
 if (formatHandled)
 formatString = formatString.substr(2);
 }
 if (! formatHandled)
 {
 backupPath += formatString.charAt(0);
 formatString = formatString.substr(1);
 }
 }

 return backupPath;
}


} // of "install only once"