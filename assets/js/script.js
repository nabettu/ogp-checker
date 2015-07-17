var search;

$(function() {
  $('#search').submit(function() {
    search(this.children.query.value);
    location.href = "./?url=" + encodeURIComponent(this.children.query.value);
    return false;
  });
  if (getQueryString().url) {
    search(getQueryString().url);
  }
  return 0;
});

search = function(url) {
  $('.siteurl')[0].innerHTML = url;
  $.get(url, function(data) {
    var content, i, len, value;
    content = $(data.responseText).filter(function(index, item) {
      if (item.tagName === 'META' || "TITLE") {
        return true;
      }
    });
    for (i = 0, len = content.length; i < len; i++) {
      value = content[i];
      if (value.tagName === 'TITLE') {
        $('.sitetitle')[0].innerHTML = value.innerHTML.toString();
      }
      if (value.name) {
        if (-1 < value.name.indexOf("twitter")) {
          console.log(value.name);
        } else {

        }
      } else {
        if (-1 < value.outerHTML.toString().indexOf('property')) {
          console.log(value.outerHTML.toString());
        }
      }
    }
    return $('#capture')[0].src = 'http://capture.heartrails.com/200x150/?' + url;
  });
  return 0;
};
