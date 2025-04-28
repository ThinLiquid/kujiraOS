export class HTML {
  _element: HTMLElement

  constructor(tagNameOrHTMLElement: string | HTMLElement) {
    this._element = typeof tagNameOrHTMLElement === 'string' ? document.createElement(tagNameOrHTMLElement) : tagNameOrHTMLElement
  }

  style(styles: Partial<CSSStyleDeclaration>): this {
    Object.assign(this._element.style, styles)
    return this
  }

  append(...elements: (HTML | HTMLElement)[]): this {
    elements.forEach(element => {
      this._element.appendChild(element instanceof HTMLElement ? element : element._element)
    });
    return this
  }

  to(element: HTML | HTMLElement): this {
    element.append(this._element)
    return this
  }

  text(text?: string): this | string {
    if (text == null) return this._element.innerText
    this._element.innerText = text
    return this
  }

  html(html?: string): this | string {
    if (html == null) return this._element.innerHTML
    this._element.innerHTML = html
    return this
  }
}
