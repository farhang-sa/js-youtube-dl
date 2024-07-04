const fs = require('fs');
const { exec } = require( 'child_process' );
const path = require( "path" );
const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

const api = async (body, res) => {

    let isLinux = (process.platform === "linux");
    const ytdl_find_extension = (fileName) => {
        if (!fileName.indexOf('.') > 0 )
            return "mp4";
        fileName = fileName.split(".");
        if (fileName.length === 1)
            return "mp4";
        return fileName[fileName.length - 1] // extension
    }

    function ytdl_make_name(fileName) {
        let ext = ytdl_find_extension(fileName);
        // remove extension name
        fileName = fileName.replaceAll('.'.ext, '',);
        // clean name
        fileName = fileName.replaceAll(' ', '_');
        return fileName.replaceAll("/[^A-Za-z0-9_.-]/", '') + '.' + ext;
    }

    const trim = function (str, what) {
        for (let x = 0; x <= what.length - 1; x++) {
            while (str.startsWith(what[x]))
                str = str.replace(what[x], '');
            while (str.endsWith(what[x]))
                str = str.substring(0, str.length - 1);
        }
        return str;
    }

    let ytdl_win = "http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe";
    let ytdl_lin = "http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux";
    let dlLink = isLinux ? ytdl_lin : ytdl_win;
    let exFile = (isLinux ? './' : '') + path.basename(dlLink);

    const actualApi = () => {

        if (Object.create(body).length === 0)
            return res.end('No input');

        if (typeof body.link === 'undefined')
            return res.end('No link');

        let link = body.link;

        let quality = body.quality ? body.quality : null;
        if (link.toLowerCase() === 'clear' || link.toLowerCase() === 'clean') {
            exec(isLinux ? 'rm *.mp4' : 'del *.mp4');
            exec(isLinux ? 'rm *.webm' : 'del *.webm');
            return res.end('all videos deleted');
        } else if (link.indexOf('cleanfile:') > 0 ) {
            link = link.replaceAll('cleanfile:', '');
            exec(isLinux ? 'rm ' + link : 'del "' + link + '"');
            return res.end('video deleted');
        } else if (link.indexOf('renamefile:') > 0 ) {
            // old name
            link = link.replaceAll('renamefile:', '');
            // new name
            let nName = ytdl_make_name(body.to ? body.to : link);
            fs.renameSync(link, nName)
            if (fs.existsSync(link)) // rename!
                return res.end('video renamed:' + nName);
            return res.end('video renamed:' + link); // fail
        } else if (link.toLowerCase() === 'list' || link.toLowerCase() === 'videos') {
            let scDir = fs.readdirSync('.');
            let videos = 'videos-list:{';
            for (let file in scDir){
                if (scDir[file].indexOf('.mp4') > 0 || scDir[file].indexOf('.webm')  > 0 )
                    videos += "\n\"" + scDir[file] + '" : "' + scDir[file] + '" ,';
            }
            videos = trim(videos, " ,");
            videos += '}';
            console.log( videos );
            return res.end(videos);
        } // else :
        if ( body.info ) { // for next version!
            // Get video info with download formats
            ytdl.getInfo( link ).then(info => {
                console.log(info.formats);
                let resu = JSON.stringify(info);
                res.end(resu);
            });
        } else {
            let down = quality ? ' -S "res:' + quality + '"' : '';
            exec(exFile + down + ' ' + link, (err, std, strerr) => {
                if( err )
                    return res.end(err );
                down = std.split("[download]");
                if (down && down.length > 0) for (let intel in down) {
                    intel = trim(intel, " /\\\r\n\t");
                    if ( intel.indexOf('Destination:')  > 0 ) {
                        // get file name
                        intel = intel.replace('Destination:', '').trim();
                        // make new clean name
                        link = ytdl_make_name(intel);
                        fs.renameSync(intel, link)
                        if (fs.existsSync(link)) // rename!
                            res.end(link);
                        res.end(intel);
                    }
                } res.end('Download failed : change quality options');
            });
        }
    }

    // run the api
    if ( ! fs.existsSync( exFile ) ) {
        const response = await fetch( dlLink );
        const buffer = await response.arrayBuffer()
        fs.writeFileSync(exFile , Buffer.from(buffer))
        if ( ! fs.existsSync(exFile) )
            return res.end('yt-dlp binary not prepared');
        if ( isLinux )
            exec('chmod 777 ' + exFile);
        actualApi();
    } else actualApi();

}

module.exports = api ;