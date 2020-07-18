export default element => {
  if (window.getSelection) {
    const sel = window.getSelection()
    if (sel.toString() === '') {
      sel.removeAllRanges()
      const range = document.createRange()
      range.selectNodeContents(element)
      sel.addRange(range)
    }
  } else if (document.selection) {
    const textRange = document.body.createTextRange()
    textRange.moveToElementText(element)
    textRange.select()
  }
}
