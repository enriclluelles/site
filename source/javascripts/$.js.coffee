window.$ = new class Dollar
  class Wrapper
    #Utility function that returns the classes of the current object, except name
    allClassesExceptOne = (name, elem) ->
      (cl for cl in elem.className.split(" ") when cl isnt name and cl isnt "")

    constructor: (elem) ->
      elem extends Wrapper.prototype
      return elem

    addClass: (name) ->
      return this unless name
      classNames = allClassesExceptOne(name, this)
      this.className = "#{classNames.join(' ')} #{name}"
      this

    removeClass: (name) ->
      return this unless name
      classNames = allClassesExceptOne(name, this)
      this.className = classNames.join(' ')
      this

    find: (selector) ->
      queryDom(this, selector)

    html: (content) ->
      @innerHTML = content if content
      @innerHTML

  wrapIteratorProperty = (object, property) ->
    object[property] = (args) ->
      results = e[property](args) for e in this
      return results

  class WrapperList
    constructor: (elems) ->
      elems extends WrapperList.prototype
      for own property of Wrapper.prototype
        wrapIteratorProperty(elems, property)
      return elems

    first: () ->
      this[0]

    last: () ->
      this[this.length - 1]

  queryDom = (domain, selector) ->
    domElements = domain.querySelectorAll(selector)
    arr = Array.prototype.slice.call(domElements)
    return new WrapperList(arr.map(
      (el) -> new Wrapper(el)
    ))

  # This function lets us know the type of an object
  type = (obj) ->
    if obj == undefined or obj == null
      return String obj
    classToType = new Object
    for name in "Boolean Number String Function Array Date RegExp".split(" ")
      classToType["[object " + name + "]"] = name.toLowerCase()
    myClass = Object.prototype.toString.call obj
    if myClass of classToType
      return classToType[myClass]
    return "object"

  query = (selector) ->
    return unless selector
    switch type(selector)
      when 'function'
        document.addEventListener "DOMContentLoaded", selector
      when 'array'
        arr = selector
        return new WrapperList(arr.map(
          (el) -> new Wrapper(el)
        ))
      when 'string'
        arr = queryDom(document, selector)
      when 'object'
        return new Wrapper(selector)

  constructor: ->
    return query
