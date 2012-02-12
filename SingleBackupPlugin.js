// Overriding default
getBackupPath = function(localPath, title, extension) {
    var slash = "\\";
    var dirPathPos = localPath.lastIndexOf("\\");
    if(dirPathPos == -1) {
        dirPathPos = localPath.lastIndexOf("/");
        slash = "/";
    }
    var backupFolder = config.options.txtBackupFolder;
    if(!backupFolder || backupFolder == "")
        backupFolder = ".";
    var backupPath = localPath.substr(0,dirPathPos) + slash + backupFolder + localPath.substr(dirPathPos);
    backupPath = backupPath.substr(0,backupPath.lastIndexOf(".")) + ".";
    if(title)
        backupPath += title.replace(/[\\\/\*\?\":<> ]/g,"_") + ".";
//here is where override happened
    backupPath += "backup." + (extension || "html");
    return backupPath;
}