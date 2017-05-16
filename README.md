# ajax-navigator

## Presentation
Ajax-Navigator allow you to add an ajaxified navigation by update the main content of your website without reloading the page.
The plugin use jQuery to work.

## How To Use
First, include the plugin file in your website, if possible just before the body closing tag
```html
<script src="ajax-navigator.js" type="text/javascript"></script>
```

Next add this lines after the plugin include (options are optional)
```html
<script type="text/javascript">
jQuery(document).ready(function($) {
  $.ajax-navigator({
    page_container: '.content'
  });
});
</script>
```

## Options
#### page_container (default: '.container')
The selector of the content which gonna be load by ajax. This selector need to exist on all loaded pages.

#### fadeOut (default: true)
Choose to active or not a fadeOut effect on page change.

#### fadeOutDuration (default: 1000)
Set the duration in milliseconds of the fade out effect.

#### fadeIn (default: true)
Choose to active or not a fadeIn effect on page change.

#### fadeInDuration (default: 1000)
Set the duration in milliseconds of the fade in effect.

## Authors

* [Alexandre Navaro (Navalex)](https://navalex.net)