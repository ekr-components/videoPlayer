var components = components || {};

jQuery(document).ready(function() {
    jQuery('[data-component="video-player"]').each(function() {
        var video = new components.videoPlayer(this);
    });
});

components.videoPlayer = function(el) {
    this.el = jQuery(el);
    this.url = this.el.data('video-url');
    if(this.url.toLowerCase().indexOf('youtube') !== -1) {
        this.type = 'youtube';
        this.url = this.url.replace('watch?v=', 'v/');
    } else if(this.url.toLowerCase().indexOf('vimeo') !== -1) {
        this.type = 'vimeo';
        this.url = this.url.replace('vimeo.com', 'player.vimeo.com/video');
    } else {
        this.type = 'unknown';
    }
    if(this.type) {
        if(this.url.indexOf('?') == '-1') {
            this.url += '?autoplay=1';
        } else {
            this.url += '&autoplay=1';
        }
    }
    this.closeButton = jQuery('[data-video="close"]');
    this.mask = jQuery('[data-video="mask"]');
    this.container = jQuery('[data-video="container"]');
    this.content = jQuery('[data-video="content"]');
    this.mobileBreakpoint = 500;
    this.init();
};
components.videoPlayer.prototype = {
    init: function() {
        this.el.on('click', this.play.bind(this));
        this.closeButton.off('.videoPlayer').on('click.videoPlayer', this.close.bind(this));
        this.mask.off('.videoPlayer').on('click.videoPlayer', function(e) {
            if(e.currentTarget === this.mask[0]) {
                this.close();
            }
        }.bind(this));
        jQuery(window).off('.videoPlayer').on('resize.videoPlayer', this.resize.bind(this));
        this.resize();
    },
    play: function() {
        var win = {
            w: jQuery(window).width(),
            h: jQuery(window).height()
        };
        var width = win.w * .75;
        var height = width * .56235;
        var topMargin = (win.h * .1);
        if(topMargin + height > win.h) {
            topMargin = 0;
            height = win.h - 40;
            width = height * 1.777;
        }
        if(width < this.mobileBreakpoint) {
            width = win.w - 40;
            height = width * .56235;
        }
        if(this.type == 'youtube') {
            var videoHtml = '' +
                '<iframe id="ytplayer" type="text/html" ' +
                    'width="' + width + '" height="' + height + '" ' +
                    'src="' + this.url + '" frameborder="0" ' +
                    'webkitallowfullscreen mozallowfullscreen allowfullscreen>' +
                '</iframe>';
        }
        if(this.type == 'vimeo') {
            var videoHtml = '' +
                '<iframe src="' + this.url + '" frameborder="0" ' +
                    'width="' + width + '" height="' + height + '" ' +
                    'webkitallowfullscreen mozallowfullscreen allowfullscreen>' +
                '</iframe>';
        }
        this.container.css({
            width: width,
            height: height,
            marginTop: topMargin
        });
        this.content.html(videoHtml);
        this.mask.show();
    },
    close: function() {
        this.content.empty();
        this.mask.hide();
    },
    resize: function() {
        this.mask.css('height', jQuery(window).height());
    }
};
