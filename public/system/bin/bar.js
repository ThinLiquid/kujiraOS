const win = System.requestNewWindow('layer', 'top')

const bar = new HTML('div')
  .style({
    height: '40px',
    width: '100vw',
    filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.25))',
    display: 'flex',
    color: '#DADCDD',
    fontFamily: 'monospace',
    fontSize: '16px',
    justifyContent: 'space-between',
    gap: '10px'
  })
  .to(win)

const barStyle = {
  background: '#040A12',
  height: '100%',
  width: 'max-content',
  display: 'flex',
  overflow: 'hidden',
}

const left = new HTML('div')
  .style({
    ...barStyle,
    borderRadius: '0 0 10px 0'
  })
  .append(
    new HTML('div')
      .text('Untitled - Figma - Google Chrome')
      .style({
        lineHeight: '40px',
        padding: '0 15px',
      })
  )
  .to(bar)

const center = new HTML('div')
  .style({
    ...barStyle,
    borderRadius: '0 0 10px 10px'
  })
  .append(
    new HTML('div')
      .text('placeholder, this will be where active apps are etc...')
      .style({
        lineHeight: '40px',
        padding: '0 15px',
      })
  )
  .to(bar)

const right = new HTML('div')
  .style({
    ...barStyle,
    borderRadius: '0 0 0 10px'
  })
  .append(
    new HTML('div')
      .text('Untitled - Figma - Google Chrome')
      .style({
        lineHeight: '40px',
        padding: '0 15px',
      })
  )
  .to(bar)
