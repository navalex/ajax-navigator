//----------------------------
// ajax-navigator.js
// Author: Navalex (Alexandre Navaro)
// Website: http://navalex.net
// Date: 05/16/2017
// Description: Allow an ajax navigation for any website, except form submitting
//----------------------------

(function ($) {
    jQuery.fn.internal_links = function() {
        // Detect hostname of the site
        var hostname = new RegExp(location.host);

        // Act on each link
        $(this).find('a').each(function () {
            // Store current link's url
            var link_url = $(this).attr("href");

            // Test if current host (domain) is in it
            if (link_url != undefined) {
                if (hostname.test(link_url)) {
                    $(this).attr('rel', 'internal');
                }
                // If it's a link and not an anchor
                else if (link_url.slice(0, 1) == "/") {
                    $(this).attr('rel', 'internal');
                }
            }
        });
    };

    jQuery.ajax-navigator = function (options) {
        var settings = $.extend({
            'page_container': '.content',
            'fadeOut': true,
            'fadeOutDuration': 1000
            'fadeIn': true,
            'fadeInDuration': 1000
        }, options);

        // Function to change
        var ajax_content_change = function(url, settings) {
            $.ajax({
                url: url,
                // If the call success
                success: function (html) {
                    // Prepare content updating
                    var content_inner = html,
                        navbar_inner = html,
                        title_inner = html,

                        content = $(html).filter('#global').contents(),
                        title = $(html).filter('title').text()
                    ;

                    // Change page title
                    document.title = title;

                    // Push new link to history
                    window.history.pushState(null, title, url);

                    // Prepare fades disabled
                    if(!settings.fadeOut) { settings.fadeOutDuration = 0; }
                    if(!settings.fadeIn) { settings.fadeInDuration = 0; }

                    // Update content
                    $(settings.page_container).fadeOut(settings.fadeOutTimer, function (e) {
                        $(this).empty().html(content).fadeIn(settings.fadeInTimer);

                        // Update links from ajax response
                        $(document).internal_links();
                    });
                }
            });
        };

        // Wait document loading
        $(document).ready(function() {
            // Run internal_links on actual document
            $(this).internal_links();

            // Detect internal links click
            $(document).on('click', 'a[rel="internal"]', function (e) {
                // Disable default click
                e.preventDefault();

                // Store link for ajax call
                var url = $(this).attr('href');

                // Create ajax call
                ajax_content_change(url);
            });

            $(window).on('statechange', function() {
                ajax_content_change(window.location);
            });
        });
    };
})(jQuery);
