var Atlantis = window.Atlantis || {};

(function () {
    Atlantis.ContentManager = function (rootDirectory) {
        this.rootDirectory = rootDirectory || "";
        this.assets = [];
    }

    Atlantis.ContentManager.prototype.load = function (assetName) {
        if (typeof(this.assets[assetName]) != "undefined") {
            return this.assets[assetName];
        } 
        else {
            var temp = assetName.split(".");
            var ext = temp[(temp.length - 1)];
            
            switch (ext) {
                case "png":
                case "jpg":
                case "bmp":
                    loadImage(this.assets, assetName);
                    break;
                case "mp3":
                case "ogg":
                case "wave":
                    loadAudio(this.assets, assetName);
                    break;
                case "mp4":
                case "ogv":
                    loadVideo(this.assets, assetName);
                case "xml": 
                case "json":
                case "js":
                    loadResource(this.assets, assetName, ext);
                    break;
            }

            return this.assets[assetName]; 
        }
    };

    /*
     * Load an image from an url
     */
    function loadImage(assetCollection, imageName) {
        var image = new Image();
        image.src = imageName;
        assetCollection[imageName] = image;
        return image;
    }

    /*
     * Load a music from an url
     */
    function loadAudio(assetCollection, audioName) {
        var audio = document.createElement("audio");
        audio.source = audioName;
        audio.controls = false;
        assetCollection[audioName] = audio; 
        return audio;
    }

    /* 
     * Load a video from an url
     */
    function loadVideo(assetCollection, videoName) {
        var video = document.createElement("video");
        video.source = videoName;
        assetCollection[videoName] = video;
        return video;
    }

    /*
     * Load a resource from an url
     */
    function loadResource(assetCollection, resourceUrl, ext) {
        if (typeof(Atlantis.ajax) != "undefined") {
            Atlantis.ajax({
                method: "GET",
                url: resourceUrl,
                success: function (response) {
                    var result = response;
                    if (ext == "json") {
                        result = JSON.parse(response);
                    }
                    assetCollection[resourceUrl] = result;
                }
            });

            return assetCollection[resourceUrl];
        }
        else {
            console.error("[Content] Impossible to load the resource becanse the Atlantis.Helper class isn't loaded");
        }
    }

    /*
     * Dispose all assets
     */
    Atlantis.ContentManager.prototype.dispose = function () {
        this.assets = [];
    };
})();