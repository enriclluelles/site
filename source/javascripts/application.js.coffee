#=require $
#
show = (what) ->
  $(what).removeClass('hidden')

hide = (what) ->
  $(what).addClass('hidden')

$( ->
  setTimeout(show, 500, '#whoyouask')
  setTimeout(show, 2000, '#arrow')
  setTimeout(show, 2200, '#mugshot, #thisguy')
  setTimeout(hide, 5000, '#who')
  setTimeout(show, 5500, '#content')
)
