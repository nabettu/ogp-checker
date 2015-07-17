$ ->
    $('#search').submit ->
        search(@.children.query.value)
        location.href = "./?url=" + encodeURIComponent(@.children.query.value)
        return false

    if getQueryString().url
        search(getQueryString().url)

    return 0

search = (url) ->
    $('.siteurl')[0].innerHTML = url

    $.get(url,(data) ->
        content = $(data.responseText).filter((index,item)->
#            console.log(item.tagName)
            if item.tagName == 'META' or "TITLE"
                return true
            )
        for value in content
            if value.tagName == 'TITLE'
                $('.sitetitle')[0].innerHTML = value.innerHTML.toString()
            if value.name
                if -1 < value.name.indexOf("twitter")
                  #Twitter OGPの場合
                    console.log(value.name)
                else
                  #標準meta
#                  switch value.name
#                    console.log(value.name)
            else
                if -1 < value.outerHTML.toString().indexOf('property')
                  #facebook OGP
                    console.log(value.outerHTML.toString())
        $('#capture')[0].src = 'http://capture.heartrails.com/200x150/?' + url
    )
    return 0
